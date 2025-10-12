"use client";

import { API_BASE } from "@/lib/api";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

type RequestItem = {
  id: number;
  status: string;
  created_at: string;
  patient: {
    name: string;
    age: number;
    disability_type: string;
    disability_percentage: number;
  };
};

const statusArabic: Record<string, string> = {
  PENDING: "قيد الانتظار",
  INPROGRESS: "قيد التنفيذ",
  COMPLETED: "مكتمل",
  REJECTED: "مرفوض",
};

async function fetchRequests(search: string = ""): Promise<RequestItem[]> {
  const params = new URLSearchParams();
  params.append("limit", "5");
  if (search) params.append("search", search);

  const res = await fetch(`${API_BASE}/api/requests/recent?${params}`);
  if (!res.ok) {
    console.error("Failed to fetch requests:", await res.text());
    return [];
  }
  return res.json();
}

export default function GeneralRecentRequests({ orgId }: { orgId: string }) {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const loadRequests = async () => {
      const data = await fetchRequests(debouncedSearch);
      setItems(data);
    };
    loadRequests();
  }, [debouncedSearch, orgId]);

  const handleAccept = async (id: number) => {
    try {
      const res = await fetch(`${API_BASE}/api/requests/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "INPROGRESS", organization_id: orgId }),
      });
      window.location.reload();
      if (!res.ok) throw new Error(await res.text());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-[#1A2954]">
          الحالات الواردة
        </h2>
        <input
          type="text"
          placeholder="ابحث عن حالة..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
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
                <td colSpan={7} className="p-4 text-center text-[#6B7280]">
                  لا توجد حالات واردة
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
                    {it.status === "PENDING" && (
                      <button
                        onClick={() => handleAccept(it.id)}
                        title="قبول الطلب"
                        className="hover:opacity-80 transition"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500 cursor-pointer" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
