<template>
  <div>
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('knowledge.title') }}</span>
      </div>
    </div>

    <section class="relative overflow-hidden">
      <div class="h-48 md:h-56 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        <div class="container-custom">
          <h1 class="text-3xl md:text-4xl font-bold text-white">{{ $t('knowledge.title') }}</h1>
          <p class="text-white/70 mt-2 text-sm max-w-lg">{{ $t('knowledge.subtitle') }}</p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container-custom">
        <!-- Search -->
        <div class="max-w-xl mx-auto mb-12">
          <div class="relative">
            <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="$t('knowledge.search_placeholder')"
              class="input-custom pl-11 py-3"
            />
          </div>
        </div>

        <!-- QA Cards -->
        <div class="max-w-3xl mx-auto space-y-4" v-if="filteredFAQ.length">
          <div
            v-for="(item, idx) in filteredFAQ"
            :key="idx"
            class="bg-white rounded-xl border border-gray-200 overflow-hidden
                   transition-all duration-200 hover:shadow-card"
          >
            <button
              @click="toggleFAQ(idx)"
              class="w-full flex items-center justify-between px-6 py-5 text-left"
            >
              <span class="text-sm font-bold text-beike-heading pr-4">{{ t(item.qKey) }}</span>
              <svg
                class="w-4 h-4 shrink-0 text-beike-muted transition-transform duration-200"
                :class="openFAQ[idx] ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <Transition name="slide-down">
              <div v-if="openFAQ[idx]" class="px-6 pb-5">
                <div class="border-t border-gray-100 pt-4">
                  <p class="text-sm text-beike-muted leading-relaxed">{{ t(item.aKey) }}</p>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <div v-else class="text-center py-16">
          <div class="text-5xl mb-4">🔍</div>
          <h3 class="text-lg font-bold text-beike-heading mb-1">{{ $t('knowledge.no_results') }}</h3>
          <p class="text-sm text-beike-muted">{{ $t('knowledge.try_different') }}</p>
        </div>

        <!-- AI Chat CTA -->
        <div class="text-center mt-12 p-8 bg-beike-primary-light rounded-2xl border border-beike-primary/20">
          <div class="text-4xl mb-3">🤖</div>
          <h3 class="text-lg font-bold text-beike-heading mb-2">{{ $t('knowledge.cta_title') }}</h3>
          <p class="text-sm text-beike-muted mb-4">{{ $t('knowledge.cta_desc') }}</p>
          <button @click="openAiChat" class="btn-dark-custom px-8 py-3">{{ $t('knowledge.cta_button') }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAiChatStore } from '@/stores/aiChat'

const { t } = useI18n()
const aiChat = useAiChatStore()

function openAiChat() {
  aiChat.openChat()
}
const searchQuery = ref('')
const openFAQ = ref({})

const allFAQ = [
  { qKey: 'knowledge.faq_cert', aKey: 'knowledge.faq_cert_a' },
  { qKey: 'knowledge.faq_moq', aKey: 'knowledge.faq_moq_a' },
  { qKey: 'knowledge.faq_lead', aKey: 'knowledge.faq_lead_a' },
  { qKey: 'knowledge.faq_oem', aKey: 'knowledge.faq_oem_a' },
  { qKey: 'knowledge.faq_payment', aKey: 'knowledge.faq_payment_a' },
  { qKey: 'knowledge.faq_quality', aKey: 'knowledge.faq_quality_a' },
  { qKey: 'knowledge.faq_shipping', aKey: 'knowledge.faq_shipping_a' },
  { qKey: 'knowledge.faq_sample', aKey: 'knowledge.faq_sample_a' },
  { qKey: 'knowledge.faq_warranty', aKey: 'knowledge.faq_warranty_a' },
]

const filteredFAQ = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return allFAQ
  return allFAQ.filter(item =>
    t(item.qKey).toLowerCase().includes(q) ||
    t(item.aKey).toLowerCase().includes(q)
  )
})

function toggleFAQ(idx) {
  openFAQ.value[idx] = !openFAQ.value[idx]
}
</script>
