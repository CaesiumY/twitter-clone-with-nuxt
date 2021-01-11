export const state = () => ({
  user: null,
  hasMoreFollowers: true,
  hasMoreFollowings: true,
});

const TOTAL = 16;
const LIMIT = 3;

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_USER_DETAILS(state, payload) {
    const userProfile = { ...state.user, ...payload };

    state.user = userProfile;
  },
  LOAD_FOLLOWERS(state, payload) {
    if (payload.offset === 0) {
      state.user.Followers = payload.data;
    } else {
      state.user.Followers = [state.user.Followers, ...payload.data];
    }

    state.hasMoreFollowers = payload.data.length === LIMIT;
  },
  LOAD_FOLLOWINGS(state, payload) {
    if (payload.offset === 0) {
      state.user.Followings = payload.data;
    } else {
      state.user.Followings = [state.user.Followings, ...payload.data];
    }

    state.hasMoreFollowings = payload.data.length === LIMIT;
  },
  ADD_FOLLOW(state, payload) {
    state.user.Followings.push({ id: payload.userId });
  },
  REMOVE_FOLLOWING(state, payload) {
    const i = state.user.Followings.findIndex((v) => v.id === payload.userId);
    state.user.Followings.splice(i, 1);
  },
  DELETE_FOLLOWER(state, payload) {
    const i = state.user.Followers.findIndex((v) => v.id === payload.userId);
    state.user.Followers.splice(i, 1);
  },
  ADD_POST_LENGTH(state, payload) {
    state.user.Posts.push(payload);
  },
};

export const actions = {
  LOAD_USER({ commit }) {
    this.$axios
      .get("/user", {
        withCredentials: true,
      })
      .then((res) => {
        commit("SET_USER", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  SIGNUP({ commit }, payload) {
    this.$axios
      .post(
        "/user",
        { ...payload },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("SET_USER", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  LOGIN({ commit }, payload) {
    this.$axios
      .post(
        "/user/login",
        { ...payload },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("SET_USER", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  LOGOUT({ commit }) {
    this.$axios
      .post(
        "/user/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("SET_USER", null);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  SET_NICKNAME({ commit }, payload) {
    this.$axios
      .patch(
        "user/nickname",
        { nickname: payload.nickname },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("SET_USER_DETAILS", payload);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  LOAD_FOLLOWERS({ commit, state }, payload) {
    if (!(payload && payload.offset === 0) && !state.hasMoreFollowers) return;

    let offset = state.user.Followers.length;
    payload && payload.offset === 0 ? (offset = 0) : offset;

    return this.$axios
      .get(`user/${state.user.id}/followers?limit=3&offset=${offset}`, {
        withCredentials: true,
      })
      .then((res) =>
        commit("LOAD_FOLLOWERS", {
          data: res.data,
          offset,
        })
      )
      .catch((err) => console.error(err));
  },
  LOAD_FOLLOWINGS({ commit, state }, payload) {
    if (!(payload && payload.offset === 0) && !state.hasMoreFollowings) return;

    let offset = state.user.Followings.length;
    payload && payload.offset === 0 ? (offset = 0) : offset;

    return this.$axios
      .get(`user/${state.user.id}/followings?limit=3&offset=${offset}`, {
        withCredentials: true,
      })
      .then((res) =>
        commit("LOAD_FOLLOWINGS", {
          data: res.data,
          offset,
        })
      )
      .catch((err) => console.error(err));
  },
  FOLLOW({ commit }, payload) {
    this.$axios
      .post(
        `user/${payload.userId}/follow`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("ADD_FOLLOW", {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  UNFOLLOW({ commit }, payload) {
    return this.$axios
      .delete(
        `user/${payload.userId}/follow`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("REMOVE_FOLLOWING", {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
  DELETE_FOLLOWER({ commit }, payload) {
    return this.$axios
      .delete(
        `user/${payload.userId}/follower`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("DELETE_FOLLOWER", {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
