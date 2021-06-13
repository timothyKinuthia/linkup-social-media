const Post = require("../models/post");
const ErrorResponse = require("../utils/errorResponse");
const Comment = require("../models/comment");
const User = require("../models/user");

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

exports.createPost = async (req, res, next) => {
  try {
    const { content, images } = req.body;

    if (images.length === 0) {
      return next(new ErrorResponse("Please provide photo", 400));
    }

    const newPost = await Post.create({ content, images, user: req.user._id });

    res.status(201).json({ msg: "Post created", post: { ...newPost._doc, user: req.user } });

  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const features = new APIfeatures(
      Post.find({
        user: [...req.user.following, req.user._id],
      }),
      req.query
    ).paginating();

    const posts = await features.query
      .sort("-createdAt")
      .populate("user likes", "avatar username fullname followers")
      .populate({ path: "comments", populate: { path: "user", model: "User" } })
      .populate({
        path: "comments",
        populate: { path: "likes", model: "User" },
      });

    res.status(200).json({ msg: "success", result: posts.length, posts });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { content, images } = req.body;

    const post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { content, images },
      { new: true }
    )
      .populate("user likes", "avatar username fullname")
      .populate({
        path: "comments",
        populate: { path: "likes", model: "User" },
      });

    res.json({
      msg: "Updated Post",
      newPost: { ...post._doc, content, images },
    });
  } catch (err) {
    next(err);
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const likedPost = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    if (!likedPost) {
      return next(new ErrorResponse("Post does not exist!", 400));
    }

    res.status(201).json({ msg: "added like", likedPost });
  } catch (err) {
    next(err);
  }
};

exports.unLikePost = async (req, res, next) => {
  try {
    const unlike = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: req.user._id } },
      { new: true }
    );

    res.json({ msg: "removed like", unlike });
  } catch (err) {
    next(err);
  }
};

exports.getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ user: req.params.id }).sort("-createdAt");

    res.json({ posts, results: posts.length });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id })
      .populate("user likes", "avatar username fullname")
      .populate({ path: "comments", populate: { path: "user", model: "User" } })
      .populate({
        path: "comments",
        populate: { path: "likes", model: "User" },
      });

    if (!post) {
      return next(new ErrorResponse("Post does not exist!", 400));
    }

    res.json({ post });
  } catch (err) {
    next(err);
  }
};

exports.getPostDiscover = async (req, res, next) => {
  try {
    // const features = new APIfeatures(
    //   Post.find({
    //     user: { $nin: [...req.user.following, req.user._id] },
    //   }),
    //   req.query
    // ).paginating();

    // const posts = await features.query
    //   .sort("-createdAt")
    //   .populate("user likes", "avatar username fullname")
    //   .populate({ path: "comments", populate: { path: "user", model: "User" } })
    //   .populate({
    //     path: "comments",
    //     populate: { path: "likes", model: "User" },
    //   });
    
      const newArr = [...req.user.following, req.user._id];

      const num = req.query.num || 9

      const posts = await Post.aggregate([
          { $match: { _id: { $nin: newArr } } },
          { $sample: { size: Number(num) } },
      ]);

      return res.json({ posts, result: posts.length });

    //res.status(200).json({ msg: "success", result: posts.length, posts });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    await Comment.deleteMany({ _id: { $in: post.comments } });

    res.json({ msg: "Deleted post", post: { ...post._doc, user: req.user } });
    
  } catch (err) {
    next(err);
  }
};

exports.savePost = async (req, res, next) => {
    
  try {

    const saved = await User.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { saved: req.params.id } }, { new: true });

    if (!saved) {
      return next(new ErrorResponse("User does not exist", 400));
    }

    res.json({ msg: 'Saved post' });

  } catch (err) {
    next(err);
  }
};

exports.unsavePost = async (req, res, next) => {
    
  try {

    const unsaved = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { saved: req.params.id } }, { new: true });

    if (!unsaved) {
      return next(new ErrorResponse("User does not exist", 400));
    }

    res.json({ msg: 'post removed from bookmark' });

  } catch (err) {
    next(err);
  }
};

exports.getBookmark = async (req, res, next) => {

  try {
    const savedPosts = await Post.find({ _id: req.user.saved }).limit(req.query.limit * 1);

    res.json({ savedPosts, result: savedPosts.length });

  } catch (err) {
    next(err)
  };

}