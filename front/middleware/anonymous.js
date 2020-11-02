export default ({ store, redirect }) => {
  if (store.state.users.user) {
    redirect("/");
  }
};
