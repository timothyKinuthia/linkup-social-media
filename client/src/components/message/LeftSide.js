import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../functions/fetcher";
import { actionTypes } from "../../store/actions/actionTypes";
import { addUser, getConversations } from "../../store/actions/messageActions";
import { SearchIcon } from "../../icon";
import Card from "../Card";

const LeftSide = () => {
  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [dimension, setDimension] = useState(window.innerWidth);

  const history = useHistory();

  const dispatch = useDispatch();
  const { auth, message } = useSelector((state) => ({ ...state }));

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!search) {
      return;
    }
    getDataAPI(`search?username=${search}`, auth.token)
      .then((res) => {
        setSearchUsers(res.data.users);
      })
      .catch((err) => {
        dispatch({
          type: actionTypes.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      });
  };

  const handleUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  useEffect(() => {
    const onDimensionChange = () => {
      setDimension(window.innerWidth);
    };

    window.addEventListener("resize", onDimensionChange);

    return () => window.removeEventListener("resize", onDimensionChange);
  }, [dimension]);

  useEffect(() => {
    if (message.firstLoad) return;

    dispatch(getConversations({auth}));

  }, [dispatch, message.firstLoad, auth]);
  return (
    <div className="w-full h-full space-y-4 mt-4">
      <form onSubmit={handleSubmit} autoCorrect="none">
        <div className="relative">
          <input
            className="placeholder-gray-400 pl-10 py-1 focus:outline-none text-gray-900 rounded-full"
            type="text"
            value={search}
            placeholder="Search user"
            onChange={(evt) => setSearch(evt.target.value)}
          />
          <span className="absolute left-2.5 top-2">
            <SearchIcon w={5} h={5} />
          </span>
        </div>
        <button className="hidden" type="submit">Search</button>
      </form>
      <div className="flex flex-col space-y-2">
        {searchUsers.length > 0
          ? searchUsers.map((user) => (
              <div
                className="cursor-pointer"
                onClick={() => handleUser(user)}
                key={user._id}
              >
                <Card user={user} msg={true} />
              </div>
            ))
          : message.users.length > 0
          ? message.users.map((user) => (
              <Link to={`/message/${user._id}`} key={user._id}>
                <Card key={user._id} user={user} active msg={true} />
              </Link>
            ))
          : ""}
      </div>
    </div>
  );
};

export default LeftSide;
