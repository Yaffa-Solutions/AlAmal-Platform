import type { Organization } from "@/types/organization";

export default function SummaryWidgets({ org }: { org: Organization }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5 shadow-sm">
        <div className="text-sm text-[#6B7280]">المخزون</div>
        <div className="text-3xl font-extrabold mt-1 text-[#1A2954]">
          {org._count?.inventory ?? 0}
        </div>
        <div className="text-xs text-[#6B7280] mt-1">عناصر الأطراف الصناعية</div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5 shadow-sm">
        <div className="text-sm text-[#6B7280]">الطلبات</div>
        <div className="text-3xl font-extrabold mt-1 text-[#1A2954]">
          {org._count?.requests ?? 0}
        </div>
        <div className="text-xs text-[#6B7280] mt-1">إجمالي الطلبات المرتبطة</div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5 shadow-sm">
        <div className="text-sm text-[#6B7280]">الحملات</div>
        <div className="text-3xl font-extrabold mt-1 text-[#1A2954]">
          {org._count?.campaigns ?? 0}
        </div>
        <div className="text-xs text-[#6B7280] mt-1">الحملات النشطة والمنتهية</div>
      </div>
    </section>
  );
}
