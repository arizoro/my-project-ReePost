import { useState } from "react";
import { useDispatch } from "react-redux";
import { createdPost } from "../../redux/api/posts";

const PostBox = () => {
  const token = window.localStorage.getItem("token");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [prevImage, setPrevImage] = useState(null)
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const handleImage = (e) => {
    const upload = URL.createObjectURL(e.target.files[0])
    setPrevImage(upload)
    setImage(e.target.files[0]);
  };

  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  if (image !== null) {
    formData.append("image", image);
  }

  const postData = async (e) => {
    e.preventDefault();
    await dispatch(createdPost(token, formData));

    setTitle("");
    setContent("");
    setImage(null);
  };


  return (
    <div className="mt-4 flex justify-center items-center flex-col w-full">
      <form
        onSubmit={postData}
        className="flex flex-col w-8/12 border-black border-b-2"
      >
        <div className="flex flex-col ">
          <label className="text-xl font-bold">Title</label>
          <input
            type="text"
            value={title}
            className="h-8 border border-black p-6"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex flex-col ">
        {
            prevImage ? 
            <img src={prevImage} alt="" className=" w-28 h-28 bg-cover object-contain my-2 " />
            : null
          }
          <input
            className="mt-1"
            type="file"
            accept="image/*"
            onChange={handleImage}
          />
        </div>

        <div className="flex flex-col ">
          <label className="text-xl font-bold ">Content</label>
          <textarea
            value={ content}
            onChange={(e) => setContent(e.target.value)}
            className=" h-24 border border-black p-2"
          ></textarea>
        </div>

        <div className="flex justify-end p-1">
          <button className=" bg-blue-500 w-20 p-1 rounded">Send</button>
        </div>
      </form>
    </div>
  );
};

export default PostBox;
