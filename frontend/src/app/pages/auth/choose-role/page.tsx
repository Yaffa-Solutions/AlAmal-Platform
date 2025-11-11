'use client';

import React, { useState } from 'react';
import { User, Building, Heart } from 'lucide-react';
import RoleCard from '../../../components/RoleCard';
import { useRouter } from 'next/navigation';

export default function ChooseRole() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  type RoleType = 'PATIENT' | 'ORGANIZATION' | 'DONOR';

  const handleChooseRole = async (role: RoleType) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/roles/assign-role`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ role }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'حدث خطأ أثناء تعيين الدور');
        return;
      }

      localStorage.setItem('role', role);

      if (role === 'PATIENT') {
        router.push('/pages/forms/patient');
      } else if (role === 'ORGANIZATION') {
        router.push('/pages/forms/organization');
      } else if (role === 'DONOR') {
        router.push('/pages/forms/donor');
      }
    } catch (err) {
      console.error(err);
      setError('فشل الاتصال بالسيرفر');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen">
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain pointer-events-none"
        style={{
          backgroundImage: "url('/Background.svg')",
          opacity: 0.15,
          backgroundSize: '100%',
        }}
      ></div>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        <div className="relative z-10 flex flex-col items-center text-center gap-4">
          <h1 className="text-black text-3xl font-bold">
            اهلا بك في منصة الأمل
          </h1>
          <p className="text-gray-600 text-sm">
            قبل ما نكمل رحلتك معنا، اختار نوع حسابك عشان نقدر نوجّهك للتجربة
            اللي بتناسبك
          </p>
        </div>

        <div className="relative z-10 flex gap-6 mt-6 justify-center flex-wrap flex-row-reverse">
          <RoleCard
            icon={<User size={32} />}
            title="مريض"
            description="أحتاج الى طرف صناعي او مساعدة طبية "
            color="#7057FF"
            onClick={() => handleChooseRole('PATIENT')}
          />
          <RoleCard
            icon={<Building size={32} />}
            title="مؤسسة"
            description="مؤسسة صحية او خيرية تقدم الخدمات"
            color="#4CAF50"
            onClick={() => handleChooseRole('ORGANIZATION')}
          />
          <RoleCard
            icon={<Heart size={32} />}
            title="متبرع"
            description="أريد المساهمة في مساعدة المحتاجين"
            color="#EF4444"
            onClick={() => handleChooseRole('DONOR')}
          />
        </div>
      </div>
      {loading && <p className="text-blue-600 mt-4">جارٍ حفظ الاختيار</p>}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
}
