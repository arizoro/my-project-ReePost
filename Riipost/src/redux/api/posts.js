import axios from "axios";
import { addPage, getDetail, getPosts, minPage } from "../slices/postsSlice";
// const token = window.localStorage.getItem('token')

export const getPost = (token,query,page) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(`api/allPost?${query}=${page}`, {
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

export const getDetailPost = (token, id) => {
  return async(dispatch) => {
    try {
      const result = await axios.get(`http://localhost:3000/api/posts/${id}`,{
        headers : {
          "Content-Type" : "application/json",
          Authorization : token
        }
      })
      console.log(result.data)
      dispatch(getDetail(result.data))
    } catch (error) {
      console.error(error)
    }
  }
}

export const createdPost = (token , formData) => {
  return async(dispatch) => {
    try {
      await axios.post(
        "http://localhost:3000/api/posts",
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

export const removePost = (token, id) => {
  return async(dispatch,getState) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`,
      {
        headers : {
          "Content-Type" : "application/json",
          Authorization : token
        }
      })
      dispatch(getPost(token))
      // console.log(getState())
      // const posts = getState().posts.data.data
      // const post = posts.filter((post) => post.id != id)
      // dispatch(getPosts(post))

    } catch (error) {
      console.error(error)
    }
  }
}
