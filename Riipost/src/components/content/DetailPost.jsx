import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Content from "./Content";
import { Link } from "react-router-dom";
import noneProfile from "../../assets/nonprofile.png";
import Comment from "../comment/Comment";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPost } from "../../redux/api/posts";
import { getComments } from "../../redux/api/comments";
import BoxComment from "../utils/BoxComment";

const DetailPost = () => {
  const params = useParams();
  const token = window.localStorage.getItem('token');
  const dispatch = useDispatch()
  const post = useSelector((state) => state.posts?.post?.data)
  const user = useSelector((state) => state.profile.profile?.data)
  const comments = useSelector((state) => state.comments?.data)

  useEffect(() => {
    dispatch(getComments(token, params.id))
    dispatch(getDetailPost(token, params.id));
  }, [dispatch,comments.length]);

  return (
    <>
      <div className=" w-full h-screen ">
        <div className=" flex justify-center">
          <div className=" flex-col my-8 ">
            <Link
              to="/profile"
              className="flex justify-center items-center absolute left-8 "
            >
              <img
                src={!user?.image ? { noneProfile } : `${user?.image}`}
                alt="img"
                className="rounded-full w-12 h-12"
              />
              <h1 className="mx-2 font-bold text-2xl underline">
                {user?.first_name} {user?.last_name}
              </h1>
            </Link>

            <div className="flex flex-col justify-center mt-6">
              <Content post={post} />

              <div className=" flex justify-center items-center">
              <BoxComment token={token} id={params.id} />
              </div>
            </div>

            <div className="flex flex-col w-8/12 gap-2 "  >
              <h1 className="text-xl font-bold mb-4 underline mx-8">Commentar</h1>
              {comments?.data?.map((comment, i) => {
                return (
                  <Comment
                    key={i}
                    comment={comment}
                    postId={params.id}
                    user={user}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailPost;
