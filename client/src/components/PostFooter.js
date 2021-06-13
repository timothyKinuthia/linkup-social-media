import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { likePost, unLikePost, savePost, unsavePost } from "../store/actions/postActions";
import { ChatIcon, BookmarkIcon, ShareIcon } from "../icon";
import LikeButton from './LikeButton';
import ShareModal from './modals/ShareModal';
import { BASE_URL } from "../functions/config";


const PostFooter = ({ post }) => {

  const [likecCount, setLikeCount] = useState(0);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const { auth, socket } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setLikeCount(1);
    } else {
      setLikeCount(0);
    }
  }, [auth.user._id, post.likes]);

  useEffect(() => {
    if (auth.user.saved && auth.user.saved.find((val) => val === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLikeCount((prev) => prev + 1);
    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };

  const handleUnLike = async () => {
    
    if (loadLike) return;
    setLikeCount((prev) => prev - 1);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  

  return (
    <div className="mt-4 mb-2 px-6 space-y-1">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
        <span className="cursor-pointer">
          <LikeButton likecCount={likecCount} handleLike={handleLike} handleUnLike={handleUnLike}  />
        </span>
          <Link className="ml-4" to={`/post/${post._id}`}>
            <ChatIcon />
          </Link>
          <span onClick={() => setIsShare((prev) => !prev)} className="ml-4 cursor-pointer"><ShareIcon/></span>
        </div>
        <span onClick={() => saved ? dispatch(unsavePost({post, auth})) : dispatch(savePost({post, auth}))} className="cursor-pointer"><BookmarkIcon saved={saved} /></span>
      </div>
      <div className="flex justify-between">
        <h6 className="text-truegray-400 text-sm font-medium">{post.likes.length} Likes</h6>
        <h6 className="text-truegray-400 text-sm font-medium">{post.comments.length} comments</h6>
      </div>

      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  );
};

export default PostFooter;
