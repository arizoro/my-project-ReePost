import { useDispatch } from "react-redux";
import { userLogOut } from "../../redux/api/auth";

const Dropdown = ({onMouseOut}) => {
  const token = window.localStorage.getItem('token')
  const dispatch = useDispatch()

  return (
    <>
    {
      !token ? null :
        <div className=" w-56 right-0 absolute" onMouseLeave={onMouseOut} >
          <ul className="p-2 flex flex-col bg-black">
            <button className="border-white text-white border-2 p-1 rounded my-2">
              Dashboard
            </button>
            <button
              onClick={() => dispatch(userLogOut(token))}
              className="border-white text-white border-2 p-1 rounded"
            >
              Logout
            </button>
          </ul>
        </div>
    }
    </>
    );
};

export default Dropdown;
