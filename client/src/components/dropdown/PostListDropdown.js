import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { actionTypes } from "../../store/actions/actionTypes";
import { deletePost } from "../../store/actions/postActions";
import { BASE_URL } from "../../functions/config";
import { EditIcon, DeleteIcon, CopyIcon, DotsIcon } from "../../icon";

const PostListDropdown = ({ post }) => {

  const history = useHistory();

  const { auth } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const handleEditPost = () => {
    dispatch({type: actionTypes.STATUS, payload: {...post, onEdit: true}})
  };

  const handleDeletePost = () => {
    if (window.confirm("Do you want to delete this post!")) {
      dispatch(deletePost({ post, auth }));
      return history.push("/");
    }
  };

  const handleCopyLink = () => {

    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
  };

  return (
    <div className="w-1/3 relative z-40">
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="focus:outline-none">
                <DotsIcon />
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
                  {auth.user._id === post.user._id && (
                    <>
                      <Menu.Item onClick={handleEditPost}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-white"
                                : "text-gray-900"
                            } group flex items-center w-full py-2 px-2 text-sm hover:bg-lightblue-50 hover:text-lightblue-700 focus:outline-none`}
                          >
                            <EditIcon />
                            <span className="ml-2 text-sm">Edit</span>
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item onClick={handleDeletePost}>
                        {({ active }) => (
                          <button
                            className={`${
                              active
                                ? "bg-violet-500 text-red-700"
                                : "text-gray-900"
                            } group flex items-center px-2 w-full py-2 text-sm hover:bg-lightblue-50 hover:text-lightblue-700 focus:outline-none`}
                          >
                            <DeleteIcon />
                            <span className="ml-2 text-sm">Delete</span>
                          </button>
                        )}
                      </Menu.Item>
                    </>
                  )}
                  <Menu.Item onClick={handleCopyLink}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex rounded-md items-center px-2 w-full py-2 text-sm hover:bg-lightblue-50 hover:text-lightblue-700 focus:outline-none`}
                      >
                        <CopyIcon />
                        <span className="ml-2 text-sm">Copy Link</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default PostListDropdown;
