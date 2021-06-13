import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteConversation } from "../store/actions/messageActions";
import {
  CircleFill,
  DeleteIcon,
  PhotographIcon,
} from "../icon";
import Avatar from "./Avatar";

const Card = ({ user, active, msg = false }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const history = useHistory();

  const handleDeleteConversation = () => {
    if (window.confirm("Do you want to delete this conversation?")) {
      dispatch(deleteConversation({ id: user._id, auth }));

      history.push("/message");
    }
  };

  return (
    <div className="flex items-center justify-between border border-gray-100 p-4">
      <div className="flex items-center">
        <Avatar src={user.avatar} alt="avatar" width={10} height={10} />
        {msg && (
          <div className="ml-4">
            {user.text || user.media ? (
              <div className="flex items-center">
                <span className="text-sm">{user.text}</span>
                <div className="flex items-center text-sm ml-4">
                  <span className="font-bold mr-0.5 text-teal-400">
                    {user.media.length}
                  </span>
                  <span className="text-teal-500">
                    <PhotographIcon />
                  </span>
                </div>
              </div>
            ) : (
              <span>{user.username}</span>
            )}
          </div>
        )}
      </div>
      {active ? (
        <CircleFill />
      ) : (
        <div className="cursor-pointer w-1/3 flex justify-end space-x-3">
          <span onClick={() => handleDeleteConversation()}>
            <DeleteIcon />
          </span>
        </div>
      )}
    </div>
  );
};

export default Card;
