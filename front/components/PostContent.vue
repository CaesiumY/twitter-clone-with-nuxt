<template>
  <div>
    <post-images class="pb-3" :images="post.Images || []" />

    <v-card-title>
      <h3>
        <nuxt-link class="content-link" :to="`/user/${post.id}`">
          {{ post.User.nickname }}
        </nuxt-link>
        <v-btn v-if="canFollow" @click="onFollow">팔로우</v-btn>
        <v-btn v-if="canUnfollow" @click="onUnfollow">언팔로우</v-btn>
      </h3>
    </v-card-title>

    <v-card-text>
      <div class="body-1">
        <div>{{ post.contents }}</div>
      </div>
    </v-card-text>
  </div>
</template>

<script>
import PostImages from "./PostImages";

export default {
  components: {
    PostImages,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  computed: {
    me() {
      return this.$store.state.users.user;
    },
    canFollow() {
      return (
        this.me &&
        this.me.id !== this.post.User.id &&
        !this.me.Followings.find((v) => v.id === this.post.User.id)
      );
    },
    canUnfollow() {
      return (
        this.me &&
        this.me.id !== this.post.User.id &&
        this.me.Followings.find((v) => v.id === this.post.User.id)
      );
    },
  },
  methods: {
    onFollow() {
      this.$store.dispatch("users/FOLLOW", {
        userId: this.post.User.id,
      });
    },
    onUnfollow() {
      this.$store.dispatch("users/UNFOLLOW", {
        userId: this.post.User.id,
      });
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
