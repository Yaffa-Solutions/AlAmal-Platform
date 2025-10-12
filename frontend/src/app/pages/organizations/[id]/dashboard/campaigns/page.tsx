import { API_BASE } from "@/lib/api";

type CampaignItem = {
  id: number;
  title: string;
  status: string;
  start_date: string;
  end_date: string;
};

async function getRecentCampaigns(orgId: string): Promise<CampaignItem[]> {
  const res = await fetch(`${API_BASE}/api/organizations/${orgId}/recent/campaigns`, {
    next: { revalidate: 15 },
  });
  if (!res.ok) throw new Error(`Failed to load campaigns (${res.status})`);
  return res.json();
}

export default async function CampaignsPage({ params }: { params: { id: string } }) {
  const items = await getRecentCampaigns(params.id);

  return (
    <main dir="rtl" className="space-y-4">
      <h1 className="text-xl font-bold text-[#1A2954]">أحدث الحملات</h1>
      <div className="bg-white border border-[#E8ECF3] rounded-2xl overflow-hidden">
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
    </main>
  );
}
