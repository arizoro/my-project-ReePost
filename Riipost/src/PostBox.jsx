import React from "react";
import { useState } from "react";
import useAuth from "./hooks/UseAuth";
import axios from "axios";

const PostBox = () => {
  const { token } = useAuth();
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');
  const [create, setCreate] = useState(false);


  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const postData = async(e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      formData.append('title', title)
      formData.append('content', content)
      formData.append('image', image)

      const result = await axios.post(
        "http://localhost:3000/api/posts",formData,
        {
          headers: {
            "Content-Type": "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        }
      )
      if(result.status === 200){
        setTitle('')
        setContent('')
        setImage('')
      }
      console.log(result)
      setCreate(true)
    } catch (error) {
      console.error(error)
    };
  }

  return (
    <div className="mt-4 flex justify-center items-center flex-col w-full">
      {
        create ? <h1 className="text-black font-bold justify-center" >Succses upload your post</h1> 
        : ''
      }
      <form onSubmit={postData}
        className="flex flex-col w-8/12 border-black border-b-2">
        <div className="flex flex-col ">
          <label className="text-xl font-bold">Title</label>
          <input
            type="text"
            value={title}
            className="h-8 border border-black p-2"
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
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className=" h-24 border border-black p-2"
          ></textarea>
        </div>

        <div className="flex justify-end p-1">
          <button
            className=" bg-blue-500 w-20 p-1 rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
