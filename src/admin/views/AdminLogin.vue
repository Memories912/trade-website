<template>
  <div class="min-h-screen flex items-center justify-center bg-beike-bg p-6">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="w-14 h-14 rounded-2xl bg-beike-primary flex items-center justify-center mx-auto mb-4">
          <span class="text-white font-bold text-xl">GT</span>
        </div>
        <h1 class="text-2xl font-bold text-beike-heading">{{ t('admin.login.title') }}</h1>
        <p class="text-beike-muted mt-1">{{ t('admin.login.subtitle') }}</p>
      </div>

      <!-- Login card -->
      <div class="bg-white rounded-xl shadow-card p-8">
        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-beike-body mb-1.5">{{ t('admin.login.email') }}</label>
            <input
              v-model="email"
              type="email"
              class="w-full px-4 py-2.5 rounded-lg border border-beike-border focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors text-sm"
              :placeholder="t('admin.login.email_placeholder')"
              required
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-beike-body mb-1.5">{{ t('admin.login.password') }}</label>
            <input
              v-model="password"
              type="password"
              class="w-full px-4 py-2.5 rounded-lg border border-beike-border focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors text-sm"
              :placeholder="t('admin.login.password_placeholder')"
              required
            />
          </div>

          <!-- Error message -->
          <p v-if="error" class="text-sm text-red-500">{{ error }}</p>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="w-full py-2.5 rounded-lg bg-beike-primary text-white font-medium hover:bg-beike-primary-dark transition-colors disabled:opacity-60"
          >
            <span v-if="loading">{{ t('admin.login.loading') }}</span>
            <span v-else>{{ t('admin.login.submit') }}</span>
          </button>
        </form>

        <!-- Hint -->
        <div class="mt-6 p-3 bg-beike-primary-light rounded-lg text-xs text-beike-muted">
          <p class="font-medium text-beike-body mb-1">{{ t('admin.login.hint_title') }}</p>
          <p>{{ t('admin.login.hint_email') }}: admin@trade.com</p>
          <p>{{ t('admin.login.hint_password') }}: admin123</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'

const { t } = useI18n()
const { login } = useAdminAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    const result = await login(email.value, password.value)
    if (!result.success) {
      error.value = result.error || t('admin.login.error')
    }
  } catch (e) {
    error.value = t('admin.login.error')
  } finally {
    loading.value = false
  }
}
</script>
