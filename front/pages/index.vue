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
  computed: {
    ...mapState("users", ["user"]),
    ...mapState("posts", ["posts"]),
  },
  methods: {
    onClick() {
      this.$store.commit("INCREMENT");
    },
  },
};
</script>

<style scoped></style>
