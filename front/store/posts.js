export const state = () => ({
  posts: [],
});

export const mutations = {
  ADD_POST(state, payload) {
    state.posts.unshift(payload);
  },
  REMOVE_POST(state, { id }) {
    const i = state.posts.findIndex((v) => v.id === id);

    state.posts.splice(i, 1);
  },
};

export const actions = {
  ADD({ commit }, payload) {
    commit("ADD_POST", payload);
  },
  REMOVE({ commit }, payload) {
    commit("REMOVE_POST", payload);
  },
};
