import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";


const AuthUser = () => {
  const userProfile = useSelector((state) => state.profile?.profile?.data);
  const location = useLocation();
  return (
    userProfile 
    ?      
    <Outlet />
    : 
    <Navigate  to="/create" state={{ from: location }} replace />
    );
  };
  

export default AuthUser;
