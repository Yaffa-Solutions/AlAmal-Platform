import type { Organization } from "@/types/organization";

export default function AddressSection({ org }: { org: Organization }) {
  const hasAddress = org.address?.city || org.address?.state || org.address?.street;
  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <h2 className="text-xl font-semibold text-[#1A2954] mb-3">العنوان</h2>
      <div className="text-[#374151]">
        {hasAddress ? (
          <div className="space-y-1">
            <div>المدينة: {org.address.city ?? "-"}</div>
            <div>المحافظة: {org.address.state ?? "-"}</div>
            <div>الشارع: {org.address.street ?? "-"}</div>
          </div>
        ) : (
          <div className="text-[#6B7280]">لا توجد بيانات عنوان</div>
        )}
      </div>
    </section>
  );
}
