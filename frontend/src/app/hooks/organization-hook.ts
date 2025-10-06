"use client";
import { useState } from "react";
import { postForm } from "@/lib/api";
import type { Address, Organization } from "@/types/organization";
import { API_BASE } from "@/lib/api";
import { z } from "zod";

export default function useOrganizationForm() {
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

  // Zod schemas for client-side validation
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
    phone: z.string().min(1, "phone is required"),
    address: AddressSchema,
  });

  async function uploadFileToS3(file: File) {
    const { url, key } = await fetch(
      `${API_BASE}/api/organizations/upload-url`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      }
    ).then((res) => res.json());

    if (url) {
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
    }
    return key as string;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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

    const registrationKey = await uploadFileToS3(registrationCertificate);
    const licenseKey = await uploadFileToS3(professionalLicense);

    const payload = {
      name,
      phone,
      user_id: 1,
      type,
      address,
      registration_certificate_key: registrationKey,
      professional_license_key: licenseKey,
    };

    setSubmitting(true);
    try {
      const created = await postForm<Organization>(
        "/api/organizations",
        payload
      );
      setSuccess(created);
      setName("");
      setPhone("");
      setType("");
      setAddress({});
      setRegistrationCertificate(null);
      setProfessionalLicense(null);
    } catch {
      setError("Failed to create organization");
    } finally {
      setSubmitting(false);
    }
  }

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

    setName,
    setPhone,
    setType,
    setAddress,
    setRegistrationCertificate,
    setProfessionalLicense,

    onSubmit,
  };
}
