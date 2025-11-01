import { API_BASE } from "@/lib/api";
import type { Organization } from "@/types/organization";
import DashboardHeader from "@/app/components/organizations/dashboard/DashboardHeader";
import OrgInfo from "@/app/components/organizations/dashboard/OrgInfo";
import AddressSection from "@/app/components/organizations/dashboard/AddressSection";
import DocumentsSection from "@/app/components/organizations/dashboard/DocumentsSection";

async function getOrganization(id: string): Promise<Organization> {
  const res = await fetch(`${API_BASE}/api/organizations/${id}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load organization (${res.status})`);
  }
  return res.json();
}

export default async function OrganizationSettingsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const org = await getOrganization(id);

  return (
    <main dir="rtl" className="min-h-screen p-6 md:p-10 bg-[#F6F8FC]">
      <div className="max-w-5xl mx-auto space-y-6">
        <DashboardHeader />
        <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
          <h2 className="text-xl font-bold text-[#1A2954] mb-4">إعدادات المؤسسة</h2>
          <p className="text-[#4B5563] mb-6">تفاصيل المؤسسة ومعلومات الاتصال والوثائق.</p>
          <div className="space-y-6">
            <OrgInfo org={org} />
            <AddressSection org={org} />
            <DocumentsSection org={org} />
          </div>
        </section>
      </div>
    </main>
  );
}
