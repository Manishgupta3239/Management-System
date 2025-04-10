import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Authcontext/AuthContext.js';
import { TaskContext } from './TaskContext.js'
import axios from 'axios';

const TaskProvider=({ children })=>{
  
  const[task ,setTask] = useState([]);

  const getData = async (token) => {
    try {
      const response = await axios.get("https://management-system-wgrv.onrender.com/api/task/alltask",{
        headers:{
          Authorization : `Bearer ${token}`
        }
      });
      if (response) {
        setTask(response.data);
      }
    } catch (error) {
      console.log("Data not submitted", error.messaage);
    }
  };

  // useEffect(()=>{
  //   getData();
  // },[token])

    return (
      <TaskContext.Provider value={{task , getData}}>
        {children}
      </TaskContext.Provider>
    );
  }
  export default TaskProvider;