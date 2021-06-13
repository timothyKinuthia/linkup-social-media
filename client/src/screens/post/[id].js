import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SinglePost from "../../components/home/SinglePost";
import { getPost } from "../../store/actions/postActions";

const Post = () => {
  const [post, setPost] = useState([]);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth, detailPost } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));

    let newArr = [];

    if (detailPost.length > 0) {
      newArr = detailPost.filter((detail) => detail._id === id);
      setPost(newArr);
    }
  }, [detailPost, auth, dispatch, id]);

  return (
    <div className="flex justify-center items-center">
      <div className="sm:w-1/2 mt-3 pb-16">
        {post.length > 0 ? (
          post.map((p) => <SinglePost key={p._id} post={p} />)
        ) : (
          <h2 className="mt-6 text-lg text-gray-500 font-bold text-center">
            Loading...
          </h2>
        )}
      </div>
    </div>
  );
};

export default Post;
