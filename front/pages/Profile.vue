<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>
          내 프로필
        </v-subheader>
        <v-form ref="form" v-model="isValid" @submit.prevent="onSubmitForm">
          <v-text-field v-model="nickname" label="닉네임" required />
          <v-btn type="submit" dark color="blue">
            수정
          </v-btn>
        </v-form>
      </v-container>
    </v-card>

    <v-card class="mt-3">
      <v-container>
        <v-subheader>
          Follows
        </v-subheader>
        <follow-list
          :follows="user ? user.Followings : []"
          follow-type="following"
        />
        <v-btn
          v-if="hasMoreFollowings"
          block
          color="primary"
          @click="onClickMore({ type: 'following' })"
        >
          더보기
        </v-btn>
      </v-container>
    </v-card>
    <v-card class="mt-3">
      <v-container>
        <v-subheader>
          Followers
        </v-subheader>
        <follow-list
          :follows="user ? user.Followers : []"
          follow-type="follower"
        />
        <v-btn
          v-if="hasMoreFollowers"
          block
          color="primary"
          @click="onClickMore({ type: 'follower' })"
        >
          더보기
        </v-btn>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import FollowList from "../components/FollowList";
import { mapState } from "vuex";

export default {
  components: {
    FollowList,
  },
  middleware: "authenticated",
  data() {
    return {
      isValid: false,
      nickname: "",
    };
  },
  fetch({ store }) {
    return Promise.all([
      store.dispatch("users/LOAD_FOLLOWERS", { offset: 0 }),
      store.dispatch("users/LOAD_FOLLOWINGS", { offset: 0 }),
    ]);
  },
  head: {
    title: "Profile",
  },
  computed: {
    ...mapState("users", ["user", "hasMoreFollowers", "hasMoreFollowings"]),
  },
  watch: {
    user() {
      this.setNickname();
    },
  },
  mounted() {
    this.setNickname();
  },
  methods: {
    onSubmitForm() {
      if (!this.$refs.form.validate()) return;

      this.$store.dispatch("users/SET_NICKNAME", {
        nickname: this.nickname,
      });
    },
    setNickname() {
      this.nickname = this.user ? this.user.nickname : "";
    },
    onClickMore(payload) {
      const { type } = payload;

      type === "following"
        ? this.$store.dispatch("users/LOAD_FOLLOWINGS")
        : this.$store.dispatch("users/LOAD_FOLLOWERS");
    },
  },
};
</script>

<style scoped></style>
