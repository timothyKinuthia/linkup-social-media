import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import FollowBtn from "../FollowBtn";

const ProfileUserCard = ({
  users,
  auth,
  setShowFollowers,
  setShowFollowing,
}) => {
  const handleClose = () => {
    if (setShowFollowers) {
      setShowFollowers(false);
    }

    if (setShowFollowing) {
      setShowFollowing(false);
    }
  };

  return (
    <div
      onClick={(evt) => evt.stopPropagation()}
      className="absolute bg-white w-3/4 sm:w-2/4 rounded-md overflow-hidden"
    >
      <h1 className="text-lg font-bold text-center text-lightblue-500 py-1 bg-lightblue-100">
        {users.length === 0 ? 0 : ""}
        {""} Followers
      </h1>

      {users &&
        users.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between py-2 px-4 sm:px-6 border-b border-gray-100"
          >
            <Avatar src={user.avatar} alt="avatar" width={16} height={16} />

            <div>
              <div className="text-lg font-bold text-gray-900">
                {user.fullname}
              </div>
              <Link
                to={`/profile/${user._id}`}
                className="text-lightblue-500 font-semibold"
                onClick={handleClose}
              >
                {user.username}
              </Link>
            </div>

            {auth.user._id !== user._id && <FollowBtn user={user} />}
          </div>
        ))}
    </div>
  );
};

export default ProfileUserCard;
