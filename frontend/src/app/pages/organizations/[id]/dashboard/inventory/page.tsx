import { API_BASE } from "@/lib/api";

type InventoryItem = {
  id: number;
  name: string; // enum in DB, string here
  details?: unknown;
  updated_at: string;
};

async function getRecentInventory(orgId: string): Promise<InventoryItem[]> {
  const res = await fetch(`${API_BASE}/api/organizations/${orgId}/recent/inventory`, {
    next: { revalidate: 15 },
  });
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`);
  return res.json();
}

export default async function InventoryPage({ params }: { params: { id: string } }) {
  const items = await getRecentInventory(params.id);

  return (
    <main dir="rtl" className="space-y-4">
      <h1 className="text-xl font-bold text-[#1A2954]">أحدث عناصر المخزون</h1>
      <div className="bg-white border border-[#E8ECF3] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-[#6B7280]">
            <tr>
              <th className="text-right p-3">#</th>
              <th className="text-right p-3">النوع</th>
              <th className="text-right p-3">آخر تحديث</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-[#6B7280] text-center">
                  لا توجد عناصر حديثة
                </td>
              </tr>
            ) : (
              items.map((it) => (
                <tr key={it.id} className="border-t border-[#E8ECF3]">
                  <td className="p-3">{it.id}</td>
                  <td className="p-3">{it.name}</td>
                  <td className="p-3">{new Date(it.updated_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
