<template>
  <div>
    <v-card-text>
      <nuxt-link class="content-link" :to="`/user/${post.id}`">
        <h3>{{ post.User.nickname }}</h3>
        <p class="body-1">
          {{ post.contents }}
        </p>
      </nuxt-link>
    </v-card-text>

    <post-images class="pb-3" :images="post.Images || []" />
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
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: inherit;
}
</style>
