'use client';
import React, { useState } from 'react';
import { UserRound, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function NavbarDash() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const logout = async () => {
    setDropdownOpen(false);

    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('status');
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    router.push('/pages/auth/login');
  };

  return (
    <div className="w-full border-b bg-white shadow-xsm px-6 py-4 flex justify-between items-center sticky top-0 z-20">
      <div className="flex items-center relative ">
        <ChevronDown
          className="text-gray-600 p-2 rounded-full w-9 h-9 cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        />
        <UserRound className="text-white bg-[#3B82F6] p-2 rounded-full w-9 h-9" />

        {dropdownOpen && (
          <div className="absolute top-full right- mt-4 w-40 bg-white border-none  rounded-lg shadow-sm z-10 ">          
            <button
              className="w-full text-gray-600 text-right px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={logout}
            >
              تسجيل خروج
            </button>
          </div>
        )}
      </div>

      <h1 className="text-xl font-bold text-[#3B82F6] font-cairo">
        منصة الأمل
      </h1>
    </div>
  );
}
