<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>
          내 프로필
        </v-subheader>
        <v-form>
          <v-text-field label="닉네임" required />
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
        <follow-list />
      </v-container>
    </v-card>
    <v-card class="mt-3">
      <v-container>
        <v-subheader>
          Followers
        </v-subheader>
        <follow-list />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import FollowList from "../components/FollowList";

export default {
  components: {
    FollowList,
  },
  head: {
    title: "Profile",
  },
};
</script>

<style scoped></style>
