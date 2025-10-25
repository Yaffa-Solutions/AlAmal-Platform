import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: 'ادخل الإيميل' })
    .email({ message: 'صيغة الإيميل غير صحيحة' }),
});

export const otpSchema = z.object({
  code: z
    .string()
    .length(6, { message: 'رمز التحقق يجب أن يتكون من 6 أرقام' })
    .regex(/^[0-9]+$/, { message: 'الرمز يجب أن يحتوي على أرقام فقط' }),
});
