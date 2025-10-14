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

type InventoryItem = {
  id: number;
  name: string;
  details?: Record<string, unknown>;
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
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showGrantModal, setShowGrantModal] = useState(false);

  const [availableSizes, setAvailableSizes] = useState<
    { size: string; count: number }[]
  >([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/api/requests/${orgId}/recent/?limit=5`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch(console.error);
  }, [orgId]);

  const handleOpenModal = (item: RequestItem) => {
    setSelected(item);
    setShowDetailsModal(true);
  };

  const handleCloseDetails = () => {
    setSelected(null);
    setShowDetailsModal(false);
  };

  const handleGrant = async () => {
    if (!selected) return;

    const res = await fetch(
      `${API_BASE}/api/organizations/${orgId}/recent/inventory`
    );
    const data: InventoryItem[] = await res.json();
    setInventory(data);

    const related = data.filter(
      (inv) => inv.name === selected.patient.disability_type
    );

    const sizeCounts: Record<string, number> = {};
    related.forEach((inv) => {
      const size = inv.details?.size ? String(inv.details.size) : "غير محدد";
      sizeCounts[size] = (sizeCounts[size] || 0) + 1;
    });

    const sizes = Object.entries(sizeCounts).map(([size, count]) => ({
      size,
      count,
    }));

    setAvailableSizes(sizes);
    setSelectedSize(sizes[0]?.size || "");

    setShowDetailsModal(false);
    setShowGrantModal(true);
  };

  const handleCloseGrantModal = () => {
    setShowGrantModal(false);
  };

  const handleDelete = async (id: number) => {
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
    handleCloseDetails();
    window.location.reload();
  };

  const handleConfirmGrant = async () => {
    if (!selected) return;
    const prosthetic = inventory.find(
      (p) =>
        p.name === selected.patient.disability_type &&
        (!p.details?.size || p.details.size === selectedSize)
    );

    if (!prosthetic) {
      alert("لا يوجد طرف متاح بالمواصفات المطلوبة.");
      return;
    }

    try {
      const res = await fetch(
        `${API_BASE}/api/requests/${selected.id}/status`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            status: "COMPLETED",
            inventory_id: prosthetic.id,
          }),
        }
      );
      if (!res.ok) throw new Error(await res.text());
      alert("تم منح الطرف وتحديث الطلب بنجاح ✅");
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء منح الطرف.");
    }

    setShowGrantModal(false);
    window.location.reload();
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

      {/* Modal 1 - Details */}
      {showDetailsModal && selected && (
        <div className="fixed inset-0 bg-[rgba(2,0,0,0.7)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[500px] relative shadow-lg">
            <button
              className="absolute top-5 left-3 hover:text-red-500"
              onClick={handleCloseDetails}
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
                onClick={handleCloseDetails}
                className="flex items-center gap-2 bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2 - Grant Form */}
      {showGrantModal && selected && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[520px] shadow-lg relative">
            <button
              className="absolute top-4 left-4 text-gray-600 hover:text-red-500"
              onClick={handleCloseGrantModal}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-semibold mb-2 text-right">
              منح طرف لمريض
            </h3>
            <p className="text-gray-600 text-sm mb-4 text-right">
              سيتم ربط هذا الطرف بالمريض المحدد، وتحديث حالة الطلب والمخزن
              تلقائيًا
            </p>

            <div className="space-y-4 text-right">
              <div>
                <label className="block text-sm font-medium mb-1">
                  اسم المريض
                </label>
                <input
                  type="text"
                  value={selected.patient.name}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  نوع الطرف
                </label>
                <input
                  type="text"
                  value={selected.patient.disability_type}
                  disabled
                  className="w-full border rounded-lg px-3 py-2 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">المقاس</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  {availableSizes.length === 0 ? (
                    <option value="">لا توجد مقاسات متاحة</option>
                  ) : (
                    availableSizes.map(({ size, count }) => (
                      <option key={size} value={size}>
                        {`${size} (${count} ${
                          count > 1 ? "قطع متاحة" : "قطعة متاحة"
                        })`}
                      </option>
                    ))
                  )}
                </select>
              </div>

              {/* <div>
                <label className="block text-sm font-medium mb-1">الكمية</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div> */}

              <div>
                <label className="block text-sm font-medium mb-1">
                  تاريخ التسليم
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleConfirmGrant}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
              >
                منح الطرف
              </button>
              <button
                onClick={handleCloseGrantModal}
                className="bg-gray-300 hover:bg-gray-400 text-black px-5 py-2 rounded-lg"
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
