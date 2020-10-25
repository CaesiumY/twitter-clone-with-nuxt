<template>
  <v-container>
    <v-card>
      <v-form>
        <v-subheader>회원가입</v-subheader>
        <v-container>
          <v-text-field type="email" label="이메일" required />
          <v-text-field type="password" label="비밀번호" required />
          <v-text-field type="password" label="비밀번호 확인" required />
          <v-text-field type="nickname" label="닉네임" required />
          <v-checkbox label="동의합니다" />
          <v-btn dark type="submit" color="green">회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  head: {
    title: "SignUp",
  },
};
</script>

<style scoped></style>
