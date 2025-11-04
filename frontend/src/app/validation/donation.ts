import { z } from "zod";

export const donationSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "الرجاء إدخال مبلغ صحيح" }),
  // cardNumber: z
  //   .string()
  //   .min(16, { message: "رقم البطاقة يجب أن يكون 16 رقم" })
  //   .max(16, { message: "رقم البطاقة يجب أن يكون 16 رقم" }),
  // cvv: z
  //   .string()
  //   .min(3, { message: "CVV يجب أن يكون 3 أرقام" })
  //   .max(3, { message: "CVV يجب أن يكون 3 أرقام" }),
  // expiry: z
  //   .string()
  //   .regex(/^\d{2}\/\d{2}$/, { message: "الرجاء إدخال تاريخ صالح mm/yy" }),
});
export type DonationFormData = z.infer<typeof donationSchema>;