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

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-text-field
            label="검색"
            hide-details
            prepend-icon="mdi-magnify"
            class="d-flex align-center"
          />

          <v-btn class="d-flex align-center" text nuxt to="/profile">
            <div>프로필</div>
          </v-btn>
          <v-btn class="d-flex align-center" text nuxt to="/signup">
            <div>회원가입</div>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </nav>

    <v-row>
      <v-col cols="12" md="4">
        로그인
      </v-col>
      <v-col cols="12" md="8">
        <Nuxt />
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  display: inline-block;
  text-decoration: none;
  color: inherit;
}
</style>
