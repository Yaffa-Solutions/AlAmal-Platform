'use client';
import { useEffect, useState } from 'react';

export interface MyDonation {
  amount: number;
  date: string;
  campaign: string;
  organization: string;
  paymentMethod: string;
}

export const useMyDonations = () => {
  const [donations, setDonations] = useState<MyDonation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/donor/my-donations`, {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch donations');
        const data = await res.json();
        setDonations(data.donations);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  return { donations, loading };
};
