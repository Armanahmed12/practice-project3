import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  //  if alread user exists
  // 6️⃣ Usage
  const exists = await StudentModel.isEmailTaken(studentData.email);
  if (exists) {
    throw new Error("Email already exists Man!");
  }
  const createdData = await StudentModel.create(studentData);

  if (createdData) {
    const res = createdData.getFullName();
    console.log("data created FullName, res : ", res);
  }
  return createdData;
  // //2. ------using builtIn InstanceMethod
  // const createdStudent = new StudentModel(studentData);
  // const res = await createdStudent.save();
  // return res;
};

const getAllStudentsFromDB = async () => {
  const allStudents = await StudentModel.find({});
  return allStudents;
};

const getStudentByIdFromDB = async (studentId: string) => {
  // const student = StudentModel.findOne({ id: studentId });
  const student = StudentModel.aggregate([
    {
      $match: { studentId: studentId },
    },
  ]);
  return student;
};

const deleteDocFromDB = async (studentId: string) => {
  const res = await StudentModel.updateOne({ studentId }, { isDeleted: true });
  console.log("this is the res from Delete", res);
  return res;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteDocFromDB,
};
