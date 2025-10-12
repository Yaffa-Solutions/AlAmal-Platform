import Link from "next/link";
import { API_BASE } from "@/lib/api";

type CampaignItem = {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
};

async function getRecentCampaigns(orgId: string): Promise<CampaignItem[]> {
  const res = await fetch(`${API_BASE}/api/organizations/${orgId}/recent/campaigns?limit=5`, {
    next: { revalidate: 15 },
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function RecentCampaigns({ orgId }: { orgId: string }) {
  const items = await getRecentCampaigns(orgId);
  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-[#1A2954]">أحدث الحملات</h2>
        <Link
          href={`/pages/organizations/${orgId}/dashboard/campaigns/new`}
          className="bg-[#1D64D8] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#184fa9]"
        >
          إضافة حملة
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-[#6B7280]">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">العنوان</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">تاريخ البدء</th>
              <th className="text-right p-3">تاريخ الانتهاء</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-[#6B7280] text-center">
                  لا توجد حملات حديثة
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t border-[#E8ECF3]">
                  <td className="p-3">{it.id}</td>
                  <td className="p-3">{it.title}</td>
                  <td className="p-3">{it.status}</td>
                  <td className="p-3">{new Date(it.start_date).toLocaleDateString()}</td>
                  <td className="p-3">{new Date(it.end_date).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
