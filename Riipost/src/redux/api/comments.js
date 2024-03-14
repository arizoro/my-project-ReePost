import axios from "axios";
import {  getComment } from "../slices/commentSlice";

const baseUrl = import.meta.env.VITE_BASE_URL

export const getComments = (token, id) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `${baseUrl}api/posts/${id}/comments`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      // console.log(result?.data)
      dispatch(getComment(result.data))
    } catch (error) {
      console.error(error);
    }
  };
};

export const createComment = (token, id, data) => {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        `${baseUrl}api/posts/${id}/comments`,
        {
          body: data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      dispatch(getComments(token,id));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeComment = (token, postId, commentId) => {
  return async(dispatch, getState) => {
    try {
      await axios.delete(
        `${baseUrl}api/posts/${postId}/comments/${commentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      const comments = getState().comments.data?.data
      console.log(comments)
      const comment = comments.filter((comment) => comment.id != commentId)
      dispatch(getComment(comment))
    } catch (error) {
      console.error(error)
    }
  }
}
