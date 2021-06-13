import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {notificationIsRead, notificationTypes, deleteNotifications} from "../../store/actions/notificationActions"
import { Favourites, Sound, SoundDisabled } from "../../icon";
import Avatar from "../Avatar";

dayjs.extend(relativeTime);

const NotificationsDropdown = ({ dimension }) => {

  const dispatch = useDispatch();

  const { notifications, auth } = useSelector((state) => ({ ...state }));

  const handleIsRead = (item) => {
    
    dispatch(notificationIsRead({ item, auth }));
  };

  const handleSound = () => {

    dispatch({ type: notificationTypes.NOTIFICATION_SOUND, payload: !notifications.sound })
  };

  const handleDelete = () => {
    
    const newArr = notifications.data.filter((val) => val.isRead === false);

    if (newArr.length === 0) {
      return dispatch(deleteNotifications(auth.token));
    };

    if (window.confirm(`You have ${newArr.length} unread notifications. Are you sure you want to delete all?`)) {
      dispatch(deleteNotifications(auth.token));
    }
  }
  return (
    <div className="z-50">
      <Menu as="div" className="relative inline-block">
        {({ open }) => (
          <div>
            <div>
              <Menu.Button className="focus:outline-none">
                <Favourites />
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
                className={`${
                  dimension < 760
                    ? "fixed bottom-14 right-4 w-60 h-80 overflow-y-auto"
                    : "absolute right-0 top-10 w-80 h-100 overflow-y-auto mt-2 origin-top-right"
                } bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
              >
                <div className="py-1 ">
                  <Menu.Item onClick={() => handleSound()}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex items-center w-full py-2 px-2 text-sm hover:text-lightblue-700 focus:outline-none`}
                      >
                        {notifications.sound ? <Sound /> : <SoundDisabled />}
                        <span className="ml-2 text-sm">Notifications</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>

                {notifications.length === 0 ? (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex items-center w-full py-2 px-2 text-sm hover:text-lightblue-700 focus:outline-none`}
                      >
                        <span className="ml-2 text-sm">No notifications</span>
                      </button>
                    )}
                  </Menu.Item>
                ) : (
                  notifications.data.map((item, i) => (
                    <Menu.Item key={i} onClick={() => handleIsRead(item)}>
                      {({ active }) => (
                        <div>
                          <Link
                            to={`${item.url}`}
                            className={`${
                              active ? "bg-violet-500" : "text-gray-900"
                            } group flex justify-between items-center px-2 w-full py-2 text-sm focus:outline-none`}
                          >
                            <Avatar
                              src={item.user.avatar}
                              alt="avatar"
                              width={10}
                              height={10}
                            />
                            <div className="text-center">
                              <strong>{item.user.username}</strong>
                              <br />
                              <span>{item.text}</span>
                              {item.content && (
                                <div>{item.content.slice(0, 25)}...</div>
                              )}
                            </div>
                            {item.image && (
                              <Avatar
                                src={item.image}
                                alt="avatar"
                                width={10}
                                height={10}
                              />
                            )}
                          </Link>
                          <div className="-mt-2 flex justify-between items-center px-2">
                            <span className="text-sm tracking-tighter text-truegray-400">
                              {dayjs(item.createdAt).fromNow()}
                            </span>
                            {!item.isRead && (
                              <span className="text-lg font-bold text-teal-500">
                                &bull;
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  ))
                )}

                <div className="py-1 ">
                  <Menu.Item onClick={() => handleDelete()}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex items-center w-full py-2 px-2 text-sm hover:text-lightblue-700 focus:outline-none`}
                      >
                        <span className="ml-2 text-sm">Delete All</span>
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default NotificationsDropdown;
