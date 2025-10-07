import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full bg-white border-b border-[#E8ECF3] sticky top-0 z-10">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[#1D64D8] font-extrabold text-lg">AlAmal</span>
          <span className="text-[#9CA3AF]">لوحة المؤسسة</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-[#1D64D8] hover:underline">
            الصفحة الرئيسية
          </Link>
          <button className="text-[#6B7280] hover:text-[#1A2954]">تسجيل الخروج</button>
        </div>
      </div>
    </nav>
  );
}
