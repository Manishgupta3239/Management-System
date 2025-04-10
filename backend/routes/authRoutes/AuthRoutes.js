import express from "express";
import Employee from "../../Schema/employeeSchema/EmployeeSchema.js";
import bcrypt, { hash } from "bcrypt";
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { isAuthenticated } from "../../middlewares/isAuthenticateUser.js";
dotenv.config();
const KEY = process.env.SECRET_KEY;

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const {
      username,
      password
    } = req.body;
    const user = await Employee.findOne({
      username
    });
    if (!user) {
      // console.log("user not exist");
      return res.status(500).json({
        success: false,
        message: "User Not found"
      });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign({
          username: user.username
        }, KEY, {
          expiresIn: "1h"
        });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,         
          sameSite: "None",     
          path: "/",            
        });        
        
        return res.status(200).json({ token: token, data: user });
      } else {
        console.log("incorrect password or username");
        return res.status(401).json({
          message: "incorrect password or username"
        });
      }
    })
  } catch (error) {
    console.log("Error in login route", error.message);
    res.status(401).json(error);
  }
});

router.get('/logout',   (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Logged out successfully" });
});

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password} = req.body;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(!username || !email || !password){
      return  res.status(404).json({message:"Invalid Credentials",sucess:false});
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }
    if (password.length <= 4){
      return res.status(400).json({ message: "Password must be at least 5 characters long " });
    }
    const user = await Employee.findOne({username});
    const mail = await Employee.findOne({email});

    if (user || mail) {
      return res.status(500).json({
        message: "Username or Email Already exist"
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const employee = await Employee.create({username,email,password: hash});
    res.status(200).json({sucess: true});
  } catch (error) {
    console.log("Error while Signup", error.message);
    res.status(500).json({
      sucess: false
    });
  }
});

router.get("/authenticate", isAuthenticated, (req, res) => {
  const {
    user,
    token
  } = req.body;
  res.status(200).json({ user, token });
})


const AuthRoutes = router;
export default AuthRoutes;