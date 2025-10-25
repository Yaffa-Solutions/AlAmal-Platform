'use client';
import React from 'react';
import { useMyDonations } from '@/app/hooks/useMyDonations';
import DonationTableSkeleton from '@/app/components/donationTableSkelton';

interface DonationRecord {
  campaign: string;
  date: string;
  amount: number;
  paymentMethod: string;
}


// const fakeDonations: DonationRecord[] = [
//   {
//     campaign: 'حملة الأطراف المتقدمة',
//     date: '9-9-2025',
//     amount: 300,
//     paymentMethod: 'بطاقة ائتمان',
//   },
//   {
//     campaign: 'حملة الأطراف المتقدمة',
//     date: '10-9-2025',
//     amount: 150,
//     paymentMethod: 'PayPal',
//   },
//   {
//     campaign: 'حملة الأطراف المتقدمة',
//     date: '11-9-2025',
//     amount: 500,
//     paymentMethod: 'بطاقة ائتمان',
//   },
  
// ];

export default function MyDonation() {
  const { donations, loading } = useMyDonations();

  return (
    <div className="p-12">
  <h1 className="text-2xl text-right font-bold mb-6 text-gray-800">
    تبرعاتي
  </h1>

  <div className="relative max-h-[450px] overflow-y-auto overflow-x-auto hide-scrollbar rounded-t-2xl ">
     {loading ? (
          <DonationTableSkeleton />
        ) : donations && donations.length > 0 ? (
    <table className="min-w-full border-collapse ">
      <thead className="bg-gray-100 sticky top-0 z-10 ">
        <tr>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            طريقة الدفع
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            المبلغ
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            التاريخ
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            الحملة
          </th>
        </tr>
      </thead>
      <tbody className="bg-white">
        {donations.map((donation, idx) => (
          <tr key={idx}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
              {donation.paymentMethod}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
              {donation.amount} $
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
              {donation.date}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right">
              {donation.campaign}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   ):(
     <div className="text-center py-12 text-gray-500">
            لا توجد تبرعات حتى الآن
          </div>
   )}
  </div>
</div>

  );
}
