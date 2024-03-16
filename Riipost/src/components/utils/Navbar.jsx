import { MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import nonprofile from "../../assets/nonprofile.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getPost} from "../../redux/api/posts";
const imgURL = import.meta.env.VITE_IMAGE_URL;
const token = window.localStorage.getItem('token')

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const userProfile = useSelector((state) => state.profile.profile.data);
  const pagging = useSelector((state) => state.posts.data.pagging)

  const dispatch = useDispatch()

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  const mouseOut = () => {
    setIsOpen(false);
  };

  useEffect(()=> {
    if(input){
      dispatch(getPost(token, 'title', input))
    }else{
      dispatch(getPost(token,'query',pagging?.page))
    }
  },[dispatch,input])

  return (
    <>
      <div className=" bg-black flex justify-center items-center p-4 ">
        <div className="w-full flex justify-between mx-3">
          <Link to="/" className=" text-white text-xl font-bold italic">
            RiiPost
          </Link>
          {
            userProfile 
            ? 
          <div className="flex flex-start">
            <input
              onChange={(e)=>setInput(e.target.value)}
              value={input}
              type="text"
              className="p-1 w-56 rounded"
              placeholder="Search..."
            />
            <button 
            className="mx-1 w-10 rounded items-center p-1 bg-blue-800">
              <MagnifyingGlass
                size={20}
                color="white"
                className="text-center"
              />
            </button>
          </div>
          : 
          null
          }
          <div className="flex justify-start items-center cursor-pointer ">
            {userProfile ? 
              <>
                <img
                  src={!userProfile?.image ? nonprofile : `${imgURL}${userProfile?.image}` }
                  alt="img"
                  className="rounded-full object-cover object-top w-8 h-8"
                />
                <Link
                  to="/profile"
                  className=" font-semi-bold mx-2 text-md font-mono text-white "
                >
                  {userProfile.first_name} {userProfile.last_name}
                </Link>
                <button
                  onClick={handleOpen}
                  className="text-white"
                  type="button"
                >
                  <CaretDown size={20} />
                </button>
              </>
            : 
              <button  className="bg-white p-1 rounded w-16 hover:text-blue-900 font-semibold">
                Login
              </button>
            }
          </div>
        </div>
      </div>
      {isOpen ? <Dropdown onMouseOut={mouseOut} /> : ""}
    </>
  );
};

export default Navbar;
