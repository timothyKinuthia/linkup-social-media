import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { discoverTypes, getDiscoverPosts } from "../store/actions/discoverActions";
import Spinner from "../components/Spinner";
import PostThumb from "../components/profile/PostThumb";
import LoadMoreBtn from "../components/profile/LoadMoreBtn";
import { getDataAPI } from "../functions/fetcher";

const Discover = () => {

    const [load, setLoad] = useState(false);

  const dispatch = useDispatch();

  const { auth, discover } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    
      if (!discover.firstLoad) {
        dispatch(getDiscoverPosts(auth.token));
      }
  }, [dispatch, auth.token, discover.firstLoad]);
    
    if (discover.posts.length === 0 && !discover.loading) {
        return <h2 className="mt-6 text-lg font-bold text-center text-gray-700">No posts found</h2>
    }

    const handleLoadMore = async() => {
        setLoad(true);
        const res = await getDataAPI(`posts_discover?num=${discover.page * 3}`, auth.token);

        dispatch({ type: discoverTypes.UPDATE_DISCOVER_POST, payload: res.data });

        setLoad(false);
    }

  return (
    <div className="mx-4 mt-4 space-y-4">
      {discover.loading ? (
        <Spinner />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}
      
      {load && <Spinner />}
      <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />
    </div>
  );
};

export default Discover;
