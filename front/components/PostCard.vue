<template>
  <v-container>
    <v-card>
      <div v-if="post.RetweetId && post.Retweet">
        <v-subheader>
          {{ post.User.nickname }}님이 리트윗하셨습니다.
        </v-subheader>
        <v-card class="mx-5">
          <post-content :post="post.Retweet" />
        </v-card>
      </div>

      <post-content v-else :post="post" />
      <v-card-actions>
        <v-btn text color="#f39c12" @click="onClickRetweet">
          <v-icon>mdi-twitter-retweet</v-icon>
        </v-btn>
        <v-btn text color="#f39c12" @click="onToggleLike">
          <v-icon>{{ isHeartFilled }}</v-icon>
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
        <v-list-item v-for="comment in post.Comments" :key="comment.id">
          <v-list-item-avatar color="teal">
            <span>{{ comment.User.nickname[0] }}</span>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              {{ comment.User.nickname }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ comment.content }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-container>
</template>

<script>
import CommentForm from "../components/CommentForm";
import PostContent from "./PostContent.vue";

export default {
  components: {
    CommentForm,
    PostContent,
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
  computed: {
    me() {
      return this.$store.state.users.user;
    },
    isLiked() {
      return !!(this.post.Likers || []).find(
        (liker) => liker.id === (this.me && this.me.id)
      );
    },
    isHeartFilled() {
      return this.isLiked ? "mdi-heart" : "mdi-heart-outline";
    },
  },
  methods: {
    onDeletePost() {
      this.$store.dispatch("posts/REMOVE", { postId: this.post.id });
    },
    onEditPost() {
      console.log("id", this.post.id);
    },
    onToggleComments() {
      if (!this.isShowComments) {
        this.$store.dispatch("posts/LOAD_COMMENTS", {
          postId: this.post.id,
        });
      }

      this.isShowComments = !this.isShowComments;
    },
    onClickRetweet() {
      if (!this.me) {
        return alert("Login Required!");
      }

      return this.$store.dispatch("posts/RETWEET_POST", {
        postId: this.post.id,
      });
    },
    onToggleLike() {
      if (!this.me) {
        return alert("Login Required!");
      }

      if (!this.isLiked) {
        return this.$store.dispatch("posts/LIKE_POST", {
          postId: this.post.id,
        });
      } else {
        return this.$store.dispatch("posts/UNLIKE_POST", {
          postId: this.post.id,
        });
      }
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
