import { z } from 'zod';

export const donorSchema = z.object({
    name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
    phone: z.string().min(10, { message: 'Phone number must be at least 10 characters' }),
    country: z.string().min(3, { message: 'Country must be at least 3 characters' }),
    gender: z.enum(['MALE', 'FEMALE'], { message: 'Gender is required' }),

})