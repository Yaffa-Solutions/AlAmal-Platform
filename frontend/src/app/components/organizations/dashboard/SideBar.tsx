"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar({ orgId }: { orgId: string }) {
  const pathname = usePathname();
  const base = `/pages/dashboards/organization/${orgId}`;
  const items = [
    { href: "/pages/dashboards/organization", label: "نظرة عامة" },
    { href: `${base}/inventory`, label: "المخزون" },
    { href: `${base}/requests`, label: "الطلبات" },
    { href: `${base}/campaigns`, label: "الحملات" },
    { href: `${base}/settings`, label: "الإعدادات" },
  ];

  return (
    <aside className="w-full md:w-64 bg-white border-l md:border-l-0 md:border-r border-[#E8ECF3] p-4 md:min-h-[calc(100vh-56px)]">
      <nav className="space-y-1">
        {items.map((it) => {
          const active = pathname === it.href;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`block rounded-lg px-3 py-2 text-sm ${
                active
                  ? "bg-[#EFF5FF] text-[#1D64D8] font-semibold"
                  : "text-[#374151] hover:bg-[#F3F5F9]"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
