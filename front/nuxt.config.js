export default {
  head: {
    title: "🐤Twitter with Nuxt🏞",
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content:
          "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover",
      },
      {
        "http-equiv": "X-UA-Compatible",
        content: "IE=edge",
      },
      {
        hid: "desc",
        name: "description",
        content: "Nuxtwitter SNS",
      },
      {
        hid: "ogtitle",
        name: "og:title",
        content: "Nuxtwitter",
      },
      {
        hid: "ogdesc",
        name: "og:description",
        content: "Nuxtwitter SNS",
      },
      {
        hid: "ogtype",
        property: "og:type",
        content: "website",
      },
      {
        hid: "ogimage",
        property: "og:image",
        content: "http://localhost:3000/logo.png",
      },
      {
        hid: "ogurl",
        property: "og:url",
        content: "https://vue.nodebird.com",
      },
    ],
    link: [
      {
        rel: "shortcut icon",
        href: "/favicon.ico",
      },
    ],
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
