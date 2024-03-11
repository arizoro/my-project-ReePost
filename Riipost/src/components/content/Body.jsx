import { useEffect } from "react";
import Content from "./Content";
import SideBar from "../utils/SideBar";
import Pagination from "../utils/Pagination";
import PostBox from "../utils/PostBox";
import { useDispatch } from "react-redux";
import { getPost } from "../../redux/api/posts";
import { useSelector } from "react-redux";
import { getAllUsersProfile} from "../../redux/api/user";
import { Navigate } from "react-router-dom";

const Body = () => {
  const token = window.localStorage.getItem('token')
  const dispatch = useDispatch()

  const posts = useSelector((state) => state.posts.data)
  const pagging = useSelector((state) => state.posts.data.pagging)
  const page = useSelector((state)=> state.posts.pages)
  const userProfile = useSelector((state) => state.profile.profile.data)
  const allUsersProfile = useSelector((state) => state.users?.users)

  useEffect(() => {
    dispatch(getPost(token,page.query,page.page))
    dispatch(getAllUsersProfile(token))
  }, [dispatch, page.page, page.query , token]);


  return (
    <>
    {
      userProfile 
      ?
    <div className="w-full h-full flex justify-start ">
      <SideBar user={userProfile} />
      <div className="w-full h-full flex flex-col ">
        <div className="w-8/12 border-r-2 border-l-2">
          <PostBox />
          {posts?.data?.map((post, i) => {
            return <Content post={post} key={i} users={allUsersProfile} />;
          })}
          <Pagination
            pagging={pagging}
          />
        </div>
      </div>
    </div>
      :
      <Navigate to='/create' />
    }
    </>
  );
};

export default Body;
