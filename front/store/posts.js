export const state = () => ({
  posts: [],
});

export const mutations = {
  ADD_POST(state, payload) {
    state.posts.unshift(payload);
  },
};

export const actions = {
  ADD({ commit }, payload) {
    commit("ADD_POST", payload);
  },
};
