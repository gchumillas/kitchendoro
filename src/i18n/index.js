import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as Localization from 'expo-localization'
import resources from './resources'

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    lng: Localization.locale,
    fallbackLng: 'en',
    fallbackNS: 'common',
    resources,
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    },
    parseMissingKeyHandler: key => `[${key}]`
  })

export default i18n
