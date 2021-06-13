import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

//IMPORTS
import { logout } from '../store/actions/authActions';
import Avatar from './Avatar';

export default function MenuDropdown({dimension}) {

  const dispatch = useDispatch();

  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <div className="ml-6 text-right z-50">
      <Menu as="div" className="relative inline-block text-left">
        {({ open }) => (
          <>
            <div>
              <Menu.Button className="overflow-hidden rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ring-1 ring-lightblue-300 ring-opacity- mr-2">
                <Avatar src={auth.user.avatar} alt='avatar' width={10} height={10} />
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
                className={`${dimension < 760 ? "fixed bottom-14 right-4 w-28" : "absolute right-0 top-10 w-56 mt-2 origin-top-right"} bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to={`/profile/${auth.user._id}`}
                        className={`${
                          active ? "bg-violet-500" : "text-gray-900"
                        } group flex hover:bg-lightblue-200 items-center w-full px-2 py-2 text-sm`}
                      >
                       Profile
                      </Link>
                    )}
                  </Menu.Item>
                  
                </div>
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link to='/' onClick={() => dispatch(logout())}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex hover:bg-lightblue-200 items-center w-full px-2 py-2 text-sm`}
                      >
                        Logout
                      </Link>
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
}

