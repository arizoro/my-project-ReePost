import axios from "axios";
export const axiosLogin =  axios.create()

const authToken = async (data) => {
  axiosLogin.interceptors.request.use(
    async (config) => {
      if (!auth?.token) {
        const response = await axios.post(
          "api/users/login",data,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        config.headers.Authorization = response?.data.data.token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default authToken