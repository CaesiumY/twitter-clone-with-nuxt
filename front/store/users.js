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
  DELETE_FOLLOWER(state, payload) {
    state.user.followers.splice(payload.id, 1);
  },
  DELETE_FOLLOWING(state, payload) {
    state.user.followings.splice(payload.id, 1);
  },
  LOAD_FOLLOWERS(state) {
    const diff = TOTAL - (state.user.Followers.length || 0);

    const dummy = Array(diff < LIMIT ? diff : LIMIT)
      .fill()
      .map((v, i) => {
        return Math.floor(Math.random() * 3000) + Date.now().toString();
      });

    state.user.Followers = [...state.user.Followers, ...dummy];
    state.hasMoreFollowers = dummy.length === LIMIT;
  },
  LOAD_FOLLOWINGS(state) {
    const diff = TOTAL - (state.user.Followings.length || 0);
    const dummy = Array(diff < LIMIT ? diff : LIMIT)
      .fill()
      .map((v, i) => {
        return Math.floor(Math.random() * 3000) + Date.now().toString();
      });
    state.user.Followings = [...state.user.Followings, ...dummy];
    state.hasMoreFollowings = dummy.length === LIMIT;
  },
  ADD_FOLLOW(state, payload) {
    state.user.Followings.push({ id: payload.userId });
  },
  REMOVE_FOLLOW(state, payload) {
    const i = state.user.Followings.findIndex((v) => v.id === payload.userId);
    state.user.Followings.splice(i, 1);
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
  DELETE_FOLLOW({ commit }, payload) {
    payload.type === "following"
      ? commit("DELETE_FOLLOWING", payload)
      : commit("DELETE_FOLLOWER", payload);
  },
  LOAD_FOLLOWERS({ commit, state }) {
    if (state.hasMoreFollowers) {
      commit("LOAD_FOLLOWERS");
    }
  },
  LOAD_FOLLOWINGS({ commit, state }) {
    if (state.hasMoreFollowings) {
      commit("LOAD_FOLLOWINGS");
    }
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
    this.$axios
      .delete(
        `user/${payload.userId}/follow`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("REMOVE_FOLLOW", {
          userId: payload.userId,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
