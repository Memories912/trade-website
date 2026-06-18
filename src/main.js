import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './assets/main.css'

const app = createApp(App)

// Global error handler — catch Vue errors before they crash click events
app.config.errorHandler = (err, instance, info) => {
  console.error('[Vue Error]', err.message, info)
}

// Global warn handler
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('[Vue Warn]', msg)
}

app.use(createPinia())
app.use(router)
app.use(i18n)

// Restore saved locale BEFORE mount — prevents flash of wrong language
const supported = ['zh', 'en', 'ko', 'ja']
const saved = localStorage.getItem('locale')
const browser = navigator.language?.split('-')[0]
const locale = supported.includes(saved) ? saved
  : supported.includes(browser) ? browser
  : 'zh'
i18n.global.locale.value = locale
document.documentElement.lang = locale

app.mount('#app')
