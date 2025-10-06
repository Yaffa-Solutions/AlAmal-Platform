'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';
import sendOTP from '../../../utils/otp';
import { loginSchema } from '../../../validation/otp';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSendOTP = async () => {
    setError('');
    const validation = loginSchema.safeParse({ email });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const { status, data } = await sendOTP(email);
      if (status != 200) {
        setError(data.message || 'حدث خطأ في السيرفر');
      } else {
        console.log('تم ارسال رمز التحقق');
        router.push(`/pages/auth/verify?email=${encodeURIComponent(email)}`);
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطا في الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      <Mail className="text-[#3B82F6] bg-blue-100 p-4 rounded-full w-15 h-15" />
      <h1 className="text-black text-xl font-bold "> اهلا بك في منصة الأمل </h1>
      <p className="text-gray-600 text-sm">
        أدخل الايميل الخاص بك لتلقي رمز التحقق{' '}
      </p>
      <div className="flex flex-col items-end text-right">
        <label className="text-gray-600 pb-2">الايميل</label>
        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-86 mb-2 border border-gray-300 rounded-lg p-2 text-black text-right focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
        ></input>
        {error && <p className="text-red-500 text-xs mb-2">{error}</p>}

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className={`w-86 flex items-center justify-center bg-[#3B82F6] text-white font-medium py-2 rounded-lg transition-all duration-200 ${
            loading
              ? 'cursor-not-allowed bg-[#2563EB]/50'
              : 'hover:bg-[#2563EB]'
          }`}
        >
          {loading && (
            <div
              role="status"
              className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
          {loading ? 'جاري الإرسال' : 'إرسال رمز التحقق'}
        </button>
      </div>
    </div>
  );
}
