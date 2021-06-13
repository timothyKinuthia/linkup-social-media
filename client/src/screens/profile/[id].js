import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProfileUsers } from "../../store/actions/profileActions";
import UserInfo from "../../components/profile/UserInfo";
import Posts from "../../components/profile/Posts";
import Spinner from "../../components/Spinner";
import Saved from "../../components/profile/Saved";

const Profile = () => {
  const [saveTab, setSaveTab] = useState(false);

  const { id } = useParams();
  const dispatch = useDispatch();
  const { profile, auth } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (profile.ids.every((val) => val !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [profile.ids, auth, dispatch, id, profile.users]);

  return (
    <div className="flex flex-col items-center font-comfotaar my-4 space-y-6 pt-4 pb-10 md:pb-2">
      <UserInfo id={id} auth={auth} profile={profile} dispatch={dispatch} />
      {auth.user._id === id && (
        <div className="md:w-5/6 lg:w-3/4 flex justify-center">
          <button
            className={`border py-1 px-3 ${
              saveTab ? "" : "bg-bluegray-300"
            } focus:outline-none`}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={`border py-1 px-3 ml-4 ${
              saveTab ? "bg-bluegray-300" : ""
            } focus:outline-none`}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}
      {profile.loading ? (
        <Spinner />
      ) : saveTab ? (
        <Saved auth={auth} dispatch={dispatch} />
      ) : (
        <Posts id={id} profile={profile} auth={auth} dispatch={dispatch} />
      )}
    </div>
  );
};

export default Profile;
