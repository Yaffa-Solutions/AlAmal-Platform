'use client';
import React, { useState } from 'react';
import { useMagicLink } from '../../../hooks/useMagicLink';

export default function MagicLinkPage() {
  const [error, setError] = useState<{
    message: string;
    color: 'red' | 'green';
  } | null>(null);

  useMagicLink(setError);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-xl font-bold text-[#3B82F6] mb-4">
        <div className="inline-block h-4 w-4 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent"></div>
        جاري التحقق من الرابط
      </h1>

      {error && (
        <p
          className={`text-sm ${
            error.color === 'red' ? 'text-red-500' : 'text-green-500'
          }`}
        >
          {error.message}
        </p>
      )}
    </div>
  );
}
