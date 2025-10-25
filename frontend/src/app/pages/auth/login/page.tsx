'use client';
import React, { useState, useRef } from 'react';
import { useOTP } from '../../../hooks/useOTP';
import { useMagicLink } from '../../../hooks/useMagicLink';
import { Mail, ShieldCheck } from 'lucide-react';
import ResendOTPButton from '../../../components/ResendOTPButton';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<{
    message: string;
    color: 'red' | 'green';
  } | null>(null);
  const [step, setStep] = useState<'email' | 'verify'>('email');
  const [code, setcode] = useState<string[]>(['', '', '', '', '', '']);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const { loading, handleSendOTP, handleVerify, resendOTP } = useOTP(
    email,
    code,
    setStep,
    inputsRef,
    setError
  );

    useMagicLink(setError);


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const val = e.target.value;
    if (!/^[0-9]?$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val;
    setcode(newCode);
    if (error) setError(null);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handelKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
      {step === 'email' ? (
        <>
          <Mail className="text-[#3B82F6] bg-blue-100 p-4 rounded-full w-15 h-15" />
          <h1 className="text-black text-xl font-bold ">
            {' '}
            اهلا بك في منصة الأمل{' '}
          </h1>
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
            {error && (
              <p
                className={`text-xs mb-2 ${
                  error.color === 'red' ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {error.message}
              </p>
            )}
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
        </>
      ) : (
        <>
          <ShieldCheck className="text-[#10B981] bg-blue-100 p-4 rounded-full w-15 h-15" />
          <h1 className="text-black text-xl font-bold "> رمز التحقق</h1>
          <p className="text-gray-600 text-sm">ادخل الرمز المرسل الى</p>
          <span className="text-[#3B82F6] text-xs mb-4"> {email}</span>
          <div className=" flex gap-2">
            {code.map((num, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={num}
                ref={(el) => {
                  inputsRef.current[index] = el;
                }}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handelKey(e, index)}
                className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#10B981] text-black"
              ></input>
            ))}
          </div>

          {error && (
            <p
              className={`text-xs mb-2 ${
                error.color === 'red' ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {error.message}
            </p>
          )}

          <p className="text-xs text-gray-500">لم تستلم الرمز؟</p>
          <ResendOTPButton
            username={email}
            onResend={resendOTP}
            setError={setError}
          />

          <button
            disabled={code.some((num) => num === '')}
            onClick={handleVerify}
            className={`w-86 bg-[#3B82F6] text-white font-medium py-2 rounded-lg hover:bg-[#2563EB] transition-all duration-200
              ${
                code.some((num) => num === '')
                  ? 'bg-gray-300  cursor-not-allowed'
                  : 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
              }
              `}
          >
            {loading && (
              <div
                role="status"
                className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
              </div>
            )}
            {loading ? 'جاري التحقق' : 'تأكيد'}
          </button>
        </>
      )}
    </div>
  );
}
