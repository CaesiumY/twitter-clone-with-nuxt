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
    return store.dispatch("posts/LOAD_POSTS", { reset: true });
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("posts", ["posts", "hasMorePosts"]),
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        this.$store.dispatch("posts/LOAD_POSTS");
      }
    },
  },
};
</script>

<style scoped></style>
