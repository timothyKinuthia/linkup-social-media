import { actionTypes } from "./actionTypes";
import { imageUploader } from "../../helpers/imageUpload";
import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from "../../functions/fetcher";
import { createNotify, removeNotify } from "./notificationActions";

export const postTypes = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  GET_POST: "GET_POST",
  DELETE_POST: "DELETE_POST"
};

export const createPost =
  ({ content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });

      if (images.length > 0) {
        media = await imageUploader(images);
      }

      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: postTypes.CREATE_POST,
        payload: { ...res.data.post, user: auth.user },
      });

      //NOTIFY
      const msg = {
        id: res.data.post._id,
        text: 'Added a new post',
        recipients: res.data.post.user.followers,
        url: `/post/${res.data.post._id}`,
        content,
        image: media[0].url
      };

      dispatch(createNotify({ msg, auth }));

      dispatch({ type: actionTypes.NOTIFY, payload: {} });
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: postTypes.LOADING_POST, payload: true });

    const res = await getDataAPI("posts", token);

    dispatch({ type: postTypes.GET_POSTS, payload: { ...res.data, page: 2 } });

    dispatch({ type: postTypes.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: actionTypes.NOTIFY,
      payload: { error: err.response.data.msg },
    });
  }
};

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];

    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    ) {
      return;
    }

    try {
      dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });

      if (imgNewUrl.length > 0) {
        media = await imageUploader(imgNewUrl);
      }

      const res = await patchDataAPI(
        `posts/${status._id}`,
        { content, images: [...imgOldUrl, ...media] },
        auth.token
      );

      dispatch({ type: postTypes.UPDATE_POST, payload: res.data.newPost });

      dispatch({
        type: actionTypes.NOTIFY,
        payload: { success: res.data.msg },
      });
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const likePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    dispatch({
      type: postTypes.UPDATE_POST,
      payload: newPost,
    });

    
    try {
      await patchDataAPI(`posts/${post._id}/like`, null, auth.token);
            //NOTIFY
            const msg = {
              id: auth.user._id,
              text: 'Liked your post',
              recipients: [post.user._id],
              url: `/post/${post._id}`,
              content: post.content,
              image: post.images[0].url
            };
      
            dispatch(createNotify({ msg, auth }));
      
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unLikePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    const newPost = {
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };

    dispatch({
      type: postTypes.UPDATE_POST,
      payload: newPost,
    });

    try {
      await patchDataAPI(`posts/${post._id}/unlike`, null, auth.token);

      //NOTIFY
      const msg = {
        id: post._id,
        text: 'removed like',
        recipients: post.user.followers,
        url: `/post/${post._id}`,
      };
      
      dispatch(removeNotify({ msg, auth }));
      
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((p) => p._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);

        dispatch({ type: postTypes.GET_POST, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: actionTypes.NOTIFY,
          payload: { error: err.response.data.msg },
        });
      }
    }
    };
  

export const deletePost = ({ post, auth }) => async (dispatch) => {

  dispatch({ type: postTypes.DELETE_POST, payload: post });

  try {
    
    const res = await deleteDataAPI(`posts/${post._id}`, auth.token);

     //NOTIFY
     const msg = {
      id: res.data.post._id,
      text: 'removed one post',
      recipients: res.data.post.user.followers,
      url: `/post/${res.data.post._id}`,
    };
    
    dispatch(removeNotify({ msg, auth }));

  } catch (err) {
    dispatch({
      type: actionTypes.NOTIFY,
      payload: { error: err.response.data.msg },
    });
  }
};

export const savePost = ({ post, auth }) => async (dispatch) => {
  
  let newUser = { ...auth.user, saved: auth.user.saved ? [...auth.user.saved] : [] };

  newUser = ({...newUser, saved: [...newUser.saved, post._id] });

  dispatch({ type: actionTypes.AUTH, payload: { ...auth, user: newUser } });

  try {

    await patchDataAPI(`post_saved/${post._id}`, null, auth.token);
    
   } catch (err) {
    dispatch({
      type: actionTypes.NOTIFY,
      payload: { error: err.response.data.msg },
    });
  }

}

export const unsavePost = ({ post, auth }) => async (dispatch) => {
  
  let newUser = { ...auth.user, saved: auth.user.saved.filter((val) => val !== post._id) };

  dispatch({ type: actionTypes.AUTH, payload: { ...auth, user: newUser } });

  try {
    await patchDataAPI(`post_unsaved/${post._id}`, null, auth.token);
  } catch (err) {
    dispatch({
      type: actionTypes.NOTIFY,
      payload: { error: err.response.data.msg },
    });
  }
}
