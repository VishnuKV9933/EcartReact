import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
function Login() {
  const [error,setError]=useState('')
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const onSubmit=async(data)=>{
        try {
       
            axios.post(' https://ecartecommerce.onrender.com/api/auth/login',data).then((res)=>{
             

              console.log(res.data,"res");

              if(res.data.loginfail){
                console.log("fail",'error');
                if(res.data?.errors?.email){
                  setError(res?.data?.errors?.email)
                    const errorTimer= setTimeout(() => {
                      setError('')
                      clearTimeout(errorTimer)
                    }, 2000);
                }
                if(res?.data?.errors?.password){
                  setError(res?.data?.errors?.password)
                    const errorTimer= setTimeout(() => {
                      setError('')
                      clearTimeout(errorTimer)
                    }, 2000);
                }
              }else{
               
                const token = res.data.token;
                console.log(token);
                document.cookie = `jwt=${token}`;
                localStorage.setItem("userId", JSON.stringify(data.user?._id));
                console.log("navigate");
                navigate("/");

               
                
              }
            })
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        
    <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
    {error&&
    <div className="flex justify-center items-center w-full text-red-500">
        {error}
    </div>
      }
        <div className='flex text-stone-500 justify-start items-center'>

      <h1 className="text-2xl font-semibold mb-6">Login</h1>
        </div>
      <form  onSubmit={handleSubmit(onSubmit)}>
      
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input  id="email" name="email" className="border p-2 w-full rounded" 
          placeholder="Enter your email"
           {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
        />

        {errors.email && errors.email.type === "required" && (
          <p style={{ color: "red" }}>Email is required.</p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p style={{ color: "red" }}>Email is not valid.</p>
        )}
        </div>
        <div className="mb-4">
          <label  className="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input  type="password" id="password" name="password" className="border p-2 w-full rounded" placeholder="Enter your password" 
          
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 6,
              message: "Password should be at-least  characters.",
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
        </div>
        <Link to="/register" >
        <div className='text-blue-900 cursor-pointer'>Register?</div>
        </Link>
        <div className="mb-4 mt-4">
          <button  type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Login</button>
        </div>
      </form>
    </div>
  </div>
    </>
  );
}


export default Login;