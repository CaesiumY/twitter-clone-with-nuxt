<template>
  <v-container>
    <v-card v-if="!user">
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
    <v-card v-else>
      <v-container>
        <p>{{ user.nickname }}님 안녕하세요.</p>
        <div>
          <v-btn @click="onLogout">
            Logout
          </v-btn>
        </div>
      </v-container>
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
  computed: {
    user() {
      return this.$store.state.users.user;
    },
  },
  methods: {
    onSubmitLoginForm() {
      if (this.$refs.loginForm.validate()) {
        this.$store.dispatch("users/LOGIN", {
          email: this.email,
          password: this.password,
        });
      }
    },
    onLogout() {
      this.$store.dispatch("users/LOGOUT");
    },
  },
};
</script>

<style scoped></style>
