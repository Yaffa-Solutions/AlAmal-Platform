"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Props = { orgId: string; orgName?: string };

export default function NavBar({ orgId, orgName = "المؤسسة" }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-[#E8ECF3] sticky top-0 z-10">
      <div
        className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between"
        dir="rtl"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#EFF5FF] text-[#1D64D8] flex items-center justify-center">
            🏥
          </div>
          <div className="flex flex-col leading-4">
            <span className="text-sm text-[#6B7280]">المؤسسة</span>
            <span className="text-[#1A2954] font-semibold">{orgName}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm" dir="ltr">
          <button
            aria-label="Notifications"
            className="w-9 h-9 rounded-full border border-[#E8ECF3] flex items-center justify-center text-[#1A2954] hover:bg-[#F3F5F9]"
            title="Notifications"
          >
            🔔
          </button>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 px-3 h-9 rounded-full border border-[#E8ECF3] hover:bg-[#F3F5F9]"
            >
              <span className="w-6 h-6 rounded-full bg-[#EEF2FF] text-[#1D64D8] flex items-center justify-center">
                👤
              </span>
              <span className="hidden sm:inline text-[#1A2954]">القائمة</span>
            </button>
            {open && (
              <div
                className="absolute left-0 mt-2 w-56 bg-white border border-[#E8ECF3] rounded-xl shadow-lg p-2"
                dir="rtl"
              >
                <div className="px-3 py-2 text-sm text-[#374151]">
                  مرحباً، <span className="font-semibold">{orgName}</span>
                </div>
                <div className="h-px bg-[#E8ECF3] my-1" />
                <Link
                  href={`/pages/organizations/${orgId}/dashboard`}
                  className="block px-3 py-2 rounded-lg text-sm text-[#1D64D8] hover:bg-[#F3F5F9]"
                >
                  الذهاب للوحة المؤسسة
                </Link>
                <button
                  className="w-full text-right px-3 py-2 rounded-lg text-sm text-[#DC2626] hover:bg-[#FEF2F2]"
                  onClick={() => {
                    /* TODO: wire real logout */
                  }}
                >
                  تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
