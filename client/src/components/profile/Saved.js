import { useState, useEffect } from "react";
import PostThumb from "./PostThumb";
import Spinner from "../Spinner";
import LoadMoreBtn from "./LoadMoreBtn";
import { getDataAPI } from "../../functions/fetcher";
import { actionTypes } from "../../store/actions/actionTypes";

const Saved = ({ auth, dispatch }) => {
  const [savedposts, setSavedPosts] = useState([]);
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    getDataAPI("getBookmarks", auth.token)
      .then((res) => {
        setSavedPosts(res.data.savedPosts);
        setResults(res.data.result);
        setLoad(false);
      })
      .catch((err) =>
        dispatch({
          type: actionTypes.NOTIFY,
          payload: { error: err.response.data.msg },
        })
      );
  }, [auth.token, dispatch]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(
      `getBookmarks?limit=${page * 9}`,
      auth.token
    );
    setSavedPosts(res.data.savedPosts);
    setResults(res.data.result);
    setPage(page + 1)
    setLoad(false);
  };

  return (
    <div className="w-full md:w-5/6 lg:w-3/4 border border-gray-100">
      <h1 className="py-2 text-center text-rose-500 font-bold">Recent posts</h1>
      {load ? (
        <h3 className="text-lg text-center text-truegray-600 font-bold">Loading...</h3>
      ) : savedposts.length > 0 ? (
        <PostThumb posts={savedposts} results={results} />
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

export default Saved;
