import NavBar from "@/app/components/organizations/dashboard/NavBar";
import SideBar from "@/app/components/organizations/dashboard/SideBar";
import { API_BASE } from "@/lib/api";

async function getOrganizationName(id: string): Promise<string> {
  const res = await fetch(`${API_BASE}/api/organizations/${id}`, { next: { revalidate: 30 } });
  if (!res.ok) return "المؤسسة";
  const data = await res.json();
  return data?.name ?? "المؤسسة";
}

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;
  const orgName = await getOrganizationName(id);

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <NavBar orgId={id} orgName={orgName} />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div dir="rtl" className="flex flex-col md:flex-row gap-6">
          <SideBar orgId={id} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
