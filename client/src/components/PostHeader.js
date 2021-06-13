import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avatar from "../components/Avatar";
import PostListDropdown from "./dropdown/PostListDropdown";

dayjs.extend(relativeTime);

const PostHeader = ({ post }) => {

  const newDate = dayjs(post.createdAt).fromNow();
  
  return (
    <div className="py-2 px-2 flex justify-between items-center border-gray-50">
      <div className="flex items-center">
        <Avatar src={post.user.avatar} alt="avatar" width={12} height={12} />
        <div className="ml-4">
          <div className="text-sm font-semibold text-gray-900">{post.user.username}</div>
          <div className="text-xs font-bold text-truegray-500">{newDate}</div>
        </div>
      </div>
      <div>
        <PostListDropdown post={post} />
      </div>
    </div>
  );
};

export default PostHeader;
