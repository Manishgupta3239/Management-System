import React, { useContext, useState } from 'react'
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import {toast} from 'react-toastify';

const DescCard = ({value,state,complete,failed}) => {

    async function completeTask(id){
        try {
            const res = await axios.post('https://management-system-wgrv.onrender.com/api/task/completeTask',{id : id});
            if(res.status == 200){
                complete(true);
                toast.success("Task Completed");
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function failedTask(id){
        try {
            const res = await axios.post('https://management-system-wgrv.onrender.com/api/task/failedTask',{id : id});
            if(res.status == 200){
                toast.warning("Task Failed");
                failed(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    !value && state ? (<div className='h-96 mb-7 mt-16 w-96 bg-pink-700 rounded-lg flex justify-center items-center'>
        <ClipLoader/>
    </div>):

    (<div className='h-96  w-96 bg-pink-700 rounded-lg py-4 px-8 font-medium text-white flex-shrink-0 mb-7 mt-16'>
    <div className=' flex justify-between'>
            <span className='bg-red-700 h-14 w-42 py-4 px-2 rounded-lg'> 
                {value.task.task}
            </span>
            <span>
                {value.task.createdAt}
            </span>
        </div>

        <div className='mt-3 space-y-2 hfull w-full '>
            <p className='text-[32px] font-bold'>{value.task.category}</p>
            <p className='text-[20px]'>{value.task.desc}</p>
        </div>

        <div className='flex justify-between mt-10 '>
  <button className={`bg-green-500 h-10 rounded-[8px] px-2 hover:bg-green-600`} onClick={()=>completeTask(value.task._id)} disabled={value.task.completeTask}>{value.task.completeTask ? ("Completed !"):("Mark as Complete")}</button>

  <button className={`bg-red-700 h-10 rounded-[8px] px-2 hover:bg-red-800 ${value.task.completeTask ? 'hidden' : ''}`}onClick={()=>failedTask(value.task._id)} disabled={value.task.failedTask}>{value.task.failedTask ? ("Failed !!"):("Mark as Failed")}</button>
        </div>
        
    </div>)
    
        
  )
}

export default DescCard