'use client';
import React, { useEffect, useState } from 'react';
import NavbarForm from '@/app/components/NavbarForm';

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<'organization' | 'donor' | 'patient' | null>(
    null
  );
  useEffect(() => {
    const storedRole = localStorage.getItem('role') as
      | 'organization'
      | 'donor'
      | 'patient'
      | null;
    if (storedRole) setRole(storedRole);
  }, []);
  if (!role) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <NavbarForm role={role as 'ORGANIZATION' | 'DONOR' | 'PATIENT'} />
      <main className="flex-1 flex flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
