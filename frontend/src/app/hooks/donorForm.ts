import { useState } from 'react';
import { DonorFormData, donorSchema } from '@/app/validation/donor';
import { useRouter } from 'next/navigation';

interface ErrorState {
  message: string;
  color: 'red' | 'green';
}

export const useDonorForm = () => {
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitForm = async (data: DonorFormData) => {
    setLoading(true);
    setError(null);

    const validation = donorSchema.safeParse(data);
    if (!validation.success) {
      setError({ message: validation.error.issues[0].message, color: 'red' });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donor/form`,
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setError({ message: result.error || 'حدث خطأ', color: 'red' });
      } else {
        setError({ message: 'تم إنشاء المتبرع بنجاح', color: 'green' });
        const userString = localStorage.getItem('user');
        if (userString) {
          const userData = JSON.parse(userString);
          userData.status = 'ACTIVE';
          localStorage.setItem('user', JSON.stringify(userData));

        }

        await new Promise((resolve) => setTimeout(resolve, 500));
<<<<<<< HEAD
        router.push('/dashboard');
=======
        router.push('/pages/dashboards/donor');
>>>>>>> f195d7a (add full donor dashboard with campaigns, donations history, logout, and modals)
      }
    } catch (err) {
      setError({ message: 'تعذر الاتصال بالخادم', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, setError, handleSubmitForm };
};
