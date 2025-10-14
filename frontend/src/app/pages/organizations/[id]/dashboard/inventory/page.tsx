import { AddProstheticButton } from "@/app/components/prosthetics/AddProstheticButton ";
import { API_BASE } from "@/lib/api";

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

async function getRecentInventory(orgId: string): Promise<InventoryItem[]> {
  const res = await fetch(
    `${API_BASE}/api/organizations/${orgId}/recent/inventory`,
    {
      next: { revalidate: 15 },
    }
  );
  if (!res.ok) throw new Error(`Failed to load inventory (${res.status})`);
  return res.json();
}

export default async function InventoryPage({
  params,
}: {
  params: { id: string };
}) {
  const items = await getRecentInventory(params.id);

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

  return (
    <main dir="rtl" className="space-y-8">
      <AddProstheticButton orgId={params.id}/>
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
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Table 2: Granted Prosthetics */}
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
    </main>
  );
}
