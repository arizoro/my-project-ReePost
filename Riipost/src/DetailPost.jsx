import { useParams } from "react-router-dom";
import useAuth from "./hooks/UseAuth";
import { useState } from "react";
import { useEffect } from "react";
import { getAllProfile, getPostApi } from "./api/api";
import Content from "./Content";
import { Link } from "react-router-dom";
import noneProfile from "./assets/nonprofile.png";
const imgURL = "http://localhost:3000/image/";

const DetailPost = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const { token } = useAuth();

  const getDetailPost = async () => {
    const result = await getPostApi(
      `http://localhost:3000/api/posts/${params.id}`,
      token
    );
    setPost(result?.data);
    setUser(result?.data.profile);
  };

  useEffect(() => {
    getDetailPost();
  }, []);

  return (
    <>
      <div className=" w-full h-screen ">
        <div className=" flex justify-center">
          <div className=" flex-col my-8 ">
            <Link to="/profile" className="flex justify-center items-center absolute left-8 ">
              <img
                src={!user?.image ? { noneProfile } : `${imgURL}${user?.image}`}
                alt="img"
                className="rounded-full w-12 h-12"
              />
              <h1 className="mx-2 font-bold text-2xl underline">
                {user?.first_name} {user?.last_name}
              </h1>
            </Link>
            <div className="flex justify-center mt-6">
              <Content post={post} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPost;
