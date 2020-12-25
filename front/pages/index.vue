<template>
  <div>
    <post-form v-if="user" />

    <div>
      <post-card v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

export default {
  components: {
    PostCard,
    PostForm,
  },
  fetch({ store }) {
    return store.dispatch("posts/LOAD_POSTS");
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("posts", ["posts", "hasMorePosts"]),
  },
  mounted() {
    this.$store.dispatch("posts/LOAD_POSTS");

    window.addEventListener("scroll", () => {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        this.$store.dispatch("posts/LOAD_POSTS");
      }
    });
  },
  methods: {},
};
</script>

<style scoped></style>
