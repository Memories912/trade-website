import { defineStore } from 'pinia'
import { ref } from 'vue'
import { companyInfo as mockCompanyInfo } from '@/assets/mock/products'
import { mockLanguageConfigs, mockFaqItems } from '@/assets/mock/admin'

export const useAdminSettingsStore = defineStore('adminSettings', () => {
  const companyInfo = ref(JSON.parse(JSON.stringify(mockCompanyInfo)))
  const languages = ref(JSON.parse(JSON.stringify(mockLanguageConfigs)))
  const faqItems = ref(JSON.parse(JSON.stringify(mockFaqItems)))

  /** Update company information */
  function updateCompanyInfo(data) {
    companyInfo.value = { ...companyInfo.value, ...data }
  }

  /** Toggle a language's enabled status */
  function toggleLanguage(code, enabled) {
    const lang = languages.value.find(l => l.code === code)
    if (lang) {
      lang.enabled = enabled
    }
  }

  /** Set the default language */
  function setDefaultLanguage(code) {
    languages.value.forEach(l => {
      l.isDefault = l.code === code
    })
  }

  /** Add a new FAQ item */
  function addFaqItem(data) {
    const item = {
      ...data,
      id: data.id || 'faq_' + Date.now(),
    }
    faqItems.value.push(item)
    return item
  }

  /** Update an FAQ item */
  function updateFaqItem(id, data) {
    const idx = faqItems.value.findIndex(f => f.id === id)
    if (idx !== -1) {
      faqItems.value[idx] = { ...faqItems.value[idx], ...data }
      return faqItems.value[idx]
    }
    return null
  }

  /** Delete an FAQ item */
  function deleteFaqItem(id) {
    faqItems.value = faqItems.value.filter(f => f.id !== id)
  }

  /** Get a single FAQ item by ID */
  function getFaqItem(id) {
    return faqItems.value.find(f => f.id === id) || null
  }

  return {
    companyInfo, languages, faqItems,
    updateCompanyInfo, toggleLanguage, setDefaultLanguage,
    addFaqItem, updateFaqItem, deleteFaqItem, getFaqItem,
  }
})
