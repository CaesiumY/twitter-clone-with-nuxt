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
};
