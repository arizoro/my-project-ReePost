import React from "react";
import { useState } from "react";
import { register } from "../api/api";
import { Link } from "react-router-dom";

const Daftar = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [create , setCreate] = useState(false)

  const data = {
    username : username, 
    email: email,
    password : password
    }

  async function handleSubmit(e){
    e.preventDefault()

    const daftar =  register('api/users', data)
    if(daftar){
      setCreate(true)
    }

    setUsername('')
    setEmail('')
    setPassword('')
  }

  
  return (
    <div className='w-full h-screen'>
    <div className='flex justify-center items-center'>
      <div className='rounded bg-slate-700 my-48'>
        <div className='  p-4 flex flex-col justify-center'>
          {
            create ? <h1 className="text-center text-white p-2">Akun berhasil dibuat</h1> : null
          }
        <form action="submit" encType="multipart/form-data" onSubmit={handleSubmit} className='flex flex-col justify-center w-80'>
          <div className='mb-3 flex flex-col'>
            <label htmlFor="" className='mb-1 font-bold'>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='p-1 rounded'/>
          </div>
          <div className='mb-3 flex flex-col'>
            <label htmlFor="" className='mb-1 font-bold'>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  className='p-1 rounded'/>
          </div>
          <div className='mb-3 flex flex-col'>
            <label htmlFor="" className='mb-1 font-bold'>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  className='p-1 rounded'/>
          </div>
          <button className='p-1 rounded bg-slate-600 text-center'>Daftar</button>
          <Link to='/login' className="text-white mt-1 underline" >Back to Login</Link>
        </form>
        </div>
      </div>
    </div>
  </div>
      )
};

export default Daftar;
