import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    console.log(studentData, "body-data");
    const createdStudent =
      await StudentServices.createStudentIntoDB(studentData);
    console.log("created Student", createdStudent);
    res.status(200).json({
      success: true,
      message: "Student is created successfully.",
      data: createdStudent,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const studentsFromDB = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrieved successfully.",
      gotStudentsData: studentsFromDB,
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneStudentById = async (req: Request, res: Response) => {
  try {
    const studentFromDB = await StudentServices.getStudentByIdFromDB(
      req.params.studentId
    );
    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully.",
      gotStudentsData: studentFromDB,
    });
  } catch (error) {
    console.log(error);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getOneStudentById,
};
