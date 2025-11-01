"use client";

import { useEffect, useState } from "react";
import NavBar from "@/app/components/organizations/dashboard/NavBar";
import SideBar from "@/app/components/organizations/dashboard/SideBar";
import { API_BASE } from "@/lib/api";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [orgId, setOrgId] = useState<string | null>(null);
  const [orgName, setOrgName] = useState<string>("المؤسسة");

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) return;
    setOrgId(id);

    fetch(`${API_BASE}/api/organizations/${id}`)
      .then((res) => res.json())
      .then((data) => setOrgName(data.name || "المؤسسة"))
      .catch(() => {});
  }, []);

  if (!orgId) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <NavBar orgId={orgId} orgName={orgName} />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div dir="rtl" className="flex flex-col md:flex-row gap-6">
          <SideBar orgId={orgId} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
