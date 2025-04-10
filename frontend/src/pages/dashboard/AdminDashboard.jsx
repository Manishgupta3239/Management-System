import React, { useContext, useEffect, useState } from "react";
import DashboardNav from "../../components/dashboard/DashboardNav";
import axios from 'axios';
import { AuthContext } from "../../context/Authcontext/AuthContext";
import {toast} from 'react-toastify'
import { UserContext } from "../../context/UserContext/UserContext";

const AdminDashboard = () => {
  const{user} =  useContext(AuthContext);
  const {token} = useContext(AuthContext);
  const{tasks,users,getData} = useContext(UserContext);
  const[loading,setLoading] = useState(true);

  function ReturnTask(user){
  const id = user.user._id;
  const task = tasks.filter((task)=>task.name === id);
  const completeTask = task.filter((task)=>task.completeTask==true).length;
  const failedTask = task.filter((task)=>task.failedTask==true).length;
  const nullTask = task.filter((task)=>task.failedTask == null && task.completeTask == null).length;
  const acceptedTask = task.filter((task)=>task.failedTask && task.failedTask == true || false).length;
  const totalTask = task.length;
      return(
        <tr className='border-2 border-yellow-500'>
      <td className='py-1 text-[22px] font-medium'>{user.user.username}</td>
      <td className='py-1 text-[22px] font-medium'>{acceptedTask}</td>
      <td className='py-1 text-[22px] font-medium'>{completeTask}</td>
      <td className='py-1 text-[22px] font-medium'>{failedTask}</td>
      <td className='py-1 text-[22px] font-medium'>{nullTask}</td>
      <td className='py-1 text-[22px] font-medium'>{totalTask}</td>
        </tr>
  
      )
  }

  const [form, setForm] = useState({task: "",date: "",name: "",category: "",desc: ""});

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await axios.post("https://management-system-wgrv.onrender.com/api/task/create",form);
      if(response){
        toast.success(`Task assigned to ${response.data.username}`);
        console.log(response);
      }
    }catch(error){
      toast.warning("User not found");
      console.log("Data not submitted",error);  
    }finally{
      setForm({ task: "", date: "", name: "", category: "", desc: "" });
    }
  }
  
  useEffect(()=>{
    getData(token);
    setLoading(true);
  },[loading,token])

  return (
    <div className="px-9">
      <DashboardNav name={user}/>

      <div className="w-full h-full py-2 bg-gray-950 px-7 mt-8 py-4">
        <form className=" w-full h-ful" onSubmit={handleSubmit}>
          <div className="flex justify-between w-full h-full ">
            <div className="space-y-1">
              <label htmlFor="task" className="text-[20px] text-white">
                Task Title
              </label>{" "}
              <br />
              <input
                placeholder="Assign Task"
                value={form.task}
                onChange={handleChange}
                name="task"
                className="w-96 border-2 rounded-md border-white bg-transparent text-[18px] py-1 px-2 text-white"
              />
              <br />
              <label htmlFor="date" className="text-[20px] text-white">
                Date
              </label>{" "}
              <br />
              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={form.date}
                className="w-96 border-2 rounded-md border-white bg-transparent text-[18px] py-1 px-2 text-white"
              />
              <br />
              <label htmlFor="name" className="text-[20px] text-white">
                Assign To
              </label>{" "}
              <br />
              <input
                placeholder="Employee name"
                name="name"
                onChange={handleChange}
                value={form.name}
                className="w-96 border-2 rounded-md border-white bg-transparent text-[18px] py-1 px-2 text-white"
              />
              <br />
              <label htmlFor="category" className="text-[20px] text-white">
                Category
              </label>{" "}
              <br />
              <input
                placeholder="Category"
                name="category"
                onChange={handleChange}
                value={form.category}
                className="w-96 border-2  rounded-md border-white bg-transparent text-[18px] py-1 px-2 text-white"
              />
            </div>

            <div className="w-[45%] h-full  ">
              <label htmlFor="desc" className="text-[20px] text-white">
                Description
              </label>{" "}
              <br />
              <textarea
                placeholder="Enter description"
                name="desc"
                value={form.desc}
                onChange={handleChange}
                className="w-full border-2  rounded-md border-white bg-transparent text-[18px] py-1 px-2 text-white"
              ></textarea>
              
              <button
                type="submit"
                disabled={
                  !form.task ||
                  !form.date ||
                  !form.name ||
                  !form.category ||
                  !form.desc
                }
                className={`w-full bg-green-800 h-12 text-white mt-4 ${
                  !form.task ||
                  !form.date ||
                  !form.name ||
                  !form.category ||
                  !form.desc
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              onClick={()=>setLoading(false)}>
                Create Task
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className='w-full h-20 mt-6 text-white h-full'>
          <table className=''>
            <thead className=''>
            <th className='px-12 pb-3 text-[21px] font-bold'>Username</th>
            <th className='px-12 pb-3 text-[21px] font-bold'>Accepted Task</th>
            <th className='px-12 pb-3 text-[21px] font-bold'>Completed Task</th>
            <th className='px-12 pb-3 text-[21px] font-bold'>Failed Task</th>
            <th className='px-12 pb-3 text-[21px] font-bold'>New Task</th>
            <th className='px-12 pb-3 text-[21px] font-bold'>Total Task</th>
            </thead>
            <tbody className='text-center text-[20px] '>
              
              {/* {users.map((user)=>(<tr key={user._id}><td>{user.username}</td></tr>))} */}
              {users.map((user)=>( <ReturnTask user={user} key={user._id}/>))}
             
              
            </tbody>
           
          </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
