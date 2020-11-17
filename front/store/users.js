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
    const diff = TOTAL - state.user.followers.length;

    const dummy = Array(diff < LIMIT ? diff : LIMIT)
      .fill()
      .map((v, i) => {
        return Math.floor(Math.random() * 3000) + Date.now().toString();
      });

    state.user.followers = [...state.user.followers, ...dummy];
    state.hasMoreFollowers = dummy.length === LIMIT;
  },
  LOAD_FOLLOWINGS(state) {
    const diff = TOTAL - state.user.followings.length;

    const dummy = Array(diff < LIMIT ? diff : LIMIT)
      .fill()
      .map((v, i) => {
        return Math.floor(Math.random() * 3000) + Date.now().toString();
      });

    state.user.followings = [...state.user.followings, ...dummy];
    state.hasMoreFollowings = dummy.length === LIMIT;
  },
};

export const actions = {
  SIGNUP({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/user", { ...payload })
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
        "http://localhost:3085/user/login",
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
    commit("SET_USER", null);
  },
  SET_NICKNAME({ commit }, payload) {
    commit("SET_USER_DETAILS", payload);
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
};
