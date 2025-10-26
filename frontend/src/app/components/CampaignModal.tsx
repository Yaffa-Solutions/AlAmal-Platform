'use client';
import React from 'react';
import { Campaign } from '../hooks/useCampigns';
import { X, Building2, Phone } from 'lucide-react';

interface CampaignModalProps {
  campaign: Campaign | null;
  isOpen: boolean;
  onClose: () => void;
  onDonate: (campaign: Campaign) => void;
}

export default function CampaignModal({
  campaign,
  isOpen,
  onClose,
  onDonate,
}: CampaignModalProps) {
  if (!isOpen || !campaign) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
      ></div>

      <div className="relative bg-white rounded-2xl w-10/12 md:w-1/2 lg:w-146 p-6 shadow-lg z-10">
        <button className="absolute top-6 left-6 " onClick={onClose}>
          <X
            size={24}
            className="cursor-pointer text-gray-600 bg-gray-100 rounded-2xl w-6 h-6 p-1 hover:bg-gray-200"
          />
        </button>

        <img
          src={campaign.image}
          alt={campaign.title}
          className="w-full h-45  object-cover rounded-xl mb-4"
        />
        <h2 className="text-m text-rigth font-bold text-black mb-2">
          {campaign.title}
        </h2>
        <p className="text-gray-700  text-sm mb-4">{campaign.description}</p>

        <div className="flex justify-between mb-2 text-xs text-gray-700">
          <p>تم جمع:</p>
          <p>{campaign.collected_amount}$</p>
        </div>
        <div className="flex justify-between mb-2 text-sm text-gray-700">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-3 relative overflow-hidden">
            <div
              className="h-2 rounded-full absolute right-0 top-0"
              style={{
                width: `${Math.min(
                  (campaign.collected_amount / campaign.target_amount) * 100,
                  100
                )}%`,
                background: 'linear-gradient(to left, #34D3A2, #047854)',
              }}
            ></div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-700 text-xs">الهدف: {campaign.target_amount}$</p>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              campaign.status === 'ACTIVE'
                ? 'bg-green-100 text-green-700'
                : campaign.status === 'COMPLETED'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {campaign.status === 'ACTIVE'
              ? 'نشطة'
              : campaign.status === 'COMPLETED'
              ? 'مكتملة'
              : campaign.status}
          </span>
        </div>

        <div className="mb-4 text-xs text-black space-y-1">
          <div className="flex items-center gap-2">
            <Building2
              size={14}
              className="text-[#047854] bg-[#b1d3c8] rounded-2xl w-6 h-6 p-1 "
            />
            <span>{campaign.organization.name}</span>
          </div>

          {campaign.organization.phone && (
            <div className="flex items-center gap-2">
              <Phone
                size={14}
                className="text-[#047854] bg-[#b1d3c8] rounded-2xl w-6 h-6 p-1 "
              />
              <span>{campaign.organization.phone}</span>
            </div>
          )}
        </div>

        <button 
        onClick={() => onDonate(campaign)}
        className="bg-blue-500 text-white w-full  py-2 rounded-lg hover:bg-blue-600 transition cursor-pointer">
          تبرع الآن
        </button>
      </div>
    </div>
  );
}
