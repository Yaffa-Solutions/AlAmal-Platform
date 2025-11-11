import { Cairo } from 'next/font/google';
import Link from 'next/link';

const cairo = Cairo({ subsets: ['arabic'], weight: ['400', '700'] });

export default function Navbar() {
  return (
    <div className="w-full border-b bg-white shadow-xsm px-6 py-4 flex justify-end items-center">
      <Link href="/" className={`text-xl font-bold text-[#3B82F6] font-cairo ${cairo.className}`}>
        منصة الأمل{' '}
      </Link>
    </div>
  );
}
