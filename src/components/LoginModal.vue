<template>
  <div class="login-modal" :class="{ 'is-open': visible }">
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal-content">
      <div class="flex border-b border-gray-100">
        <button
          v-for="tab in tabs" :key="tab.key"
          @click="activeTab = tab.key"
          class="flex-1 py-4 text-sm font-bold transition-colors relative"
          :class="activeTab === tab.key ? 'text-beike-primary' : 'text-beike-muted hover:text-beike-body'"
        >
          {{ tab.labelKey ? $t(tab.labelKey) : tab.label }}
          <span v-if="activeTab === tab.key" class="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-beike-primary rounded-full"></span>
        </button>
      </div>

      <div class="p-6">
        <form v-if="activeTab === 'login'" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.email") }}</label>
            <input v-model="loginForm.email" type="email" class="input-custom" placeholder="demo@yanzhen.com" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.password") }}</label>
            <input v-model="loginForm.password" type="password" class="input-custom" placeholder="demo123" required />
          </div>
          <p class="text-[11px] text-beike-muted -mt-2">演示账号：demo@yanzhen.com / demo123</p>
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-1.5 text-beike-muted cursor-pointer">
              <input type="checkbox" class="rounded border-gray-300 text-beike-primary focus:ring-beike-primary" />
              {{ $t('common.remember_me') }}
            </label>
            <span class="text-beike-primary hover:underline cursor-pointer text-xs">{{ $t('common.forgot_password') }}</span>
          </div>
          <button type="submit" :disabled="loginLoading" class="btn-primary-custom w-full justify-center py-3">
            <svg v-if="loginLoading" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            <span v-else>{{ $t('nav.sign_in') }}</span>
          </button>
          <p v-if="loginError" class="text-xs text-red-500 text-center">{{ loginError }}</p>

          <div class="relative my-5">
            <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-gray-200"></div></div>
            <div class="relative flex justify-center"><span class="bg-white px-3 text-xs text-beike-light">{{ $t('common.or_continue') }}</span></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <button v-for="s in socialLogin" :key="s.id" type="button"
              class="social-btn flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all"
              :style="{ background: s.bg, color: s.color, border: s.bg === '#fff' ? '1.5px solid #e5e7eb' : 'none' }"
              @click="socialClick(s.id)">
              <span v-html="s.icon" class="w-5 h-5 flex items-center justify-center"></span>
              <span>{{ s.label }}</span>
            </button>
          </div>
        </form>

        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.username") }} <span class="text-red-400">*</span></label>
            <input v-model="regForm.name" class="input-custom" :placeholder="$t('common.username_placeholder')" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.email") }} <span class="text-red-400">*</span></label>
            <input v-model="regForm.email" type="email" class="input-custom" placeholder="your@email.com" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.password") }} <span class="text-red-400">*</span></label>
              <input v-model="regForm.password" type="password" class="input-custom" placeholder="••••••••" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-beike-heading mb-1">{{ $t("common.country") }}</label>
              <select v-model="regForm.country" class="select-custom">
                <option value="Korea">{{ $t('inquiry.countries.korea') }}</option>
                <option value="Japan">{{ $t('inquiry.countries.japan') }}</option>
                <option value="USA">{{ $t("inquiry.countries.usa") }}</option>
                <option value="Europe">{{ $t('inquiry.countries.europe') }}</option>
                <option value="Other">{{ $t('inquiry.countries.other') }}</option>
              </select>
            </div>
          </div>
          <button type="submit" :disabled="regLoading" class="btn-primary-custom w-full justify-center py-3">
            <svg v-if="regLoading" class="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
            <span v-else>{{ $t('common.create_account') }}</span>
          </button>
          <p v-if="regError" class="text-xs text-red-500 text-center">{{ regError }}</p>
        </form>
      </div>

      <button @click="$emit('close')" class="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-beike-light hover:text-beike-body hover:bg-gray-100 transition-all">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['close', 'success'])
const props = defineProps({ visible: Boolean })

const userStore = useUserStore()

// Official-style SVG icons for social login
const icons = {
  wechat: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045.246.246 0 0 0 .241-.245c0-.06-.024-.12-.04-.178l-.325-1.233a.491.491 0 0 1 .178-.554C23.028 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-7.062-6.122zm-1.08 1.858c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/></svg>',
  qq: '<svg role="img" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M21.395 15.035a40 40 0 0 0-.803-2.264l-1.079-2.695c.001-.032.014-.562.014-.836C19.526 4.632 17.351 0 12 0S4.474 4.632 4.474 9.241c0 .274.013.804.014.836l-1.08 2.695a39 39 0 0 0-.802 2.264c-1.021 3.283-.69 4.643-.438 4.673.54.065 2.103-2.472 2.103-2.472 0 1.469.756 3.387 2.394 4.771-.612.188-1.363.479-1.845.835-.434.32-.379.646-.301.778.343.578 5.883.369 7.482.189 1.6.18 7.14.389 7.483-.189.078-.132.132-.458-.301-.778-.483-.356-1.233-.646-1.846-.836 1.637-1.384 2.393-3.302 2.393-4.771 0 0 1.563 2.537 2.103 2.472.251-.03.581-1.39-.438-4.673"/></svg>',
  kakao: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 2C6.48 2 2 5.94 2 10.8c0 3.2 1.98 6.04 4.97 7.6l-1.26 4.7c-.1.38.33.68.64.45L12 19.4c.66.07 1.33.1 2 .1 5.52 0 10-3.94 10-8.7S17.52 2 12 2z"/></svg>',
  line: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M19.56 2H4.44A2.44 2.44 0 0 0 2 4.44v10.13A2.44 2.44 0 0 0 4.44 17h1.87l2.7 3.19c.28.33.74.43 1.13.24.1-.05.18-.11.25-.19l3.2-3.24h5.97A2.44 2.44 0 0 0 22 14.57V4.44A2.44 2.44 0 0 0 19.56 2zM7.5 11.5H5.75a.5.5 0 0 1 0-1H7A.75.75 0 0 0 7 9H5.75a.5.5 0 0 1 0-1H7.5a.5.5 0 0 1 0 1H7a.75.75 0 0 0 0 1.5h1.75a.5.5 0 0 1 0 1H7.75a.5.5 0 0 1 0-1H7.5a.5.5 0 0 1 0 1zm3.25 0H9.25a.5.5 0 0 1 0-1H10a.75.75 0 0 0 0-1.5H9.25a.5.5 0 0 1 0-1h1.5a.5.5 0 0 1 0 1H10a.75.75 0 0 0 0 1.5h1.75a.5.5 0 0 1 0 1H11a.5.5 0 0 1 0-1h.75a.5.5 0 0 1 0 1zm3.25 0H14.5a.5.5 0 0 1 0-1h.75V8.5a.5.5 0 0 1 1 0v2h.75a.5.5 0 0 1 0 1h-1.25a.5.5 0 0 1 0-1h.5a.5.5 0 0 1 0 1zm2.5-1.5a.75.75 0 0 1-.75.75h-.5a.5.5 0 0 0 0 1h1.25a.5.5 0 0 1 0 1h-1.75a.5.5 0 0 1-.5-.5V9a.5.5 0 0 1 .5-.5h1.75a.5.5 0 0 1 0 1h-1.25a.75.75 0 0 1 .75.75z"/></svg>',
  google: '<svg viewBox="0 0 24 24" width="20" height="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>',
  apple: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.62-.71 1.64-1.16 2.58-1.12-.12 1.03-.49 1.98-1.11 2.67-.62.69-1.45 1.11-2.35 1.05-.05-.97.35-1.93.88-2.6z"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
}

const socialLoginMap = {
  zh: [
    { id: 'wechat', label: '微信', icon: icons.wechat, bg: '#07C160', color: '#fff' },
    { id: 'qq', label: 'QQ', icon: icons.qq, bg: '#12B7F5', color: '#fff' },
  ],
  ko: [
    { id: 'kakao', label: 'KakaoTalk', icon: icons.kakao, bg: '#FEE500', color: '#000' },
    { id: 'google', label: 'Google', icon: icons.google, bg: '#fff', color: '#333' },
  ],
  ja: [
    { id: 'line', label: 'LINE', icon: icons.line, bg: '#06C755', color: '#fff' },
    { id: 'google', label: 'Google', icon: icons.google, bg: '#fff', color: '#333' },
  ],
}
const defaultSocial = [
  { id: 'google', label: 'Google', icon: icons.google, bg: '#fff', color: '#333' },
  { id: 'apple', label: 'Apple', icon: icons.apple, bg: '#000', color: '#fff' },
  { id: 'facebook', label: 'Facebook', icon: icons.facebook, bg: '#1877F2', color: '#fff' },
]

const socialLogin = computed(() => {
  return socialLoginMap[locale.value] || defaultSocial
})

function socialClick(id) {
  console.log('Social login:', id)
  alert(t('common.social_coming') + ' ' + id)
}

const tabs = [
  { key: 'login', labelKey: 'nav.sign_in' },
  { key: 'register', labelKey: 'common.create_account' },
]
const activeTab = ref('login')

const loginForm = reactive({ email: 'demo@yanzhen.com', password: 'demo123' })
const loginLoading = ref(false)
const loginError = ref('')

const regForm = reactive({ name: '', company: '', email: '', password: '', country: '' })
const regLoading = ref(false)
const regError = ref('')

// Lock body scroll when modal is open
watch(() => props.visible, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

async function handleLogin() {
  loginLoading.value = true
  loginError.value = ''
  try {
    await userStore.login(loginForm.email, loginForm.password)
    emit('success')
    emit('close')
  } catch (e) {
    loginError.value = e.message
  } finally {
    loginLoading.value = false
  }
}

async function handleRegister() {
  regLoading.value = true
  regError.value = ''
  try {
    await userStore.register(regForm)
    emit('success')
    emit('close')
  } catch (e) {
    regError.value = e.message
  } finally {
    regLoading.value = false
  }
}
</script>

<style scoped>
.login-modal {
  position: fixed;
  inset: 0;
  z-index: 70;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.18s ease, visibility 0.18s ease;
}
.login-modal.is-open {
  visibility: visible;
  opacity: 1;
}
.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.25);
}
.modal-content {
  position: relative;
  width: 100%;
  max-width: 28rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
  overflow: hidden;
  transform: scale(0.92) translateY(16px);
  transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
}
.login-modal.is-open .modal-content {
  transform: scale(1) translateY(0);
}

.social-btn {
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.04);
}
.social-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.social-btn:active {
  transform: translateY(0);
}
</style>