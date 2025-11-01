'use client';
import { useState } from 'react';
import { donationSchema, DonationFormData } from '@/app/validation/donation';

interface ErrorState {
  message: string;
  color: 'red' | 'green';
}

export const useDonationForm = () => {
  const [error, setError] = useState<ErrorState | null>(null);
  const [loading, setLoading] = useState(false);

  const handleDonate = async (data: DonationFormData, campaignId: number) => {
    setLoading(true);
    setError(null);

    const validation = donationSchema.safeParse(data);
    if (!validation.success) {
      setError({ message: validation.error.issues[0].message, color: 'red' });
      setLoading(false);
      return false;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ campaigns_id: campaignId, amount: data.amount }),
      });

      const result = await res.json();

      if (!res.ok) {
        setError({
          message: result.error || 'حدث خطأ أثناء التبرع',
          color: 'red',
        });
        return false;
      }

      setError({ message: 'تم التبرع بنجاح!', color: 'green' });
      return true;
    } catch (err) {
      console.error(err);
      setError({ message: 'تعذر الاتصال بالخادم', color: 'red' });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, setError, handleDonate };
};
