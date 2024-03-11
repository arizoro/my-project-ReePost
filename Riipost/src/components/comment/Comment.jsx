import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/api/comments";

const Comment = ({ user, postId,comment }) => {
  const [open, setOpen] = useState(false);
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch()

  const handleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <div  className="mx-2 p-2 border-2 border-black rounded">
      <div className="flex justify-start">
        <img
          src={!user.image ? { noneProfile } : `${user.image}`}
          alt="img"
          className="rounded-full w-8 h-8"
        />
        <h1 className="mx-2 underline">
          {user.first_name} {user.last_name}
        </h1>
      </div>
      <div className="flex justify-between">
        <h1 className="mt-2">{comment?.body}</h1>
        <div className="flex flex-col mx-4  ">
          <button onClick={handleOpen} className=" flex justify-center ">
            <CaretDown size={20} />
          </button>
          <div className="flex justify-center relative ">
            {open ? (
              <>
                <button
                  onClick={() => dispatch(removeComment(token, postId, comment.id))
                  }
                  className="bg-red-600 p-1 rounded mx-2"
                >
                  Hapus
                </button>
                <button className="bg-blue-600 p-1 rounded w-12">Edit</button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
