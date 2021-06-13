import { Link } from "react-router-dom";
import { ChatIcon, Heart } from "../../icon";

const PostThumb = ({ posts, results }) => {
  if (results === 0) {
    return (
      <h2 className="text-lg font-bold text-center text-truegray-500">
        No posts found
      </h2>
    );
  }
  return (
    <div className="span-2 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-col-5 gap-2 ">
      {posts.map((p) => (
        <Link key={p._id} to={`/post/${p._id}`}>
          <div className="relative w-full h-56">
            <img
              className="w-full h-full object-cover"
              src={p.images[0].url}
              alt="post"
            />

            <div className="absolute flex justify-center items-center inset-0 opacity-0 hover:bg-black hover:opacity-100 hover:bg-opacity-50">
              <span className="text-white flex items-center">
                <Heart />{" "}
                <span className="ml-0.5 text-sm">{p.likes.length}</span>
              </span>
              <span className="ml-4 text-white flex items-center">
                {" "}
                <ChatIcon />
                <span className="ml-0.5 text-sm">{p.comments.length}</span>
              </span>
            </div>
          </div>
          <div></div>
        </Link>
      ))}
    </div>
  );
};

export default PostThumb;
