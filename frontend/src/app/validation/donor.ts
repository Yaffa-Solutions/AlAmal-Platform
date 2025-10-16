import {z} from 'zod';

export const donorSchema=z.object({
    name:z.string().nonempty({message:'الاسم الكامل مطلوب'}),
    gender:z.enum(['MALE','FEMALE'],{message:'اختر الجنس'}),
    country:z.string().nonempty({message:'المدينة مطلوبة'}),
    phone:z.string().nonempty({message:'رقم الهاتف مطلوب'})
    .regex(/^[0-9]{10,15}$/, {message:'رقم الهاتف يجب أن يكون من 10 إلى 15 رقمًا'}),

})

export type DonorFormData=z.infer<typeof donorSchema>;