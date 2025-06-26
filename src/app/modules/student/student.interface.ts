import { Document, Model } from "mongoose";

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  studentId: string;
  password: string;
  name: TUserName;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  email: string;
  contactNumber: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
};

// export interface IStudentDocument extends Omit<TStudent, "id">, Document {}
// I can solve the problem by renaming the TStudent's "id" like studentId

export interface IStudentDocument extends TStudent, Document {
  getFullName(): string;
}

export interface IStudentModel extends Model<IStudentDocument> {
  isEmailTaken(email: string): Promise<IStudentDocument | null>;
}
