import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "../../redux/api/comments";
import nonprofile from "../../assets/nonprofile.png";
import { useSelector } from "react-redux";
const imgURL = import.meta.env.VITE_IMAGE_URL;

const Comment = ({ users, postId, comment }) => {
  const [open, setOpen] = useState(false);
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profile.profile?.data);


  const handleOpen = () => {
    setOpen((open) => !open);
  };

  return (
    <>
      <div className="mx-2 p-2 border-2 border-black rounded bg-red-500 w-2/6">
        <div className="flex justify-start">
          {users?.data?.map((user, i) => {
            if (user?.id === comment?.profile_id) {
              return (
                <div key={i} className="flex flex-row items-center" >
                  <img
                    src={!user?.image ? nonprofile : `${imgURL}${user.image}`}
                    alt="img"
                    className="rounded-full w-8 h-8"
                  />
                  <h1 className="mx-2 underline">
                    {user.first_name} {user.last_name}
                  </h1>
                </div>
              );
            }
          })}
        </div>
        <div className="flex justify-between">
          <h1 className="mt-2">{comment?.body}</h1>
          <div className="flex flex-row mx-4 ">

            { userProfile?.id === comment.profile_id ?
            <button onClick={handleOpen} className=" flex justify-center ">
              <CaretDown size={20} />
            </button>
            :
            null
            }
            <div className="flex justify-end ">
              {open ? (
                <>
                  <button
                    onClick={() =>
                      dispatch(removeComment(token, postId, comment.id))
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
    </>
  );
};

export default Comment;
