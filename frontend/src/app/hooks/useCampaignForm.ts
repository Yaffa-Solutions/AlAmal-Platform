"use client";
import { useState } from "react";
import { API_BASE, postForm } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function useCampaignForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [image, setImage] = useState<File | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function uploadFileToS3(file: File) {
    try {
      const response = await fetch(`${API_BASE}/api/campaigns/upload-url`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename: file.name, contentType: file.type }),
      });
      if (!response.ok) throw new Error(await response.text());

      const { url, key } = await response.json();

      const put = await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!put.ok) throw new Error("Failed to upload to S3");

      return key;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !title ||
      !description ||
      !targetAmount ||
      !startDate ||
      !endDate ||
      !image
    ) {
      setError("All fields including image are required");
      return;
    }

    const orgId = localStorage.getItem("id"); // get org_id from localStorage
    if (!orgId) {
      setError("Organization ID not found");
      return;
    }

    try {
      setSubmitting(true);
      const imageKey = await uploadFileToS3(image);

      const payload = {
        title,
        description,
        target_amount: targetAmount,
        collected_amount: 0,
        start_date: startDate,
        end_date: endDate,
        status,
        org_id: Number(orgId),
        image: imageKey,
      };

      await postForm("/api/campaigns", payload);
      router.push(`/pages/dashboards/organization/${orgId}/campaigns`);
    } catch (err) {
      setError("Failed to create campaign");
    } finally {
      setSubmitting(false);
    }
  }

  return {
    title,
    description,
    targetAmount,
    startDate,
    endDate,
    status,
    image,
    submitting,
    error,

    setTitle,
    setDescription,
    setTargetAmount,
    setStartDate,
    setEndDate,
    setStatus,
    setImage,

    onSubmit,
  };
}
