import { useState, useEffect, } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import useRelogin from "../auth/relogin";

const PersistLogin = () => {
  // const [isLoading, setIsLoading] = useState(true);
  // const relog = useRelogin()
  const { auth } = useAuth();

  const token = window.localStorage.getItem('token')

  const getUser = async() => {
    try {
      const result = await axios.get('api/users/current',{
        headers : {
          "Content-Type" : "application/json",
          "Authorization" : auth?.token
        }
      })
      console.log(result.data.data)
      return result.data.data
    } catch (error) {
      if(error)return console.log('ada error nih')
    }
  }

  // useEffect(() => {
    
  //   const verifyToken = async() => {
  //     try {
  //       const data = await relog()
  //       console.log(data)
  //     } catch (error) {
  //       console.error(error)
  //     }finally{
  //       setIsLoading(false)
  //     }
  //   }
  //   !auth?.token ? verifyToken() : setIsLoading(false)
  // }, []);


  useEffect(() => {
    // console.log({isLoading})
    getUser()
    // verifyToken()
  },[])
  return <>
    {
      !token ? <p>
        Loading...
      </p> : <Outlet/>
    }
  </>;
};

export default PersistLogin;
