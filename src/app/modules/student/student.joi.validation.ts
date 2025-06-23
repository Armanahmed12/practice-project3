import Joi from "joi";

// ✅ Reusable name validation (capitalized first letter, rest lowercase, only letters)
const capitalizedNameRegex = /^[A-Z][a-z]{0,19}$/; // max 20 characters
const nameOnlyRegex = /^[A-Za-z]+$/;

// ✅ Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Father name must contain only letters.",
      "string.empty": "Father name is required.",
    }),
  fatherOccupation: Joi.string().required(),
  fatherContactNo: Joi.string().required(),

  motherName: Joi.string()
    .required()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .messages({
      "string.pattern.base": "Mother name must contain only letters.",
      "string.empty": "Mother name is required.",
    }),
  motherOccupation: Joi.string().required(),
  motherContactNo: Joi.string().required(),
});

// ✅ Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string()
    .trim()
    .pattern(/^[A-Za-z\s]+$/)
    .required()
    .messages({
      "string.pattern.base": "Local guardian name must contain only letters.",
      "string.empty": "Local guardian name is required.",
    }),
  occupation: Joi.string().required(),
  contactNo: Joi.string().required(),
  address: Joi.string().required(),
});

// ✅ UserName Schema
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .pattern(capitalizedNameRegex)
    .required()
    .messages({
      "string.pattern.base":
        "First name must start with a capital letter and contain only lowercase letters (max 20 characters).",
      "string.empty": "First name is required.",
    }),
  middleName: Joi.string().required().trim().pattern(nameOnlyRegex).messages({
    "string.pattern.base":
      "MiddleName must contain only letters.",
    "string.empty": "First name is required.",
  }),
  lastName: Joi.string().trim().pattern(nameOnlyRegex).required().messages({
    "string.pattern.base": "Last name must contain only letters.",
    "string.empty": "Last name is required.",
  }),
});

// ✅ Student Schema
export const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid("male", "female", "other").required().messages({
    "any.only": 'Gender must be either "male", "female", or "other".',
  }),
  dateOfBirth: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
  }),
  contactNumber: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .required()
    .messages({
      "any.only": "Invalid blood group.",
    }),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string().required(),
  guardian: guardianSchema.required(),
  localGuardian: localGuardianSchema.required(),
  profileImg: Joi.string().required(),
  isActive: Joi.string()
    .valid("active", "blocked")
    .default("active")
    .required(),
});
