import { useState, useEffect } from "react";
import PostThumb from "./PostThumb";
import Spinner from "../Spinner";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "../../functions/fetcher";
import { profileTypes } from "../../store/actions/profileActions";

const Posts = ({ id, auth, profile, dispatch }) => {
  const [posts, setPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    profile.userPosts.forEach((p) => {
      if (p._id === id) {
        setPosts(p.posts);
        setResults(p.results);
        setPage(p.page);
      }
    });
  }, [id, profile.userPosts]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `user_posts/${id}?limit=${page * 9}`,
      auth.token
    );

    const newData = { ...res.data, page: page + 1, _id: id };

    dispatch({ type: profileTypes.UPDATE_PROFILE_POSTS, payload: newData });

    setLoad(false);
  };

  return (
    <div className="w-full md:w-5/6 lg:w-3/4 border border-gray-100">
      <h1 className="py-2 text-center text-rose-500 font-bold">Recent posts</h1>
      {posts.length > 0 ? (
        <PostThumb posts={posts} results={results} />
      ) : (
        <h2 className="text-center font-bold mt-6">No posts added recently</h2>
      )}

      {load && <Spinner />}
      <LoadMoreBtn
        result={results}
        page={page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
