import { z } from "zod";

export const donationSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "الرجاء إدخال مبلغ صحيح" }),
});
export type DonationFormData = z.infer<typeof donationSchema>;