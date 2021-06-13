import { useSelector, useDispatch } from "react-redux";

import { actionTypes } from "../../store/actions/actionTypes";

const Status = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  return (
    <div className="mt-6 mx-4 sm:mx-0 border w-5/6 lg:w-4/6 border-gray-50 rounded-xl bg">
      <div className="">
        <h4 className="text-base font-medium py-2 px-2 border-b border-gray-50">Post Something</h4>
        <div className="flex items-center py-2 px-2">
          <img className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-full ring-1 ring-lightblue-400" src={auth.user.avatar} alt="status" />
          <button
            onClick={() =>
              dispatch({ type: actionTypes.STATUS, payload: true })
            }
            className="ml-4 focus:outline-none text-truegray-600 font-medium tracking-tight"
          >
            {auth.user.username}, what's on your mind{" "}
            {auth.user.gender === "female" ? "beautiful" : "cutie"}?
          </button>

          <button
            onClick={() =>
              dispatch({ type: actionTypes.STATUS, payload: true })
            }
            className="hidden sm:block ml-3 py-1 px-4 text-lightblue-600 rounded-full shadow-2xl border border-gray-100 focus:outline-none hover:bg-lightblue-50"
          >
            Chat
          </button>
        </div>
        <button onClick={() =>
              dispatch({ type: actionTypes.STATUS, payload: true })
            } className="block sm:hidden py-1 my-3 font-medium text-lightblue-600 border-t border-b border-gray-50 w-full hover:bg-lightblue-50 shadow-sm">Chat</button>
      </div>
    </div>
  );
};

export default Status;
