const Comment = require("../models/comment");
const Post = require("../models/post");
const ErrorResponse = require("../utils/errorResponse");

exports.createComment = async (req, res, next) => {
  try {
    const { postId, content, tag, reply, postUserId } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return next(new ErrorResponse("Post does not exist!", 400));
    }

    if (reply) {
      const comment = await Comment.findById(reply);
      if (!comment) {
        return next(new ErrorResponse("comment does not exist!", 400));
      }
    }

    const newComment = await Comment.create({
      user: req.user._id,
      content,
      tag,
      reply,
      postId,
      postUserId,
    });

    await Post.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { comments: newComment } }
    );

    res.json({ newComment });
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { content } = req.body;
    await Comment.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { content },
      { new: true }
    );

    res.json({ msg: "Updated comment" });
  } catch (err) {
    next(err);
  }
};

exports.likeComment = async (req, res, next) => {
  try {
    const likedComment = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    res.status(201).json({ msg: "added like", likedComment });
  } catch (err) {
    next(err);
  }
};

exports.unLikeComment = async (req, res, next) => {
  try {
    const unlike = await Comment.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    res.json({ msg: "removed like", unlike });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      $or: [{ user: req.user._id }, { postUserId: req.user._id }],
    });

    await Post.findOneAndUpdate(
      { _id: comment.postId },
      { $pull: { comments: req.param.id } }
    );

    res.json({ msg: "Deleted comment" });
  } catch (err) {
    next(err);
  }
};
