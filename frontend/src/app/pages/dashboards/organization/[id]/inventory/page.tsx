"use client";

import { API_BASE } from "@/lib/api";
import { Trash2, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { AddProstheticButton } from "@/app/components/prosthetics/AddProstheticButton ";
import { ConfirmModal } from "@/app/components/prosthetics/ConfirmModal";
type InventoryItem = {
  id: number;
  name: string;
  details?: Record<string, unknown>;
  is_granted: boolean;
  updated_at: string;
  request?: {
    patient?: {
      name: string;
    };
  };
  granted_to?: { name: string };
};

type GroupedItem = {
  name: string;
  details?: Record<string, unknown>;
  quantity: number;
  lastUpdated: string;
  is_granted: boolean;
};

export default function InventoryPage({ params }: { params: { id: string } }) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GroupedItem | null>(null);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  const { id } = params;

  useEffect(() => {
    fetch(`${API_BASE}/api/organizations/${id}/recent/inventory`)
      .then((res) => res.json())
      .then(setItems)
      .catch(console.error);
  }, [id]);

  const grouped = Object.values(
    items.reduce(
      (acc, item) => {
        const detailsKey = item.details
          ? JSON.stringify(item.details, Object.keys(item.details).sort())
          : "{}";
        const key = `${item.name}-${detailsKey}`;

        if (!acc[key]) {
          acc[key] = {
            name: item.name,
            details: item.details,
            quantity: 1,
            lastUpdated: item.updated_at,
            is_granted: item.is_granted,
          };
        } else {
          acc[key].quantity += 1;
          if (new Date(item.updated_at) > new Date(acc[key].lastUpdated)) {
            acc[key].lastUpdated = item.updated_at;
          }
          if (item.is_granted) acc[key].is_granted = true;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          details?: Record<string, unknown>;
          quantity: number;
          lastUpdated: string;
          is_granted: boolean;
        }
      >
    )
  );

  const grantedItems = items
    .filter((i) => i.is_granted)
    .map((i) => ({
      ...i,
      granted_to: i.request?.patient ?? null,
    }));

  function handleDeleteClick(item: GroupedItem) {
    setSelectedItem(item);
    setShowConfirm(true);
  }

  async function confirmDelete(count?: number) {
    if (!selectedItem) return;

    try {
      const detailsKey = selectedItem.details
        ? JSON.stringify(selectedItem.details)
        : "{}";
      await fetch(`${API_BASE}/api/prosthetics/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedItem.name,
          details: detailsKey,
          count: count || 1,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء الحذف");
    }
  }

  async function handleUpdate(item: {
    name: string;
    details?: Record<string, unknown>;
  }) {
    const newName = prompt("أدخل الاسم الجديد:", item.name);
    if (!newName) return;

    try {
      const detailsKey = item.details ? JSON.stringify(item.details) : "{}";
      await fetch(`${API_BASE}/api/prosthetics/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldName: item.name,
          details: detailsKey,
          newName,
        }),
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء التحديث");
    }
  }

  return (
    <main dir="rtl" className="space-y-8">
      <AddProstheticButton orgId={id} />
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
              {grouped.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-4 text-[#6B7280] text-center">
                    لا توجد عناصر حديثة
                  </td>
                </tr>
              ) : (
                grouped.map((it, index) => (
                  <tr key={index} className="border-t border-[#E8ECF3]">
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{it.name}</td>
                    <td className="p-3 text-gray-700">
                      {it.details
                        ? Object.entries(it.details)
                            .map(([k, v]) => `${k}: ${String(v)}`)
                            .join(", ")
                        : "—"}
                    </td>
                    <td className="p-3 font-semibold">{it.quantity}</td>
                    <td className="p-3">{it.is_granted ? "نعم" : "لا"}</td>
                    <td className="p-3">
                      {new Date(it.lastUpdated).toLocaleString("ar-EG")}
                    </td>
                    <td className="p-3 flex gap-2 justify-end">
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
                    <td className="p-3">{item.granted_to?.name || "N/A"}</td>
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
          message={`يوجد ${selectedItem.quantity} من هذا النوع. كم منها تريد حذفه؟`}
          showCountInput={selectedItem.quantity > 1}
          maxCount={selectedItem.quantity}
        />
      )}
    </main>
  );
}
