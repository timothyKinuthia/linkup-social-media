import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Avatar from "../../Avatar";
import LikeButton from "../../LikeButton";
import CommentMenu from "./CommentMenu";
import {
  updateComment,
  likeComment,
  unLikeComment,
} from "../../../store/actions/commentActions";
import InputComment from "./InputComment";

dayjs.extend(relativeTime);

const CommentCard = ({ comment, post, commentId, children }) => {
  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  const dispatch = useDispatch();
  const { auth } = useSelector((state) => ({ ...state }));

  const newDate = dayjs(comment.createdAt).fromNow();


  useEffect(() => {
    setContent(comment.content);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount(0);
    }
  }, [comment.content, comment.likes, auth.user._id]);

  const handleLike = () => {
    setLikeCount((prev) => prev + 1);
    dispatch(likeComment({ comment, post, auth }));
  };

  const handleUnLike = () => {
    setLikeCount((prev) => prev - 1);
    dispatch(unLikeComment({ comment, post, auth }));
  };

  const handleUpdate = async () => {
    if (content !== comment.content) {
      await dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  return (
    <div className="my-3 py-3 border-b border-truegray-100 rounded">
      <Link className="flex items-center" to={`/profile/${comment.user._id}`}>
        <Avatar src={comment.user.avatar} alt="avatar" width={10} height={10} />
        <h3 className="ml-3 font-semibold">{comment.user.username}</h3>
      </Link>
      <div className="mt-2 py-1">
        <div className="flex justify-between py-1 -mr-4">
          {onEdit ? (
            <textarea
              className="w-full focus:outline-none py-2 px-1"
              rows={content.length > 100 ? "5" : "2"}
              value={content}
              onChange={(evt) => setContent(evt.target.value)}
            ></textarea>
          ) : (
            <div className="w-full">
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link
                  className="mr-2 text-cyan-300"
                  to={`/profile/${comment.tag._id}`}
                >
                  @{comment.tag.username}
                </Link>
              )}
              <span className="text-truegray-900">
                {content.length < 100
                  ? content
                  : readMore
                  ? content + ""
                  : content.slice(0, 100) + "..."}
              </span>
              {content.length > 100 && (
                <span
                  className="ml-2 text-rose-500 cursor-pointer font-semibold text-sm"
                  onClick={() => setReadMore((prev) => !prev)}
                >
                  {readMore ? "Hide" : "continue"}
                </span>
              )}
            </div>
          )}
          {comment.user._id === auth.user._id && (
            <CommentMenu setOnEdit={setOnEdit} post={post} comment={comment} />
          )}
        </div>
        <div className="mt-0.5 flex items-center">
          {onEdit ? (
            <div>
              <span
                onClick={() => handleUpdate()}
                className="text-cyan-400 cursor-pointer"
              >
                Update
              </span>
              <span
                onClick={() => setOnEdit(false)}
                className="ml-6 text-rose-500 cursor-pointer"
              >
                Cancel
              </span>
            </div>
          ) : (
            <>
              <span className="mr-4 text-truegray-500 text-sm">{newDate}</span>
              <LikeButton
                likecCount={likeCount}
                handleLike={handleLike}
                handleUnLike={handleUnLike}
              />
              <span className="ml-4 text-sm font-semibold">
                {comment.likes.length} likes
              </span>
              <span
                onClick={handleReply}
                className="ml-4 text-sm font-semibold cursor-pointer"
              >
                {onReply ? "cancel" : "reply"}
              </span>
            </>
          )}
        </div>
      </div>

      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link className="text-sm mr-4" to={`/profile/${onReply.user._id}`}>
            @{onReply.user.username}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
