import { Link } from "react-router-dom";
import PostButton from "./PostBox";
const baseUrl = import.meta.env.VITE_API_URL

const Post = ({ post, token, imgURL, isOpen }) => {
  return (
    <div className="my-4 w-full">
      <div className="flex justify-between ">
        {post?.image ? <img src={`${imgURL}${post.image}`} alt="img" /> : null}
        <PostButton token={token} id={post?.id} isOpen={isOpen} />
      </div>

      <Link
        to={`/posts/${post?.id}`}
        className="mt-2 font-bold underline text-2xl"
      >
        {post?.title}
      </Link>
      <p className="mt-2">{post?.content}</p>
      <span>Base URL : {baseUrl}</span>
    </div>
  );
};

export default Post;
