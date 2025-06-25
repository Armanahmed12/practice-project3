import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import validator from "validator";
import {
  IStudentDocument,
  IStudentModel,
  TGuardian,
  TLocalGuardian,
  TUserName,
} from "./student.interface";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
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
      message:
        "LastName {VALUE} must contain only letters. No numbers or symbols allowed.",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },

  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, trim: true, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<IStudentDocument, IStudentModel>(
  {
    studentId: {
      type: String,
      required: true,
      unique: true, // ✅ ensures MongoDB will enforce uniqueness
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      maxlength: [20, "Password can't be more than 20 characters."],
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
        message: "{VALUE} is not valid email.",
      },
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
    isDeleted: { type: Boolean, default: false },
  },
  // only method  --------------------------------------------
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    methods: {
      getFullName() {
        return this.name.firstName + this.name.lastName;
      },
    },
    //  Static method  --------------------------------------------
    statics: {
      async isEmailTaken(email: string) {
        const user = await this.findOne({ email });
        return user;
      },
    },
  }
);

// =====================  mongoose Document middleware
studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

studentSchema.post("save", function (doc) {
  doc.password = "";
});

// adding virtual filed 
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

// ==================== Query middleware


studentSchema.pre('find', function (next) {
  
    this.find({ isDeleted: {$ne: true} })
    //  console.log(this, "wanna see the this")
     next()
})
studentSchema.pre('findOne', function (next) {
  
    this.find({ isDeleted: {$ne: true} })
    //  console.log(this, "wanna see the this")
     next()
})

studentSchema.pre('aggregate', function (next) {
  
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next()
})

// 3. Create a Model.
export const StudentModel = model<IStudentDocument, IStudentModel>(
  "Student",
  studentSchema
);
