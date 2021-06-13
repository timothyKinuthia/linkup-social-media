import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import MenuDropdown from "../MenuDropdown";
import { iconComps } from "../../icon";
import Search from "./Search";
import NotificationsDropdown from "../dropdown/NotificationsDropdown";

const Header = () => {
  const [dimension, setDimension] = useState(window.innerWidth);

  const { notifications } = useSelector((state) => ({ ...state }));

  const { pathname } = useLocation();

  const isActive = (path) => {
    if (path === pathname) {
      return true;
    }
  };

  useEffect(() => {
    const onDimensionChange = () => {
      setDimension(window.innerWidth);
    };

    window.addEventListener("resize", onDimensionChange);

    return () => window.removeEventListener("resize", onDimensionChange);
  }, [dimension]);

  return (
    <div className="sticky top-0 z-50 py-2 md:px-4 flex justify-between items-center border-b border-gray-50 bg-white bg-opacity-40">
      <div className="flex items-center justify-around w-full md:w-1/2">
        <Link to="/">
          <h1
            onClick={() => window.scrollTo({ top: 0 })}
            className="border border-lightblue-400 m-0 py-1 px-2 rounded text-lightblue-400 font-bold"
          >
            Link-UP
          </h1>
        </Link>
        <Search />
      </div>
      <div
        className={
          dimension < 760
            ? "fixed py-1 bottom-0 flex w-full justify-between items-center border-t bg-lightblue-100"
            : "flex justify-end items-center w-1/2"
        }
      >
        {iconComps.map((icon) => (
          <div
            key={icon.path}
            className={`mx-3 bg-gray-100 py-2 hover:bg-bluegray-200 px-2 rounded-full ${
              isActive(icon.path) ? "text-blue-600" : "text-coolgray-500"
            }`}
          >
            <Link className="text-black" to={icon.path}>
              {icon.Icon}
            </Link>
          </div>
        ))}
        <div className="relative w-12 flex justify-center">
          <NotificationsDropdown dimension={dimension} />
          {notifications.data.length > 0 && (
            <span className="-mr-1 -mt-1 absolute top-0 right-0 z-50 bg-red-500 text-white text-sm px-1.5 rounded-full">
              {notifications.data.length}
            </span>
          )}
        </div>
        <MenuDropdown isActive={isActive} dimension={dimension} />
      </div>
    </div>
  );
};

export default Header;
