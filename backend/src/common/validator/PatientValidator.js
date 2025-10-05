import { body } from "express-validator";
import { Gender, ProstheticType } from "@prisma/client";

export const patientValidationRules = [

  body("name")
    .notEmpty().withMessage("Name is required")
    .isString().withMessage("Name must be a string"),

  body("Phone")
    .notEmpty().withMessage("Phone is required")
    .isString().withMessage("Phone must be a string")
    .matches(/^[0-9+\-()\s]+$/).withMessage("Phone must contain only numbers and symbols (+ - () )")
    .isLength({ min: 9, max: 15 }).withMessage("Phone number must be between 9 and 15 digits"),

  body("age")
    .notEmpty().withMessage("Age is required")
    .isInt().withMessage("Age must be an integer")
    .custom((value) => {
      if (value < 5 || value > 40) {
        throw new Error("Age must be between 5 (childhood) and 40 (youth)");
      }
      return true;
    }),

  body("gender")
    .notEmpty().withMessage("Gender is required")
    .isIn([Gender.MALE, Gender.FEMALE]).withMessage("Invalid gender"),

  body("city")
    .notEmpty().withMessage("City is required")
    .isString().withMessage("City must be a string"),

  body("disability_type")
    .notEmpty().withMessage("Disability type is required")
    .isIn(Object.values(ProstheticType)).withMessage("Invalid disability type"),

  body("disability_percentage")
    .notEmpty().withMessage("Disability percentage is required")
    .isInt({ min: 0, max: 100 }).withMessage("Disability percentage must be between 0 and 100"),

  body("medical_reports_url")
    .notEmpty().withMessage("Please upload medical report file before submitting")
    .isString().withMessage("Medical report key must be a string")
    .custom((value) => {
      if (!/\.(pdf|jpg|jpeg|png)$/i.test(value)) {
        throw new Error("Medical report file must be a valid PDF or image");
      }
      return true;
    }),

  body("user_id")
    .notEmpty().withMessage("user_id is required")
    .isInt({ min: 1 }).withMessage("user_id must be a positive integer"),
];
