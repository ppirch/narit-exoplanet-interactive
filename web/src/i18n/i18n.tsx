import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import homeEn from 'locales/en/home.json'
import homeTh from 'locales/th/home.json'

const resources = {
  en: {
    home: homeEn
  },
  th: {
    home: homeTh
  }
}

i18next.use(initReactI18next).init({
  resources,
  lng: 'en',
  debug: false,
  fallbackLng: 'en',
  saveMissing: true
})

export default i18next
