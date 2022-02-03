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
  plugins: [],

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
    baseURL: "http://localhost:3000", // Used as fallback if no runtime config is provided
  },
  i18n: {
    /* module options */
    locales: ['ja','en','zh-cn'],
    defaultLocale: 'ja',
    vueI18n:{
      fallbackLocale: 'ja',
      messages:{
        ja:{
          label:{
            searchLabel:'検索部品画数',
            sortby:'結果順序',
            toPaste:'コピー内容',
            customTemplate:'XMLテンプレート',
            templateField:'TEIブロックのテンプレート',
            save:'保存',
            numberOfResults:'結果数：',
            totalStrokes:'画数',
            relatedChar:'字体関連',
            manual:'説明',
            relatedCharLoaded:'正字情報',
            ok:'OK',
            loading:'Loading',
            changeTemplate:'設定',
            relatedChar:"関連漢字",
          },
          button:{
            search:'検索',
            decompose:'分解',
            ifDeeply:'深層検索',
          },
          option:{
            byunicode:'Unicode順',
            bystrokecount:'画数順',
            pasteCharacter:'文字符号',
            pasteUnicode:'Unicodeスカラ値',
            pasteTemplate:'テンプレート',
          },
          message:{
            copied:'コピーしました！',
          },
        },
        en:{
          label:{
            searchLabel:'Components and stroke number',
            sortby:'Sort by',
            toPaste:'To copy',
            customTemplate:'Template',
            templateField:'Template',
            save:'Save',
            numberOfResults:'Number of results: ',
            totalStrokes:'Total strokes',
            relatedChar:'Related character',
            manual:'Manual',
            relatedCharLoaded:'Related Characters Data',
            ok:'OK',
            loading:'Loading',
            changeTemplate:'Settings',
          },
          button:{
            search:'Search',
            decompose:'Decompose',
            ifDeeply:'Deeply',
          },
          option:{
            byunicode:'By Unicode',
            bystrokecount:'By stroke count',
            pasteCharacter:'Character',
            pasteUnicode:'Unicode scala',
            pasteTemplate:'Template',
          },
          message:{
            copied:'Copied!',
          }
        },
        "zh-cn":{
          label:{
            searchLabel:'汉字部件与剩余笔画数',
            sortby:'显示顺序',
            toPaste:'复制内容',
            customTemplate:'XML模板',
            templateField:'模板',
            save:'保存',
            numberOfResults:'结果总数：',
            totalStrokes:'笔画数',
            relatedChar:'相关汉字',
            manual:'使用说明',
            relatedCharLoaded:'相关汉字数据',
            ok:'读取完成',
            loading:'读取中',
            changeTemplate:'设置',
          },
          button:{
            search:'查找',
            decompose:'分解',
            ifDeeply:'深层查找',
          },
          option:{
            byunicode:'统一码编号',
            bystrokecount:'笔画数',
            pasteCharacter:'汉字',
            pasteUnicode:'统一码',
            pasteTemplate:'模板',
          },
          message:{
            copied:'复制成功！',
          }
        }
      }
    }
  },

  publicRuntimeConfig: {
    axios: {
      browserBaseURL: process.env.BROWSER_BASE_URL,
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
