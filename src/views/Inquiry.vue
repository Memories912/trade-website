<template>
  <div>
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.inquiry') }}</span>
      </div>
    </div>

    <section class="relative overflow-hidden">
      <div class="h-48 md:h-56 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        <div class="container-custom">
          <h1 class="text-3xl md:text-4xl font-bold text-white">{{ $t('inquiry.title') }}</h1>
          <p class="text-white/70 mt-2 text-sm max-w-lg">{{ $t("inquiry.subtitle") }}</p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container-custom">
        <div class="grid md:grid-cols-5 gap-10">
          <!-- Left info -->
          <div class="md:col-span-2">
            <h2 class="text-xl font-bold text-beike-heading mb-4">{{ $t('inquiry.steps_title') }}</h2>
            <div class="space-y-6">
              <div v-for="(step, idx) in steps" :key="idx" class="flex gap-4">
                <div class="w-10 h-10 rounded-full bg-beike-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                  {{ idx + 1 }}
                </div>
                <div>
                  <h4 class="text-sm font-bold text-beike-heading mb-1">{{ t(step.titleKey) }}</h4>
                  <p class="text-sm text-beike-muted">{{ t(step.descKey) }}</p>
                </div>
              </div>
            </div>

            <!-- Quick Tips -->
            <div class="mt-10 p-6 bg-beike-primary-light rounded-xl border border-beike-primary/20">
              <h4 class="text-sm font-bold text-beike-heading mb-3">{{ $t("inquiry.tips_title") }}</h4>
              <ul class="space-y-2 text-sm text-beike-muted">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-beike-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {{ $t("inquiry.tip1") }}
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-beike-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {{ $t("inquiry.tip2") }}
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-beike-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {{ $t("inquiry.tip3") }}
                </li>
              </ul>
            </div>
          </div>

          <!-- Form -->
          <div class="md:col-span-3">
            <div v-if="!success" class="bg-white rounded-2xl border border-gray-200 p-8">
              <form @submit.prevent="submit" class="space-y-5">
                <!-- Category Selection -->
                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t("inquiry.select_category") }}</label>
                  <select v-model="selectedCategoryId" class="select-custom">
                    <option value="">{{ $t("inquiry.all_categories") }}</option>
                    <option v-for="cat in visibleCategories" :key="cat.id" :value="cat.id">{{ categoryName(cat) }}</option>
                  </select>
                </div>
                <!-- Product Selection -->
                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t("inquiry.product_interest") }}</label>
                  <select v-model="form.product" class="select-custom">
                    <option value="">{{ $t("inquiry.select_product") }}</option>
                    <option v-for="p in filteredProducts" :key="p.id" :value="p.id">{{ productName(p) }}</option>
                  </select>
                </div>

                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.contact_name') }} *</label>
                    <input v-model="form.contactName" class="input-custom" required />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.email') }} *</label>
                    <input v-model="form.email" type="email" class="input-custom" required />
                  </div>
                </div>

                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.company') }}</label>
                    <input v-model="form.company" class="input-custom" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.country') }}</label>
                    <select v-model="form.country" class="select-custom">
                      <option value="" disabled>{{ $t('inquiry.select_country') }}</option>
                      <option>{{ $t('inquiry.countries.china') }}</option>
                      <option>{{ $t('inquiry.countries.korea') }}</option>
                      <option>{{ $t('inquiry.countries.japan') }}</option>
                      <option>{{ $t('inquiry.countries.usa') }}</option>
                      <option>{{ $t('inquiry.countries.germany') }}</option>
                      <option>{{ $t('inquiry.countries.france') }}</option>
                      <option>{{ $t("inquiry.countries.uk") }}</option>
                      <option>{{ $t('inquiry.countries.australia') }}</option>
                      <option>{{ $t('inquiry.countries.canada') }}</option>
                      <option>{{ $t('inquiry.countries.other') }}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.quantity') }}</label>
                  <input v-model="form.quantity" class="input-custom" :placeholder="$t('inquiry.quantity_placeholder')" />
                </div>

                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.requirements') }} *</label>
                  <textarea v-model="form.requirements" rows="5" class="input-custom resize-none" required
                            :placeholder="$t('inquiry.requirements_placeholder')"></textarea>
                </div>

                <button type="submit" :disabled="sending" class="btn-primary-custom w-full justify-center py-4">
                  <svg v-if="sending" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  <span v-else class="flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {{ $t('inquiry.submit') }}
                  </span>
                </button>
              </form>
            </div>

            <!-- Success State -->
            <div v-else class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-beike-heading mb-2">{{ $t('inquiry.success_title') }}</h3>
              <p class="text-sm text-beike-muted mb-2">{{ $t('inquiry.success_message') }}</p>
              <p class="text-xs text-beike-light mb-8">{{ $t('inquiry.success_note') }}</p>
              <button @click="resetForm" class="btn-outline-custom px-8 py-3">{{ $t('inquiry.submit_another') }}</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useInquiryStore } from '@/stores/inquiry'
import { products, categories } from '@/assets/mock/products'

const route = useRoute()
const { t, locale } = useI18n()
const inquiryStore = useInquiryStore()

const sending = ref(false)
const success = ref(false)

const form = reactive({
  product: '',
  contactName: '',
  email: '',
  company: '',
  country: '',
  quantity: '',
  requirements: '',
})

const productOptions = products.slice(0, 10)

const selectedCategoryId = ref("")

const filteredProducts = computed(() => {
  if (!selectedCategoryId.value || selectedCategoryId.value === "all") {
    return productOptions
  }
  return productOptions.filter(p => p.category === selectedCategoryId.value)
})

const visibleCategories = computed(() => {
  return categories.filter(c => c.id !== "all")
})

function categoryName(cat) {
  return t(cat.key || cat.id)
}

function productName(p) {
  const lang = locale.value
  if (lang === 'en') return p.name_en
  if (lang === 'ko') return p.name_ko
  if (lang === 'ja') return p.name_ja
  return p.name_cn
}

onMounted(() => {
  if (route.query.product) {
    const found = productOptions.find(p => {
      return p.name_en === route.query.product
    })
    if (found) form.product = found.id
  }
})

const steps = [
    { titleKey: "inquiry.step1_title", descKey: "inquiry.step1_desc" },
    { titleKey: "inquiry.step2_title", descKey: "inquiry.step2_desc" },
    { titleKey: "inquiry.step3_title", descKey: "inquiry.step3_desc" },
    { titleKey: "inquiry.step4_title", descKey: "inquiry.step4_desc" }
  ]

function submit() {
  sending.value = true
  setTimeout(() => {
    const selected = productOptions.find(p => p.id === form.product)
    inquiryStore.submitInquiry({
      productName: selected ? productName(selected) : t('inquiry.general_inquiry'),
      contactName: form.contactName,
      email: form.email,
      company: form.company,
      country: form.country,
      quantity: form.quantity,
      requirements: form.requirements,
    })
    sending.value = false
    success.value = true
  }, 1200)
}

function resetForm() {
  success.value = false
  Object.assign(form, { product: '', contactName: '', email: '', company: '', country: '', quantity: '', requirements: '' })
}
</script>
