import express from 'express';
import Task from '../../Schema/taskSchema/TaskSchema.js';
import Employee from '../../Schema/employeeSchema/EmployeeSchema.js';
import { isAuthenticatedTask } from '../../middlewares/authenticateTask.js';


const router = express.Router();

router.post('/create',async(req,res)=>{
   try{
    const{task,category,name,desc} = req.body;
    const employee = await Employee.findOne({username: name});
    if(! employee){
        return res.status(500).json({messsage:"User Not Found"})
    }
   //  console.log(employee);
    const newTask = await Task.create({task,category,name:employee._id,desc});
   //  console.log("Assiged Task",newTask);
    res.status(200).json(employee);
   }catch(error){
    console.log("Error while Signup",error.message);
    res.status(500).json({sucess:false});
   }
})

router.get('/alltask',isAuthenticatedTask,(req,res)=>{ 
    try{ 
      const{tasks } = req.body;
      // console.log(tasks);
     res.status(200).json(tasks);
    }catch(error){
     console.log("Error while fetching task",error.message);
     res.status(500).json({sucess:false});
    }
 })

router.post('/completeTask',async(req,res)=>{
      try {
         const{id} = req.body;
         // console.log(req.body);
         const task = await Task.findByIdAndUpdate( { _id: id, completeTask: false } , {completeTask : true , failedTask : false} ,{new:true} );
         if(! task){
            console.log("task not found or already completed");
         }
         res.status(200).json(task);
      } catch (error) {
         console.log(error.message);
      }
});

router.post('/failedTask',async(req,res)=>{
      try {
         // const id = '67587c7004cfd8e312b3024b';
         const{id} = req.body;
         const task = await Task.findByIdAndUpdate( { _id: id } , {failedTask : true , completeTask : false} ,{new:true} );
         if(! task){
            console.log("task not found or already completed");
         }
         res.status(200).json(task);
      } catch (error) {
         console.log(error.message);
      }
});


const TaskRoutes = router;
export default TaskRoutes;