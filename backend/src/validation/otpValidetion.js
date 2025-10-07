import { z } from 'zod';

export const requestOTPSchema = z.object({
  username: z.string().email({ message: 'Invalid email format' }),
});

export const verifyOTPSchema = z.object({
  username: z.string().email({ message: 'Invalid email format' }),
  code: z.string().length(6, { message: 'OTP must be 6 digits' }),
});
