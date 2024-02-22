import React from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

const Pagination = ({onRightPage, onLeftPage, paging}) => {
  return (
    <div className="flex justify-around my-8">
      <button
      onClick={onLeftPage}
      className="p-1 rounded bg-blue-600 text-white">
        <CaretLeft size={32} />
      </button>
      <button className="p-1 w-10 rounded bg-black text-white">
        {paging.page}
      </button>
      <button onClick={onRightPage} className="p-1 rounded bg-blue-600 text-white">
        <CaretRight size={32} />
      </button>
    </div>
  );
};

export default Pagination;
