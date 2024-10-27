import enJson from '@/translation/en.json'
import viJson from '@/translation/vi.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: true,
  resources: {
    en: { translation: enJson },
    vi: { translation: viJson }
  }
})

export { i18n }
