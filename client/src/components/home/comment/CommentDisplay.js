import { useState, useEffect } from "react";
import CommentCard from "./CommentCard";

const CommentDisplay = ({ comment, post, replyCom }) => {
  const [showReply, setShowReply] = useState([]);
  const [next, setNext] = useState(1);

  useEffect(() => {
    setShowReply(replyCom.slice(replyCom.length - next));
  }, [replyCom, next]);

  return (
    <div>
      <CommentCard comment={comment} post={post} commentId={comment._id}>
        <div className="mx-7">
          {showReply.map(
            (com, i) =>
              com.reply && (
                <CommentCard
                  key={i}
                  comment={com}
                  post={post}
                  commentId={comment._id}
                />
              )
          )}
          
          {replyCom.length - next > 0 ? (
            <div
              onClick={() => setNext(next + 10)}
              className="text-truegray-400 text-sm cursor-pointer"
            >
              show more replies...
            </div>
          ) : (
            replyCom.length > 1 && (
              <div
                onClick={() => setNext(1)}
                className="text-truegray-500 text-sm cursor-pointer"
              >
                Hide replies
              </div>
            )
          )}
        </div>
      </CommentCard>
    </div>
  );
};

export default CommentDisplay;
