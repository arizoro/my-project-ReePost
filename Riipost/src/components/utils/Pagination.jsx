import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useDispatch } from "react-redux";
import { addPage, minPage } from "../../redux/slices/postsSlice";

const Pagination = ({ pagging}) => {
  const dispatch = useDispatch()
  return (
    <div className="flex justify-around my-8">
      <button
      onClick={()=>dispatch( minPage(
        {query :'page', page : pagging.page, total_page: pagging.total_page })
        )}
      className="p-1 rounded bg-blue-600 text-white">
        <CaretLeft size={32} />
      </button>
      <button className="p-1 w-10 rounded bg-black text-white">
        {pagging?.page}
      </button>
      <button onClick={() =>dispatch( addPage(
        {query :'page', page : pagging.page, total_page: pagging.total_page})
        )} 
      className="p-1 rounded bg-blue-600 text-white">
        <CaretRight size={32} />
      </button>
    </div>
  );
};

export default Pagination;
