return (
  <div
    dir="rtl"
    className="min-h-screen bg-gray-50 flex flex-col items-center py-10"
  >
    <div className="text-blue-700 font-semibold text-lg mb-6">منصة الأمل</div>

    <div className="w-full max-w-xl bg-white shadow-md rounded-2xl p-6 border border-gray-100">
      <h2 className="text-center text-xl font-bold text-blue-700 mb-2">
        معلومات المؤسسة
      </h2>
      <p className="text-center text-gray-500 text-sm mb-6">
        يرجى ملء جميع البيانات المطلوبة بدقة للمراجعة والموافقة
      </p>

      {/* المعلومات الأساسية */}
      <section className="mb-6">
        <h3 className="flex items-center gap-2 text-blue-800 font-semibold text-base mb-3">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
          المعلومات الأساسية
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">
              اسم المؤسسة
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              رقم الهاتف الرئيسي
            </label>
            <div className="flex">
              <select className="border rounded-s-lg px-3 py-2 bg-gray-50">
                <option>+970</option>
                <option>+972</option>
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 border border-s-0 rounded-e-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">
              نوع المؤسسة
            </label>
            <select
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">اختر نوع المؤسسة</option>
              <option>مستشفى</option>
              <option>جمعية خيرية</option>
              <option>مركز طبي</option>
            </select>
          </div>
        </div>
      </section>

      {/* معلومات العنوان */}
      <section className="mb-6">
        <h3 className="flex items-center gap-2 text-green-700 font-semibold text-base mb-3">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          معلومات العنوان
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-1">المدينة</label>
            <select
              value={address.city || ""}
              onChange={(e) =>
                setAddress((a) => ({ ...a, city: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">اختر المدينة</option>
              <option>غزة</option>
              <option>دير البلح</option>
              <option>خان يونس</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">الحي</label>
            <select
              value={address.region || ""}
              onChange={(e) =>
                setAddress((a) => ({ ...a, region: e.target.value }))
              }
              className="w-full border rounded-lg px-3 py-2 bg-gray-50 focus:ring-2 focus:ring-green-400 outline-none"
            >
              <option value="">اختر الحي</option>
              <option>النصر</option>
              <option>النصيرات،</option>
              <option>الشمال</option>
              <option>الرمال</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-1">
              الشارع والعنوان التفصيلي
            </label>
            <input
              type="text"
              value={address.street || ""}
              onChange={(e) =>
                setAddress((a) => ({ ...a, street: e.target.value }))
              }
              placeholder="شارع الملك فهد، مقابل مستشفى النصيرات، مبنى رقم 123"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 outline-none"
            />
          </div>
        </div>
      </section>

      {/* الوثائق المطلوبة */}
      <section className="mb-6">
        <h3 className="flex items-center gap-2 text-yellow-700 font-semibold text-base mb-3">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          الوثائق المطلوبة
        </h3>

        <div className="space-y-4">
          {[
            { label: "شهادة التسجيل", field: "registrationFile" },
            { label: "ترخيص مزاولة المهنة", field: "licenseFile" },
            { label: "الهوية أو الوثيقة التعريفية", field: "idFile" },
          ].map(({ label, field }) => (
            <div
              key={field}
              className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-gray-50 transition"
            >
              <p className="text-gray-700 mb-2">{label}</p>
              <input
                type="file"
                accept=".pdf,image/*"
                onChange={(e) =>
                  handleChange(field, e.target.files?.[0] || null)
                }
                className="mx-auto"
              />
            </div>
          ))}
        </div>
      </section>

      {/* الموافقة والإرسال */}
      <div className="flex items-center gap-2 mb-6">
        <input
          type="checkbox"
          checked={form.agree}
          onChange={(e) => handleChange("agree", e.target.checked)}
        />
        <p className="text-sm text-gray-700">
          أوافق على{" "}
          <a href="#" className="text-blue-600 underline">
            الشروط والأحكام
          </a>{" "}
          و{" "}
          <a href="#" className="text-blue-600 underline">
            سياسة الخصوصية
          </a>{" "}
          الخاصة بمنصة الأمل
        </p>
      </div>

      <div className="flex justify-between items-center gap-3">
        <button
          type="button"
          className="border border-blue-500 text-blue-600 rounded-lg px-6 py-2 font-medium hover:bg-blue-50"
        >
          حفظ كمسودة
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg px-6 py-2 font-medium hover:bg-blue-700"
        >
          إرسال للمراجعة
        </button>
      </div>
    </div>
  </div>
);
