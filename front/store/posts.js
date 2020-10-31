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
  ADD_COMMENT(state, payload) {
    const i = state.posts.findIndex((v) => v.id === payload.postId);

    state.posts[i].comments.push(payload);
  },
};

export const actions = {
  ADD({ commit }, payload) {
    commit("ADD_POST", payload);
  },
  REMOVE({ commit }, payload) {
    commit("REMOVE_POST", payload);
  },
  ADD_COMMENT({ commit }, payload) {
    commit("ADD_COMMENT", payload);
  },
};
