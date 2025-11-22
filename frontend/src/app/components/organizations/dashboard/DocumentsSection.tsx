"use client";

import { useEffect, useState } from "react";

type Documents = {
  registrationUrl: string | null;
  licenseUrl: string | null;
};

export default function DocumentsSection({ orgId }: { orgId: string }) {
  const [docs, setDocs] = useState<Documents | null>(null);

  useEffect(() => {
    async function fetchDocs() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/organizations/${orgId}/documents`
      );
      const data: Documents = await res.json();
      setDocs(data);
    }
    fetchDocs();
  }, [orgId]);

  if (!docs) return <p>جارٍ التحميل...</p>;

  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <h2 className="text-xl font-semibold text-[#1A2954] mb-3">الوثائق</h2>
      <ul className="list-disc pr-5 space-y-1 text-[#374151]">
        <li>
          شهادة التسجيل:{" "}
          {docs.registrationUrl ? (
            <a
              href={docs.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D64D8] hover:underline"
            >
              عرض
            </a>
          ) : (
            <span className="text-[#6B7280]">غير متوفر</span>
          )}
        </li>
        <li>
          ترخيص المهن:{" "}
          {docs.licenseUrl ? (
            <a
              href={docs.licenseUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1D64D8] hover:underline"
            >
              عرض
            </a>
          ) : (
            <span className="text-[#6B7280]">غير متوفر</span>
          )}
        </li>
      </ul>
    </section>
  );
}
