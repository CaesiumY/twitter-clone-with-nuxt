export const state = () => ({
  posts: [],
  hasMorePosts: true,
  imagePaths: [],
});

const LIMIT = 10;
const TOTAL = 51;

export const mutations = {
  ADD_POST(state, payload) {
    state.posts.unshift(payload);
    state.imagePaths = [];
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
          contents: `${i + state.posts.length + 1}번째 id = ${id}`,
          User: {
            nickname: "dummy user",
          },
          createdAt: Date.now(),
          Comments: [],
        };
      });

    state.posts = [...state.posts, ...dummy];
    state.hasMorePosts = dummy.length === LIMIT;
  },
  ADD_IMAGE(state, payload) {
    state.imagePaths = [...state.imagePaths, ...payload];
  },
  REMOVE_IMAGE(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
};

export const actions = {
  ADD({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/post/", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("ADD_POST", res.data);
      })
      .catch((err) => console.error("axios", err));
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
  UPLOAD_IMAGES({ commit }, payload) {
    this.$axios
      .post("http://localhost:3085/post/image", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("ADD_IMAGE", res.data);
      })
      .catch((err) => console.error(err));
  },
};
