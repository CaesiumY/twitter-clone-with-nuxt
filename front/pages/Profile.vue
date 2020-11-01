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
          :follows="user ? user.followings : []"
          follow-type="following"
        />
      </v-container>
    </v-card>
    <v-card class="mt-3">
      <v-container>
        <v-subheader>
          Followers
        </v-subheader>
        <follow-list
          :follows="user ? user.followers : []"
          follow-type="follower"
        />
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
  data() {
    return {
      isValid: false,
      nickname: "",
    };
  },
  head: {
    title: "Profile",
  },
  computed: {
    ...mapState("users", ["user"]),
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
  },
};
</script>

<style scoped></style>
