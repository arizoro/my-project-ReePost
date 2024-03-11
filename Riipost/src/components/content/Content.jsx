import { DotsThreeVertical } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import noneProfile from "../../assets/nonprofile.png"

import Post from "./Post";

const imgURL = "http://localhost:3000/image/";

const Content = ({ post, users }) => {
  const token = window.localStorage.getItem('token')
  const [isOpen, setIsOpen] = useState(false);
  

  const handleOpen = () => {
    setIsOpen((open) => !open);
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
                    <button className=" flex justify-end" onClick={handleOpen}>
                      <DotsThreeVertical size={26} />
                    </button>
                  </div>
                );
              }
            })}
            <Post post={post} token={token} imgURL={imgURL} isOpen={isOpen} />


          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
