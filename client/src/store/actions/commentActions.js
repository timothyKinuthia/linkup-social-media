import { getPosts, postTypes } from "./postActions";
import { actionTypes } from "./actionTypes";
import { createNotify, removeNotify } from "./notificationActions";
import {
  patchDataAPI,
  postDataAPI,
  deleteDataAPI,
} from "../../functions/fetcher";

export const createComment =
  ({ post, newComment, auth }) =>
  async (dispatch) => {
    const newPost = { ...post, comments: [...post.comments, newComment] };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });


    try {
      const data = {
        ...newComment,
        postId: post._id,
        postUserId: post.user._id,
      };

      const res = await postDataAPI("comment", data, auth.token);

      const newData = { ...res.data.newComment, user: auth.user };

      const newPost = { ...post, comments: [...post.comments, newData] };

      dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

      //NOTIFY
      const msg = {
        id: res.data.newComment,
        text: newComment.reply
          ? "mentioned you in a comment"
          : "has commented on your post",
        recipients: newComment.reply ? [newComment.tag._id] : [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0].url,
      };

      dispatch(createNotify({ msg, auth }));

      dispatch(getPosts(auth.token));
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updateComment =
  ({ comment, post, content, auth }) =>
  async (dispatch) => {
    const newComments = [...post.comments];

    const commentIdx = newComments.findIndex(
      (comm) => comm._id === comment._id
    );

    newComments[commentIdx] = { ...comment, content };

    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}`, { content }, auth.token);
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = { ...comment, likes: [...comment.likes, auth.user] };

    const newComments = [...post.comments];

    const commentIdx = newComments.findIndex(
      (comm) => comm._id === comment._id
    );

    newComments[commentIdx] = newComment;

    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}/like`, null, auth.token);
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikeComment =
  ({ comment, post, auth }) =>
  async (dispatch) => {
    const newComment = {
      ...comment,
      likes: comment.likes.filter((like) => like._id !== auth.user._id),
    };

    const newComments = [...post.comments];

    const commentIdx = newComments.findIndex(
      (comm) => comm._id === comment._id
    );

    newComments[commentIdx] = newComment;

    const newPost = { ...post, comments: newComments };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });

    try {
      await patchDataAPI(`comment/${comment._id}/unlike`, null, auth.token);
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteComment =
  ({ post, auth, comment }) =>
  async (dispatch) => {
    const deleteArr = [
      ...post.comments.filter((com) => com.reply === comment._id),
      comment,
    ];

    const newPost = {
      ...post,
      comments: post.comments.filter(
        (com) => !deleteArr.find((item) => com._id === item._id)
      ),
    };

    dispatch({ type: postTypes.UPDATE_POST, payload: newPost });


    try {
      deleteArr.forEach((item) => {
        deleteDataAPI(`comment/${item._id}`, auth.token);

        //NOTIFY
        const msg = {
          id: item._id,
          text: comment.reply
            ? "mentioned you in a comment"
            : "has commented on your post",
          recipients: comment.reply ? [comment.tag._id] : [post.user._id],
          url: `/post/${post._id}`,
          
        };

        dispatch(removeNotify({ msg, auth }));
      });
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
