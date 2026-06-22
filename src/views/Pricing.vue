<template>
  <div>
    <!-- Page Header -->
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.pricing') }}</span>
      </div>
    </div>

    <div class="container-custom py-8 md:py-14">
      <!-- Hero -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold text-beike-heading mb-3">{{ $t('pricing.title') }}</h1>
        <p class="text-base text-beike-muted max-w-2xl mx-auto leading-relaxed">{{ $t('pricing.subtitle') }}</p>
      </div>

      <!-- Dual Pricing Cards -->
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
        <!-- Basic Plan -->
        <div class="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 text-center
                      transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
          <div class="text-lg font-bold text-beike-heading mb-1">{{ $t('pricing.basic_title') }}</div>
          <div class="text-3xl font-extrabold text-beike-heading mb-4">{{ $t('pricing.basic_price') }}</div>
          <p class="text-sm text-beike-muted mb-8">{{ $t('pricing.basic_desc') }}</p>
          <router-link to="/inquiry" class="btn-outline-custom text-sm px-8 py-3 w-full justify-center mb-8 inline-flex">
            {{ $t('pricing.basic_cta') }}
          </router-link>
          <ul class="space-y-3 text-left">
            <li v-for="(f, i) in basicFeatures" :key="i" class="flex items-start gap-2">
              <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span class="text-sm text-beike-body">{{ t(f) }}</span>
            </li>
          </ul>
        </div>

        <!-- Pro Plan (highlighted) -->
        <div class="relative bg-white rounded-2xl border-2 border-beike-primary p-8 md:p-10 text-center
                      shadow-card-hover transition-all duration-300 hover:-translate-y-1">
          <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-beike-primary text-white text-xs font-bold px-4 py-1 rounded-full">
            {{ $t('pricing.recommended') }}
          </div>
          <div class="text-lg font-bold text-beike-heading mb-1">{{ $t('pricing.pro_title') }}</div>
          <div class="text-3xl font-extrabold text-beike-primary mb-1">{{ $t('pricing.pro_price') }}</div>
          <p class="text-sm text-beike-muted mb-8">{{ $t('pricing.pro_desc') }}</p>
          <router-link to="/sourcing" class="btn-primary-custom text-sm px-8 py-3 w-full justify-center mb-8 inline-flex">
            {{ $t('pricing.pro_cta') }}
          </router-link>
          <ul class="space-y-3 text-left">
            <li v-for="(f, i) in proFeatures" :key="i" class="flex items-start gap-2">
              <CheckIcon class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <span class="text-sm text-beike-body">{{ t(f) }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Comparison Table -->
      <div class="mb-16">
        <h2 class="text-xl md:text-2xl font-bold text-beike-heading text-center mb-8">{{ $t('pricing.compare_title') }}</h2>
        <div class="overflow-x-auto rounded-2xl border border-gray-200">
          <table class="w-full min-w-[600px] text-sm">
            <thead>
              <tr class="bg-beike-primary text-white">
                <th class="text-left px-6 py-4 font-bold rounded-tl-2xl">{{ $t('pricing.compare_feature') }}</th>
                <th class="px-6 py-4 font-bold text-center">{{ $t('pricing.basic_title') }}</th>
                <th class="px-6 py-4 font-bold text-center rounded-tr-2xl">{{ $t('pricing.pro_title') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, idx) in compareRows" :key="idx"
                  class="border-b border-gray-100"
                  :class="idx % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'">
                <td class="px-6 py-3.5 font-medium text-beike-body">{{ t(row.feature) }}</td>
                <td class="px-6 py-3.5 text-center">
                  <span v-if="row.basic === true" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600">
                    <CheckIcon class="w-3 h-3" />
                  </span>
                  <span v-else-if="row.basic === false" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400">
                    <XIcon class="w-3 h-3" />
                  </span>
                  <span v-else class="text-sm text-beike-muted">{{ typeof row.basic === 'string' && row.basic.startsWith('pricing.') ? t(row.basic) : row.basic }}</span>
                </td>
                <td class="px-6 py-3.5 text-center">
                  <span v-if="row.pro === true" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100 text-green-600">
                    <CheckIcon class="w-3 h-3" />
                  </span>
                  <span v-else-if="row.pro === false" class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400">
                    <XIcon class="w-3 h-3" />
                  </span>
                  <span v-else class="text-sm text-beike-muted">{{ typeof row.pro === 'string' && row.pro.startsWith('pricing.') ? t(row.pro) : row.pro }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- FAQ Accordion -->
      <div class="max-w-3xl mx-auto mb-12">
        <h2 class="text-xl md:text-2xl font-bold text-beike-heading text-center mb-8">{{ $t('pricing.faq_title') }}</h2>
        <div class="space-y-3">
          <div v-for="(item, idx) in faqItems" :key="idx"
               class="bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-300">
            <button @click="faqOpen = faqOpen === idx ? -1 : idx"
                    class="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-beike-heading hover:text-beike-primary transition-colors">
              <span class="text-sm">{{ t(item.q) }}</span>
              <ChevronDownIcon class="w-4 h-4 shrink-0 transition-transform duration-300"
                             :class="faqOpen === idx ? 'rotate-180' : ''" />
            </button>
            <div v-show="faqOpen === idx" class="px-6 pb-4">
              <p class="text-sm text-beike-muted leading-relaxed">{{ t(item.a) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center bg-beike-primary-light rounded-2xl py-10 px-6">
        <h2 class="text-xl md:text-2xl font-bold text-beike-heading mb-3">{{ $t('pricing.cta_title') }}</h2>
        <p class="text-sm text-beike-muted mb-6 max-w-lg mx-auto">{{ $t('pricing.cta_desc') }}</p>
        <div class="flex justify-center gap-3">
          <router-link to="/inquiry" class="btn-primary-custom text-sm px-6 py-3">
            {{ $t('pricing.cta_inquiry') }}
          </router-link>
          <router-link to="/contact" class="btn-outline-custom text-sm px-6 py-3">
            {{ $t('pricing.cta_contact') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Check, X, ChevronDown } from 'lucide-vue-next'

// Avoid HTML <x> tag conflict
const CheckIcon = Check
const XIcon = X
const ChevronDownIcon = ChevronDown

const { t } = useI18n()
const faqOpen = ref(-1)

const basicFeatures = [
  'pricing.f_basic_1',
  'pricing.f_basic_2',
  'pricing.f_basic_3',
  'pricing.f_basic_4',
  'pricing.f_basic_5',
]

const proFeatures = [
  'pricing.f_pro_1',
  'pricing.f_pro_2',
  'pricing.f_pro_3',
  'pricing.f_pro_4',
  'pricing.f_pro_5',
  'pricing.f_pro_6',
]

const compareRows = [
  { feature: 'pricing.cf_price', basic: '$0', pro: '5%' },
  { feature: 'pricing.cf_supplier', basic: 'pricing.cv_self_serve', pro: true },
  { feature: 'pricing.cf_quote', basic: 'pricing.cv_manual', pro: true },
  { feature: 'pricing.cf_qc', basic: false, pro: true },
  { feature: 'pricing.cf_logistics', basic: false, pro: true },
  { feature: 'pricing.cf_support', basic: 'pricing.cv_email_only', pro: 'pricing.cv_247_dedicated' },
  { feature: 'pricing.cf_warranty', basic: false, pro: true },
]

const faqItems = [
  { q: 'pricing.faq_q1', a: 'pricing.faq_a1' },
  { q: 'pricing.faq_q2', a: 'pricing.faq_a2' },
  { q: 'pricing.faq_q3', a: 'pricing.faq_a3' },
  { q: 'pricing.faq_q4', a: 'pricing.faq_a4' },
  { q: 'pricing.faq_q5', a: 'pricing.faq_a5' },
]
</script>
