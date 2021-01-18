export default {
  head: {
    title: "🐤Twitter with Nuxt🏞",
    meta: [{ charset: "utf-8" }],
  },
  modules: ["@nuxtjs/axios"],
  buildModules: ["@nuxtjs/vuetify", "@nuxtjs/moment"],
  build: {
    analyze: false,
    extend(config, { isClient, isServer, isDev }) {
      if (isServer && !isDev) {
        config.devtool = "hidden-source-map";
      }

      // console.log(
      //   "🚀 ~ file: nuxt.config.js ~ line 19 ~ extend ~ config",
      //   config,
      //   isServer,
      //   isClient
      // );
    },
  },
  moment: {
    locales: ["ko"],
  },
  axios: {
    browserBaseURL: "http://localhost:3085",
    baseURL: "http://localhost:3085",
    https: false,
  },
};
