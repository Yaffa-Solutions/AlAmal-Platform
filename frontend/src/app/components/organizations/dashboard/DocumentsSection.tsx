import type { Organization } from "@/types/organization";

export default function DocumentsSection({ org }: { org: Organization }) {
  return (
    <section className="bg-white rounded-2xl border border-[#E8ECF3] p-6">
      <h2 className="text-xl font-semibold text-[#1A2954] mb-3">الوثائق</h2>
      <ul className="list-disc pr-5 space-y-1 text-[#374151]">
        <li>
          شهادة التسجيل:{" "}
          {org.registrationCertificate ? (
            <a
              href={org.registrationCertificate}
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
          {org.professionalLicense ? (
            <a
              href={org.professionalLicense}
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
