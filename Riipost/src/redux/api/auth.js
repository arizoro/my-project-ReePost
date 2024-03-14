import axios from "axios";
import { loginUser } from "../slices/authSlice";
import { persistor } from "../store/store";

const baseUrl = import.meta.env.VITE_BASE_URL

export const login = (data) => {
  return async (dispatch, getState) => {
    try {
      const result = await axios.post(
        `${baseUrl}api/users/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(result.data)
      const token = result.data?.data.token;
      window.localStorage.setItem("token", token);
      dispatch(loginUser());
    } catch (error) {
      // dispatch(loginUser({error :error}));
      console.log(error);
    }
  };
};

export const userLogOut = (token) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${baseUrl}api/users/current`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      persistor.purge();
      window.localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
};
