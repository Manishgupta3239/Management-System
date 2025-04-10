import React, { useState } from 'react'
import axios from 'axios';
import { UserContext } from './UserContext.js';


const UserProvider = ({children}) => {

    const[users,setUsers] = useState([]);
    const[tasks,setTasks] = useState([]);
 
    const getData = async (token) => {
      try {
        const response = await axios.get("https://management-system-wgrv.onrender.com/api/admin/users",{
          headers:{
            Authorization : `Bearer ${token}`
          }
        });
        if (response) {
          setUsers(response.data.users);
          setTasks(response.data.task);          
        }
      } catch (error) {
        console.log("Data not submitted", error.messaage);
      }
    };
 
  
  return (
    <div>
      <UserContext.Provider value={{users,tasks,getData}}>
        {children}
      </UserContext.Provider>
    </div>
  )
}

export default UserProvider
