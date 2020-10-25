<template>
  <v-container>
    <v-card>
      <v-form>
        <v-subheader>로그인</v-subheader>
        <v-container>
          <v-text-field type="email" label="이메일" required />
          <v-text-field type="password" label="비밀번호" required />
          <v-btn dark type="submit" color="green">로그인</v-btn>
          <v-btn>회원가입</v-btn>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped></style>
