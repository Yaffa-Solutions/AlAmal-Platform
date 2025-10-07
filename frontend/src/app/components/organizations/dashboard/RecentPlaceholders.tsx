export default function RecentPlaceholders() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
        <h3 className="text-lg font-semibold text-[#1A2954]">أحدث عناصر المخزون</h3>
        <p className="text-sm text-[#6B7280] mt-2">سيتم عرض أحدث العناصر هنا.</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
        <h3 className="text-lg font-semibold text-[#1A2954]">أحدث الطلبات</h3>
        <p className="text-sm text-[#6B7280] mt-2">سيتم عرض أحدث الطلبات هنا.</p>
      </div>
      <div className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
        <h3 className="text-lg font-semibold text-[#1A2954]">أحدث الحملات</h3>
        <p className="text-sm text-[#6B7280] mt-2">سيتم عرض أحدث الحملات هنا.</p>
      </div>
    </section>
  );
}
