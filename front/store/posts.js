export const state = () => ({
  countPosts: 0,
});

export const mutations = {
  INCREMENT(state) {
    state.countPosts++;
  },
};
