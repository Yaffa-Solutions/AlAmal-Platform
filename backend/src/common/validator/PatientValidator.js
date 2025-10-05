import { body } from "express-validator";
import { Gender, ProstheticType } from "@prisma/client";

export const patientValidationRules = [
  body("name").isString().notEmpty().withMessage("Name is required"),
  body("Phone").isString().notEmpty().withMessage("Phone is required"),
  body("age")
    .isInt().withMessage("Age must be an integer")
    .custom((value) => {
      if (value < 5 || value > 40) {
        throw new Error("Age must be between 5 (childhood) and 40 (youth)");
      }
      return true;
    }),
  body("gender").isIn([Gender.MALE, Gender.FEMALE]).withMessage("Invalid gender"),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("disability_type").isIn(Object.values(ProstheticType)).withMessage("Invalid disability type"),
  body("disability_percentage").isInt({ min: 0, max: 100 }).withMessage("Disability percentage must be 0-100"),
  body("medical_reports_url").optional().isURL().withMessage("Medical reports URL must be valid"),
  body("user_id").isInt({min:0}).withMessage("user_id must be an integer"),
];