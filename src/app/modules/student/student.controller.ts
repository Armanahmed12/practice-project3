import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { zodStudentValidationSchema } from "./student.validation";
import { TStudent } from "./student.interface";

// import { studentValidationSchema } from "./student.joi.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // ============ student validation with joi

    // const { error, value } = studentValidationSchema.validate(studentData);

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong(JOi)!.",
    //     err: error.details[0].message,
    //   });
    // }

    //=============== student validation with zod
    const result = zodStudentValidationSchema.safeParse(studentData);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Something went wrong(zod err)!",
        err: result.error.flatten() || "Email already exists Bro!",
      });
      return;
    }

    // ✅ Cast result.data to TStudent
    // const validatedStudent: TStudentByZod = result.data;

    const createdStudent: TStudent = await StudentServices.createStudentIntoDB(
      result.data
    );

    res.status(200).json({
      success: true,
      message: "Student is created successfully.",
      data: createdStudent,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Something went wrong Bro!.",
      err: error,
    });
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
    res.status(500).json({
      success: false,
      message: "Something went wrong!.",
      err: error,
    });
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
    res.status(500).json({
      success: false,
      message: "Something went wrong!.",
      err: error,
    });
  }
};

const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const updatedData = await StudentServices.deleteDocFromDB(
      req.params.studentId
    );
    res.status(200).json({
      success: true,
      message: "Student has been deleted successfully.",
      modifiedData: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong!.",
      err: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getOneStudentById,
  deleteStudentById,
};
