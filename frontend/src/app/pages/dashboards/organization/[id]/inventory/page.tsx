"use client";

import { API_BASE } from "@/lib/api";
import { Trash2, Plus, Minus, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { AddProstheticButton } from "@/app/components/prosthetics/AddProstheticButton ";
import { ConfirmModal } from "@/app/components/prosthetics/ConfirmModal";
import { useParams } from "next/navigation";

type InventoryItem = {
  id: number;
  name: string;
  details?: Record<string, unknown>;
  quantity: number;
  is_granted: boolean;
  updated_at: string;
  request?: {
    patient?: { name: string };
  };
};

const detailLabelArabic: Record<string, string> = {
  size: "الحجم",
  color: "اللون",
  material: "المادة",
};

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [editName, setEditName] = useState("");
  const [editDetails, setEditDetails] = useState<Record<string, unknown>>({});
  const { id } = useParams();
  useEffect(() => {
    fetch(`${API_BASE}/api/organizations/${id}/recent/inventory`)
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((item: InventoryItem) => ({
          ...item,
          quantity: Number(item.quantity) || 0,
        }));
        setItems(normalized);
        console.log(normalized);
      })
      .catch(console.error);
  }, [id]);

  function handleEditClick(item: InventoryItem) {
    setEditItem(item);
    setEditName(item.name);
    setEditDetails(item.details || {});
    setShowEditModal(true);
  }

  async function handleSaveEdit() {
    if (!editItem) return;

    try {
      await fetch(`${API_BASE}/api/prosthetics/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: editItem.name,
          details: editItem.details,
          newName: editName,
          newDetails: editDetails,
          quantity: editItem.quantity,
        }),
      });

      setItems((prev) =>
        prev.map((p) =>
          p.id === editItem.id
            ? { ...p, name: editName, details: editDetails }
            : p
        )
      );

      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تحديث الأطراف الصناعية");
    }
  }

  function handleDeleteClick(item: InventoryItem) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  async function confirmDelete(count?: number) {
    if (!selectedItem) return;

    try {
      await fetch(`${API_BASE}/api/prosthetics/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedItem.name,
          details: selectedItem.details,
          count: count ?? selectedItem.quantity, // if no count, delete all
        }),
      });

      // Remove from UI immediately
      setItems((prev) => prev.filter((i) => i.id !== selectedItem.id));
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    }
  }

  async function handleUpdate(
    item: InventoryItem,
    updates: Partial<InventoryItem>
  ) {
    try {
      await fetch(`${API_BASE}/api/prosthetics/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: item.name,
          details: item.details,
          newName: updates.name ?? item.name,
          newDetails: updates.details ?? item.details,
          quantity: updates.quantity ?? item.quantity,
        }),
      });

      // Update UI instantly
      setItems((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, ...updates } : p))
      );
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء تحديث الأطراف الصناعية");
    }
  }

  const grantedItems = items.filter((i) => i.is_granted);

  return (
    <main dir="rtl" className="space-y-8">
      <AddProstheticButton orgId={id as string} />

      {/* 🧱 Inventory Section */}
      <section>
        <h1 className="text-xl font-bold text-[#1A2954] mb-2">ملخص المخزون</h1>
        <div className="bg-white border border-[#E8ECF3] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="text-right p-3">#</th>
                <th className="text-right p-3">النوع</th>
                <th className="text-right p-3">التفاصيل</th>
                <th className="text-right p-3">الكمية</th>
                <th className="text-right p-3">تم منحه</th>
                <th className="text-right p-3">آخر تحديث</th>
                <th className="text-right p-3">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-[#6B7280] text-center">
                    لا توجد عناصر حديثة
                  </td>
                </tr>
              ) : (
                items.map((it, index) => (
                  <tr key={it.id} className="border-t border-[#E8ECF3]">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3 text-gray-700">
                      {it.details
                        ? Object.entries(it.details)
                            .map(
                              ([k, v]) =>
                                `${detailLabelArabic[k] || k}: ${String(v)}`
                            )
                            .join("، ")
                        : "—"}
                    </td>
                    <td className="p-3 font-semibold flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleUpdate(it, { quantity: it.quantity - 1 })
                        }
                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center">
                        {Number(it.quantity ?? 0)}
                      </span>
                      <button
                        onClick={() =>
                          handleUpdate(it, { quantity: it.quantity + 1 })
                        }
                        className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded-lg"
                      >
                        <Plus size={14} />
                      </button>
                    </td>
                    <td className="p-3">{it.is_granted ? "نعم" : "لا"}</td>
                    <td className="p-3">
                      {new Date(it.updated_at).toLocaleString("ar-EG")}
                    </td>

                    <td className="p-3 flex gap-2 justify-end">
                      <button
                        onClick={() => handleEditClick(it)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(it)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* 🧱 Granted Items Section */}
      <section>
        <h1 className="text-xl font-bold text-[#1A2954] mb-2">
          الأطراف الممنوحة
        </h1>
        <div className="bg-white border border-[#E8ECF3] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] text-[#6B7280]">
              <tr>
                <th className="text-right p-3">#</th>
                <th className="text-right p-3">النوع</th>
                <th className="text-right p-3">التفاصيل</th>
                <th className="text-right p-3">المريض</th>
                <th className="text-right p-3">تاريخ المنح</th>
              </tr>
            </thead>
            <tbody>
              {grantedItems.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-4 text-[#6B7280] text-center">
                    لا توجد أطراف ممنوحة
                  </td>
                </tr>
              ) : (
                grantedItems.map((item, index) => (
                  <tr key={item.id} className="border-t border-[#E8ECF3]">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-gray-700">
                      {item.details
                        ? Object.entries(item.details)
                            .map(([k, v]) => `${k}: ${String(v)}`)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="p-3">
                      {item.request?.patient?.name || "N/A"}
                    </td>
                    <td className="p-3">
                      {new Date(item.updated_at).toLocaleString("ar-EG")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {selectedItem && (
        <ConfirmModal
          open={showConfirm}
          onClose={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
          title="حذف الأطراف الصناعية"
          message={`هل أنت متأكد أنك تريد حذف هذا الطرف الصناعي؟`}
        />
      )}

      {showEditModal && editItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 space-y-4">
            <h2 className="text-lg font-bold">تعديل الطرف الصناعي</h2>

            {/* النوع */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                النوع *
              </label>
              <select
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">اختر النوع</option>
                {[
                  "RIGHT_ARM",
                  "LEFT_ARM",
                  "RIGHT_LEG",
                  "LEFT_LEG",
                  "RIGHT_HAND",
                  "LEFT_HAND",
                  "RIGHT_FOOT",
                  "LEFT_FOOT",
                ].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* التفاصيل */}
            <div className="space-y-2">
              {/* اللون */}
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  اللون
                </label>
                <select
                  value={(editDetails.color as string) || ""}
                  onChange={(e) =>
                    setEditDetails((prev) => ({
                      ...prev,
                      color: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-2 text-sm"
                >
                  <option value="">اختر اللون</option>
                  {["أبيض", "أسود"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* المقاس */}
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  المقاس
                </label>
                <select
                  value={(editDetails.size as string) || ""}
                  onChange={(e) =>
                    setEditDetails((prev) => ({
                      ...prev,
                      size: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-2 text-sm"
                >
                  <option value="">اختر المقاس</option>
                  {["S", "M", "L", "XL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* المادة */}
              <div>
                <label className="block mb-1 text-sm text-gray-700">
                  المادة
                </label>
                <select
                  value={(editDetails.material as string) || ""}
                  onChange={(e) =>
                    setEditDetails((prev) => ({
                      ...prev,
                      material: e.target.value,
                    }))
                  }
                  className="w-full border rounded-lg p-2 text-sm"
                >
                  <option value="">اختر المادة</option>
                  {["الكربون", "الألمنيوم", "البلاستيك", "الحديد"].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setShowEditModal(false)}
              >
                إلغاء
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleSaveEdit}
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
