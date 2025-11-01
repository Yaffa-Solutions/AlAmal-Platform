import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),

  Phone: z.string()
    .min(9, "رقم الهاتف يجب أن يكون على الأقل 9 أرقام")
    .max(15, "رقم الهاتف يجب أن يكون بحد أقصى 15 رقم")
    .regex(/^[0-9+\-()\s]+$/, "رقم الهاتف يجب أن يحتوي على أرقام ورموز (+ - () ) فقط"),

  age: z
    .string()
    .min(1,'العمر مطلوب ')
    .regex(/^\d+$/, "  يجب أن يكون رقمًا  موجبا " )
    .optional()
    .refine(val => {
      const num = Number(val);
      return num >= 5 && num <= 40;
    }, "العمر يجب أن يكون بين 5 و 40"),

  gender: z.enum(["MALE", "FEMALE"], { message: "يجب اختيار الجنس" }),

  city: z.string().min(1, "المدينة مطلوبة"),

  disability_type: z.enum(
    [
      "RIGHT_ARM", "LEFT_ARM", "RIGHT_LEG", "LEFT_LEG",
      "RIGHT_HAND", "LEFT_HAND", "RIGHT_FOOT", "LEFT_FOOT"
    ],
    { message: "يجب اختيار نوع الطرف الصناعي" }
  ),

  disability_percentage: z
    .string()
    .min(1, "يجب إدخال نسبة الإعاقة")
    .regex(/^\d+$/, "يجب أن يكون رقمًا")
    .refine(val => {
      const num = Number(val);
      return num > 0 && num <= 100;
    }, "النسبة يجب أن تكون أكبر من 0 وأقل أو تساوي 100"),
    medical_reports_url: z
    .instanceof(File, { message: "يجب رفع ملف التقرير الطبي" })
    .refine((file) => file.size > 0, { message: "الملف فارغ" })
    .refine(
      (file) => file.type === "application/pdf" || file.type.startsWith("image/"),
      { message: "الملف يجب أن يكون PDF أو صورة" }
    ),

});




export type PatientFormData = z.infer<typeof patientSchema>;
