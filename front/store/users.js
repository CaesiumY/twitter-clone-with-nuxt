export const state = () => ({
  countUsers: 0,
});

export const mutations = {
  INCREMENT(state) {
    state.countUsers++;
  },
};
