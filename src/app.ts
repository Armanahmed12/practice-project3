import cors from "cors";
import express, { Application, Request, Response } from "express";
import { StudentsRoutes } from "./app/modules/student/student.route";
const app: Application = express();
// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/students", StudentsRoutes);

// default router
app.get("/", (req: Request, res: Response) => {
  res.send("Hello WORLD!");
});

export default app;
