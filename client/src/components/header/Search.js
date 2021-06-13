import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataAPI } from "../../functions/fetcher";
import { SearchIcon } from "../../icon";
import { actionTypes } from "../../store/actions/actionTypes";
import UserCard from "../UserCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    let timer;
    if (search && auth.token) {
      timer = setTimeout(() => {
        getDataAPI(`search?username=${search}`, auth.token)
          .then((res) => {
            setUsers(res.data.users);
          })
          .catch((err) => {
            dispatch({
              type: actionTypes.NOTIFY,
              payload: { error: err.response.data.msg },
            });
          });
      }, 1000);
    } else {
      setUsers([]);
    }

    return () => clearTimeout(timer);
  }, [search, auth.token, dispatch]);

  useEffect(() => {
    if (search && users.length > 0) {
      dispatch({ type: actionTypes.NOTIFY, payload: { showResult: true } });
    } else {
      dispatch({ type: actionTypes.NOTIFY, payload: { showResult: false } });
    }
  }, [search, users, dispatch]);

  const handleSearch = () => {
    setSearch("");
    setUsers([]);
    dispatch({ type: actionTypes.NOTIFY, payload: { showResult: false } });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="relative w-2/3"
        autoComplete="off"
      >
        <div className="relative">
          <span className="absolute left-2 top-3.5"><SearchIcon w={6} h={6} /></span>
          <input
            className="block w-full bg-gray-100 rounded-full placeholder-gray-400 pl-10 py-3 focus:outline-none text-gray-900 focus:bg-gray-50"
            type="text"
            name="search"
            placeholder="search people"
            value={search}
            onChange={(evt) =>
              setSearch(evt.target.value.toLowerCase().replace(/ /g, ""))
            }
          />

          {search !== "" && (
            <button
              onClick={handleSearch}
              className="absolute bg-red-200 top-2 right-5 text-red-700 font-bold text-lg focus:outline-none rounded-full  px-2"
            >
              X
            </button>
          )}
        </div>
        <UserCard users={users} handleSearch={handleSearch} />
      </form>
    </>
  );
};

export default Search;
