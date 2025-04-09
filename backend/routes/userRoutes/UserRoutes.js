import express from "express";
import Employee from "../../Schema/employeeSchema/EmployeeSchema.js";
import bcrypt, {hash} from "bcrypt";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from "../../middlewares/isAuthenticateUser.js";
import Task from "../../Schema/taskSchema/TaskSchema.js";
import { isAdmin } from "../../middlewares/isAdmin.js";
dotenv.config();
const KEY = process.env.SECRET_KEY;

const router = express.Router();

router.get("/users",isAdmin,async (req, res)=>{
  try {
    const task = await Task.find();
    const users = await Employee.find();

     res.status(200).json({message : "admin", users : users , task : task});
  } catch (error) {
    console.log("Error in employee route", error);
    res.status(401).json(error);
  }
});


const UserRoutes = router;
export default UserRoutes;