import axios from "axios";
import { getAllUser } from "../slices/usersSlice";
import { createUser, getUser } from "../slices/profileSlice";

export const getUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const result = await axios.get("http://localhost:3000/api/users/profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(getUser(result.data))

    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllUsersProfile = (token) => {
  return async(dispatch) => {
    try {
      const result = await axios.get('api/users/allProfile',{
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      })
      dispatch(getAllUser(result.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createUserProfile = (token, formData) => {
  return async(dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/users/profile",formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      dispatch(createUser(result.data))
    } catch (error) {
      console.error(error)
    }
  }
}