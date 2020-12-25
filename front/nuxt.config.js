export default {
  head: {
    title: "🐤Twitter with Nuxt🏞",
    meta: [{ charset: "utf-8" }],
  },
  modules: ["@nuxtjs/axios"],
  buildModules: [
    [
      "@nuxtjs/vuetify",
      {
        /* module options */
      },
    ],
  ],
  axios: {
    browserBaseURL: "http://localhost:3085",
    baseURL: "http://localhost:3085",
    https: false,
  },
};
