<template>
  <div>
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.contact') }}</span>
      </div>
    </div>

    <section class="relative overflow-hidden">
      <div class="h-48 md:h-56 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        <div class="container-custom">
          <h1 class="text-3xl md:text-4xl font-bold text-white">{{ $t('contact.title') }}</h1>
          <p class="text-white/70 mt-2 text-sm max-w-lg">{{ $t('contact.page_subtitle') }}</p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container-custom">
        <div class="grid md:grid-cols-5 gap-10">
          <!-- Contact Info -->
          <div class="md:col-span-2 space-y-6">
            <div v-for="(item, idx) in contactInfo" :key="idx" class="flex gap-4">
              <div class="w-12 h-12 rounded-xl bg-beike-primary-light flex items-center justify-center shrink-0">
                <span class="text-xl">{{ item.icon }}</span>
              </div>
              <div>
                <h4 class="text-sm font-bold text-beike-heading mb-1">{{ t(item.titleKey) }}</h4>
                <p class="text-sm text-beike-muted">{{ t(item.detailKey) }}</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div class="md:col-span-3">
            <div class="bg-white rounded-2xl border border-gray-200 p-8">
              <form @submit.prevent="submit" class="space-y-5">
                <div class="grid md:grid-cols-2 gap-5">
                  <div>
                    <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('inquiry.contact_name') }} *</label>
                    <input v-model="form.name" class="input-custom" required />
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
                      <option value="" disabled>{{ $t('inquiry.country') }}</option>
                      <option>{{ $t('inquiry.countries.china') }}</option>
                      <option>{{ $t('inquiry.countries.korea') }}</option>
                      <option>{{ $t('inquiry.countries.japan') }}</option>
                      <option>{{ $t('inquiry.countries.usa') }}</option>
                      <option>{{ $t('inquiry.countries.germany') }}</option>
                      <option>{{ $t('inquiry.countries.other') }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('contact.subject') }}</label>
                  <input v-model="form.subject" class="input-custom" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-beike-heading mb-1.5">{{ $t('contact.message') }} *</label>
                  <textarea v-model="form.message" rows="5" class="input-custom resize-none" required></textarea>
                </div>
                <button type="submit" :disabled="sending" class="btn-dark-custom px-10 py-3">
                  <svg v-if="sending" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  <span v-else>{{ $t('contact.submit') }}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const form = reactive({ name: '', email: '', company: '', country: '', subject: '', message: '' })
const sending = ref(false)

const contactInfo = [
  { icon: "📍", titleKey: "contact.address", detailKey: "contact.address_detail" },
  { icon: "📞", titleKey: "contact.phone", detailKey: "topbar.phone" },
  { icon: "✉️", titleKey: "contact.email_label", detailKey: "topbar.email" },
  { icon: "🕐", titleKey: "contact.work_time", detailKey: "contact.work_time_detail" },
]

function submit() {
  sending.value = true
  setTimeout(() => {
    sending.value = false
    alert(t('contact.thank_you'))
    Object.assign(form, { name: '', email: '', company: '', country: '', subject: '', message: '' })
  }, 1200)
}
</script>
