import React, {useState,useEffect} from 'react';
import { AuthContext } from './AuthContext.js';
import axios from 'axios'
import {toast} from 'react-toastify';

const AuthProvider = ({ children }) => {
  const[loading,setLoading]=useState(true);
  const[authenticate , setAuthenticate] = useState(false);
  const[user , setUser] = useState({});
  const[token , setToken] = useState();

  async function auth(){
    try {
        const res = await axios.get("http://localhost:3000/api/auth/authenticate",{withCredentials:true});
        if(res.status==200){
          // localStorage.setItem('token',JSON.stringify(res.data.token));
          setUser(res.data.user.username);
          setToken(res.data.token);
          setAuthenticate(true);
          setLoading(false);
        }else{
          setAuthenticate(false);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      console.log(error.message);
    }finally{
      setLoading(false);  
    }
  }
  
useEffect(()=>{
  auth();
},[])

  return (
    <AuthContext.Provider value={{loading , authenticate , user , auth,setAuthenticate ,setUser,token}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;