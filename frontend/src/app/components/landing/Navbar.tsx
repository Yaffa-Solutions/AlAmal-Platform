'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasBackground, setHasBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      if (currentScrollY > 100) {
        setHasBackground(true);
      } else {
        setHasBackground(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 px-16 py-4 flex justify-between items-center transition-all duration-500 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      } ${
        hasBackground
          ? 'bg-white/80 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      {' '}
      <Link
        href={'/pages/auth/login'}
  className="inline-block bg-blue-500 text-white pr-6 pl-6 text-center py-2 rounded-lg hover:bg-blue-600 hover:scale-105 transition duration-300 ease-in-out transform cursor-pointer"
      >
        انشاء حساب
      </Link>
      <ul className="flex gap-6 text-black font-medium">
        <li>
          <a href="#start" className="inline-block hover:-translate-y-1 transition-transform duration-200 ease-in-out cursor-pointer">تواصل معنا</a>
        </li>
        <li>
          <a href="#Why" className="inline-block hover:-translate-y-1 transition-transform duration-200 ease-in-out cursor-pointer">لماذا الامل؟</a>
        </li>
        <li>
          <a href="#about" className=" inline-block hover:-translate-y-1 transition-transform duration-200 ease-in-out cursor-pointer">من نحن</a>
        </li>
        <li>
          <a href="#home" className="inline-block hover:-translate-y-1 transition-transform duration-200 ease-in-out cursor-pointer">الرئيسية</a>
        </li>
      </ul>
      <h1 className="text-xl font-bold text-[#3B82F6] font-cairo">
        منصة الامل
      </h1>
    </div>
  );
}
