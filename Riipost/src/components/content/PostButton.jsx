import { useDispatch } from "react-redux";
import { removePost } from "../../redux/api/posts";
import { Link } from "react-router-dom";

const PostButton = ({ token, id, isOpen }) => {
  const dispatch = useDispatch();
  
  return (
    <>
      {isOpen ? (
        <div className="flex flex-col ml-1">
          <button
            className="p-1 border mb-1 rounded text-black border-black hover:bg-red-700 hover:text-white "
            onClick={() => dispatch(removePost(token, id))}
          >
            Delete
          </button>
          <Link to={`/update/${id}`} className="p-1 border rounded border-black hover:bg-blue-600 hover:text-white">Update</Link>
        </div>
      ) : null}
    </>
  );
};

export default PostButton
