import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import axios from "axios";
import useAuth from "./hooks/UseAuth";

const Pagination = ({ page,getAllpost }) => {
  const {token} = useAuth()
  const handleRight = async () => {
    const result = await getAllpost('page', page.page + 1 )
    console.log(result)
    // const result = await axios.get(`api/allPost?page=${page.page+1}`,{
    //   headers : {
    //     "Content-Type" : "application/json",
    //     Authorization : token,
    //   }
    // })
    // console.log(result)
  }
  return (
    <div className="flex justify-around my-8">
      <button
      // onClick={handleLeft}
      className="p-1 rounded bg-blue-600 text-white">
        <CaretLeft size={32} />
      </button>
      <button className="p-1 w-10 rounded bg-black text-white">
        {page.page}
      </button>
      <button onClick={handleRight} className="p-1 rounded bg-blue-600 text-white">
        <CaretRight size={32} />
      </button>
    </div>
  );
};

export default Pagination;
