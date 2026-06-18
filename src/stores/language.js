import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import i18n from '@/i18n'

export const useLanguageStore = defineStore('language', () => {
  const currentLocale = ref('zh')

  const availableLocales = computed(() => [
    { code: 'zh', label: '中文', flag: '🇨🇳' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ])

  function setLocale(code) {
    currentLocale.value = code
    i18n.global.locale.value = code
    document.documentElement.lang = code
    localStorage.setItem('locale', code)
  }

  function initLocale() {
    const saved = localStorage.getItem('locale')
    const browser = navigator.language?.split('-')[0]
    const supported = ['zh', 'en', 'ko', 'ja']
    const fallback = supported.includes(saved) ? saved
      : supported.includes(browser) ? browser
      : 'en'
    setLocale(fallback)
    return fallback
  }

  return { currentLocale, availableLocales, setLocale, initLocale }
})
