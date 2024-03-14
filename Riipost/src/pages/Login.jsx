import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../redux/api/auth'
import { useSelector } from 'react-redux'
import { getUserProfile } from '../redux/api/user'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/utils/Loading'


const Login = () => {
  const token = window.localStorage.getItem('token')
  const isLogin = useSelector((state) => state.auth.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const [msg, setMsg] = useState('')

  const dispatch = useDispatch()

  const data = {
    username, password
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    dispatch(login(data))
    setTimeout(()=> {
      if(isLogin === false){
        setMsg('Email or password failed')
      }
    },500)
  }

  
  useEffect(()=> {
    if(token){
      setLoading(true)
      dispatch(getUserProfile(token))
      setTimeout(()=> {
        setLoading(false)
        navigate('/')
      },800)
    }
  },[token])

  return (
    <>
    {
      loading ? <Loading/> 
      :
      <div className='w-full h-screen'>
      <div className='flex justify-center items-center'>
        <div className='rounded bg-slate-700 my-48'>
          <div className=' h-72 p-4 flex justify-center flex-col'>
            {
              !isLogin ? 
              <h1 className='text-white' >{msg}</h1> 
              : null
            }
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
    }
    </>
    )
  }

export default Login