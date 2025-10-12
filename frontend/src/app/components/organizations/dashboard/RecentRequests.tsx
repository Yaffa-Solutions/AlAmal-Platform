"use client";

import { API_BASE } from "@/lib/api";
import { EyeIcon, Trash2, UserCheck, X } from "lucide-react";
import { useState, useEffect } from "react";

type RequestItem = {
  id: number;
  status: string;
  created_at: string;
  patient: {
    name: string;
    age: number;
    disability_type: string;
    disability_percentage: number;
    city?: string;
  };
};

const statusArabic: Record<string, string> = {
  PENDING: "قيد الانتظار",
  INPROGRESS: "قيد المراجعة",
  COMPLETED: "مكتمل",
  REJECTED: "مرفوض",
};

export default function RecentRequests({ orgId }: { orgId: string }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [selected, setSelected] = useState<RequestItem | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Load requests
  useEffect(() => {
    fetch(`${API_BASE}/api/requests/${orgId}/recent/?limit=5`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, [orgId]);

  const handleOpenModal = (item: RequestItem) => {
    setSelected(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelected(null);
    setShowModal(false);
  };

  const handleGrant = () => {
    console.log("منح طرف clicked for", selected?.id);
    handleCloseModal();
  };

  const handleDelete = async (id: number) => {
    console.log(id);

    try {
      const res = await fetch(`${API_BASE}/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "PENDING", organization_id: null }),
      });
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error(err);
    }
    handleCloseModal();
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-[#1A2954]">حالات المؤسسة</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-[#6B7280]">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">العمر</th>
              <th className="text-right p-3">نوع الإعاقة</th>
              <th className="text-right p-3">نسبة الإعاقة</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-4 text-[#6B7280] text-center">
                  لا توجد طلبات حديثة
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t border-[#E8ECF3]">
                  <td className="p-3">{it.id}</td>
                  <td className="p-3">{it.patient?.name || "N/A"}</td>
                  <td className="p-3">{it.patient?.age || "N/A"}</td>
                  <td className="p-3">
                    {it.patient?.disability_type || "N/A"}
                  </td>
                  <td className="p-3">
                    {it.patient?.disability_percentage || "N/A"}%
                  </td>
                  <td className="p-3">
                    {statusArabic[it.status] || it.status}
                  </td>
                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      title="عرض التفاصيل"
                      onClick={() => handleOpenModal(it)}
                      className="hover:opacity-80 transition"
                    >
                      <EyeIcon className="w-6 h-6 text-green-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && selected && (
        <div className="fixed inset-0  bg-[rgba(2,0,0,0.7)]   flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] relative shadow-lg">
            <button
              className="absolute top-5 left-3 hover:text-red-500"
              onClick={handleCloseModal}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-right">
              تفاصيل المريض
            </h3>
            <div className="grid grid-cols-2 gap-4 bg-gray-200 p-3">
              <div className="space-y-2 text-right">
                <p>
                  <strong>الاسم:</strong> {selected.patient.name}
                </p>
                <p>
                  <strong>نسبة الإعاقة:</strong>{" "}
                  {selected.patient.disability_percentage}%
                </p>
                <p>
                  <strong>المدينة:</strong> {selected.patient.city || "N/A"}
                </p>
                <p>
                  <strong>الحالة:</strong> {statusArabic[selected.status]}
                </p>
              </div>
              <div className="space-y-2 text-right">
                <p>
                  <strong>العمر:</strong> {selected.patient.age}
                </p>
                <p>
                  <strong>نوع الإعاقة:</strong>{" "}
                  {selected.patient.disability_type}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-5 mt-6">
              <button
                onClick={handleGrant}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                <UserCheck className="w-5 h-5" /> منح طرف
              </button>
              <button
                onClick={() => handleDelete(selected.id)}
                className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                <Trash2 className="w-5 h-5" /> حذف الطلب
              </button>
              <button
                onClick={handleCloseModal}
                className="flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
