import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserProfileById } from "../redux/api/user";
import { useParams } from "react-router-dom";
import nonprofile from "../assets/nonprofile.png";
import { getPostById } from "../redux/api/posts";
import Post from "../components/content/Post";
const imgURL = import.meta.env.VITE_IMAGE_URL;

const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const token = window.localStorage.getItem("token");
  const userProfile = useSelector((state) => state.profile.profile?.data);
  const userProfileById = useSelector((state) => state.profile.profileId?.data);
  const posts = useSelector((state) => state.posts?.postUser);
  console.log(posts);

  useEffect(() => {
    if (!id) {
      dispatch(getPostById(token, userProfile?.id));
      dispatch(getUserProfile(token));
    } else {
      dispatch(getUserProfileById(token, id));
      dispatch(getPostById(token, id));
    }
  }, [dispatch, id]);
  return (
    <>
      <div className="w-full h-full bg-slate-200">
        <div className="flex justify-center items-center flex-col">
          <div className="p-8 border-black border-b-2 ">
            {!userProfile?.image ? (
              <img
                src={nonprofile}
                alt="img"
                className="rounded-full object-cover object-top w-96 h-96 "
              />
            ) : (
              <img
                src={
                  !id
                    ? `${imgURL}${userProfile?.image}`
                    : `${imgURL}${userProfileById?.image}`
                }
                alt="img"
                className="rounded-full object-cover object-top w-96 h-96 "
              />
            )}
            <h1 className="text-center mt-4 text-2xl">
              {`${!id ? userProfile?.first_name : userProfileById?.first_name} 
              ${
                !id ? userProfile?.last_name : userProfileById?.last_name
              }`}{" "}
            </h1>
          </div>
          <div className="w-full h-full  mt-20">
            <h1 className="text-black font-bold text-2xl mx-8 mb-4 underline ">
              {!id ? "My Post" : "Post"}
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3 px-4">
          {posts.data?.map((post, i) => {
            return (
              <div
                key={i}
                className=" px-4 my-8 flex justify-center items-center bg-slate-300 rounded-md"
              >
                <div className=" w-4/6  ">
                  <Post post={post} imgURL={imgURL} token={token} user={userProfile}  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Profile;
