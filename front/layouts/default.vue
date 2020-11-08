<template>
  <v-app>
    <nav>
      <v-toolbar dark color="green">
        <v-toolbar-title>
          <nuxt-link to="/" class="d-flex align-center">
            <v-icon class="mr-2">
              mdi-twitter
            </v-icon>
            Nuxtwitter
          </nuxt-link>
        </v-toolbar-title>

        <v-spacer />

        <v-toolbar-items>
          <v-form @submit.prevent="onSubmitSearch">
            <div class="d-flex align-center" style="height: 100%">
              <v-text-field
                v-model="search"
                label="검색"
                hide-details
                prepend-icon="mdi-magnify"
              />
            </div>
          </v-form>

          <v-btn class="d-flex align-center" text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn class="d-flex align-center" text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <v-row no-gutters class="mt-3">
      <v-col cols="12" md="4">
        <login-form />
      </v-col>
      <v-col cols="12" md="8">
        <Nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import LoginForm from "../components/LoginForm";

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      search: "",
    };
  },
  methods: {
    onSubmitSearch() {
      this.$router.push({
        path: `search/${this.search}`,
      });

      this.search = "";
    },
  },
};
</script>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}
</style>
