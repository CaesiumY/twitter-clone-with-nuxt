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

        <v-menu offset-y>
          <template #activator="{ on }">
            <v-btn text color="#f39c12" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn depressed color="error" @click="onDeletePost">
                삭제
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                depressed
                class="white--text"
                color="blue-grey"
                @click="onEditPost"
              >
                수정
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
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
  methods: {
    onDeletePost() {
      this.$store.dispatch("posts/REMOVE", { id: this.post.id });
    },
    onEditPost() {
      console.log("id", this.post.id);
    },
  },
};
</script>

<style scoped></style>
