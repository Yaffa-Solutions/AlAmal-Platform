"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";
import type { Organization } from "@/types/organization";
import DashboardHeader from "@/app/components/organizations/dashboard/DashboardHeader";
import SummaryWidgets from "@/app/components/organizations/dashboard/SummaryWidgets";
import GeneralRecentRequests from "@/app/components/organizations/dashboard/GeneralRecentRequests";
import RecentRequests from "@/app/components/organizations/dashboard/RecentRequests";
import ActiveCampaignsCards from "@/app/components/organizations/dashboard/ActiveCampaignsCards";

export default function OrganizationDashboardPage() {
  const [org, setOrg] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) return;

    const fetchOrg = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/organizations/${id}`);
        if (!res.ok) throw new Error("Failed to fetch organization");
        const data = await res.json();
        setOrg(data);
      } catch (err) {
        console.error("Error fetching organization:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrg();
  }, []);

  if (loading) return <div className="text-center mt-10">جاري التحميل...</div>;
  if (!org)
    return <div className="text-center mt-10">لم يتم العثور على المؤسسة</div>;

  return (
    <main dir="rtl" className="min-h-screen p-6 md:p-10 bg-[#F6F8FC]">
      <div className="max-w-5xl mx-auto space-y-6">
        <DashboardHeader />
        <SummaryWidgets org={org} />
        <GeneralRecentRequests orgId={org.id?.toString() || ""} />
        <RecentRequests orgId={org?.id?.toString() || ""} />
        <ActiveCampaignsCards orgId={org?.id?.toString() || ""} />
      </div>
    </main>
  );
}
