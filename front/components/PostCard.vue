<template>
  <v-container>
    <v-card>
      <v-img />
      <v-card-text>
        <nuxt-link class="content-link" :to="`/user/${post.id}`">
          <h3>{{ post.User.nickname }}</h3>
          <p class="body-1">
            {{ post.contents }}
          </p>
        </nuxt-link>
      </v-card-text>
      <v-card-actions>
        <v-btn text color="#f39c12">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="#f39c12">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn text color="#f39c12" @click="onToggleComments">
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

    <template v-if="isShowComments">
      <comment-form :post-id="post.id" />
      <v-list>
        <v-list-item v-for="comment in post.comments" :key="comment.id">
          <v-list-item-avatar color="teal">
            <span>{{ comment.user.nickname[0] }}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ comment.user.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ comment.contents }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-container>
</template>

<script>
import CommentForm from "../components/CommentForm";

export default {
  components: {
    CommentForm,
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isShowComments: false,
    };
  },
  methods: {
    onDeletePost() {
      this.$store.dispatch("posts/REMOVE", { id: this.post.id });
    },
    onEditPost() {
      console.log("id", this.post.id);
    },
    onToggleComments() {
      if (!this.isShowComments) {
        this.$store.dispatch("LOAD_COMMENTS", {
          postId: this.post.id,
        });
      }

      this.isShowComments = !this.isShowComments;
    },
  },
};
</script>

<style scoped>
.content-link {
  text-decoration: none;
  color: inherit;
}
</style>
