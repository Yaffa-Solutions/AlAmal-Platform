"use client";

import { useState } from "react";
import { API_BASE } from "@/lib/api";

export function AddProstheticButton({ orgId }: { orgId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [loading, setLoading] = useState(false);

  // Enum options for the prosthetic type
  const prostheticTypes = [
    "RIGHT_ARM",
    "LEFT_ARM",
    "RIGHT_LEG",
    "LEFT_LEG",
    "RIGHT_HAND",
    "LEFT_HAND",
    "RIGHT_FOOT",
    "LEFT_FOOT",
  ];

  const colorOptions = ["White", "Black", "Red", "Blue"];
  const sizeOptions = ["S", "M", "L", "XL"];
  const materialOptions = ["Carbon Fiber", "Aluminum", "Plastic", "Iron"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const details: Record<string, string> = {};
      if (color) details.color = color;
      if (size) details.size = size;
      if (material) details.material = material;

      const res = await fetch(`${API_BASE}/api/prosthetics/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          org_id: orgId,
          details,
        }),
      });

      if (!res.ok) throw new Error("Failed to add prosthetic");

      setShowForm(false);
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("حدث خطأ أثناء إضافة الطرف الصناعي");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowForm(true)}
        className="bg-[#1A2954] text-white px-4 py-2 rounded-xl hover:bg-[#22356b]"
      >
        + إضافة طرف صناعي جديد
      </button>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl w-[400px] space-y-4 shadow-lg"
          >
            <h2 className="text-lg font-bold text-[#1A2954] text-center">
              إضافة طرف صناعي جديد
            </h2>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                النوع *
              </label>
              <select
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
                required
              >
                <option value="">اختر النوع</option>
                {prostheticTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                اللون (اختياري)
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">اختر اللون</option>
                {colorOptions.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                المقاس (اختياري)
              </label>
              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">اختر المقاس</option>
                {sizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                المادة (اختياري)
              </label>
              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
              >
                <option value="">اختر المادة</option>
                {materialOptions.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-3 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                إلغاء
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm bg-[#1A2954] text-white rounded-lg hover:bg-[#22356b]"
              >
                {loading ? "جارٍ الحفظ..." : "حفظ"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
