'use client';
import React, { useState } from 'react';
import { X, CircleCheck, Loader2 } from 'lucide-react';
import { useDonationForm } from '../hooks/useDonation';
import { DonationFormData } from '../validation/donation';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaignTitle: string;
  campaignId: number;
}

export default function DonationModal({
  isOpen,
  onClose,
  campaignTitle,
  campaignId,
}: DonateModalProps) {
  const [method, setMethod] = useState<'card' | 'paypal'>('card');
  const [amount, setAmount] = useState<number | ''>('');
  const { error, setError, loading, handleDonate } = useDonationForm();
  const stripe = useStripe();
  const elements = useElements();

  if (!isOpen) return null;

  const onSubmit = async () => {
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) {
      setError({ message: 'الرجاء إدخال معلومات البطاقة', color: 'red' });
      return;
    }

    const data: DonationFormData = { amount: Number(amount) };
    const success = await handleDonate(data, campaignId, card, stripe);
    if (!success) return;
    setError({ message: 'تم التبرع بنجاح!', color: 'green' });
    setTimeout(() => {
      setAmount('');
      onClose();
    }, 2000);
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      ></div>

      <div className="relative bg-white rounded-2xl w-10/12 md:w-1/2 lg:w-146 p-6 shadow-lg z-10">
        <button
          className="absolute top-4 left-4 text-gray-600"
          onClick={onClose}
        >
          <X size={22} className="cursor-pointer" />
        </button>

        <h2 className="text-xl font-bold text-rigth text-gray-800 mb-1">
          تبرع الآن للحملة
        </h2>
        <p className="text-rigth text-sm text-gray-700 mb-6 ">
          ساهم في دعم المرضى للحصول على أطراف صناعية. يمكنك اختيار المبلغ وطريقة
          الدفع المناسبة لك.
        </p>

        <div className="mb-2">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            المبلغ
          </label>
          <input
            type="number"
            placeholder="0"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full border text-gray-700 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#3B82F6] focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            طريقة الدفع
          </label>
          <div className="flex  ">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="card"
                checked={method === 'card'}
                onChange={() => setMethod('card')}
                className="hidden"
              />
              <CircleCheck
                className={`w-4 h-4 transition-colors ${
                  method === 'card' ? 'text-[#0478D4]' : 'text-gray-400'
                }`}
              />
              <span className="text-gray-700 w-60 text-sm">
                بطاقة الائتمان / الخصم
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={method === 'paypal'}
                onChange={() => setMethod('paypal')}
                className="hidden"
              />
              <CircleCheck
                className={`w-4 h-4 transition-colors ${
                  method === 'paypal' ? 'text-[#0478D4]' : 'text-gray-400'
                }`}
              />
              <span className="text-gray-700 text-sm">باي بال PayPal</span>
            </label>
          </div>
        </div>

        {method === 'card' && (
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              معلومات البطاقة
            </label>
            <div className="border rounded-lg p-2">
              <CardElement options={{ hidePostalCode: true }} />
            </div>
          </div>
        )}

        {error && (
          <p
            className={`text-sm mt-2 ${
              error.color === 'red' ? 'text-red-500' : 'text-green-500'
            }`}
          >
            {error.message}
          </p>
        )}

        <div className="flex justify-between gap-3 mt-4">
          <button
            onClick={onSubmit}
            disabled={loading}
            className="flex-1 flex items-center justify-center bg-[#0478D4] text-white py-2 rounded-lg hover:bg-[#0368b8]  text-center transition"
          >
            {loading ? (
              <Loader2 className="animate-spin w-5 h-5 text-center" />
            ) : (
              'إتمام التبرع'
            )}
          </button>
          <button
            className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition"
            onClick={onClose}
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}
