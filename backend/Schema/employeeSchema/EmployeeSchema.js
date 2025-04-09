import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    username: { type: String, required: true ,unique:true},
    email: { type: String, unique: true }, 
    password:{type: String,},
  }, { timestamps: true }); 
  

  const Employee = mongoose.model('Employee', employeeSchema);
  export default Employee;