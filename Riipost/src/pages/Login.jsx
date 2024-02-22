import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useNavigate,useLocation } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/UseAuth'


const Login = () => {
  const {token,setAuth} = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const data = {
    username, password
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      
      const loginUser = await axios.post('api/users/login', data ,
      {
        headers : {
          'Content-Type'  : "application/json"
        }
      })
      const token = loginUser?.data.data.token

      window.localStorage.setItem('token' , token)

      setAuth({username, password , token})
      navigate(from, {replace : true})

    } catch (error) {
      if(error){
        setMsg('Username or password invalid!')
      }
    }
  }


  return (
    <>
    { !token ? 
      <div className='w-full h-screen'>
      <div className='flex justify-center items-center'>
        <div className='rounded bg-slate-700 my-48'>
          <div className=' h-72 p-4 flex justify-center flex-col'>
            <h1 className='text-white' >{msg}</h1>
          <form onSubmit={handleSubmit}  className='flex flex-col justify-center w-80'>
            <div className='mb-3 flex flex-col'>
              <label htmlFor="" className='mb-1 font-bold'>Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required className='p-1 rounded'/>
            </div>
            <div className='mb-3 flex flex-col'>
              <label htmlFor="" className='mb-1 font-bold'>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className='p-1 rounded'/>
            </div>
            <button  className='p-1 rounded bg-blue-600 my-2 text-center'>Login</button>
          </form>
            <Link to='/daftar' className='text-white underline p-1'>Belum punya akun..?</Link>
          </div>
        </div>
      </div>
    </div>
    : <Navigate to='/' />
    }
    </>
    )
  }

export default Login