import React from 'react';

interface NavbarFormProps {
  role: 'ORGANIZATION' | 'DONOR' | 'PATIENT';
}

export default function NavbarForm({ role }: NavbarFormProps) {
  const roleTextMap: Record<string, string> = {
    ORGANIZATION: 'تسجيل بيانات المؤسسة',
    DONOR: 'تسجيل بيانات المتبرع',
    PATIENT: 'تسجيل بيانات المريض',
  };
  return (
    <div className="w-full border-b bg-white shadow-xsm px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#3B82F6] font-cairo">
        منصة الأمل{' '}
      </h1>
      <h1 className="text-lg font-bold text-black ">
        {roleTextMap[role] || 'تسجيل البيانات'}
      </h1>
    </div>
  );
}
