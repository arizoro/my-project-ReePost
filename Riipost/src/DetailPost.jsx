import { useParams } from "react-router-dom";
import useAuth from "./hooks/UseAuth";
import { useState } from "react";
import { useEffect } from "react";
import { getAllProfile, getPostApi } from "./api/api";
import Content from "./Content";

const DetailPost = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [allUser, setAllUser] = useState({});
  const { token } = useAuth();

  const getDetailPost = async() => {
    const result = await getPostApi('http://localhost:3000/api/allPost',token)
    const hasil = result?.data.filter((data) => data.id == params.id)
    setPost(hasil[0])
  }

  const getAllUser = async() => {
    const result = await getAllProfile('http://localhost:3000/api/users/allProfile',token)
    setAllUser(result)
  }

  useEffect(() => {
    getDetailPost();
    getAllUser()
  }, []);

  return (
  <Content post={post} users={allUser}/>
  );
};

export default DetailPost;
