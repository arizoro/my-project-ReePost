import axios from "axios";
import { getAllUser, setUser } from "../slices/usersSlice";
import { createUser, getUser, setProfileId } from "../slices/profileSlice";

const baseUrl = import.meta.env.VITE_BASE_URL

export const createdUser = (data) => {
  return async(dispatch)=> {
    try {
      await axios.post(`${baseUrl}api/users`,
      data ,
    {
      headers : {
        "Content-Type" : "application/json"
      }
    })
    dispatch(setUser())
    } catch (error) {
      console.error(error)
    }
  }
}

export const getUserProfile = (token) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${baseUrl}api/users/profile`, {
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

export const getUserProfileById = (token,id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${baseUrl}api/users/profile/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(setProfileId(result.data))

    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllUsersProfile = (token) => {
  return async(dispatch) => {
    try {
      const result = await axios.get(`${baseUrl}api/users/allProfile`,{
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
        `${baseUrl}api/users/profile`,formData,
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