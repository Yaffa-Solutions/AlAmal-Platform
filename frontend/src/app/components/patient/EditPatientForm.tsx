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
import {
  PatientRequestDetails,
  usePatientDashboard,
  usePatientForm,
  useUpdatePatientForm,
} from '@/app/hooks/patient-hook';
import { Patient } from '@/types/patient';
import { useEffect } from 'react';

interface OrderEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function EditPatientForm({
  open,
  onOpenChange,
}: OrderEditDialogProps) {
  const { requestDetails, translateDisability } = usePatientDashboard();

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
    dropdownOpen,
    cities,
    genders,
    setDropdownOpen,
    selectedCity,
    selectedGender,
    selectedProsthetic,
    setSelectedCity,
    setSelectedGender,
    setSelectedProsthetic,
    submitting,
    uploadedFileName,
  } = useUpdatePatientForm();

  useEffect(() => {
    if (requestDetails) {
      setValue('name', requestDetails.name || '');
      setValue('age', requestDetails.age || 0);
      setValue('city', requestDetails.city || '');
      setSelectedCity(requestDetails.city || '');
      setValue('gender', requestDetails.gender || '');
      setSelectedGender(requestDetails.gender === 'MALE' ? 'ذكر' : 'أنثى');
      setValue('Phone', requestDetails.Phone || '');
      setValue(
        'disability_percentage',
        requestDetails.disability_percentage || 0
      );
      setDisabilityPercentage(requestDetails.disability_percentage || 0);
      setValue('disability_type', requestDetails.disability_type || null);
      setSelectedProsthetic(requestDetails.disability_type || '');
      setMedicalReport(null);
    }
  }, [requestDetails]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      dir="rtl"
    >
      <div className="bg-white w-1/2 max-w-[700px] max-h-[85vh] overflow-y-auto rounded-xl shadow-xl p-8 relative">
        <button
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          onClick={() => onOpenChange(false)}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-start mb-8">
          تعديل الطلب
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-8"
        >
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span>البيانات الشخصية</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">الاسم الكامل</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-right"
                  {...register('name')}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message?.toString()}
                  </p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-600">العمر</label>
                <input
                  type="number"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-right"
                  {...register('age', { valueAsNumber: true })}
                />
                {errors.age && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age.message?.toString()}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="text-sm text-gray-600">المدينة</label>
                <input
                  type="text"
                  readOnly
                  value={selectedCity}
                  placeholder="اختر المدينة"
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                  onClick={() =>
                    setDropdownOpen({
                      ...dropdownOpen,
                      city: !dropdownOpen.city,
                    })
                  }
                />
                {dropdownOpen.city && (
                  <div className="absolute bg-white border rounded-lg shadow-lg w-[260px] mt-1 z-50 max-h-60 overflow-y-auto">
                    {cities.map((c) => (
                      <div
                        key={c}
                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedCity(c);
                          setValue('city', c, { shouldValidate: true });
                          setDropdownOpen({ ...dropdownOpen, city: false });
                        }}
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                )}
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message?.toString()}
                  </p>
                )}
              </div>
              <div className="relative">
                <label className="text-sm text-gray-600">الجنس</label>
                <input
                  type="text"
                  readOnly
                  placeholder="اختر الجنس"
                  value={selectedGender}
                  className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                  onClick={() =>
                    setDropdownOpen({
                      ...dropdownOpen,
                      gender: !dropdownOpen.gender,
                    })
                  }
                />
                {dropdownOpen.gender && (
                  <div className="absolute bg-white border rounded-lg shadow-lg w-[260px] mt-1 z-50 max-h-60 overflow-y-auto">
                    {genders.map((g) => (
                      <div
                        key={g}
                        className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                        onClick={() => {
                          setSelectedGender(g);
                          setValue('gender', g === 'ذكر' ? 'MALE' : 'FEMALE', {
                            shouldValidate: true,
                          });
                          setDropdownOpen({ ...dropdownOpen, gender: false });
                        }}
                      >
                        {g}
                      </div>
                    ))}
                  </div>
                )}
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message?.toString()}
                  </p>
                )}
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <span>المعلومات الطبية</span>
            </h3>

            <label className="text-sm text-gray-600">نسبة الإعاقة</label>
            <div className="flex items-center gap-2 mt-1">
              <button
                type="button"
                className="h-7 w-7 border rounded flex items-center justify-center hover:bg-gray-100"
                onClick={() => {
                  const newValue = Math.max(0, disabilityPercentage - 1);
                  setDisabilityPercentage(newValue);
                  setValue('disability_percentage', newValue, {
                    shouldValidate: true,
                  });
                }}
              >
                <Minus className="h-3 w-3" />
              </button>
              <input
                type="number"
                min={0}
                max={100}
                className="flex-1 text-center border rounded-lg py-1.5"
                {...register('disability_percentage', { valueAsNumber: true })}
                onChange={(e) => {
                  const val = Math.min(
                    100,
                    Math.max(0, Number(e.target.value))
                  );
                  setDisabilityPercentage(val);
                  setValue('disability_percentage', val, {
                    shouldValidate: true,
                  });
                }}
              />
              <button
                type="button"
                className="h-7 w-7 border rounded flex items-center justify-center hover:bg-gray-100"
                onClick={() => {
                  const newValue = Math.min(100, disabilityPercentage + 1);
                  setDisabilityPercentage(newValue);
                  setValue('disability_percentage', newValue, {
                    shouldValidate: true,
                  });
                }}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
            {errors.disability_percentage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.disability_percentage.message?.toString()}
              </p>
            )}

            <div className="relative mt-4">
              <label className="text-sm text-gray-600">نوع الطرف المطلوب</label>
              <input
                type="text"
                readOnly
                placeholder="اختر نوع الطرف"
                value={translateDisability(selectedProsthetic) || ''}
                className="mt-1 w-full border rounded-lg px-3 py-2 text-right cursor-pointer"
                onClick={() =>
                  setDropdownOpen({
                    ...dropdownOpen,
                    prosthetic: !dropdownOpen.prosthetic,
                  })
                }
              />
              {dropdownOpen.prosthetic && (
                <div className="absolute bg-white border rounded-lg shadow-lg left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto">
                  {prosthetic.map((type) => (
                    <div
                      key={type}
                      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setSelectedProsthetic(type);
                        setValue('disability_type', type, {
                          shouldValidate: true,
                        });
                        setDropdownOpen({
                          ...dropdownOpen,
                          prosthetic: false,
                        });
                      }}
                    >
                      {translateDisability(type)}
                    </div>
                  ))}
                </div>
              )}
              {errors.disability_type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.disability_type.message?.toString()}
                </p>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-yellow-100 flex items-center justify-center">
                <FileText className="h-4 w-4 text-yellow-600" />
              </div>
              <span>التقرير الطبي</span>
            </h3>

            <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 bg-blue-50/30 text-center">
              <input
                type="file"
                accept="application/pdf,image/*"
                className="hidden"
                id="medicalReport"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMedicalReport(file);
                    setValue('medical_reports_url', file, {
                      shouldValidate: true,
                    });
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
                <p className="text-sm text-gray-700">
                  {medicalReport?.name
                    ? medicalReport.name
                    : uploadedFileName
                    ? uploadedFileName
                    : requestDetails?.medical_reports_url
                    ? requestDetails.medical_reports_url.split('/').pop()
                    : 'اسحب الملف هنا أو اضغط للتحميل'}
                </p>
              </label>
              {errors.medical_reports_url && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.medical_reports_url.message?.toString()}
                </p>
              )}
            </div>
          </section>
          <section>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <Phone className="h-4 w-4 text-orange-600" />
              </div>
              <span>معلومات التواصل</span>
            </h3>
            <input
              type="text"
              placeholder="+970 56 595 2525"
              className="w-full border rounded-lg px-3 py-2 text-right"
              {...register('Phone')}
            />
            {errors.Phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.Phone.message?.toString()}
              </p>
            )}
          </section>
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700"
            >
              {submitting ? 'جارٍ الحفظ...' : 'حفظ التعديلات'}
            </button>
          </div>
        </form>

        <Toaster />
      </div>
    </div>
  );
}
