import type { Organization } from "@/types/organization";

export default function OrgInfo({ org }: { org: Organization }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5">
        <div className="text-sm text-[#6B7280]">اسم المؤسسة</div>
        <div className="text-lg font-semibold mt-1">{org.name}</div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5">
        <div className="text-sm text-[#6B7280]">نوع المؤسسة</div>
        <div className="text-lg font-semibold mt-1">{org.type ?? "-"}</div>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-5">
        <div className="text-sm text-[#6B7280]">رقم الهاتف</div>
        <div className="text-lg font-semibold mt-1">{org.phone ?? "-"}</div>
      </div>
    </section>
  );
}
