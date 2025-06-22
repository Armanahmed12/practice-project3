import { TStudent } from "./student.interface";
import { StudentModel } from "./student.model";

const createStudentIntoDB = async (student: TStudent) => {
  const res = await StudentModel.create(student);
  return res;
};

const getAllStudentsFromDB = async () => {
  const allStudents = await StudentModel.find({});
  console.log(allStudents);
  return allStudents;
};

const getStudentByIdFromDB = async (studentId: string) => {
  const student = StudentModel.findOne({ id: studentId });
  return student;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentByIdFromDB,
};
