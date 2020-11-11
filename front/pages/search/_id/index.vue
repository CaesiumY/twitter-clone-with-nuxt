<template>
  <div>
    <div>
      <post-card v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "~/components/PostCard";

export default {
  components: {
    PostCard,
  },
  fetch({ store }) {
    store.dispatch("posts/LOAD_POSTS");
  },
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("posts", ["posts", "hasMorePosts"]),
  },
  mounted() {
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
