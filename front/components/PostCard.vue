<template>
  <v-container>
    <v-card>
      <v-img />
      <v-card-text>
        <div>
          <h3>{{ post.user.nickname }}</h3>
          <p class="body-1">
            {{ post.contents }}
          </p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="#f39c12">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="#f39c12">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="#f39c12">
          <v-icon>mdi-comment-outline</v-icon>
        </v-btn>
        <v-btn text color="#f39c12">
          <v-icon>mdi-dots-horizontal</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
