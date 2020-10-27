<template>
  <div>
    <div>{{ this.$store.state.count }}</div>
    <v-btn @click="onClick">
      Increase
    </v-btn>

    <post-card />
    <post-card />
    <post-card />
  </div>
</template>

<script>
import PostCard from "../components/PostCard";
export default {
  components: {
    PostCard,
  },
  methods: {
    onClick() {
      this.$store.commit("INCREMENT");
    },
  },
};
</script>

<style scoped></style>
