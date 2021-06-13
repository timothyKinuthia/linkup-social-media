import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SinglePost from "./SinglePost";
import Spinner from "../Spinner";
import LoadMoreBtn from "../profile/LoadMoreBtn";
import { getDataAPI } from "../../functions/fetcher";
import { postTypes } from "../../store/actions/postActions";


const Posts = () => {
    const [load, setLoad] = useState(false);

    const dispatch = useDispatch();

    const { homeposts, auth } = useSelector((state) => ({ ...state }));
    


    const handleLoadMore = async () => {
        setLoad(true);
        const res = await getDataAPI(`posts?limit=${homeposts.page * 9}`, auth.token);
    
        dispatch({type: postTypes.GET_POSTS, payload: {...res.data, page: homeposts.page + 1}})
        setLoad(false);
      };

  return (
    <div className="mt-8 mx-4 sm:mx-0 w-5/6 lg:w-4/6 space-y-4 ">
      {homeposts.posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}

      {load && <Spinner />}
      <LoadMoreBtn
        result={homeposts.result}
        page={homeposts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default Posts;
