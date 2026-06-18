<template>
  <div>
    <!-- Page Header -->
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.sourcing') }}</span>
      </div>
    </div>

    <div class="container-custom py-8 md:py-14">
      <div class="max-w-3xl mx-auto">
        <!-- Header -->
        <div class="text-center mb-10">
          <div class="text-5xl mb-3">🔍</div>
          <h1 class="text-2xl md:text-3xl font-bold text-beike-heading">{{ $t('sourcing.title') }}</h1>
          <p class="text-sm text-beike-muted mt-2 max-w-lg mx-auto leading-relaxed">
            {{ $t('sourcing.subtitle') }}
          </p>
        </div>

        <!-- Success Message -->
        <div v-if="submitted" class="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
          <div class="text-5xl mb-3">✅</div>
          <h2 class="text-xl font-bold text-green-700 mb-2">{{ $t('sourcing.success_title') }}</h2>
          <p class="text-sm text-green-600 mb-2">{{ $t('sourcing.success_msg') }}</p>
          <p class="text-xs text-green-500 mb-6">{{ $t('sourcing.request_id') }}: <span class="font-bold">{{ requestId }}</span></p>
          <div class="flex justify-center gap-3">
            <router-link to="/products" class="btn-outline-custom text-sm px-5 py-2.5">
              {{ $t('sourcing.browse_products') }}
            </router-link>
            <button @click="resetForm" class="btn-primary-custom text-sm px-5 py-2.5">
              {{ $t('sourcing.submit_another') }}
            </button>
          </div>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="space-y-8">
          <!-- Section: Product Info -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div class="flex items-center gap-2 mb-6">
              <span class="w-7 h-7 rounded-full bg-beike-primary text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 class="text-base font-bold text-beike-heading">{{ $t('sourcing.product_section') }}</h2>
            </div>

            <div class="space-y-5">
              <!-- Product Name -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">
                  {{ $t('sourcing.product_name') }} <span class="text-red-400">*</span>
                </label>
                <input v-model="form.productName" type="text" class="input-custom w-full" :placeholder="$t('sourcing.product_name_placeholder')" required />
              </div>

              <!-- Product Description -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.product_desc') }}</label>
                <textarea v-model="form.productDesc" rows="3" class="input-custom w-full resize-none" :placeholder="$t('sourcing.product_desc_placeholder')"></textarea>
              </div>

              <!-- Photo Upload -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.photos') }}</label>
                <div
                  class="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-beike-primary/50 hover:bg-beike-primary-light/20 transition-all"
                  @click="triggerUpload"
                  @dragover.prevent="dragOver = true"
                  @dragleave="dragOver = false"
                  @drop.prevent="onDrop"
                  :class="{ 'border-beike-primary bg-beike-primary-light/20': dragOver }"
                >
                  <template v-if="photos.length === 0">
                    <div class="text-3xl mb-2">📸</div>
                    <p class="text-sm text-beike-muted">{{ $t('sourcing.upload_hint') }}</p>
                    <p class="text-xs text-beike-light mt-1">{{ $t('sourcing.upload_format') }}</p>
                  </template>
                  <template v-else>
                    <div class="flex flex-wrap gap-3 justify-center">
                      <div v-for="(photo, idx) in photos" :key="idx" class="relative group">
                        <img :src="photo.url" class="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                        <button type="button" @click.stop="removePhoto(idx)"
                          class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          &times;
                        </button>
                      </div>
                    </div>
                    <p class="text-xs text-beike-muted mt-2">{{ photos.length }} {{ $t('sourcing.photos_selected') }}</p>
                  </template>
                  <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFileChange" />
                </div>
              </div>

              <!-- Specifications / Additional Info -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.specs') }}</label>
                <textarea v-model="form.specs" rows="2" class="input-custom w-full resize-none" :placeholder="$t('sourcing.specs_placeholder')"></textarea>
              </div>
            </div>
          </div>

          <!-- Section: Price & Quantity -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div class="flex items-center gap-2 mb-6">
              <span class="w-7 h-7 rounded-full bg-beike-primary text-white text-xs font-bold flex items-center justify-center">2</span>
              <h2 class="text-base font-bold text-beike-heading">{{ $t('sourcing.price_section') }}</h2>
            </div>

            <div class="grid md:grid-cols-2 gap-5">
              <!-- Target Price Min -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.target_price_min') }}</label>
                <div class="numpicker">
                  <span class="numpicker-badge">{{ currencySymbol }}</span>
                  <button type="button" class="numpicker-btn" @click="adjustPrice('min', -1)" :disabled="!form.priceMin || form.priceMin <= 0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
                  </button>
                  <input v-model.number="form.priceMin" type="number" min="0" step="0.5" class="numpicker-input" @wheel.prevent
                    :placeholder="$t('sourcing.price_placeholder')" />
                  <button type="button" class="numpicker-btn" @click="adjustPrice('min', 1)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14m7-7H5"/></svg>
                  </button>
                </div>
              </div>

              <!-- Target Price Max -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.target_price_max') }}</label>
                <div class="numpicker">
                  <span class="numpicker-badge">{{ currencySymbol }}</span>
                  <button type="button" class="numpicker-btn" @click="adjustPrice('max', -1)" :disabled="!form.priceMax || form.priceMax <= 0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
                  </button>
                  <input v-model.number="form.priceMax" type="number" min="0" step="0.5" class="numpicker-input" @wheel.prevent
                    :placeholder="$t('sourcing.price_placeholder')" />
                  <button type="button" class="numpicker-btn" @click="adjustPrice('max', 1)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14m7-7H5"/></svg>
                  </button>
                </div>
              </div>

              <!-- Quantity -->
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">
                  {{ $t('sourcing.quantity') }} <span class="text-red-400">*</span>
                </label>
                <div class="numpicker">
                  <button type="button" class="numpicker-btn" @click="adjustQty(-1)" :disabled="!form.quantity || parseInt(form.quantity) <= 1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/></svg>
                  </button>
                  <input v-model="form.quantity" type="number" min="1" class="numpicker-input" @wheel.prevent
                    :placeholder="$t('sourcing.quantity_placeholder')" required />
                  <button type="button" class="numpicker-btn" @click="adjustQty(1)">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14m7-7H5"/></svg>
                  </button>
                  <span class="numpicker-badge">{{ $t('sourcing.unit') }}</span>
                </div>
              </div>

              <!-- Spacer -->
              <div></div>
            </div>
          </div>

          <!-- Section: Personal Info -->
          <div class="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
            <div class="flex items-center gap-2 mb-6">
              <span class="w-7 h-7 rounded-full bg-beike-primary text-white text-xs font-bold flex items-center justify-center">3</span>
              <h2 class="text-base font-bold text-beike-heading">{{ $t('sourcing.contact_section') }} <span class="text-xs font-normal text-beike-light font-medium">{{ $t('sourcing.contact_note') }}</span></h2>
            </div>

            <div class="grid md:grid-cols-2 gap-5">
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">
                  {{ $t('sourcing.contact_name') }} <span class="text-red-400">*</span>
                </label>
                <input v-model="form.contactName" type="text" class="input-custom w-full" :placeholder="$t('sourcing.contact_name_placeholder')" required />
              </div>
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">
                  {{ $t('sourcing.contact_email') }} <span class="text-red-400">*</span>
                </label>
                <input v-model="form.contactEmail" type="email" class="input-custom w-full" placeholder="your@email.com" required />
              </div>
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">
                  {{ $t('sourcing.contact_phone') }} <span class="text-red-400">*</span>
                </label>
                <input v-model="form.contactPhone" type="tel" class="input-custom w-full" :placeholder="$t('sourcing.contact_phone_placeholder')" required />
              </div>
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.contact_company') }}</label>
                <input v-model="form.contactCompany" type="text" class="input-custom w-full" :placeholder="$t('sourcing.contact_company_placeholder')" />
              </div>
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.contact_country') }}</label>
                <input v-model="form.contactCountry" type="text" class="input-custom w-full" :placeholder="$t('sourcing.contact_country_placeholder')" />
              </div>
              <div>
                <label class="block text-sm font-bold text-beike-body mb-1.5">{{ $t('sourcing.contact_wechat') }}</label>
                <input v-model="form.contactWechat" type="text" class="input-custom w-full" :placeholder="$t('sourcing.contact_wechat_placeholder')" />
              </div>
            </div>
          </div>

          <!-- Submit -->
          <div class="text-center">
            <button type="submit" :disabled="submitting"
              class="btn-primary-custom px-10 py-3.5 text-sm min-w-[200px] justify-center"
            >
              <svg v-if="submitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span v-else>{{ $t('sourcing.submit') }}</span>
            </button>
            <p class="text-xs text-beike-light mt-3">{{ $t('sourcing.submit_note') }}</p>
          </div>
        </form>
      </div>
    </div>

    <!-- How it works section -->
    <section class="bg-[#f6f6f8] py-12 md:py-16">
      <div class="container-custom">
        <div class="text-center mb-8">
          <h2 class="section-title-custom">{{ $t('sourcing.how_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
        </div>
        <div class="grid md:grid-cols-4 gap-6">
          <div v-for="(step, idx) in steps" :key="idx" class="text-center">
            <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-beike-primary-light flex items-center justify-center">
              <span class="text-2xl">{{ step.icon }}</span>
            </div>
            <div class="w-7 h-7 mx-auto mb-2 rounded-full bg-beike-primary text-white text-xs font-bold flex items-center justify-center">{{ idx + 1 }}</div>
            <h3 class="text-sm font-bold text-beike-heading mb-1">{{ $t(step.titleKey) }}</h3>
            <p class="text-xs text-beike-muted leading-relaxed">{{ $t(step.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSourcingStore } from '@/stores/sourcing'

const { t, locale } = useI18n()
const store = useSourcingStore()

const currencyMap = {
  zh: '¥',
  en: '$',
  ko: '₩',
  ja: '¥',
}
const currencySymbol = computed(() => currencyMap[locale.value] || '$')

const steps = [
  { icon: '📝', titleKey: 'sourcing.step1_title', descKey: 'sourcing.step1_desc' },
  { icon: '📸', titleKey: 'sourcing.step2_title', descKey: 'sourcing.step2_desc' },
  { icon: '💬', titleKey: 'sourcing.step3_title', descKey: 'sourcing.step3_desc' },
  { icon: '📦', titleKey: 'sourcing.step4_title', descKey: 'sourcing.step4_desc' },
]

const defaultForm = () => ({
  productName: '',
  productDesc: '',
  specs: '',
  priceMin: null,
  priceMax: null,
  quantity: '',
  unit: 'sets',
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  contactCompany: '',
  contactCountry: '',
  contactWechat: '',
})

function adjustPrice(field, dir) {
  const key = 'price' + field.charAt(0).toUpperCase() + field.slice(1)
  const val = form[key] || 0
  const step = val < 10 ? 0.5 : val < 100 ? 1 : val < 1000 ? 10 : 100
  const newVal = Math.max(0, +(val + dir * step).toFixed(2))
  form[key] = newVal || null
}

function adjustQty(dir) {
  const val = parseInt(form.quantity) || 0
  const step = val < 100 ? 1 : val < 1000 ? 10 : 100
  form.quantity = Math.max(1, val + dir * step).toString()
}

const form = reactive(defaultForm())
const photos = ref([])
const fileInput = ref(null)
const dragOver = ref(false)
const submitting = ref(false)
const submitted = ref(false)
const requestId = ref('')

function triggerUpload() {
  fileInput.value?.click()
}

function onFileChange(e) {
  const files = Array.from(e.target.files || [])
  addFiles(files)
  e.target.value = ''
}

function onDrop(e) {
  dragOver.value = false
  const files = Array.from(e.dataTransfer?.files || [])
  addFiles(files)
}

function addFiles(files) {
  files.forEach(file => {
    if (!file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      photos.value.push({
        name: file.name,
        url: ev.target.result,
        file,
      })
    }
    reader.readAsDataURL(file)
  })
}

function removePhoto(idx) {
  photos.value.splice(idx, 1)
}

function handleSubmit() {
  submitting.value = true

  const data = {
    productName: form.productName,
    productDesc: form.productDesc,
    specs: form.specs,
    priceMin: form.priceMin,
    priceMax: form.priceMax,
    quantity: form.quantity,
    unit: 'sets',
    currency: currencySymbol.value,
    photos: photos.value.map(p => ({ name: p.name, url: p.url })),
    contactName: form.contactName,
    contactEmail: form.contactEmail,
    contactPhone: form.contactPhone,
    contactCompany: form.contactCompany,
    contactCountry: form.contactCountry,
    contactWechat: form.contactWechat,
  }

  // Simulate submission
  setTimeout(() => {
    const result = store.submitRequest(data)
    requestId.value = result.id
    submitting.value = false
    submitted.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 1000)
}

function resetForm() {
  Object.assign(form, defaultForm())
  photos.value = []
  submitted.value = false
  requestId.value = ''
}
</script>

<style scoped>
.section-title-custom {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: #282828;
  text-align: center;
}
.wave-line {
  width: 50px;
  height: 3px;
  margin: 0.5rem auto 0;
  border-radius: 2px;
  background: #fd560f;
}

/* Number picker = currency/unit badge + [-] + input + [+] */
.numpicker {
  display: flex;
  align-items: stretch;
  border: 1.5px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #fff;
  overflow: hidden;
  transition: border-color 0.2s;
  height: 2.75rem;
}
.numpicker:focus-within {
  border-color: #fd560f;
  box-shadow: 0 0 0 3px rgba(253, 86, 15, 0.1);
}

.numpicker-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  padding: 0 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #fd560f;
  background: #fef5f0;
  border-right: 1.5px solid #e5e7eb;
  white-space: nowrap;
}
.numpicker-badge:last-child {
  border-right: none;
  border-left: 1.5px solid #e5e7eb;
}

.numpicker-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2.25rem;
  padding: 0;
  color: #fd560f;
  background: #fff;
  border: none;
  border-left: 1.5px solid #e5e7eb;
  cursor: pointer;
  transition: all 0.15s;
  flex-shrink: 0;
}
.numpicker-btn:first-of-type {
  border-left: none;
  border-right: 1.5px solid #e5e7eb;
}
.numpicker-btn:hover {
  background: #fd560f;
  color: #fff;
}
.numpicker-btn:active {
  background: #e04e0e;
  color: #fff;
}
.numpicker-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  background: #f9fafb;
  color: #d1d5db;
}
.numpicker-btn:disabled:hover {
  background: #f9fafb;
  color: #d1d5db;
}

.numpicker-input {
  flex: 1;
  min-width: 0;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: #282828;
  text-align: center;
  -moz-appearance: textfield;
}
.numpicker-input::-webkit-outer-spin-button,
.numpicker-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.numpicker-input::placeholder {
  color: #c0c4cc;
  font-weight: 400;
}
</style>
