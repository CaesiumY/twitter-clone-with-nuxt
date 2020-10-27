export const state = () => ({
  count: 0,
});

export const mutations = {
  INCREMENT(state) {
    state.count++;
  },
};
