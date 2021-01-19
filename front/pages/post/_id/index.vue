<template>
  <v-container>
    <post-card v-if="post" :post="post" />
    <p v-else>
      404 Not Found
    </p>
  </v-container>
</template>

<script>
import PostCard from "../../../components/PostCard";

export default {
  components: {
    PostCard,
  },
  fetch({ store, params }) {
    return store.dispatch("posts/LOAD_POST", params.id);
  },
  head() {
    return {
      title: `${this.post.User.nickname}님의 게시글`,
      meta: [
        {
          hid: "desc",
          name: "description",
          content: this.post.contents,
        },
        {
          hid: "ogtitle",
          property: "og:title",
          content: `${this.post.User.nickname}님의 게시글`,
        },
        {
          hid: "ogdesc",
          property: "og:description",
          content: this.post.contents,
        },
        {
          hid: "ogimage",
          property: "og:image",
          content: this.post.Images[0]
            ? this.post.Images[0].src
            : "https://vue.nodebird.com/vue-nodebird.png",
        },
        {
          hid: "ogurl",
          property: "og:url",
          content: `https://vue.nodebird.com/post/${this.post.id}`,
        },
      ],
    };
  },
  computed: {
    post() {
      return this.$store.state.posts.posts.find(
        (v) => v.id === parseInt(this.$route.params.id)
      );
    },
  },
};
</script>

<style scoped></style>
