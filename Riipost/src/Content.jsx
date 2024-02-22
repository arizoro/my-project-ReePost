import React from "react";
import { Heart, ChatCircle, DotsThreeVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import noneProfile from "./assets/nonprofile.png";
import axios from "axios";
import useAuth from "./hooks/UseAuth";

const imgURL = "http://localhost:3000/image/";

const Content = ({ post, users }) => {
  const { token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [like, SetLike] = useState(15);
  const [comment, setComment] = useState({});

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  const handleOpen2 = () => {
    setIsOpen2((open) => !open);
  };

  const handlePostComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `api/posts/${post.id}/comments`,
        {
          body: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const deletePost = async () => {
    try {
      const remove = await axios.delete(`api/posts/${post.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      console.log(remove.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLike = () => {
    if (like % 2 == 0) {
      SetLike((like) => like - 1);
    }
    if (like % 2 == 1) {
      SetLike((like) => like + 1);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-8/12 ">
          <div className="flex flex-col py-6 ">
            {users?.data?.map((user, i) => {
              if (user?.id === post?.profile_id) {
                return (
                  <div key={i} className="flex justify-between">
                    <Link
                      to="/profile"
                      className="flex justify-center items-center"
                    >
                      <img
                        src={
                          !user?.image
                            ? { noneProfile }
                            : `${imgURL}${user?.image}`
                        }
                        alt="img"
                        className="rounded-full w-10 h-10"
                      />
                      <h1 className="mx-2">
                        {user?.first_name} {user?.last_name}
                      </h1>
                    </Link>
                    <button className=" flex justify-end" onClick={handleOpen2}>
                      <DotsThreeVertical size={26} />
                    </button>
                  </div>
                );
              }
            })}

            <div className="my-4 w-full">
              <div className="flex justify-between ">
                {post?.image ? (
                  <img
                    src={`${imgURL}${post.image}`}
                    alt="img"
                    className="w-full h-10/12 bg-cover content-center"
                  />
                ) : null}

                {isOpen2 ? (
                  <div className="flex flex-col ml-2">
                    <button
                      className="p-1 border mb-1 rounded text-black border-black hover:bg-red-700 hover:text-white "
                      onClick={deletePost}
                    >
                      Delete
                    </button>
                    <button className="p-1 border rounded border-black">
                      Update
                    </button>
                  </div>
                ) : null}
              </div>

              <Link
                to={`/posts/${post?.id}`}
                className="mt-2 font-bold underline text-2xl"
              >
                {post?.title}
              </Link>
              <p className="mt-2">{post?.content}</p>
            </div>
            <div className="flex justify-start flex-col">
              <div className="mt-2 flex justify-start items-center">
                <button onClick={handleLike} className="flex">
                  <Heart
                    size={24}
                    className={like % 2 == 0 ? "text-red-600" : ""}
                  />
                  <span className=" text-sm">{like}</span>
                </button>
                <button className="mx-2">
                  <ChatCircle size={24} onClick={handleOpen} />
                </button>
              </div>
              {isOpen ? (
                <div className="flex mt-2">
                  <textarea
                    onChange={(e) => setComment(e.target.value)}
                    className=" w-72"
                    autoFocus
                  ></textarea>
                  <button
                    onClick={handlePostComment}
                    className=" items-center mx-2 h-10 w-20 bg-blue-600 rounded"
                  >
                    Send
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
