import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../../../store/actions/commentActions";
import { SendIcon } from "../../../icon";
import IconsEmoji from "../../IconsEmoji";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");

  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }
    const newComment = {
      content,
      likes: [],
      user: auth,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));

    if (setOnReply) return setOnReply(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative px-6 py-2 flex justify-between items-center"
    >
      {children}
      <input
        className="focus:outline-none flex-1"
        type="text"
        placeholder="add your comment"
        value={content}
        onChange={(evt) => setContent(evt.target.value)}
        multiple
      />
      <span className="absolute top-0 right-12">
        <IconsEmoji content={content} setContent={setContent} />
      </span>
      <button
        className="ml-8 focus:outline-none hover:text-gray-700"
        type="submit"
      >
        <SendIcon />
      </button>
    </form>
  );
};

export default InputComment;
