"use client";
import React, { useState } from "react";
import { useCampigns, Campaign } from "../hooks/useCampigns";
import CampaignCardSkeleton from "./CampainCardSkeleton";
import CampaignModal from "./CampaignModal";
import DonationModal from "./DonationModal";

export default function CampaignCard() {
  const { campaigns, loading } = useCampigns();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [donateModalOpen, setDonateModalOpen] = useState(false);

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setDonateModalOpen(true);
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="flex flex-wrap justify-start items-start gap-8 pt-8 px-6 sm:px-10 md:px-16 lg:px-20"
      >
        {Array(6)
          .fill(0)
          .map((_, idx) => (
            <CampaignCardSkeleton key={idx} />
          ))}
      </div>
    );
  }

  if (!campaigns || campaigns.length === 0) {
    return (
      <p className="text-center mt-4 text-gray-500">لا توجد حملات حالياً</p>
    );
  }

  return (
    <div
      dir="rtl"
      className="flex flex-wrap justify-start items-start gap-8 pt-8 px-6 sm:px-10 md:px-16 lg:px-20"
    >
      {campaigns.map((cam) => (
        <div
          key={cam.id}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden w-80 hover:shadow-lg transition-shadow duration-200 ml-8"
          onClick={() => {
            setSelectedCampaign(cam);
            setModalOpen(true);
          }}
        >
          <img
            src={cam.image}
            alt={cam.title}
            className="w-full p-4 h-40 rounded-3xl object-cover"
          />

          <div className="px-4">
            <h3 className="text-lg text-black font-semibold text-right">
              {cam.title}
            </h3>
            <p className="text-gray-700 text-sm mb-4 text-right">
              {cam.description.slice(0, 50)}...{" "}
            </p>

            <div className="flex justify-between mb-2 text-xs text-gray-700">
              <p>تم جمع:</p>
              <p>{cam.collected_amount}$</p>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 mb-3 relative overflow-hidden">
              <div
                className="h-2 rounded-full absolute right-0 top-0"
                style={{
                  width: `${Math.min(
                    (cam.collected_amount / cam.target_amount) * 100,
                    100
                  )}%`,
                  background: "linear-gradient(to left, #34D3A2, #047854)",
                }}
              ></div>
            </div>

            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-700 text-xs">
                الهدف: {cam.target_amount}$
              </p>

              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  cam.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : cam.status === "COMPLETED"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {cam.status === "ACTIVE"
                  ? "نشطة"
                  : cam.status === "COMPLETED"
                  ? "مكتملة"
                  : cam.status}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedCampaign(cam);
                setDonateModalOpen(true);
              }}
              className="bg-blue-500 text-white w-full rounded-lg py-2 mb-4 hover:bg-blue-600 transition"
            >
              تبرع الآن
            </button>
          </div>
        </div>
      ))}
      <CampaignModal
        campaign={selectedCampaign}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onDonate={handleDonate}
      />

      <DonationModal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        campaignTitle={selectedCampaign?.title || ""}
        campaignId={selectedCampaign?.id || 0}
      />
    </div>
  );
}
