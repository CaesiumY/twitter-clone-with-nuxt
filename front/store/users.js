export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
  },
  SET_USER_DETAILS(state, payload) {
    const userProfile = { ...state.user, ...payload };

    state.user = userProfile;
  },
};

export const actions = {
  SIGNUP({ commit }, payload) {
    commit("SET_USER", payload);
  },
  LOGIN({ commit }, payload) {
    commit("SET_USER", payload);
  },
  LOGOUT({ commit }) {
    commit("SET_USER", null);
  },
  SET_NICKNAME({ commit }, payload) {
    commit("SET_USER_DETAILS", payload);
  },
};
