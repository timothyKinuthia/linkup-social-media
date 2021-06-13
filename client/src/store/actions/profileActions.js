import { getDataAPI, patchDataAPI } from "../../functions/fetcher";
import { actionTypes } from "./actionTypes";
import { createNotify, removeNotify } from "./notificationActions";
import { imageUploader } from "../../helpers/imageUpload";

export const profileTypes = {
  LOADING: "LOADING",
  GET_USER: "GET_USER",
  FOLLOW: "FOLLOW",
  UNFOLLOW: "UNFOLLOW",
  GET_PROFILE_ID: "GET_PROFILE_ID",
  GET_PROFILE_POSTS: "GET_PROFILE_POSTS",
  UPDATE_PROFILE_POSTS: "UPDATE_PROFILE_POSTS",
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: profileTypes.GET_PROFILE_ID, payload: id });
    try {
      dispatch({ type: profileTypes.LOADING, payload: true });

      const res = getDataAPI(`/user/${id}`, auth.token);

      const res2 = getDataAPI(`/user_posts/${id}`, auth.token);

      const users = await res;
      const posts = await res2;

      dispatch({ type: profileTypes.GET_USER, payload: users.data });

      dispatch({
        type: profileTypes.GET_PROFILE_POSTS,
        payload: { ...posts.data, _id: id, page: 2 },
      });

      dispatch({ type: profileTypes.LOADING, payload: false });
    } catch (err) {
      console.log(err);
      dispatch({ type: profileTypes.LOADING, payload: false });
      dispatch({ type: actionTypes.NOTIFY, error: err.response.data.msg });
    }
  };

export const updatedProfileUser =
  ({ userData, avatar, auth }, pathname) =>
  async (dispatch) => {
    const { fullname, story } = userData;

    if (!fullname) {
      return dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: "your fullname is required" },
      });
    }

    if (fullname.length > 25) {
      return dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: "Your fullname is too long" },
      });
    }

    if (story.length > 200) {
      return dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: "Your story is too long" },
      });
    }

    try {
      let media;
      dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });

      if (avatar) media = await imageUploader([avatar]);

      const res = await patchDataAPI(
        "user",
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
        },
        auth.token
      );

      dispatch({
        type: actionTypes.AUTH,
        payload: { ...auth, user: { ...auth.user, ...res.data.user } },
      });

      dispatch({
        type: actionTypes.NOTIFY,
        payload: { success: res.data.msg },
      });

      window.location.href = pathname;
    } catch (err) {
      dispatch({ type: actionTypes.NOTIFY, payload: {} });
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch({ type: profileTypes.FOLLOW, payload: newUser });

    dispatch({
      type: actionTypes.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      await patchDataAPI(
        `/user/${user._id}/follow`,
        null,
        auth.token
      );


      //NOTOFICATIONS
      const msg = {
        id: auth.user._id,
        text: "has started following you",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth }));
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unFollow =
  ({ users, user, auth }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = {
        ...user,
        followers: user.followers.filter((u) => u._id !== auth.user._id),
      };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = {
            ...item,
            followers: user.followers.filter((u) => u._id !== auth.user._id),
          };
        }
      });
    }
    dispatch({ type: profileTypes.UNFOLLOW, payload: newUser });

    dispatch({
      type: actionTypes.AUTH,
      payload: {
        ...auth,
        user: {
          ...auth.user,
          following: auth.user.following.filter((u) => u._id !== newUser._id),
        },
      },
    });

    try {
      await patchDataAPI(
        `/user/${user._id}/unfollow`,
        null,
        auth.token
      );

      //NOTOFICATIONS
      const msg = {
        id: auth.user._id,
        text: "has started following you",
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(removeNotify({ msg, auth }));
      
    } catch (err) {
      dispatch({
        type: actionTypes.NOTIFY,
        payload: { error: err.response.data.msg },
      });
    }
  };
