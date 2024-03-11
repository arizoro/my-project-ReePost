import { useState } from "react";
import { createComment } from "../../redux/api/comments";
import { useDispatch } from "react-redux";
import { ChatCircle, Heart } from "@phosphor-icons/react";

const BoxComment = ({token, id}) => {
  const [comment, setComment] = useState('');
  const [isOpen, setIsOpen] = useState()
  const [like, SetLike] = useState(15);
  const dispatch = useDispatch()

  const handlePostComment = async (e) => {
    e.preventDefault();
    dispatch(createComment(token, id, comment))
    setComment('')    
  };

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  const handleLike = () => {
    if (like % 2 == 0) {
      SetLike((like) => like - 1);
    }
    if (like % 2 == 1) {
      SetLike((like) => like + 1);
    }
  };

  return (
    <div className="flex justify-start flex-col">
    <div className="mt-2 flex justify-start items-center">
      <button onClick={handleLike} className="flex">
        <Heart
          size={24}
          className={like % 2 == 0 ? "text-red-600" : ""}
        />
        <span className=" text-sm">{like}</span>
      </button>
      <button className="mx-2">
        <ChatCircle size={24} onClick={handleOpen} />
      </button>
    </div>
    {isOpen ? (
      <div className="flex mt-2">
        <textarea
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          className="w-full p-4"
          autoFocus
        ></textarea>
        <button
          onClick={handlePostComment}
          className=" items-center mx-2 h-10 w-20 bg-blue-600 rounded"
        >
          Send
        </button>
      </div>
    ) : null}
  </div>
  );
};

export default BoxComment;
