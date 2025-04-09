import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    name: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    failedTask:{type:Boolean , default:null},
    completeTask:{type:Boolean , default:null}
  },{timestamps:true});  

  const Task = mongoose.model('Task', taskSchema);
  export default Task;