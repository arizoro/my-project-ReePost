import { createContext, useState } from "react";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    const token = window.localStorage.getItem('token')
    return (
    <AuthContext.Provider value={{ auth, setAuth, token }} >
        {children}
    </AuthContext.Provider>
    )
}

export default AuthContext