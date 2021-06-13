import { useState, useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import EditProfile from "./EditProfile";
import FollowBtn from "../FollowBtn";
import Followers from "./Followers";
import Following from "./Following";
import { AtIcon, PhoneIcon } from "../../icon";

const UserInfo = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [dimension, setDimension] = useState(window.innerWidth);

  useEffect(() => {
    const responsive = () => {
      setDimension(window.innerWidth);
    };

    window.addEventListener("resize", responsive);

    return () => window.removeEventListener("resize", responsive);
  }, [dimension]);

  useEffect(() => {
    if (id && id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.find((user) => user._id === id);

      if (newData) {
        setUserData([newData]);
      }
    }
  }, [id, auth.user, dispatch, profile.users, auth]);

  const { pathname } = useLocation();

  return (
    <div className="w-full md:w-5/6 lg:w-3/4 border border-gray-100">
      <div className="bg-white">
        {userData &&
          userData.map((user) => (
            <div key={user._id} className="md:flex">

                <div className="flex justify-center">
                  <img
                    className="hidden lg:block w-full h-full object-cover"
                    src={user.avatar}
                    alt="avatar"
                />
                <img
                  className={`lg:hidden hidden sm:block w-full ${window.innerWidth < 800 ? "h-80" : "h-full"} object-cover`}
                    src={user.avatar}
                    alt="avatar"
                />
                
                <img
                    className="sm:hidden my-4 w-60 h-60 object-cover rounded-full"
                    src={user.avatar}
                    alt="avatar"
                  />
                </div>

              <div
                className={`${
                  dimension < 890
                    ? "flex flex-col space-y-3"
                    : "flex px-6 py-4 justify-between items-start w-full"
                }`}
              >
                <div className="ml-6 md:ml-2 lg:ml-0 space-y-2">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">
                    {user.username}
                  </h3>
                  <span className="text-sm text-gray-400 font-bold">
                    <div className="flex items-center">
                      {user.mobile && (
                        <>
                          <PhoneIcon />
                          <span className="ml-2">{user.mobile}</span>
                        </>
                      )}
                    </div>
                    <div className="mt-1 flex items-center">
                      <AtIcon />
                      <span className="ml-2">{user.email}</span>
                    </div>
                  </span>

                  <div className="text-sm text-coolgray-500 font-medium">
                    {user.address}
                  </div>

                  <a
                    className="text-sm text-lightblue-500 font-medium"
                    href={user.website}
                  >
                    {user.website}
                  </a>
                  <div className="leading-4 max-w-xs sm:max-w-sm overflow-clip w-1/2 sm:w-full">
                    <h3 className="text-base font-medium">Story</h3>
                    <p className="text-gray-500 py-2 truncate">{user.story}</p>
                  </div>

                  <div className="flex">
                    <span
                      onClick={() => setShowFollowing(true)}
                      className="text-xs sm:text-sm font-bold text-lightblue-600 cursor-pointer"
                    >
                      {user.following.length} Following
                    </span>
                    <span
                      onClick={() => setShowFollowers(true)}
                      className="ml-3 sm:ml-4 text-xs sm:text-sm font-bold text-lightblue-600 cursor-pointer"
                    >
                      {user.followers.length} Followers
                    </span>
                  </div>
                </div>
                {auth.user._id === user._id ? (
                  <button
                    onClick={() => setOnEdit(true)}
                    className="mx-2 flex justify-center sm:border border-gray-100 py-2 px-4 hover:border-lightblue-100 focus:outline-none md:shadow-xl"
                  >
                    <span>Edit</span> <span className="ml-1">Profile</span>
                  </button>
                ) : (
                  <FollowBtn user={user} />
                )}

                {onEdit && (
                  <EditProfile setOnEdit={setOnEdit} pathname={pathname} />
                )}

                {showFollowers && (
                  <Followers
                    users={user.followers}
                    setShowFollowers={setShowFollowers}
                  />
                )}
                {showFollowing && (
                  <Following
                    users={user.following}
                    setShowFollowing={setShowFollowing}
                  />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserInfo;
