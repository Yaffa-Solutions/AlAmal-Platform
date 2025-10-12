import { API_BASE } from "@/lib/api";
import type { Organization } from "@/types/organization";
import DashboardHeader from "@/app/components/organizations/dashboard/DashboardHeader";
import SummaryWidgets from "@/app/components/organizations/dashboard/SummaryWidgets";
import GeneralRecentRequests from "@/app/components/organizations/dashboard/GeneralRecentRequests";
import RecentRequests from "@/app/components/organizations/dashboard/RecentRequests";
import ActiveCampaignsCards from "@/app/components/organizations/dashboard/ActiveCampaignsCards";

async function getOrganization(id: string): Promise<Organization> {
  const res = await fetch(`${API_BASE}/api/organizations/${id}`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) {
    throw new Error(`Failed to load organization (${res.status})`);
  }
  return res.json();
}

export default async function OrganizationDashboardPage({
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
        <SummaryWidgets org={org} />
        <GeneralRecentRequests orgId={id} />
        <RecentRequests orgId={id} />
        <ActiveCampaignsCards orgId={id} />
      </div>
    </main>
  );
}
