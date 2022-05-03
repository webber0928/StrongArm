const fs = require("fs");
const dotenv = require("dotenv");
import colors from 'vuetify/es5/util/colors'

// 切換環境使用
function envFileName() {
  const { NUXT_ENV_APP } = process.env;

  if (NUXT_ENV_APP === "development") {
    return ".env.dev";
  } else if (NUXT_ENV_APP === "production") {
    return ".env.prod";
  }

  return ".env.dev";
}
const envConfig = dotenv.parse(
  fs.readFileSync(`${__dirname}/env/` + envFileName())
);
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

console.info(
  `[START] ENV: ${process.env.NODE_ENV}, BaseUrl: ${process.env.API_URL_BROWSER}`
);

export default {
  vue: {
    config: {
      productionTip: true,
      devtools: true,
    },
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "nuxt-starter-template",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/axios", "@/plugins/api-plugins"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/vuetify',
    "@nuxtjs/router",
    ["@nuxtjs/dotenv", { filename: envFileName(), path: `${__dirname}/env/` }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["@nuxtjs/axios"],

   // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
   vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  server: {
    host: "0.0.0.0", // default: localhost
  },
  axios: {
    proxy: true,
    prefix: "/", // baseURL
    credentials: true,
  },
};
