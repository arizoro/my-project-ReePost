import { Link } from "react-router-dom";
import noneProfile from "../../assets/nonprofile.png";

import Post from "./Post";

const imgURL = import.meta.env.VITE_IMAGE_URL;

const Content = ({ post, users }) => {


  return (
    <>
      <div className="flex justify-center items-center">
        <div className="w-8/12 ">
          <div className="flex flex-col py-6 ">
            {users?.data?.map((user, i) => {
              if (user?.id === post?.profile_id) {
                return (
                  <div key={i} className="flex justify-between">
                    <Link
                      to={`/profile/${user?.id}`}
                      className="flex justify-center items-center"
                    >
                      <img
                        src={
                          !user?.image
                            ?  noneProfile
                            : `${imgURL}${user?.image}`
                        }
                        alt="img"
                        className="rounded-full w-10 h-10"
                      />
                      <h1 className="mx-2">
                        {user?.first_name} {user?.last_name}
                      </h1>
                    </Link>
                  </div>
                );
              }
            })}
            <Post post={post} imgURL={imgURL} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
