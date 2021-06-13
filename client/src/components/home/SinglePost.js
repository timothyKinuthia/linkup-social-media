import React from "react";
import PostBody from "../PostBody";
import PostFooter from "../PostFooter";
import PostHeader from "../PostHeader";
import Comment from "./comment/Comment";
import InputComment from "./comment/InputComment";

const SinglePost = ({ post }) => {
  return (
    <div key={post._id} className="border border-gray-50 font-semibold text-sm">
      <PostHeader post={post} />
      <PostBody post={post} />
      <PostFooter post={post} />
      <Comment post={post} />
      <InputComment post={post} />
    </div>
  );
};

export default SinglePost;
