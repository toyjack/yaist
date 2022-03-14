import { createI18n } from 'vue-i18n'


import en from './en';
import ja from './ja'
import zh from './zh'

const messages = {
  en,
  ja,
  zh
};

const i18n = createI18n({
  legacy: false,
  useScope: "global", 
  globalInjection: true,
  locale: 'ja', // ロケールをセット
  fallbackLocale: 'en', // フォールバックロケールをセット
  messages, // ロケールメッセージをセット
  // その他オプションを指定できます
  // ...
})

export default i18n




