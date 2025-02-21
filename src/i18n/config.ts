import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { zh } from './locales/zh'
import { en } from './locales/en'

const resources = {
  zh: { translation: zh },
  en: { translation: en }
}

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged',
      bindI18nStore: 'added'
    },
    debug: true  // 开启调试模式
  })

// 检查资源是否正确加载
console.log('i18next resources:', i18next.options.resources)
console.log('Current language:', i18next.language)
console.log('Available languages:', Object.keys(resources))

i18next.on('languageChanged', (lng) => {
  localStorage.setItem('i18nextLng', lng)
})

export default i18next 