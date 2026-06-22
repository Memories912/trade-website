<template>
  <header class="sticky top-0 z-40 bg-white shadow-sm">
    <!-- Top Bar (like BeikeShop .top-wrap) -->
    <div class="hidden lg:block bg-beike-bg-top border-b border-gray-200">
      <div class="container-custom flex items-center justify-between h-9 text-xs text-beike-muted">
        <div class="flex items-center gap-4">
          <!-- Language dropdown -->
          <div class="relative dropdown-hover">
            <button
              @click="langOpen = !langOpen"
              class="flex items-center gap-1 px-2 py-1 hover:text-beike-primary transition-colors"
            >
              <span>{{ currentLang.flag }}</span>
              <span>{{ currentLang.code.toUpperCase() }}</span>
              <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="langOpen"
              class="absolute top-full left-0 mt-0 w-36 rounded-lg bg-white border border-gray-200 py-1 shadow-dropdown z-50"
            >
              <button
                v-for="lang in languageStore.availableLocales"
                :key="lang.code"
                @click="switchLang(lang.code)"
                class="flex w-full items-center gap-2 px-3 py-2 text-xs text-beike-muted hover:text-beike-primary hover:bg-gray-50 transition-colors"
                :class="locale === lang.code ? 'text-beike-primary font-semibold' : ''"
              >
                <span>{{ lang.flag }}</span>
                <span class="flex-1 text-left">{{ lang.label }}</span>
                <svg v-if="locale === lang.code" class="w-3.5 h-3.5 text-beike-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              </button>
            </div>
          </div>

          <!-- Welcome message -->
          <span class="hidden lg:inline">{{ $t('topbar.welcome') }}</span>
        </div>

        <div class="flex items-center gap-4">
          <!-- Phone -->
          <a href="tel:+8613900000000" class="flex items-center gap-1 hover:text-beike-primary transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>{{ $t("topbar.phone") }}</span>
          </a>

          <!-- Email -->
          <a href="mailto:info@company.com" class="flex items-center gap-1 hover:text-beike-primary transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>{{ $t("topbar.email").replace('[at]', '@') }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Main Header (like BeikeShop .header-content) -->
    <div class="border-b border-gray-100">
      <div class="container-custom flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2 shrink-0">
          <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-beike-primary to-[#ff7a2f] flex items-center justify-center shadow-sm">
            <svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M19 5l-3 3 3 3M5 19l3-3-3-3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
          <div class="hidden sm:block">
            <div class="text-base font-bold text-beike-heading leading-tight">{{ $t('nav.brand_name') }}</div>
            <div class="text-[10px] text-beike-light leading-tight">{{ $t('nav.brand_sub') }}</div>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200"
            :class="isActive(item.path)
              ? 'text-beike-primary bg-beike-primary-light'
              : 'text-beike-body hover:text-beike-primary hover:bg-gray-50'"
          >
            {{ $t(item.label) }}
          </router-link>
        </nav>

        <!-- Right Actions -->
        <div class="flex items-center gap-1.5">
          <!-- Favorites -->
          <button
            v-if="userStore.isLoggedIn"
            @click="$router.push('/user/favorites')"
            class="btn-icon-circle relative"
            :title="$t('nav.my_favorites')"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            <span v-if="favStore.count > 0" class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-beike-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center">{{ favStore.count }}</span>
          </button>

          <!-- User Menu -->
          <template v-if="userStore.isLoggedIn">
            <div class="relative">
              <button
                @click="userMenuOpen = !userMenuOpen"
                class="btn-icon-circle text-xs font-bold"
              >
                {{ userStore.user?.name?.[0] || 'U' }}
              </button>
              <Transition name="slide-down">
                <div v-if="userMenuOpen" class="absolute right-0 top-full mt-1.5 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-dropdown z-50"
                     @click.outside="userMenuOpen = false">
                  <div class="px-4 py-2 text-xs text-beike-light border-b border-gray-100 mb-1 truncate">
                    {{ userStore.user?.email }}
                  </div>
                  <button @click="$router.push('/user/favorites'); userMenuOpen=false" class="flex w-full items-center gap-2 px-4 py-2 text-sm text-beike-body hover:bg-gray-50 transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                    {{ $t('nav.my_favorites') }}
                    <span v-if="favStore.count > 0" class="ml-auto text-xs text-beike-primary bg-beike-primary-light px-1.5 py-0.5 rounded-full font-bold">{{ favStore.count }}</span>
                  </button>
                  <button @click="$router.push('/inquiry'); userMenuOpen=false" class="flex w-full items-center gap-2 px-4 py-2 text-sm text-beike-body hover:bg-gray-50 transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {{ $t('nav.my_inquiries') }}
                  </button>
                  <button @click="userStore.logout()" class="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    {{ $t('nav.sign_out') }}
                  </button>
                </div>
              </Transition>
            </div>
          </template>
          <template v-else>
            <button
              @click="$emit('open-login')"
              class="btn-outline-custom text-xs px-3 py-1.5"
            >
              {{ $t('nav.sign_in') }}
            </button>
          </template>

          <!-- Inquiry CTA -->
          <router-link to="/inquiry" class="btn-primary-custom text-xs px-3 py-1.5 hidden sm:inline-flex">
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {{ $t('nav.inquiry') }}
          </router-link>

          <!-- Mobile Menu Toggle -->
          <button @click="mobileOpen = !mobileOpen" class="lg:hidden btn-icon-circle">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden border-t border-gray-100 bg-white shadow-lg max-h-[80vh] overflow-y-auto">
        <div class="container-custom py-2 space-y-0.5">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="mobileOpen = false"
            class="block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(item.path) ? 'text-beike-primary bg-beike-primary-light' : 'text-beike-body hover:text-beike-primary hover:bg-gray-50'"
          >
            {{ $t(item.label) }}
          </router-link>

          <!-- Mobile Language -->
          <div class="border-t border-gray-100 pt-2 mt-2">
            <div class="px-3 py-1.5 text-xs text-beike-light font-medium mb-1">{{ $t('nav.language') }}</div>
            <div class="flex flex-wrap gap-1 px-3">
              <button
                v-for="lang in languageStore.availableLocales"
                :key="lang.code"
                @click="switchLang(lang.code); mobileOpen = false"
                class="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border transition-colors"
                :class="locale === lang.code ? 'border-beike-primary text-beike-primary bg-beike-primary-light' : 'border-gray-200 text-beike-muted hover:border-gray-300'"
              >
                {{ lang.flag }} {{ lang.label }}
                <svg v-if="locale === lang.code" class="w-3 h-3 text-beike-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import { useFavoriteStore } from '@/stores/favorites'

const emit = defineEmits(['open-login'])

const route = useRoute()
const { locale } = useI18n()
const languageStore = useLanguageStore()
const userStore = useUserStore()
const favStore = useFavoriteStore()

const langOpen = ref(false)
const userMenuOpen = ref(false)
const mobileOpen = ref(false)

const navItems = [
  { path: '/', label: 'nav.home' },
  { path: '/products', label: 'nav.products' },
  { path: '/pricing', label: 'nav.pricing' },
  { path: '/inquiry', label: 'nav.inquiry' },
  { path: '/knowledge', label: 'nav.knowledge' },
  { path: '/contact', label: 'nav.contact' },
  { path: '/sourcing', label: 'nav.sourcing' },
  { path: '/about', label: 'nav.about' },
]

const currentLang = computed(() => {
  return languageStore.availableLocales.find(l => l.code === locale.value) || languageStore.availableLocales[0]
})

function isActive(path) {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function switchLang(code) {
  languageStore.setLocale(code)
  langOpen.value = false
}

// Close dropdowns on route change
watch(() => route.path, () => {
  langOpen.value = false
  userMenuOpen.value = false
})
</script>
