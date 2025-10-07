"use client";
import useOrganizationForm from "@/app/hooks/organization-hook";
import type { Address } from "@/types/organization";
import { useEffect, useMemo } from "react";

export default function OrganizationForm() {
  const {
    name,
    phone,
    type,
    address,
    registrationCertificate,
    professionalLicense,
    submitting,
    error,
    success,
    saveDraftLocally,
    setName,
    setPhone,
    setType,
    setAddress,
    setRegistrationCertificate,
    setProfessionalLicense,
    onSubmit,
  } = useOrganizationForm();

  const registrationPreview = useMemo(() => {
    if (
      registrationCertificate &&
      registrationCertificate.type?.startsWith("image/")
    ) {
      return URL.createObjectURL(registrationCertificate);
    }
    return null;
  }, [registrationCertificate]);

  const professionalPreview = useMemo(() => {
    if (professionalLicense && professionalLicense.type?.startsWith("image/")) {
      return URL.createObjectURL(professionalLicense);
    }
    return null;
  }, [professionalLicense]);

  useEffect(() => {
    return () => {
      if (registrationPreview) URL.revokeObjectURL(registrationPreview);
    };
  }, [registrationPreview]);

  useEffect(() => {
    return () => {
      if (professionalPreview) URL.revokeObjectURL(professionalPreview);
    };
  }, [professionalPreview]);

  return (
    <div
      dir="rtl"
      className="font-sans min-h-screen bg-gradient-to-b from-[#f5f8ff] to-[#f8faff] py-10 px-4 "
    >
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg shadow-blue-200  border border-[#E8ECF3]">
        <div className=" bg-[#EFF5FF]  py-4 ">
          <h1 className="text-center text-[28px]  font-extrabold text-[#1D64D8] mb-2">
            معلومات المؤسسة
          </h1>
          <p className="text-center text-[#4B5563] text-[18px]">
            يرجى مراجعة جميع البيانات المدخلة بدقة للمراجعة والموافقة
          </p>
        </div>

        <form onSubmit={onSubmit} className="relative space-y-8 p-8">
          <section className="space-y-4">
            <h2 className="text-[24px] mb-4 font-semibold text-[#4B5563] flex items-center gap-2">
              <span className="text-[#4B6BFB] text-lg">•</span> المعلومات
              الأساسية
            </h2>
            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                اسم المؤسسة
              </label>
              <input
                type="text"
                className="w-full border border-[#E4E9F2] rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  نوع المؤسسة
                </label>
                <select
                  className="w-full border border-[#E4E9F2] rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  required
                >
                  <option value="">اختر نوع المؤسسة</option>
                  <option value="hospital">مستشفى</option>
                  <option value="charity">جمعية خيرية</option>
                  <option value="clinic">مركز طبي</option>
                </select>
              </div>

              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  رقم الهاتف المؤسسي
                </label>
                <input
                  type="tel"
                  className="w-full border border-[#E4E9F2] rounded-xl px-3 py-2 text-gray-700 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className=" text-[24px] font-semibold text-[#4B5563]  flex items-center gap-2 mb-4">
              <span className="text-green-500 text-lg">•</span> معلومات العنوان
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  المدينة
                </label>
                <input
                  placeholder="المدينة"
                  className="border w-full border-[#E4E9F2] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                  value={address.city || ""}
                  onChange={(e) =>
                    setAddress((a: Address) => ({ ...a, city: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  المحافظة
                </label>
                <input
                  placeholder="المحافظة"
                  className="border w-full border-[#E4E9F2] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                  value={address.state || ""}
                  onChange={(e) =>
                    setAddress((a: Address) => ({
                      ...a,
                      state: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-4 w-full">
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  الشارع والعنوان التفصيلي
                </label>
                <input
                  placeholder="الشارع والعنوان التفصيلي"
                  className=" w-full border border-[#E4E9F2] rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#4B6BFB]/20 outline-none"
                  value={address.street || ""}
                  onChange={(e) =>
                    setAddress((a: Address) => ({
                      ...a,
                      street: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-[24px] font-semibold text-[#4B5563] flex items-center gap-2">
              <span className="text-yellow-500 text-lg">•</span> الوثائق
              المطلوبة
            </h2>
            <label className="text-sm text-[#1A2954] font-medium">
              شهادة التسجيل
            </label>
            <div className="border-2 flex flex-col items-center justify-center space-y-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-300 transition">
              <div className="w-10 h-10 flex items-center justify-center bg-[#EEF2FF] rounded-full text-[#4B6BFB] text-xl">
                📤
              </div>
              <input
                id="registrationFile"
                type="file"
                accept=".pdf,.doc,.docx,image/*"
                className="hidden"
                onChange={(e) =>
                  setRegistrationCertificate(e.target.files?.[0] || null)
                }
              />
              <label
                htmlFor="registrationFile"
                className="cursor-pointer bg-[#4B6BFB] text-white px-4 py-2 rounded-lg hover:bg-[#3d5ce0] transition text-sm"
              >
                اختر الملف 📄
              </label>

              {registrationCertificate && (
                <div className="mt-2">
                  {registrationPreview ? (
                    <img
                      src={registrationPreview}
                      alt="معاينة شهادة التسجيل"
                      className="mx-auto max-h-48 rounded-lg border border-gray-200"
                    />
                  ) : (
                    <p className="text-sm text-gray-500">
                      {registrationCertificate.name}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label className="text-sm text-[#1A2954] font-medium">
                ترخيص المهن
              </label>

              <div className="border-2 border-dashed border-[#D0D7E2] rounded-2xl p-6 text-center hover:border-[#4B6BFB] transition bg-[#FAFBFF]">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#EEF2FF] rounded-full text-[#4B6BFB] text-xl">
                    📤
                  </div>

                  <input
                    id="professionalLicense"
                    type="file"
                    accept=".pdf,.doc,.docx,image/*"
                    onChange={(e) =>
                      setProfessionalLicense(e.target.files?.[0] || null)
                    }
                    required
                    className="hidden"
                  />

                  <label
                    htmlFor="professionalLicense"
                    className="cursor-pointer bg-[#4B6BFB] text-white px-4 py-2 rounded-lg hover:bg-[#3d5ce0] transition text-sm"
                  >
                    اختر الملف 📄
                  </label>

                  {professionalLicense && (
                    <div className="mt-2">
                      {professionalPreview ? (
                        <img
                          src={professionalPreview}
                          alt="معاينة ترخيص المهن"
                          className="mx-auto max-h-48 rounded-lg border border-gray-200"
                        />
                      ) : (
                        <p className="text-xs text-gray-500">
                          {professionalLicense.name}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">
              تم إنشاء المؤسسة بنجاح برقم {success.id ?? "(غير معروف)"}
            </div>
          )}

          <div className="flex gap-3 justify-center pt-6">
            <button
              type="button"
              onClick={saveDraftLocally}
              className="border border-[#D0D7E2] text-[#1A2954] px-8 py-2 rounded-xl hover:bg-[#F3F5F9] transition font-medium"
            >
              حفظ كمسودة
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#4B6BFB] text-white px-8 py-2 rounded-xl hover:bg-[#3D5CE0] transition font-medium disabled:opacity-60"
            >
              {submitting ? "جاري الإرسال..." : "إرسال للمراجعة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
