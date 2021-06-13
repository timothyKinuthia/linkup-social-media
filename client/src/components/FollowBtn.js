import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { follow, unFollow } from "../store/actions/profileActions";

const FollowBtn = ({ user }) => {
  const [followed, setFollowed] = useState(false);

  const { auth, profile } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((u) => u._id === user._id)) {
      setFollowed(true);
    };

    return () => setFollowed(false);
    
  }, [auth.user.following, user._id]);

  const handleUnfollow = () => {
    setFollowed(false);
    dispatch(unFollow({ users: profile.users, user, auth }));
  };

  const handleFollow = () => {
    setFollowed(true);
    dispatch(follow({ users: profile.users, user, auth }));
  };

  return (
    <>
      {followed ? (
        <button
          onClick={handleUnfollow}
          className="text-xs sm:text-sm md:border text-red-600  py-2 px-4 hover:text-red-800 hover:bg-red-200 font-semibold focus:outline-none sm:rounded"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="text-xs sm:text-sm md:border   text-lightblue-600  py-1 sm:py-1 px-4 hover:bg-bluegray-400 hover:text-white focus:outline-none sm:rounded-sm"
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowBtn;
