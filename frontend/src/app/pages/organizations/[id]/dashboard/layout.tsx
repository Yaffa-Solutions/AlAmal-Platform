import NavBar from "@/app/components/organizations/dashboard/NavBar";
import SideBar from "@/app/components/organizations/dashboard/SideBar";

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      <NavBar />
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div dir="rtl" className="flex flex-col md:flex-row gap-6">
          <SideBar orgId={id} />
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </div>
  );
}
