import axios from "axios";
import React from "react";
import { useState } from "react";
import useAuth from "./hooks/UseAuth";
import { useNavigate } from "react-router-dom";

const CreateProfile = () => {
  const { token } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [image, setImage] = useState('');
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData()
    formData.append('first_name' , firstName)
    formData.append('last_name' , lastName)
    formData.append('image' , image)

    const profile = await axios.post(
      "http://localhost:3000/api/users/profile",formData,
      {
        headers: {
          "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      }
    );
    if(profile.data){
      navigate('/')
    }
    console.log(profile);
  };

  return (
    <div className="w-full h-screen ">
      <div className="flex justify-center items-center mt-10">
        <div className="rounded border-2 border-black">
          <div className="p-4 flex justify-center ">
            <h1 className="text-white"></h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center "
            >
              <div className="mb-3 flex flex-col">
                <label htmlFor="" className="mb-1 font-bold">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="p-1 rounded border-2 border-black"
                />
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="" className="mb-1 font-bold">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="p-1 rounded border-2 border-black"
                />
              </div>
              <div className="mb-3 flex flex-col">
                <label htmlFor="" className="mb-1 font-bold">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="p-1 rounded border-2 border-black"
                />
              </div>
              <button className="p-1 rounded bg-blue-600 my-2 text-center">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProfile;
