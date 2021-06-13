import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { EditIcon, DeleteIcon, DotsIcon } from "../../../icon";
import { deleteComment } from "../../../store/actions/commentActions";

const CommentMenu = ({ setOnEdit, post, comment }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const handleRemoveComment = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment }));
    }
  };

  return (
    <div className="h-4 relative z-50">
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="focus:outline-none">
                <DotsIcon comment />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute right-0 w-40 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="py-1 ">
                  <>
                    <Menu.Item onClick={() => setOnEdit(true)}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-white"
                              : "text-gray-900"
                          } group flex items-center w-full py-2 px-2 text-sm hover:bg-lightblue-50 hover:text-lightblue-700 focus:outline-none cursor-pointer`}
                        >
                          <EditIcon />
                          <span className="ml-2 text-sm">Edit</span>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item onClick={handleRemoveComment}>
                      {({ active }) => (
                        <button
                          className={`${
                            active
                              ? "bg-violet-500 text-red-700"
                              : "text-gray-900"
                          } group flex items-center px-2 w-full py-2 text-sm hover:bg-lightblue-50 hover:text-lightblue-700 focus:outline-none cursor-pointer`}
                        >
                          <DeleteIcon />
                          <span className="ml-2 text-sm">Delete</span>
                        </button>
                      )}
                    </Menu.Item>
                  </>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default CommentMenu;
