import axios from "axios";
import { getDetail, getPosts, postUsers} from "../slices/postsSlice";

const baseUrl = import.meta.env.VITE_BASE_URL

export const getPost = (token,query,value) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`${baseUrl}api/posts?${query}=${value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(getPosts(result.data))
    } catch (error) {
      console.error();
    }
  };
};

export const getPostById = (token,id) => {
  return async(dispatch)=> {
    try {
      const result = await axios.get(`${baseUrl}api/userPost/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      dispatch(postUsers(result.data))
    } catch (error) {
      console.error(error)
    }
  } 
}

export const getDetailPost = (token, id) => {
  return async(dispatch) => {
    try {
      const result = await axios.get(`${baseUrl}api/posts/${id}`,{
        headers : {
          "Content-Type" : "application/json",
          Authorization : token
        }
      })
      dispatch(getDetail(result.data))
      scrollTo({
        behavior: "smooth",
        top: 20,
      })
    } catch (error) {
      console.error(error)
    }
  }
}

export const createdPost = (token , formData) => {
  return async(dispatch) => {
    try {
      await axios.post(
        `${baseUrl}api/posts`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      dispatch(getPost(token))
    } catch (error) {
      console.error(error)
    }
  }
}

export const updatedPost = (token, id, formData) => {
  return async(dispatch, getState) => {
    try {
      const result = await axios.put(`${baseUrl}api/posts/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      console.log(getState().posts.postUser)
      dispatch(getPostById(token,id))
    } catch (error) {
      console.error(error)
    }
  }
}

export const removePost = (token, id) => {
  return async(dispatch,getState) => {
    try {
      await axios.delete(`${baseUrl}api/posts/${id}`,
      {
        headers : {
          "Content-Type" : "application/json",
          Authorization : token
        }
      })
      const posts = getState().posts.postUser.data
      const post = posts.filter((post) => post.id != id)
      
      dispatch(postUsers({data : post}))

    } catch (error) {
      console.error(error)
    }
  }
}

