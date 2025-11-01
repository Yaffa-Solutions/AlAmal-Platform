import React from 'react';
import NavbarDash from '@/app/components/NavbarDash';
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDash />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
