import { useState } from "react";
import CarouselPost from "./CarouselPost";

const PostBody = ({ post }) => {
  const [readMore, setReadMore] = useState(false);

  return (
    <div className="font-comfotaar">
      <div className="text-truegray-900 text-sm font-semibold ml-2">
        {post.content.length < 60
          ? post.content
          : post.content.slice(0, 60) + "....."}
        {post.content.length > 60 && (
          <span
            onClick={() => setReadMore((prev) => !prev)}
            className="cursor-pointer text-lightblue-500"
          >
            {readMore ? 'hide' : 'read'}
          </span>
        )}
        {readMore && <p className="text-sm">{post.content}</p>}
      </div>
      <div className="">
        {post.images.length > 0 && <CarouselPost images={post.images} />}
      </div>
    </div>
  );
};

export default PostBody;
