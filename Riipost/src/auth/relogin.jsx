import axios from "axios"
import useAuth from "../hooks/UseAuth"

const useRelogin = async() => {
    const { setAuth,auth } = useAuth();
    const data = {
        username :auth?.username,
        password : auth?.password 
    }
    const refresh = async () => {
        const response = await axios.post('api/users/login', data);
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.token.token);
            return { ...prev, token: response.data.token.token }
        });
        return response.data.token.token;
    }
    return refresh;
}

export default useRelogin