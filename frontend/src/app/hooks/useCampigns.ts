import { useEffect, useState } from 'react';

export interface Campaign {
  id: number;
  title: string;
  description: string;
  image: string;
  collected_amount: number;
  target_amount: number;
  status: 'ACTIVE' | 'COMPLETED' | 'CANCELED';
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  phone: string;
}

export const useCampigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/donor/dashboard`,
          {
            method: 'GET',
            credentials: 'include',
          }
        );
        if (!res.ok) throw new Error('فشل في جلب الحملات');
        const data = await res.json();
        setCampaigns(data);
      } catch (err: any) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);
  return { campaigns, loading };
};
