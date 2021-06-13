import { useState, useEffect } from "react";
import CommentDisplay from "./CommentDisplay";

const Comment = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newRep = post.comments.filter((com) => com.reply);
    setReplyComments(newRep);
  }, [post.comments]);

  useEffect(() => {
    const newCom = post.comments.filter((com) => !com.reply);
    setComments(newCom);
    setShowComments(newCom.slice(newCom.length - next));
  }, [post.comments, next]);

  return (
    <div className="px-6">
      {showComments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} replyCom={replyComments.filter((com) => com.reply === comment._id)} />
      ))}
      {comments.length - next > 0 ? (
        <div
          onClick={() => setNext(next + 10)}
          className="text-rose-500 cursor-pointer font-semibold"
        >
          see more...
        </div>
      ) : (
        comments.length > 2 && <div
          onClick={() => setNext(2)}
          className="text-rose-500 cursor-pointer font-semibold"
        >
          Hide comments
        </div>
      )}
    </div>
  );
};

export default Comment;
