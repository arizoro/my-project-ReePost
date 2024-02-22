import { useState,useEffect } from 'react'
import { getUserProfile } from '../api/api'
import useAuth from '../hooks/UseAuth'
import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState({})
  const {token} = useAuth()
  const navigate = useNavigate()

  const getData = async() => {
    const result = await getUserProfile('api/users/profile',token)
    setUser(result)
    if(!result){
      navigate('/create')
      return
    }
  }
  
  useEffect(() => {
    if(user){
      getData()
    }
  },[])
  return (
    <div className='w-full h-full bg-slate-200'>
      <div className='flex justify-center items-center flex-col'>
        <div className='p-8 border-black border-b-2 '>
          <img src={user?.image} alt="img" 
            className="rounded-full object-cover object-top w-96 h-96 " />
            <h1 className='text-center mt-4 text-2xl'> {`${user?.first_name} ${user?.last_name}`} </h1>
        </div>
        <div className='w-full h-full flex flex-col mt-20'>
          <div className='w-7/12 '>
            <h1 className='text-black font-bold text-2xl mx-8 mb-4 underline '>My Post</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile