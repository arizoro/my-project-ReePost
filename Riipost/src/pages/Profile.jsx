import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile } from '../redux/api/user'

const Profile = () => {
  const dispatch = useDispatch()
  const token = window.localStorage.getItem('token')
  const userProfile = useSelector((state) => state.profile.profile?.data)

  
  useEffect(() => {
    dispatch(getUserProfile(token))
  },[dispatch])
  return (
    
    <div className='w-full h-full bg-slate-200'>
      <div className='flex justify-center items-center flex-col'>
        <div className='p-8 border-black border-b-2 '>
          <img src={userProfile?.image} alt="img" 
            className="rounded-full object-cover object-top w-96 h-96 " />
            <h1 className='text-center mt-4 text-2xl'> {`${userProfile?.first_name} ${userProfile?.last_name}`} </h1>
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