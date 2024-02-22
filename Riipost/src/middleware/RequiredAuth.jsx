import { useLocation,Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/UseAuth";


const RequiredAuth = () => {
    const {auth} = useAuth()
    const location = useLocation()
    const token = window.localStorage.getItem('token')
    return (
        token ?
        <Outlet/> 
        :
        <Navigate to='/login' state={{ from : location }} replace /> 
    )
}

export default RequiredAuth