export const state = () => ({
  user: null,
});

export const mutations = {
  SET_USER(state, payload) {
    state.user = payload;
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
};
