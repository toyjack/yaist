import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import quasarLang from 'quasar/lang/ja'

import '@quasar/extras/material-icons/material-icons.css'
import "quasar/src/css/index.sass";

import i18n from './i18n'

import App from './App.vue'

createApp(App)
  .use(Quasar, {
    plugins: {
      Notify
    }, // import Quasar plugins and add here
    lang: quasarLang,
  })
  .use(i18n)
  .use(createPinia())
  .mount('#app')
