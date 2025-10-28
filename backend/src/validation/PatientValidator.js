import { z } from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, "Name is required"),

  Phone: z
    .string()
    .min(9, "Phone number must be at least 9 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^[0-9+\-()\s]+$/, "Phone must contain only numbers and symbols (+ - () )"),

  age: z
    .preprocess((val) => Number(val), 
      z.number().int().min(5, "Age must be at least 5").max(40, "Age must be at most 40")
    ),

  gender: z.enum(["MALE", "FEMALE"], { message: "Invalid gender  MALE | FEMALE" }),

  city: z.string().min(1, "City is required"),

  disability_type: z.enum([
    "RIGHT_ARM","LEFT_ARM","RIGHT_LEG","LEFT_LEG",
    "RIGHT_HAND","LEFT_HAND","RIGHT_FOOT","LEFT_FOOT"
  ], { message: "Invalid disability type" }),

  disability_percentage: z
    .preprocess((val) => Number(val), 
      z.number().int().min(0, "Min 0").max(100, "Max 100")
    ),

  medical_reports_url: z.string(),

  user_id: z
    .preprocess((val) => Number(val), 
      z.number().int().min(1, "user_id must be positive")
    ),
});
