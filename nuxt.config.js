import i18n_messages from './i18n';

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // title: "HIIDS",
    title: "YAIST",
    htmlAttrs: {
      lang: "ja",
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
  plugins: [
    '@/plugins/gtag',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    // https://go.nuxtjs.dev/content
    "@nuxt/content",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://i18n.nuxtjs.org/setup
    '@nuxtjs/i18n',
  ],
  axios: {
    baseURL: "/", // Used as fallback if no runtime config is provided
  },
  i18n: {
    /* module options */
    locales: ['ja','en','zh-cn'],
    defaultLocale: 'ja',
    vueI18n:{
      fallbackLocale: 'ja',
      messages: i18n_messages
    }
  },

  publicRuntimeConfig: {
    axios: {
      // browserBaseURL: process.env.BROWSER_BASE_URL,
      browserBaseURL: "/",
    },
  },

  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.BASE_URL,
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
