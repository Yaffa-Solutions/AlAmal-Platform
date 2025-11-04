'use client';
import React from 'react';
import NavbarDash from '@/app/components/NavbarDash';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Elements stripe={stripePromise}>
    <div className="min-h-screen flex flex-col">
      <NavbarDash />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
    </Elements>
  );
}
