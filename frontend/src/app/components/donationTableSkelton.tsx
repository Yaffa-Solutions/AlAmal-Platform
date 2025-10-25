'use client';
import React from 'react';

export default function DonationTableSkeleton() {
  const SkeletonRow = () => (
    <tr>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <td
            key={i}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-right"
          >
            <div className="h-4 bg-gray-300 rounded animate-pulse w-20"></div>
          </td>
        ))}
    </tr>
  );

  return (
    <table className="min-w-full border-collapse">
      <thead className="bg-gray-100 sticky top-0 z-10">
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
        {Array(3)
          .fill(0)
          .map((_, idx) => (
            <SkeletonRow key={idx} />
          ))}
      </tbody>
    </table>
  );
}
