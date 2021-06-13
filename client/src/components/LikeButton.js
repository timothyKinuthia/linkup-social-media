import { Love, Heart } from "../icon";

const LikeButton = ({ likecCount, handleLike, handleUnLike }) => {
  return (
    <div>
      {likecCount > 0 ? (
        <span className="text-rose-600 cursor-pointer" onClick={() => handleUnLike()}>
          <Love />
        </span>
      ) : (
        <span className="text-rose-600 cursor-pointer" onClick={() => handleLike()}>
          <Heart />
        </span>
      )}
    </div>
  );
};

export default LikeButton;
