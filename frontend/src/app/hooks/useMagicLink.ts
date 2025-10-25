import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ErrorState {
  message: string;
  color: 'red' | 'green';
}

export const useMagicLink = (setError: React.Dispatch<React.SetStateAction<ErrorState | null>>) => {
  const router = useRouter();

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get('token');
    if (!urlToken) return;

    const verifyMagicLink = async (token: string) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/otp/magic-link`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
            credentials: 'include',
          }
        );

        const data = await res.json();

        if (res.status !== 200) {
          setError({
            message: data.message || 'الرابط غير صالح أو منتهي الصلاحية',
            color: 'red',
          });
          return;
        }

        localStorage.setItem('id', data.id?.toString() || '');
        localStorage.setItem('role', data.role || '');
        localStorage.setItem('username', data.username || '');
        localStorage.setItem('status', data.status || '');

        if (data.status === 'PENDING' && !data.role) {
          router.push('/pages/auth/choose-role');
        } else if (data.status === 'PENDING' && data.role) {
          router.push(`/pages/forms/${data.role.toLowerCase()}`);
        } else if (data.status === 'ACTIVE') {
          router.push(`/dashboard/${data.role?.toLowerCase() || ''}`);
        }
      } catch (err) {
        console.error(err);
        setError({ message: 'حدث خطأ في الاتصال بالسيرفر', color: 'red' });
      }
    };

    verifyMagicLink(urlToken);
  }, [router, setError]);
};
