import { API_BASE } from "@/lib/api";

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

async function getRecentRequests(orgId: string): Promise<RequestItem[]> {
  const res = await fetch(`${API_BASE}/api/requests/${orgId}/recent`, {});
  if (!res.ok) throw new Error(`Failed to load requests (${res.status})`);
  return res.json();
}

export default async function RequestsPage({
  params,
}: {
  params: { id: string };
}) {
  const items = await getRecentRequests(params.id);

  return (
    <main dir="rtl" className="space-y-4">
      <h1 className="text-xl font-bold text-[#1A2954]">أحدث الطلبات</h1>
      <div className="bg-white border border-[#E8ECF3] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-[#6B7280]">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">الاسم</th>
              <th className="text-right p-3">العمر</th>
              <th className="text-right p-3">نوع الإعاقة</th>
              <th className="text-right p-3">نسبة الإعاقة</th>
              <th className="text-right p-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-[#6B7280] text-center">
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
