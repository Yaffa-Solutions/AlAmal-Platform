"use client";

import { useState, useEffect, useRef } from "react";
import { API_BASE } from "@/lib/api";
import { useParams } from "next/navigation";

type CampaignItem = {
  id: number;
  image: string;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  start_date: string;
  end_date: string;
  status: string;
};

export default function CampaignsPage() {
  const params = useParams();
  const [items, setItems] = useState<CampaignItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignItem | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<CampaignItem>>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch campaigns
  useEffect(() => {
    async function fetchCampaigns() {
      console.log(params);

      const res = await fetch(`${API_BASE}/api/campaigns/${params.id}`);
      const data = await res.json();
      setItems(data);
    }
    fetchCampaigns();
  }, [params.id]);

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowForm(false);
      }
    }
    if (showForm) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showForm]);

  function handleEdit(campaign: CampaignItem) {
    setSelectedCampaign(campaign);
    setFormData(campaign);
    setShowForm(true);
  }

  function handleDelete(campaignId: number) {
    if (!confirm("هل تريد حذف هذه الحملة؟")) return;
    fetch(`${API_BASE}/api/campaigns/${campaignId}`, { method: "DELETE" })
      .then(() => window.location.reload())
      .catch(console.error);
  }

  async function uploadFileToS3(file: File) {
    const res = await fetch(`${API_BASE}/api/campaigns/upload-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    });

    if (!res.ok) throw new Error("Failed to get upload URL");

    const { url, key } = await res.json();

    const put = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    if (!put.ok) throw new Error("Failed to upload to S3");

    return key;
  }

  async function handleSubmit() {
    const orgId = localStorage.getItem("orgId");
    let imageKey = formData.image || "";

    if (selectedFile) {
      try {
        imageKey = await uploadFileToS3(selectedFile);
      } catch (err) {
        console.error(err);
        return alert("Failed to upload image");
      }
    }

    const payload = {
      ...formData,
      org_id: Number(orgId),
      image: imageKey,
    };

    const url = selectedCampaign
      ? `${API_BASE}/api/campaigns/${selectedCampaign.id}`
      : `${API_BASE}/api/campaigns`;

    const method = selectedCampaign ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch(console.error);
  }

  return (
    <main dir="rtl" className="p-4 space-y-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={() => setShowForm(true)}
      >
        إضافة حملة جديدة
      </button>

      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-right">#</th>
            <th className="p-2 text-right">العنوان</th>
            <th className="p-2 text-right">الحالة</th>
            <th className="p-2 text-right">تاريخ البدء</th>
            <th className="p-2 text-right">تاريخ الانتهاء</th>
            <th className="p-2 text-right">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-4 text-center text-gray-500">
                لا توجد حملات حديثة
              </td>
            </tr>
          ) : (
            items.map((it) => (
              <tr key={it.id} className="border-t border-gray-300">
                <td className="p-2">{it.id}</td>
                <td className="p-2">{it.title}</td>
                <td className="p-2">{it.status}</td>
                <td className="p-2">
                  {new Date(it.start_date).toLocaleDateString()}
                </td>
                <td className="p-2">
                  {new Date(it.end_date).toLocaleDateString()}
                </td>
                <td className="p-2 space-x-2">
                  <button
                    className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                    onClick={() => handleEdit(it)}
                  >
                    تعديل
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDelete(it.id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white rounded-xl shadow-xl p-6 w-[700px] max-w-full"
          >
            <h2 className="text-lg font-bold mb-4">
              {selectedCampaign ? "تعديل الحملة" : "إضافة حملة جديدة"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">العنوان</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">الوصف</label>
                <textarea
                  value={formData.description || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">الصورة</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="border p-2 rounded w-full"
                />
                {selectedFile && (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    alt="preview"
                    className="mt-2 h-24 w-full object-cover rounded"
                  />
                )}
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  المبلغ المستهدف
                </label>
                <input
                  type="number"
                  value={formData.target_amount || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      target_amount: Number(e.target.value),
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">المبلغ المجمّع</label>
                <input
                  type="number"
                  value={formData.collected_amount || 0}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      collected_amount: Number(e.target.value),
                    })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">تاريخ البدء</label>
                <input
                  type="date"
                  value={formData.start_date?.split("T")[0] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, start_date: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">تاريخ الانتهاء</label>
                <input
                  type="date"
                  value={formData.end_date?.split("T")[0] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, end_date: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                onClick={() => setShowForm(false)}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                onClick={handleSubmit}
              >
                حفظ
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
