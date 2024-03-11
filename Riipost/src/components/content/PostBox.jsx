import { useDispatch } from "react-redux";
import { removePost } from "../../redux/api/posts";

const PostBox = ({ token, id, isOpen }) => {
  const dispatch = useDispatch();
  return (
    <>
      {isOpen ? (
        <div className="flex flex-col ml-2">
          <button
            className="p-1 border mb-1 rounded text-black border-black hover:bg-red-700 hover:text-white "
            onClick={() => dispatch(removePost(token, id))}
          >
            Delete
          </button>
          <button className="p-1 border rounded border-black">Update</button>
        </div>
      ) : null}
    </>
  );
};

export default PostBox
