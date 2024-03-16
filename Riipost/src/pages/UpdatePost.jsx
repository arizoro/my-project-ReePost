import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDetailPost, updatedPost } from "../redux/api/posts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "../components/utils/Loading";
import { useNavigate } from "react-router-dom";
const imgURL = import.meta.env.VITE_IMAGE_URL;

const UpdatePost = () => {
  const token = window.localStorage.getItem("token");
  const { id } = useParams();
  const post = useSelector((state) => state.posts?.post?.data);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleImage = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image?.name !== image) {
    formData.append("image", image);
  }

  const updatePost = (e) => {
    e.preventDefault();
    dispatch(updatedPost(token, id, formData));

    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    dispatch(getDetailPost(token, id));
    setLoading(true);

    setTimeout(() => {
      setTitle(post?.title);
      setContent(post?.content);
      setImage(post?.image)
      setLoading(false);
    }, 1000);
  }, [dispatch, post?.id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mt-4 flex justify-center items-center flex-col w-full">
          <form className="flex flex-col w-8/12 border-black border-b-2">
            <div className="flex flex-col ">
              <label className="text-xl font-bold">Title</label>
              <input
                type="text"
                value={title || ""}
                className="h-8 border border-black p-6"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col ">
              <img
                src={`${imgURL}${post?.image}`}
                className=" w-96 h-80 bg-cover object-contain "
                alt="img_post"
              />

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
                value={content || ""}
                onChange={(e) => setContent(e.target.value)}
                className=" h-24 border border-black p-2"
              ></textarea>
            </div>

            <div className="flex justify-end p-1">
              <button
                onClick={updatePost}
                className=" bg-blue-500 w-20 p-1 rounded"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default UpdatePost;
