import { useState } from 'react';
import { useRouter } from 'next/navigation';
import sendOTP from '../utils/otp';
import { loginSchema, otpSchema } from '../validation/otp';

interface ErrorState {
  message: string;
  color: 'red' | 'green';
}

type StepType = 'email' | 'verify';

export const useOTP = (
  email: string,
  code: string[],
  setStep: React.Dispatch<React.SetStateAction<StepType>>,
  inputsRef: React.RefObject<(HTMLInputElement | null)[]>,
  setError: React.Dispatch<React.SetStateAction<ErrorState | null>>
) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    setError(null);
    const validation = loginSchema.safeParse({ email });
    if (!validation.success) {
      setError({ message: validation.error.issues[0].message, color: 'red' });
      return;
    }
    setLoading(true);
    try {
      const { status, data } = await sendOTP(email);
      if (status !== 200) {
        setError({
          message: data.message || 'حدث خطأ في السيرفر',
          color: 'red',
        });
      } else {
        setStep('verify');
        setTimeout(() => inputsRef.current[0]?.focus(), 300);
        setError({
          message: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني',
          color: 'green',
        });
      }
    } catch {
      setError({ message: 'حدث خطأ في الاتصال بالسيرفر', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    try {
      setLoading(true);
      setError(null);
      const { status } = await sendOTP(email);
      if (status !== 200) {
        setError({ message: 'فشل إرسال الكود', color: 'red' });
      } else {
        setError({ message: 'تم إرسال الرمز مجددًا', color: 'green' });
      }
    } catch {
      setError({ message: 'حدث خطأ في الاتصال بالسيرفر', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    const otp = code.join('');
    const validation = otpSchema.safeParse({ code: otp });
    if (!validation.success) {
      setError({ message: validation.error.issues[0].message, color: 'red' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/otp/verify`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: email, code: otp }),
          credentials: 'include',
        }
      );
      const data = await res.json();
      if (res.status !== 200) {
        setError({ message: 'الكود غير صحيح أو مستخدم من قبل', color: 'red' });
        return;
      }
      localStorage.setItem('id', data.id?.toString() || '');
      localStorage.setItem('role', data.role || '');
      localStorage.setItem('username', data.username || '');
      localStorage.setItem('status', data.status || '');
      if (data.status === 'PENDING' && !data.role)
        router.push('/pages/auth/choose-role');
      else if (data.status === 'PENDING' && data.role)
        router.push(`/pages/forms/${data.role.toLowerCase()}`);
      else if (data.status === 'ACTIVE')
        router.push(`/dashboard/${data.role?.toLowerCase() || ''}`);
    } catch {
      setError({ message: 'حدث خطأ في الاتصال بالسيرفر', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleSendOTP, handleVerify, resendOTP };
};
