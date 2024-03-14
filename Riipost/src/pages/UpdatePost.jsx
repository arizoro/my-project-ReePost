import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatedPost } from "../redux/api/posts";
import { useParams } from "react-router-dom";

const UpdatePost = () => {
    const token = window.localStorage.getItem("token");
    const {id} = useParams()
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [content, setContent] = useState("");
  
    const dispatch = useDispatch();
    const handleImage = (e) => {
      setImage(e.target.files[0]);
    };
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (image !== null) {
      formData.append("image", image);
    }
  
    const postData = async (e) => {
      e.preventDefault();
      await dispatch(updatedPost(token,id,formData));
  
      setTitle("");
      setContent("");
      setImage(null);
    };
  
  
    return (
      <div className="mt-4 flex justify-center items-center flex-col w-full">
        <form
          onSubmit={postData}
          className="flex flex-col w-8/12 border-black border-b-2"
        >
          <div className="flex flex-col ">
            <label className="text-xl font-bold">Title</label>
            <input
              type="text"
              value={title}
              className="h-8 border border-black p-6"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
  
          <div className="flex flex-col ">
            <input
              className="mt-1"
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
  
          <div className="flex flex-col ">
            <label className="text-xl font-bold ">Content</label>
            <textarea
              value={ content}
              onChange={(e) => setContent(e.target.value)}
              className=" h-24 border border-black p-2"
            ></textarea>
          </div>
  
          <div className="flex justify-end p-1">
            <button className=" bg-blue-500 w-20 p-1 rounded">Update</button>
          </div>
        </form>
      </div>
  )
};

export default UpdatePost;