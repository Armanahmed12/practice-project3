import { z } from "zod";

// Regex: First letter uppercase, rest lowercase
const capitalizedNameRegex = /^[A-Z][a-z]*$/;
const onlyLettersRegex = /^[A-Za-z]+$/;
const phoneRegex = /^[0-9]{10,15}$/; // adjust as per your phone number rules

// userName schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(20, "First name can't be more than 20 characters.")
    .regex(capitalizedNameRegex, {
      message: "First letter must be uppercase and the rest lowercase.",
    }),

  middleName: z.string().trim(),

  lastName: z.string().trim().regex(onlyLettersRegex, {
    message: "Last name must contain only letters.",
  }),
});

// guardian schema
const guardianSchema = z.object({
  fatherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  fatherContactNo: z.string().regex(phoneRegex, {
    message: "Father contact number is invalid.",
  }),

  motherName: z.string().trim(),
  motherOccupation: z.string().trim(),
  motherContactNo: z.string().regex(phoneRegex, {
    message: "Mother contact number is invalid.",
  }),
});

// local guardian schema
const localGuardianSchema = z.object({
  name: z.string().trim(),
  occupation: z.string().trim(),
  contactNo: z.string().regex(phoneRegex, {
    message: "Local guardian contact number is invalid.",
  }),
  address: z.string().trim(),
});

// student schema
export const zodStudentValidationSchema = z.object({
  id: z.string(),

  name: userNameSchema,

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({
      message: '⚠️ Gender must be either "male", "female" or "other".',
    }),
  }),

  dateOfBirth: z.string(), // You may use z.string().refine() to validate date format

  email: z.string().email("Invalid email format."),

  contactNumber: z.string().regex(phoneRegex, {
    message: "Contact number is invalid.",
  }),

  emergencyContactNo: z.string().regex(phoneRegex, {
    message: "Emergency contact number is invalid.",
  }),

  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),

  presentAddress: z.string().trim(),
  permanentAddress: z.string().trim(),

  guardian: guardianSchema,
  localGuardian: localGuardianSchema,

  profileImg: z.string().trim(),

  isActive: z.enum(["active", "blocked"]).default("active"),
});