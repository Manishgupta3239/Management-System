import axios from "axios";
import React, { useContext } from "react"
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { AuthContext } from "../../context/Authcontext/AuthContext";

const DashboardNav = ({name}) => {
  const navigate = useNavigate();
  const{setAuthenticate} = useContext(AuthContext);
  async function logout(){
    try {
      const response = await axios.get("http://localhost:3000/api/auth/logout", { withCredentials: true }); 
      if(response.status == 200){
        localStorage.clear();
        setAuthenticate(false);
        toast.success("Logged Out Successfully");
        setTimeout(() => {
          navigate('/');    
        },1800);
      
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="pt-6 h-full w-full">
      <div className="flex justify-between   ">
        <div className="text-white  ">
          <span className="text-[40px] font-bold">Hello</span>
          <br></br>
          <span className="text-[42px] font-medium">{name}</span>
        </div>

        <button className="bg-red-700 text-white h-10 w-28 text-[17px] font-medium mt-10 hover:bg-red-800"
        onClick={logout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default DashboardNav;
