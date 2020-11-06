export const state = () => ({
  posts: [],
  hasMorePosts: true,
});

const LIMIT = 10;
const TOTAL = 51;

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
  LOAD_POSTS(state) {
    const diff = TOTAL - state.posts.length;

    const dummy = Array(diff < LIMIT ? diff : LIMIT)
      .fill()
      .map((v, i) => {
        const id = Date.now().toString() + Math.floor(Math.random() * 3000);

        return {
          id,
          contents: `${i + 1}번째 id = ${id}`,
          user: {
            nickname: "dummy user",
          },
          createdAt: Date.now(),
          comments: [],
        };
      });

    state.posts = [...state.posts, ...dummy];
    state.hasMorePosts = dummy.length === LIMIT;
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
  LOAD_POSTS({ commit, state }) {
    if (state.hasMorePosts) {
      commit("LOAD_POSTS");
    }
  },
};
