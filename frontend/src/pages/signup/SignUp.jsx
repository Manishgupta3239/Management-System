import React, {useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const SignUp = () => {
  const [form, setForm] = useState({ username: "", password: "" ,email:"",confirmPassword:""});
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
        if( !form.username || !form.password || !form.email || !form.confirmPassword){
          return  toast.error('Invalid Credentials!');
        }if(form.password != form.confirmPassword){
         return toast.error('Passwords do not match');
        }                
    const response = await axios.post("http://localhost:3000/api/auth/signup", form, { withCredentials: true });
    if(response.status == 200){
        toast.success('Signup successful! Please log in to continue');   
        setTimeout(() => {
            navigate('/');
        }, 1800);
    }
    }catch (error) {
      if(error.response){
        toast.error(error.response.data.message);   
      }
      console.log(error);
    } finally {
      setForm({ username: "", password: "",confirmPassword:"",email:"" });
    }
  }

  return (
    <div className=' h-screen w-full bg-black flex justify-center items-center'>
      <form className=' h-[60%] w-96 bg-transparent rounded-lg border-green-950 border-2 space-y-3 text-center pt-4' onSubmit={handleSubmit}>
        <input placeholder='Enter Username' className='rounded-2xl h-12  bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white' onChange={handleChange} name='username' value={form.username} />
       
        <input placeholder='Enter Email' className='rounded-2xl h-12  bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white' onChange={handleChange} name='email' value={form.email} />
       
        <input placeholder='Enter Password' className='rounded-2xl h-12  bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white' name='password' value={form.password} onChange={handleChange} />
        <input placeholder='Enter Confirm Password' className='rounded-2xl h-12  bg-transparent border-2 border-green-900 px-2 text-[20px] font-medium text-white' name='confirmPassword' value={form.confirmPassword} onChange={handleChange} />
       

        <button className='bg-green-900 rounded-xl h-12 w-[68%] font-medium text-white hover:bg-green-800 ' type='submit'>
          SignUp
            </button>
            <p className='text-white text-[25px] font-semibold'>or</p>
        <p className='text-white'> Already have an account <NavLink to={'/'} className='text-blue-500 hover:underline font-semibold'>Login</NavLink></p>
      </form>

    </div>
  )
}

export default SignUp