"use client";
import { useState, useEffect } from "react";
import { postForm } from "@/lib/api";
import type { Address, Organization } from "@/types/organization";
import { API_BASE } from "@/lib/api";
import { z } from "zod";
import { useRouter } from "next/navigation";

export default function useOrganizationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [type, setType] = useState<string | "">("");
  const [address, setAddress] = useState<Address>({});
  const [registrationCertificate, setRegistrationCertificate] =
    useState<File | null>(null);
  const [professionalLicense, setProfessionalLicense] = useState<File | null>(
    null
  );

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<Organization | null>(null);

  const AddressSchema = z
    .object({
      city: z.string().optional(),
      state: z.string().optional(),
      street: z.string().optional(),
    })
    .passthrough();

  const FormSchema = z.object({
    name: z.string().min(1, "name is required"),
    type: z.string().min(1, "type is required"),
    phone: z
      .string()
      .min(8, "Phone must be at least 8 digits")
      .regex(
        /^[+0-9\s-]+$/,
        "Phone number can only contain digits, +, -, and spaces"
      ),

    address: AddressSchema,
  });

  function isAllowedFile(file: File) {
    const mime = (file.type || "").toLowerCase();
    if (mime.startsWith("image/")) return true;
    if (mime === "application/pdf") return true;
    if (mime === "application/msword") return true;
    if (
      mime ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    )
      return true;

    const name = file.name.toLowerCase();
    if (name.endsWith(".pdf")) return true;
    if (name.endsWith(".doc")) return true;
    if (name.endsWith(".docx")) return true;
    if (name.match(/\.(png|jpg|jpeg|gif|bmp|webp|svg|tiff|ico)$/)) return true;

    return false;
  }

  async function uploadFileToS3(file: File) {
    console.log("Starting upload to S3...");
    try {
      const response = await fetch(`${API_BASE}/api/organizations/upload-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });

      console.log("Response from upload-url:", response.status);
      if (!response.ok) throw new Error(await response.text());

      const { url, key } = await response.json();
      console.log("Signed URL:", url);

      const put = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      console.log("S3 PUT status:", put.status);

      return key as string;
    } catch (err) {
      console.error("uploadFileToS3 error:", err);
      throw err;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSubmitting(true);

    try {
      const validated = FormSchema.safeParse({ name, type, phone, address });
      if (!validated.success) {
        const first = validated.error.issues?.[0];
        setError(first?.message || "Invalid form data");
        return;
      }

      if (!registrationCertificate || !professionalLicense) {
        setError("Both certificates are required");
        return;
      }

      if (
        !isAllowedFile(registrationCertificate) ||
        !isAllowedFile(professionalLicense)
      ) {
        setError("Files must be images, PDF, or Word documents (.doc, .docx)");
        return;
      }


      const registrationKey = await uploadFileToS3(registrationCertificate);
      const licenseKey = await uploadFileToS3(professionalLicense);

      const payload = {
        name,
        phone,
        user_id: localStorage.getItem("id"),
        type,
        address,
        registrationCertificate: registrationKey,
        professionalLicense: licenseKey,
      };

      const created = await postForm<Organization>(
        "/api/organizations",
        payload
      );

      setSuccess(created);
      if (created?.id) {
        localStorage.setItem("orgId", created?.id.toString());
        router.push(`/pages/dashboards/organization`);
      }
      setName("");
      setPhone("");
      setType("");
      setAddress({});
      setRegistrationCertificate(null);
      setProfessionalLicense(null);
      localStorage.removeItem("organizationDraft");
    } catch {
      setError("Failed to create organization");
    } finally {
      setSubmitting(false);
    }
  }

  function saveDraftLocally() {
    const draft = { name, phone, type, address };
    localStorage.setItem("organizationDraft", JSON.stringify(draft));
    alert("تم حفظ المسودة  ✅");
  }

  useEffect(() => {
    const draft = localStorage.getItem("organizationDraft");
    if (draft) {
      const data = JSON.parse(draft);
      setName(data.name || "");
      setPhone(data.phone || "");
      setType(data.type || "");
      setAddress(data.address || {});
    }
  }, []);

  return {
    name,
    phone,
    type,
    address,
    registrationCertificate,
    professionalLicense,
    submitting,
    error,
    success,
    saveDraftLocally,

    setName,
    setPhone,
    setType,
    setAddress,
    setRegistrationCertificate,
    setProfessionalLicense,

    onSubmit,
  };
}
