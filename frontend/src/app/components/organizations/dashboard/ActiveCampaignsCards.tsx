"use client";

import { useEffect, useState } from "react";
import { API_BASE } from "@/lib/api";

type Campaign = {
  id: number;
  title: string;
  description: string;
  target_amount: number;
  collected_amount: number;
  imageUrl?: string;
};

export default function ActiveCampaignsCards({ orgId }: { orgId: string }) {
  const [items, setItems] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orgId) return;

    const getActive = async () => {
      try {
        const res = await fetch(
          `${API_BASE}/api/campaigns/${orgId}/active/campaigns?limit=3`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Failed to load campaigns");
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching active campaigns:", err);
      } finally {
        setLoading(false);
      }
    };

    getActive();
  }, [orgId]);

  if (loading)
    return (
      <div className="bg-white border border-[#E8ECF3] rounded-2xl p-6 text-[#6B7280]">
        جاري التحميل...
      </div>
    );

  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-[#1A2954]">الحملات النشطة</h2>
      {items.length === 0 ? (
        <div className="bg-white border border-[#E8ECF3] rounded-2xl p-6 text-[#6B7280]">
          لا توجد حملات نشطة حالياً
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((c) => {
            const pct = Math.max(
              0,
              Math.min(
                100,
                Math.floor((c.collected_amount / (c.target_amount || 1)) * 100)
              )
            );
            return (
              <div
                key={c.id}
                className="bg-white border border-[#E8ECF3] rounded-2xl shadow-sm overflow-hidden"
              >
                {c.imageUrl && (
                  <img
                    src={c.imageUrl}
                    alt={c.title}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-5">
                  <div className="text-lg font-bold text-[#1A2954] mb-1">
                    {c.title}
                  </div>
                  <p className="text-sm text-[#6B7280] line-clamp-3 mb-3">
                    {c.description}
                  </p>
                  <div className="mb-2 flex justify-between text-xs text-[#6B7280]">
                    <span>المستهدف: {c.target_amount.toLocaleString()}</span>
                    <span>المجموع: {c.collected_amount.toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E7EB] rounded-full overflow-hidden">
                    <div
                      className="h-2 bg-[#1D64D8]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-xs text-[#1A2954] mt-1">{pct}%</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
