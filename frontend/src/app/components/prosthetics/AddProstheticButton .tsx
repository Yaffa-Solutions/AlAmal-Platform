"use client";

import { useState } from "react";

export function AddProstheticButton({ orgId }: { orgId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const details: Record<string, string> = {};
      if (color) details.color = color;
      if (size) details.size = size;
      if (material) details.material = material;

      const res = await fetch("/api/prosthetics/create", {
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
      {/* Button to open modal */}
      <button
        onClick={() => setShowForm(true)}
        className="bg-[#1A2954] text-white px-4 py-2 rounded-xl hover:bg-[#22356b]"
      >
        + إضافة طرف صناعي جديد
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-2xl w-[400px] space-y-4 shadow-lg"
          >
            <h2 className="text-lg font-bold text-[#1A2954] text-center">
              إضافة طرف صناعي جديد
            </h2>

            {/* Prosthetic Type */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                النوع *
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="مثلاً: LEFT_LEG"
                required
              />
            </div>

            {/* Optional fields */}
            <div>
              <label className="block mb-1 text-sm text-gray-700">
                اللون (اختياري)
              </label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="مثل: أبيض"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                المقاس (اختياري)
              </label>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="مثل: M"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">
                المادة (اختياري)
              </label>
              <input
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="w-full border rounded-lg p-2 text-sm"
                placeholder="مثل: كربون فايبر"
              />
            </div>

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
