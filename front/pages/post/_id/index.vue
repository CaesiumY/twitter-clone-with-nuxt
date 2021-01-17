<template>
  <v-container>
    <post-card v-if="post" :post="post" />
    <p v-else>
      404 Not Found
    </p>
  </v-container>
</template>

<script>
import PostCard from "../../../components/PostCard";

export default {
  components: {
    PostCard,
  },
  fetch({ store, params }) {
    return store.dispatch("posts/LOAD_POST", params.id);
  },
  computed: {
    post() {
      return this.$store.state.posts.posts.find(
        (v) => v.id === parseInt(this.$route.params.id)
      );
    },
  },
};
</script>

<style scoped></style>
