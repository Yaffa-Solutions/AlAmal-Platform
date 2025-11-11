export default function NewCampaignPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <main dir="rtl" className="space-y-4">
      <h1 className="text-xl font-bold text-[#1A2954]">إضافة حملة جديدة</h1>
      <div className="bg-white border border-[#E8ECF3] rounded-2xl p-6">
        <p className="text-[#6B7280] mb-4">
          نموذج إنشاء حملة سيضاف هنا لاحقاً (عنوان، وصف، المبلغ المستهدف، التواريخ...)
        </p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="border border-[#E8ECF3] rounded-lg px-3 py-2" placeholder="عنوان الحملة" />
          <input className="border border-[#E8ECF3] rounded-lg px-3 py-2" placeholder="المبلغ المستهدف" />
          <textarea className="md:col-span-2 border border-[#E8ECF3] rounded-lg px-3 py-2" placeholder="وصف مختصر" />
          <div className="md:col-span-2 flex gap-3">
            <button type="button" className="border border-[#D0D7E2] text-[#1A2954] px-4 py-2 rounded-lg">إلغاء</button>
            <button type="button" className="bg-[#1D64D8] text-white px-4 py-2 rounded-lg">حفظ</button>
          </div>
        </form>
      </div>
      <p className="text-xs text-[#9CA3AF]">Org ID: {id}</p>
    </main>
  );
}
