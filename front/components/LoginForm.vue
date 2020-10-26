<template>
  <v-container>
    <v-card>
      <v-form
        ref="loginForm"
        v-model="isValid"
        @submit.prevent="onSubmitLoginForm"
      >
        <v-subheader>로그인</v-subheader>
        <v-container>
          <v-text-field
            v-model="email"
            :rules="emailRules"
            type="email"
            label="이메일"
            required
          />
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            type="password"
            label="비밀번호"
            required
          />
          <div class="mt-2">
            <v-btn type="submit" color="success" :disabled="!isValid">
              로그인
            </v-btn>
            <v-btn>회원가입</v-btn>
          </div>
        </v-container>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isValid: false,
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일 형식이 올바르지 않습니다.",
      ],
      passwordRules: [(v) => !!v || "비밀번호는 필수입니다."],
    };
  },
  methods: {
    onSubmitLoginForm() {
      console.log(this.$refs.loginForm.validate());
      console.log(this.isValid);
    },
  },
};
</script>

<style scoped></style>
