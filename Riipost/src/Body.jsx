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
  const [paging, setPaging] = useState({});
  const [page, setPage] = useState('');
  const [query, setQuery] = useState('')
  const navigate = useNavigate();

  const getData = async () => {
    const result = await getUserProfile("api/users/profile", token);
    if (!result) {
      navigate("/create");
      return;
    }
    setUser(result);
  };

  const getAllpost = async (query, page) => {
    const result = await getPostApi(`api/allPost?${query}=${page}`, token);
    setPosts(result);
    setPaging(result.pagging);
  };
  console.log(paging)
  const getAllUser = async () => {
    const result = await getAllProfile("api/users/allProfile", token);
    setAllUser(result);
  };

  const pageRight = () => {
    if(paging.page >= paging.total_page) return
    setPage(paging.page + 1)
    setQuery('page')
    scrollTo({
      behavior : "smooth",
      top : 8
    })
  }

  const pageLeft = () => {
    if(paging.page <= 1) return
    setPage(paging.page - 1)
    setQuery('page')

    scrollTo({
      behavior : "smooth",
      top : 8
    })
  }

  useEffect(() => {
    getAllpost(query, parseInt(page));
  }, [query, parseInt(page)]);

  useEffect(() => {
    if (user) {
      getData();
    }
    getAllUser();
  }, []);

  return (
    <div className="w-full h-full flex justify-start ">
      <SideBar user={user} />
      <div className="w-full h-full flex flex-col ">
        <div className="w-8/12 border-r-2 border-l-2">
          <PostBox />
          {posts?.data?.map((post, i) => {
            return <Content post={post} key={i} users={allUser} />;
          })}
          <Pagination onRightPage={pageRight} onLeftPage={pageLeft} paging={paging} />
        </div>
      </div>
    </div>
  );
};

export default Body;
