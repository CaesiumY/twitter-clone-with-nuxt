import Vue from "vue";

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
  REMOVE_POST(state, { postId }) {
    const i = state.posts.findIndex((v) => v.id === postId);

    state.posts.splice(i, 1);
  },
  LOAD_POSTS(state, payload) {
    state.posts = [...state.posts, ...payload];
    state.hasMorePosts = payload.length === LIMIT;
  },
  ADD_IMAGE(state, payload) {
    state.imagePaths = [...state.imagePaths, ...payload];
  },
  REMOVE_IMAGE(state, payload) {
    state.imagePaths.splice(payload, 1);
  },
  ADD_COMMENT(state, payload) {
    const i = state.posts.findIndex((v) => v.id === payload.PostId);
    state.posts[i].Comments.unshift(payload);
  },
  LOAD_COMMENTS(state, payload) {
    const i = state.posts.findIndex((v) => v.id === payload.postId);

    Vue.set(state.posts[i], "Comments", payload.data);
  },
  LIKE_POST(state, payload) {
    const i = state.posts.findIndex((v) => v.id === payload.postId);
    state.posts[i].Likers.push({ id: payload.userId });
  },
  UNLIKE_POST(state, payload) {
    const i = state.posts.findIndex((v) => v.id === payload.postId);
    const userIndex = state.posts[i].Likers.findIndex(
      (v) => v.id === payload.userId
    );
    state.posts[i].Likers.splice(userIndex, 1);
  },
};

export const actions = {
  ADD({ commit }, payload) {
    this.$axios
      .post("/post/", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("ADD_POST", res.data);
      })
      .catch((err) => console.error("axios", err));
  },
  REMOVE({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        commit("REMOVE_POST", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  LOAD_POSTS({ commit, state }, payload) {
    if (state.hasMorePosts) {
      this.$axios
        .get(`/posts?offset=${10}&limit=${LIMIT}`)
        .then((res) => {
          commit("LOAD_POSTS", res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  },
  UPLOAD_IMAGES({ commit }, payload) {
    this.$axios
      .post("/post/image", payload, {
        withCredentials: true,
      })
      .then((res) => {
        commit("ADD_IMAGE", res.data);
      })
      .catch((err) => console.error(err));
  },
  LOAD_COMMENTS({ commit }, payload) {
    const { postId } = payload;
    this.$axios
      .get(`/post/${postId}/comments`)
      .then((res) => {
        commit("LOAD_COMMENTS", {
          postId: payload.postId,
          data: res.data,
        });
      })
      .catch((err) => console.log(err));
  },
  ADD_COMMENT({ commit }, payload) {
    const { postId, contents } = payload;

    this.$axios
      .post(
        `/post/${postId}/comment`,
        {
          contents,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("ADD_COMMENT", res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  RETWEET_POST({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/retweet`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("ADD_POST", res.data);
      })
      .catch((err) => {
        console.error(err);
        alert(err.response.data);
      });
  },
  LIKE_POST({ commit }, payload) {
    this.$axios
      .post(
        `/post/${payload.postId}/like`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        commit("LIKE_POST", {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => console.error(err));
  },
  UNLIKE_POST({ commit }, payload) {
    this.$axios
      .delete(`/post/${payload.postId}/like`, {
        withCredentials: true,
      })
      .then((res) => {
        commit("UNLIKE_POST", {
          userId: res.data.userId,
          postId: payload.postId,
        });
      })
      .catch((err) => console.error(err));
  },
};
