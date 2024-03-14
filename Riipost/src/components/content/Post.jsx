import { Link } from "react-router-dom";
import PostButton from "./PostButton";
import { useState } from "react";
import { DotsThreeVertical } from "@phosphor-icons/react";

const Post = ({ post, imgURL, token, user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };
  return (
    <div className="my-4 w-full">
      <div className="flex justify-between ">
        {post?.image ? <img src={`${imgURL}${post.image}`} alt="img" /> : null}
        {
          user?.id == post?.profile_id ?
        <button onClick={handleOpen} className=" h-0 ">
          <DotsThreeVertical size={24} />
        </button> :null
        }
        <PostButton token={token} id={post?.id} isOpen={isOpen} />
      </div>

      <Link
        to={`/posts/${post?.id}`}
        className="mt-2 font-bold underline text-2xl"
      >
        {post?.title}
      </Link>
      <p className="mt-2">{post?.content}</p>
    </div>
  );
};

export default Post;
