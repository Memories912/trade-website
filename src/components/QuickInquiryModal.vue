<template>
  <div>
    <Transition name="fade">
      <div v-if="visible" class="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" @click="close"></div>
    </Transition>
    <Transition name="scale">
      <div v-if="visible" class="fixed inset-0 z-[80] flex items-center justify-center p-4">
        <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h3 class="text-lg font-bold text-beike-heading">{{ $t('common.quick_inquiry') }}</h3>
                <p class="text-xs text-beike-muted mt-0.5">{{ $t('common.we_reply_24h') }}</p>
              </div>
              <button @click="close" class="w-8 h-8 rounded-full flex items-center justify-center text-beike-light hover:text-beike-body hover:bg-gray-100 transition-all">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form v-if="!success" @submit.prevent="submit" class="space-y-3">
              <div v-if="productName" class="bg-beike-primary-light rounded-lg px-3 py-2 text-sm text-beike-primary flex items-center gap-2">
                <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <span class="truncate">{{ productName }}</span>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input v-model="form.name" class="input-custom" placeholder="Your name *" required />
                </div>
                <div>
                  <select v-model="form.country" class="select-custom" required>
                    <option value="" disabled>{{ $t('common.country') }} *</option>
                    <option v-for="(label, code) in countries" :key="code" :value="code">{{ label }}</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <input v-model="form.email" type="email" class="input-custom" placeholder="Email *" required />
                </div>
                <div>
                  <input v-model="form.phone" class="input-custom" placeholder="Phone" />
                </div>
              </div>

              <div>
                <input v-model="form.quantity" class="input-custom" placeholder="Quantity (e.g. 500 pcs)" />
              </div>

              <button type="submit" :disabled="sending" class="btn-primary-custom w-full justify-center py-3">
                <svg v-if="sending" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                <span v-else class="flex items-center gap-2"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>{{ $t("common.send_inquiry") }}</span>
              </button>
            </form>

            <div v-else class="text-center py-8">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <svg class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p class="text-base font-bold text-beike-heading mb-1">{{ $t('common.inquiry_sent') }}</p>
              <p class="text-sm text-beike-muted">{{ $t('common.we_will_contact') }}</p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useInquiryStore } from '@/stores/inquiry'

const props = defineProps({ visible: Boolean, productName: { type: String, default: '' } })
const emit = defineEmits(['close'])

const inquiryStore = useInquiryStore()
const sending = ref(false)
const success = ref(false)

const form = reactive({ name: '', email: '', phone: '', country: '', quantity: '' })

const countries = { Korea: 'Korea', Japan: 'Japan', USA: 'USA', Canada: 'Canada', UK: 'UK', Germany: 'Germany', France: 'France', Australia: 'Australia', Other: 'Other' }

function close() { success.value = false; emit('close') }

async function submit() {
  sending.value = true
  await new Promise(r => setTimeout(r, 1000))
  inquiryStore.submitInquiry({
    productName: props.productName || 'General Inquiry',
    contactName: form.name,
    email: form.email,
    phone: form.phone,
    country: form.country,
    quantity: form.quantity,
    requirements: 'Quick inquiry from floating button',
  })
  sending.value = false
  success.value = true
  setTimeout(() => { close() }, 2000)
}
</script>

<style scoped>
.scale-enter-active { transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); }
.scale-leave-active { transition: all 0.15s ease-in; }
.scale-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.scale-leave-to { opacity: 0; transform: scale(0.95); }
</style>
