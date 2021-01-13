<template>
  <v-container>
    <v-card class="mb-5">
      <v-container>
        <p>{{ other.nickname }}</p>

        <v-row>
          <v-col col="4">{{ other.Followings.length }} 팔로우</v-col>
          <v-col col="4">{{ other.Followers.length }} 팔로워</v-col>
          <v-col col="4">{{ other.Posts.length }} 게시글</v-col>
        </v-row>
      </v-container>
    </v-card>
    <div>
      <post-card v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import PostCard from "@/components/PostCard";

export default {
  components: {
    PostCard,
  },
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch("posts/LOAD_USER_POSTS", {
        userId: params.id,
      }),
      store.dispatch("users/LOAD_OTHER", {
        userId: params.id,
      }),
    ]);

    // store.dispatch("posts/LOAD_USER_POSTS", {
    //   userId: params.id,
    // });
    // return store.dispatch("users/LOAD_OTHER", {
    //   userId: params.id,
    // });
  },
  computed: {
    other() {
      return this.$store.state.users.other;
    },
    ...mapState("posts", ["posts", "hasMorePosts"]),
  },
  mounted() {
    console.log(this.other);
    this.$store.dispatch("posts/LOAD_POSTS");

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
