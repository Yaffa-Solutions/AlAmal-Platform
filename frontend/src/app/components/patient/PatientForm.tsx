'use client';

import {
  Upload,
  Minus,
  Plus,
  User,
  Activity,
  FileText,
  Phone,
} from 'lucide-react';
import { Toaster } from 'sonner';

import {usePatientForm} from '@/app/hooks/patient-hook';

export default function PatientForm() {
  const {
    disabilityPercentage,
    setDisabilityPercentage,
    medicalReport,
    setMedicalReport,
    register,
    handleSubmit,
    errors,
    setValue,
    onSubmit,
    prosthetic,
    dropdownOpen , cities ,  genders , setDropdownOpen , selectedCity , selectedGender
     , selectedProsthetic , setSelectedCity , setSelectedGender , setSelectedProsthetic , submitting
  } = usePatientForm();



  return (
    <div className="min-h-screen  from-blue-50 to-purple-50 p-4" dir="rtl">
      <div className="max-w-2xl mx-auto">
       
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6">
            <h2 className="text-2xl text-center text-blue-600 font-semibold">بيانات المريض</h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              يُرجى ملئ البيانات التالية بدقة
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                البيانات الشخصية
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-right text-sm text-gray-700">الاسم الكامل</label>
                  <input
                    type="text"
                    placeholder="مثال: أحمد محمد علي"
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-right"
                    {...register('name')}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="text-right text-sm text-gray-700">العمر</label>
                  <input
                    type="number"
                    placeholder="25"
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-right"
                    {...register('age',{valueAsNumber:true})}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age.message}</p>}
                </div>

                <div className="relative">
                  <label className="text-right text-sm text-gray-700">الجنس</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="اختر الجنس"
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                    {...register('gender')}
                    value={selectedGender}
                    onClick={() =>
                      setDropdownOpen({ ...dropdownOpen, gender: !dropdownOpen.gender })
                    }
                  />
                  {dropdownOpen.gender && (
                    <div className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-lg shadow-lg z-50">
                      {genders.map((g) => (
                        <div
                          key={g}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedGender(g);
                            setValue('gender', g === 'ذكر'?'MALE':'FEMALE' , { shouldValidate: true });
                            setDropdownOpen({ ...dropdownOpen, gender: false });
                          }}
                        >
                          {g}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
                </div>

                <div className="relative">
                  <label className="text-right text-sm text-gray-700">المدينة</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="اختر المدينة"
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                    {...register('city')}
                    value={selectedCity}
                    onClick={() =>
                      setDropdownOpen({ ...dropdownOpen, city: !dropdownOpen.city })
                    }
                  />
                  {dropdownOpen.city && (
                    <div className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-lg shadow-lg z-50">
                      {cities.map((c) => (
                        <div
                          key={c}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedCity(c);
                            setValue('city', c , { shouldValidate: true });
                            setDropdownOpen({ ...dropdownOpen, city: false  });
                          }}
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-green-600" />
                </div>
                المعلومات الطبية
              </h3>
              <div className="space-y-4">
                                    <label className="text-right text-sm text-gray-700">نسبة الإعاقة </label>

                <div className="flex items-center gap-2 mt-1">

                  <button
                    type="button"
                    className="h-7 w-7 border rounded flex items-center justify-center hover:bg-gray-100"
                    onClick={() => {
                      const newValue = Math.max(0, disabilityPercentage - 1);
                      setDisabilityPercentage(newValue);
                      setValue('disability_percentage', newValue, { shouldValidate: true });
                    }}
                  >
                    <Minus className="h-3 w-3" />
                  </button>

                  <input
                    type="number"
                    min={0}
                    max={100}
                    className="flex-1 text-center border rounded-lg py-1.5"
                    {...register('disability_percentage' , {valueAsNumber:true})}
                    value={disabilityPercentage}
                    onChange={(e) => {
                      let val = Number(e.target.value);
                      if (val < 0) val = 0;
                      if (val > 100) val = 100;
                      setDisabilityPercentage(val);
                      setValue('disability_percentage', val, { shouldValidate: true });
                    }}
                  />

                  <button
                    type="button"
                    className="h-7 w-7 border rounded flex items-center justify-center hover:bg-gray-100"
                    onClick={() => {
                      const newValue = Math.min(100, disabilityPercentage + 1);
                      setDisabilityPercentage(newValue);
                      setValue('disability_percentage', newValue, { shouldValidate: true });
                    }}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                {errors.disability_percentage && (
                  <p className="text-red-500 text-xs mt-1">{errors.disability_percentage.message}</p>
                )}

                <div className="relative">
                  <label className="text-right text-sm text-gray-700">نوع الطرف الصناعي</label>
                  <input
                    type="text"
                    readOnly
                    placeholder="اختر"
                    {...register('disability_type')}
                    className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                    value={
                      selectedProsthetic
                        ? selectedProsthetic === 'RIGHT_ARM' ? 'طرف علوي (ذراع يمين)' :
                          selectedProsthetic === 'LEFT_ARM' ? 'طرف علوي (ذراع يسار)' :
                          selectedProsthetic === 'RIGHT_HAND' ? 'طرف علوي (يد يمين)' :
                          selectedProsthetic === 'LEFT_HAND' ? 'طرف علوي (يد يسار)' :
                          selectedProsthetic === 'RIGHT_LEG' ? 'طرف سفلي (رجل يمين)' :
                          selectedProsthetic === 'LEFT_LEG' ? 'طرف سفلي (رجل يسار)' :
                          selectedProsthetic === 'RIGHT_FOOT' ? 'طرف سفلي (قدم يمين)' :
                          selectedProsthetic === 'LEFT_FOOT' ? 'طرف سفلي (قدم يسار)' : ''
                        : ''
                    }
                    onClick={() =>
                      setDropdownOpen({ ...dropdownOpen, prosthetic: !dropdownOpen.prosthetic })
                    }
                  />
                  {dropdownOpen.prosthetic && (
                    <div className="absolute mt-1 w-full max-h-40 overflow-y-auto bg-white border rounded-lg shadow-lg z-50">
                      {prosthetic.map((type) => (
                        <div
                          key={type}
                          className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                          onClick={() => {
                            setSelectedProsthetic(type);
                            setValue('disability_type', type , { shouldValidate: true });
                            setDropdownOpen({ ...dropdownOpen, prosthetic: false });
                          }}
                        >
                          {type === 'RIGHT_ARM' && 'طرف علوي (ذراع يمين)'}
                          {type === 'LEFT_ARM' && 'طرف علوي (ذراع يسار)'}
                          {type === 'RIGHT_HAND' && 'طرف علوي (يد يمين)'}
                          {type === 'LEFT_HAND' && 'طرف علوي (يد يسار)'}
                          {type === 'RIGHT_LEG' && 'طرف سفلي (رجل يمين)'}
                          {type === 'LEFT_LEG' && 'طرف سفلي (رجل يسار)'}
                          {type === 'RIGHT_FOOT' && 'طرف سفلي (قدم يمين)'}
                          {type === 'LEFT_FOOT' && 'طرف سفلي (قدم يسار)'}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.disability_type && (
                    <p className="text-red-500 text-xs mt-1">{errors.disability_type.message}</p>
                  )}
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-yellow-600" />
                </div>
                التقرير الطبي
              </h3>

               <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50/30 text-center">
    <input
      type="file"
      accept="application/pdf,image/*"
      className="hidden"
      id="medicalReport"
      {...register('medical_reports_url')}
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) {
          setMedicalReport(file);
          setValue('medical_reports_url', file, { shouldValidate: true });
        }
      }}
    />

    <label
      htmlFor="medicalReport"
      className="cursor-pointer flex flex-col items-center gap-3"
    >
      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
        <Upload className="h-6 w-6 text-blue-600" />
      </div>

      <p className="text-sm font-medium text-gray-700">
        {medicalReport ? (
          <>
            <span className="text-blue-700 font-semibold">{medicalReport.name}</span>
            <span className="block text-xs text-gray-500 mt-1">
              {Math.round(medicalReport.size / 1024)} KB
            </span>
          </>
        ) : (
          'اسحب الملف هنا أو اضغط للتحميل'
        )}
      </p>

      <p className="text-xs text-gray-500 mt-1">
        يُرجى دمج جميع التقارير في ملف واحد بصيغة PDF أو رفع صورة واحدة (بحد أقصى 5MB)
      </p>
    </label>

    {errors.medical_reports_url && (
      <p className="text-red-500 text-xs mt-3">
        {errors.medical_reports_url.message}
      </p>
    )}
  </div>
            </section>
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4 flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Phone className="h-4 w-4 text-orange-600" />
                </div>
                معلومات التواصل
              </h3>
              <div>
                <input
                  type="text"
                  placeholder="+970 5x xxx xxx"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-right"
                  {...register('Phone')}
                />
                {errors.Phone && <p className="text-red-500 text-xs mt-1">{errors.Phone.message}</p>}
              </div>
            </section>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 text-lg rounded-lg"
            >
            {submitting ? 'جار الإرسال ... ': 'إرسال الطلب'}
            </button>

            <p className="text-center text-xs text-blue-600">
              معلوماتك محمية ومشفرة، سنستخدم فقط للتواصل معك بشأن طلبك
            </p>
          </form>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
