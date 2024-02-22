import React from "react";
import { MagnifyingGlass, CaretDown } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import useAuth from "../hooks/UseAuth";
import { getUserProfile } from "../api/api";
import nonprofile from '../assets/nonprofile.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { token } = useAuth();
  const [user, setUser] = useState({});

  const getData = async () => {
    const api = await getUserProfile("api/users/profile", token);
    setUser(api);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleOpen = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      {!token ? null : (
        <div className=" bg-black flex justify-center items-center p-4 ">
          <div className="w-full flex justify-between mx-3">
            <Link to="/" className=" text-white text-xl font-bold italic">
              RiiPost
            </Link>
            <div className="flex flex-start">
              <input
                onChange={handleSearch}
                value={input}
                type="text"
                className="p-1 w-56 rounded"
                placeholder="Search..."
              />
              <button className="mx-1 w-10 rounded items-center p-1 bg-blue-800">
                <MagnifyingGlass
                  size={20}
                  color="white"
                  className="text-center"
                />
              </button>
            </div>
            <Link to='/profile' className="flex justify-start items-center cursor-pointer ">
              <img
                src={!user?.image ? nonprofile : user?.image
                }
                alt="img"
                className="rounded-full object-cover object-top w-8 h-8"
              />
              <h1 className=" font-semi-bold mx-2 text-md font-mono text-white ">
                {user?.first_name} {user?.last_name}
              </h1>
              <button onClick={handleOpen} className="text-white" type="button">
                <CaretDown size={20} />
              </button>
            </Link>
          </div>
        </div>
      )}
      {isOpen ? <Dropdown /> : ""}
    </>
  );
};

export default Navbar;
