import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Resizer from "react-image-file-resizer";
import { CameraIcon } from "../../icon";
import { actionTypes } from "../../store/actions/actionTypes";
import { updatedProfileUser } from "../../store/actions/profileActions";

const inputStyles = "border w-full rounded py-1 px-4 border-gray-100 focus:outline-none";

const EditProfile = ({ setOnEdit, pathname }) => {
  const initialState = {
    fullname: "",
    mobile: "",
    address: "",
    website: "",
    story: "",
    gender: "",
    avatar: "",
  };

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const hiddenFileInput = useRef(null);

  const handleClick = (evt) => {
    hiddenFileInput.current.click();
  };

  const [userData, setUserData] = useState(initialState);

  const [avatar, setAvatar] = useState("");

  const { fullname, mobile, address, website, story, gender } = userData;

  const changAvatar = async (evt) => {
    const file = evt.target.files[0];

    if (file) {
      try {
        Resizer.imageFileResizer(
          file,
          300,
          300,
          "JPEG",
          100,
          0,
          (uri) => {
            setAvatar(uri);
          },
          "base64",
          200,
          200
        );
      } catch (err) {
        dispatch({
          type: actionTypes.NOTIFY,
          payload: { error: "Image not uploaded. Please try another image." },
        });
      }
    }
  };

  useEffect(() => {
    setUserData(auth.user);
  }, [auth.user]);

  const handleInputChange = (evt) => {
    setUserData({ ...userData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(updatedProfileUser({ userData, avatar, auth }, pathname));
  };

  return (
    <div className="fixed z-50 overflow-y-auto py-6 bg-black bg-opacity-30 inset-0 cursor-pointer">
      <div className="w-full h-full mt-2 flex flex-col items-center">
        <div
          className="flex flex-col w-2/3 sm:w-1/2 lg:w-1/3 items-center bg-white shadow-2xl border py-2 px-4 space-y-2"
          autoComplete="off"
        >
          <form onSubmit={handleSubmit}>
            <div className="overflow-hidden space-y-2 w-full flex flex-col items-center">
              <img
                className="w-28 h-28 rounded-full object-cover"
                src={avatar ? avatar : auth.user.avatar}
                alt="avatar"
              />
              <div className="flex justify-between">
                <CameraIcon />
                <span
                  className="cursor-pointer ml-1 text-lightblue-600 hover:text-lightblue-800 font-semibold"
                  onClick={handleClick}
                >
                  Upload image
                </span>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={changAvatar}
                />
              </div>
            </div>
            <div className="mt-2 space-y-2">
              <input
                className={inputStyles}
                type="text"
                name="fullname"
                value={fullname}
                onChange={handleInputChange}
                placeholder="Full name"
              />

              <input
                className={inputStyles}
                type="number"
                name="mobile"
                value={mobile}
                placeholder="Mobile number"
                onChange={handleInputChange}
              />

              <input
                className={inputStyles}
                type="text"
                name="address"
                value={address}
                onChange={handleInputChange}
                placeholder="Address"
              />

              <input
                className={inputStyles}
                type="text"
                name="website"
                value={website}
                onChange={handleInputChange}
                placeholder="Website"
              />

              <textarea
                className="border w-full rounded py-1 px-4 border-gray-100 focus:outline-none"
                name="story"
                value={story}
                cols="30"
                rows="3"
                onChange={handleInputChange}
              ></textarea>

              <select
                className={inputStyles}
                name="gender"
                id="gender"
                value={gender}
                onChange={handleInputChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mt-2 flex w-full justify-between">
              <button
                className="text-lightblue-400 font-semibold py-1 rounded-full hover:text-lightblue-500 w-1/3 focus:outline-none"
                type="submit"
              >
                Save
              </button>
              <button
                onClick={() => setOnEdit(false)}
                className="text-red-400 font-semibold py-1 rounded-full hover:text-red-500 w-1/3 focus:outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
