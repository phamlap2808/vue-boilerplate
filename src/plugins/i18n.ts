import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'

export enum Locales {
  en = 'en',
  vi = 'vi',
}

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en: en,
  },
})