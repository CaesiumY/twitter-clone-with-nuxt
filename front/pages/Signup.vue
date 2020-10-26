<template>
  <v-container>
    <v-card>
      <v-form
        ref="signupForm"
        v-model="isValid"
        @submit.prevent="onSubmitSignup"
      >
        <v-subheader>회원가입</v-subheader>
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
          <v-text-field
            v-model="passwordCheck"
            :rules="passwordCheckRules"
            type="password"
            label="비밀번호 확인"
            required
          />
          <v-text-field
            v-model="nickname"
            :rules="nicknameRules"
            type="nickname"
            label="닉네임"
            required
          />
          <v-checkbox
            v-model="isAgreed"
            :rules="isAgreedRules"
            label="동의합니다"
            required
          />
          <v-btn
            class="mt-2"
            color="success"
            :disabled="!isValid"
            type="submit"
          >
            회원가입
          </v-btn>
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
      passwordCheck: "",
      nickname: "",
      isAgreed: false,

      emailRules: [
        (v) => !!v || "이메일은 필수입니다.",
        (v) => /.+@.+/.test(v) || "이메일 형식이 올바르지 않습니다.",
      ],
      passwordRules: [
        (v) => !!v || "비밀번호는 필수입니다.",
        (v) => v.length >= 6 || "비밀번호는 6자리 이상입니다.",
      ],
      passwordCheckRules: [
        (v) => !!v || "비밀번호 확인은 필수입니다.",
        (v) => v === this.password || "비밀번호가 일치하지 않습니다.",
      ],
      nicknameRules: [(v) => !!v || "닉네임은 필수입니다."],
      isAgreedRules: [(v) => !!v || "동의는 필수입니다."],
    };
  },
  head: {
    title: "SignUp",
  },
  methods: {
    onSubmitSignup() {
      console.log(this.$refs.signupForm.validate());
      console.log(this.isValid);
    },
  },
};
</script>

<style scoped></style>
