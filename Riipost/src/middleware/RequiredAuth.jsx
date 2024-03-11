import { useLocation,Navigate, Outlet } from "react-router-dom";

const RequiredAuth = () => {
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