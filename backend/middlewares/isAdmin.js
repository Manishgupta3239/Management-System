import express from "express";
import Employee from "../Schema/employeeSchema/EmployeeSchema.js";
import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const KEY = process.env.SECRET_KEY;

export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    try {
      const data = jwt.verify(token, KEY);
      const username = data.username;
      const user = await Employee.findOne({ username });
      if (user.username == "manish") {
        next();
      } else {
        res.status(500).json({
          message: "Not a admin",
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
