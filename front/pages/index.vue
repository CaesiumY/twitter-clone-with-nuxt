<template>
  <div>
    <post-form v-if="user" />

    <div>
      <post-card />
      <post-card />
      <post-card />
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
  },
  methods: {
    onClick() {
      this.$store.commit("INCREMENT");
    },
  },
};
</script>

<style scoped></style>
