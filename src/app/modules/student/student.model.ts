import { Schema, model } from "mongoose";
import validator from "validator";
import {
  Guardian,
  LocalGuardian,
  TStudent,
  UserName,
} from "./student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    maxlength: [20, "First name can't be more than 20 characters."],
    trim: true,
    validate: {
      validator: (value: string) => {
        const correctNameFormat =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return correctNameFormat === value;
      },
      message:
        "First letter of {VALUE} must be uppercase and the rest needs to be lowercase.",
    },
  },
  middleName: { type: String, required: true },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: 'LastName {VALUE} must contain only letters. No numbers or symbols allowed.',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },

  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, trim: true, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent>({
  id: {
    type: String,
    required: true,
    unique: true, // ✅ ensures MongoDB will enforce uniqueness
  },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["female", "male", "other"],
      message:
        '⚠️ `{VALUE}` is not a valid gender. Choose either "male", "female" or "other".',
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not valid email.'
    }
  },
  contactNumber: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String, required: true },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    required: true,
    default: "active",
  },
});

// 3. Create a Model.
export const StudentModel = model<TStudent>("Student", studentSchema);
