import { useState, useEffect } from "react";
import Content from "./Content";
import SideBar from "./components/SideBar";
import useAuth from "./hooks/UseAuth";
import { getAllProfile, getPostApi, getUserProfile } from "./api/api";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import PostBox from "./PostBox";

const Body = () => {
  const { token, setAuth } = useAuth();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState({});
  const [allUser, setAllUser] = useState({});
  const [page, setPage] = useState({});
  const navigate = useNavigate()

  const getData = async () => {
    const result = await getUserProfile("api/users/profile", token);
    if(!result){
      navigate('/create')
      return
    }
    setUser(result);
  };

  const getAllpost = async () => {
    const result = await getPostApi(`api/allPost`, token);
    setPosts(result);
    setPage(result.pagging);
  };

  const getAllUser = async () => {
    const result = await getAllProfile("api/users/allProfile", token);
    setAllUser(result);
  };

  useEffect(() => {
    getAllpost();
  }, [page.page]);

  useEffect(() => {
    if(user){
      getData();
    }
    getAllUser();
  }, []);

  return (
      <div className="w-full h-full flex justify-start ">
        <SideBar user={user} />
        <div className="w-full h-full flex flex-col ">
          <div className="w-8/12 border-r-2 border-l-2">
            <PostBox/>
            {posts?.data?.map((post, i) => {
              return <Content post={post} key={i} users={allUser} />;
            })}
            <Pagination page={page} getAllPost={getAllpost} />
          </div>
        </div>
      </div>
  );
};

export default Body;
