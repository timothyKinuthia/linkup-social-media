import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({ children, users, handleSearch }) => {
  return (
    <div className="absolute z-10 rounded-xl bg-white shadow-2xl">
      {users.length > 0 &&
        users.map((user) => (
          <Link key={user._id} to={`/profile/${user._id}`} className="flex items-center border-b px-1 sm:py-2 sm:px-6 hover:bg-lightblue-300 hover:text-white" onClick={() => handleSearch()}>
            <Avatar src={user.avatar} alt="avatar" width={10} height={10} />
            <span className="ml-2">{user.username}</span>
            <span className="ml-2">{user.fullname}</span>
          </Link>
        ))}
      <div>{children}</div>
    </div>
  );
};

export default UserCard;
