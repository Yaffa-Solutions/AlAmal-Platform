'use client';
import { Info, Phone } from 'lucide-react';
import { donorSchema, DonorFormData } from '@/app/validation/donor';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDonorForm } from '@/app/hooks/donorForm';

export default function DonorForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonorFormData>({
    resolver: zodResolver(donorSchema),
  });
  const { loading, error, handleSubmitForm } = useDonorForm();

  return (
    <div
      dir="rtl"
      className="font-sans bg-white py-10 px-4 min-h-screen overflow-y-auto mt-4"
    >
      <div className="w-xl  bg-white rounded-3xl shadow-lg shadow-gray-200 border border-none">
        <div className="bg-[#EFF5FF] rounded-t-3xl py-4">
          <h1 className="text-center text-[28px] font-extrabold text-[#1D64D8] mb-2">
            بيانات المتبرع
          </h1>
          <p className="text-center text-[#4B5563] text-[18px]">
            يرجى تعبئة البيانات التالية
          </p>
        </div>

        <form
          className="space-y-8 p-8"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#4B5563] flex items-center gap-2">
              <Info className="text-[#7057FF] bg-[#F3F2FF] p-3 rounded-full w-10 h-10" />
              البيانات الشخصية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  الاسم الكامل
                </label>
                <input
                  {...register('name')}
                  className={`w-full border rounded-xl px-3 py-3 focus:ring-2 outline-none text-gray-700 ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-[#E4E9F2] focus:ring-[#4B6BFB]/20'
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  الجنس
                </label>
                <select
                  {...register('gender')}
                  className={`w-full border rounded-xl px-3 py-2 focus:ring-2 outline-none text-gray-700 ${
                    errors.gender
                      ? 'border-red-500'
                      : 'border-[#E4E9F2] focus:ring-[#4B6BFB]/20'
                  }`}
                  defaultValue=""
                >
                  <option value="" disabled>
                    اختر الجنس
                  </option>
                  <option value="MALE">ذكر</option>
                  <option value="FEMALE">أنثى</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-[14px] text-[#4B5563] mb-1">
                  المدينة
                </label>
                <input
                  {...register('country')}
                  className={`w-full border rounded-xl px-3 py-3 focus:ring-2 outline-none text-gray-700 ${
                    errors.country
                      ? 'border-red-500'
                      : 'border-[#E4E9F2] focus:ring-[#4B6BFB]/20'
                  }`}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[#4B5563] flex items-center gap-2">
              <Phone className="text-[#3B82F6] bg-[#EFF5FF] p-3 rounded-full w-10 h-10" />
              معلومات التواصل
            </h2>

            <div>
              <label className="block text-[14px] text-[#4B5563] mb-1">
                رقم الهاتف
              </label>
              <input
                {...register('phone')}
                placeholder="9705XXXXXXXX"
                className={`w-full border rounded-xl px-3 py-3 focus:ring-2 outline-none text-gray-700 ${
                  errors.phone
                    ? 'border-red-500'
                    : 'border-[#E4E9F2] focus:ring-[#4B6BFB]/20'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </section>

          <div className="flex gap-3 justify-center pt-6">
            <button
              type="submit"
              className="bg-[#3B82F6] text-white px-8 py-2 rounded-xl hover:bg-[#3D5CE0] transition font-medium w-full cursor-pointer"
            >
              {loading && (
                <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent">
                  <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Loading...
                  </span>
                </div>
              )}
              {loading ? 'جاري الإرسال' : 'ارسال الطلب'}
            </button>
            
          </div>
          {error && (
              <p
                className={`text-sm mt-2 ${
                  error.color === 'red' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {error.message}
              </p>
            )}
        </form>
      </div>
    </div>
  );
}
