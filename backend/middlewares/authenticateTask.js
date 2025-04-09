import Employee from "../Schema/employeeSchema/EmployeeSchema.js";
import Task from "../Schema/taskSchema/TaskSchema.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const KEY = process.env.SECRET_KEY;

export const isAuthenticatedTask = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const data = jwt.verify(token, KEY);
      const username = data.username;
      const user = await Employee.findOne({
        username,
      });
      if (user) {
        const tasks = await Task.find({ name: user._id });
        req.body = { tasks };
        next();
      } else {
        res.status(500).json({
          message: "User Not Found",
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        message: "Invalid Token",
      });
    }
  } else {
    console.log("Kindly Login or Register");
    res.status(500).json({
      message: "Kindly Login",
    });
  }
};
