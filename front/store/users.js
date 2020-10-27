export const store = () => ({
  countUsers: 0,
});

export const mutations = {
  INCREMENT(state) {
    state.countUsers++;
  },
};
