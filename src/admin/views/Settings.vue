<template>
  <div class="flex flex-col min-h-full pl-0">
    <h1 class="text-xl font-bold text-beike-heading pt-3">{{ t('admin.settings.title') }}</h1>

    <!-- Tab navigation -->
    <div class="flex border-b border-beike-border">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        class="px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px"
        :class="activeTab === tab.key
          ? 'border-beike-primary text-beike-primary'
          : 'border-transparent text-beike-muted hover:text-beike-body'"
        @click="activeTab = tab.key"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Company info tab -->
    <div v-if="activeTab === 'company'" class="pt-3 space-y-3">
      <!-- Company name (multilang) -->
      <div>
        <label class="block text-sm font-medium text-beike-body mb-2">{{ t('admin.settings.company_name') }}</label>
        <MultilangInput
          v-model="companyForm.name"
          :locales="locales"
          :placeholder="t('admin.settings.company_name_placeholder')"
        />
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.founded') }}</label>
          <input v-model.number="companyForm.founded" type="number" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.employees') }}</label>
          <input v-model="companyForm.employees" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.annual_revenue') }}</label>
          <input v-model="companyForm.annualRevenue" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.service_countries') }}</label>
          <input v-model.number="companyForm.serviceCountries" type="number" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.total_clients') }}</label>
          <input v-model.number="companyForm.totalClients" type="number" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
        <div>
          <label class="block text-xs font-medium text-beike-muted mb-1">{{ t('admin.settings.total_products') }}</label>
          <input v-model.number="companyForm.totalProducts" type="number" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
        </div>
      </div>

      <!-- Headquarters (multilang) -->
      <div>
        <label class="block text-sm font-medium text-beike-body mb-2">{{ t('admin.settings.headquarters') }}</label>
        <MultilangInput
          v-model="companyForm.headquarters"
          :locales="locales"
          :placeholder="t('admin.settings.headquarters_placeholder')"
        />
      </div>

      <button
        class="px-6 py-2.5 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
        @click="saveCompanyInfo"
      >
        {{ t('admin.common.save') }}
      </button>
    </div>

    <!-- Language config tab -->
    <div v-if="activeTab === 'language'" class="overflow-hidden">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-beike-bg text-beike-muted text-left">
            <th class="px-6 py-3 font-medium">{{ t('admin.settings.lang_code') }}</th>
            <th class="px-6 py-3 font-medium">{{ t('admin.settings.lang_name') }}</th>
            <th class="px-6 py-3 font-medium">{{ t('admin.settings.lang_enabled') }}</th>
            <th class="px-6 py-3 font-medium">{{ t('admin.settings.lang_default') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-beike-border">
          <tr v-for="lang in settingsStore.languages" :key="lang.code" class="hover:bg-beike-primary-light transition-colors">
            <td class="px-6 py-4 font-mono text-beike-body">{{ lang.code }}</td>
            <td class="px-6 py-4 text-beike-heading">{{ lang.name }}</td>
            <td class="px-6 py-4">
              <button
                class="relative w-10 h-5 rounded-full transition-colors"
                :class="lang.enabled ? 'bg-beike-primary' : 'bg-gray-300'"
                @click="settingsStore.toggleLanguage(lang.code, !lang.enabled)"
              >
                <span
                  class="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform"
                  :class="lang.enabled ? 'translate-x-5' : 'translate-x-0.5'"
                />
              </button>
            </td>
            <td class="px-6 py-4">
              <button
                class="w-4 h-4 rounded-full border-2 transition-colors flex items-center justify-center"
                :class="lang.isDefault ? 'border-beike-primary bg-beike-primary' : 'border-gray-300'"
                @click="settingsStore.setDefaultLanguage(lang.code)"
              >
                <span v-if="lang.isDefault" class="w-1.5 h-1.5 rounded-full bg-white" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminSettingsStore } from '@/stores/adminSettings'
import MultilangInput from '@/admin/components/MultilangInput.vue'

const { t } = useI18n()
const settingsStore = useAdminSettingsStore()

const locales = ['zh', 'en', 'ko', 'ja']
const activeTab = ref('company')

const tabs = computed(() => [
  { key: 'company', label: t('admin.settings.tab_company') },
  { key: 'language', label: t('admin.settings.tab_language') },
])

const companyForm = reactive({
  name: { zh: '', en: '', ko: '', ja: '' },
  founded: 2015,
  employees: '',
  annualRevenue: '',
  headquarters: { zh: '', en: '', ko: '', ja: '' },
  serviceCountries: 30,
  totalClients: 500,
  totalProducts: 2000,
})

onMounted(() => {
  const info = settingsStore.companyInfo
  companyForm.name = {
    zh: info.name_cn || '',
    en: info.name_en || '',
    ko: info.name_ko || '',
    ja: info.name_ja || '',
  }
  companyForm.founded = info.founded || 2015
  companyForm.employees = info.employees || ''
  companyForm.annualRevenue = info.annualRevenue || ''
  companyForm.headquarters = {
    zh: info.headquarters_cn || '',
    en: info.headquarters_en || '',
    ko: info.headquarters_ko || '',
    ja: info.headquarters_ja || '',
  }
  companyForm.serviceCountries = info.serviceCountries || 30
  companyForm.totalClients = info.totalClients || 500
  companyForm.totalProducts = info.totalProducts || 2000
})

function saveCompanyInfo() {
  settingsStore.updateCompanyInfo({
    name_cn: companyForm.name.zh,
    name_en: companyForm.name.en,
    name_ko: companyForm.name.ko,
    name_ja: companyForm.name.ja,
    founded: companyForm.founded,
    employees: companyForm.employees,
    annualRevenue: companyForm.annualRevenue,
    headquarters_cn: companyForm.headquarters.zh,
    headquarters_en: companyForm.headquarters.en,
    headquarters_ko: companyForm.headquarters.ko,
    headquarters_ja: companyForm.headquarters.ja,
    serviceCountries: companyForm.serviceCountries,
    totalClients: companyForm.totalClients,
    totalProducts: companyForm.totalProducts,
  })
}
</script>
