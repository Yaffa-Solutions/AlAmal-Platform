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

  const handleDonate = async (
    data: DonationFormData,
    campaignId: number,
    card: any,
    stripe: any
  ) => {
    setLoading(true);
    setError(null);

    const validation = donationSchema.safeParse(data);
    if (!validation.success) {
      setError({ message: validation.error.issues[0].message, color: 'red' });
      setLoading(false);
      return false;
    }

    const donorId = Number(localStorage.getItem('donorId'));
    if (!donorId) {
      setError({ message: 'تعذر الحصول على بيانات المتبرع', color: 'red' });
      setLoading(false);
      return false;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donor/create-payment`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            donor_id: donorId,
            campaigns_id: campaignId,
            amount: data.amount,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setError({
          message: result.error || 'حدث خطأ أثناء التبرع',
          color: 'red',
        });
        return false;
      }
      const paymentResult = await stripe.confirmCardPayment(
        result.clientSecret,
        {
          payment_method: { card },
        }
      );
      if (paymentResult.error) {
        setError({ message: paymentResult.error.message, color: 'red' });
        return false;
      }
      const createDonationRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/donor/confirm-donation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            donor_id: donorId,
            campaigns_id: campaignId,
            amount: data.amount,
            stripePaymentId: paymentResult.paymentIntent.id,
          }),
        }
      );

      if (!createDonationRes.ok) {
        setError({ message: 'حدث خطأ أثناء تسجيل التبرع', color: 'red' });
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
