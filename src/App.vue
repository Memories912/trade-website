<template>
  <!-- Admin auth layout (login page — no sidebar/header) -->
  <div v-if="isAdminAuthLayout">
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>

  <!-- Admin layout (sidebar + header) — persist across sub-route changes, no transition -->
  <div v-else-if="isAdminLayout" style="height:100vh;overflow:hidden">
    <router-view />
  </div>

  <!-- Default user-facing layout -->
  <div v-else class="min-h-screen flex flex-col font-poppins">
    <Navbar @open-login="loginModal = true" />
    <main class="flex-1">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    <Footer />
    <AIChatWidget />
    <FloatingContact @open-inquiry="quickInquiryOpen = true" />
    <LoginModal :visible="loginModal" @close="loginModal = false" @success="loginModal = false" />
    <QuickInquiryModal :visible="quickInquiryOpen" @close="quickInquiryOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import i18n from '@/i18n'
import { useLanguageStore } from '@/stores/language'
import { useUserStore } from '@/stores/user'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import AIChatWidget from '@/components/AIChatWidget.vue'
import BackToTop from '@/components/BackToTop.vue'
import FloatingContact from '@/components/FloatingContact.vue'
import LoginModal from '@/components/LoginModal.vue'
import QuickInquiryModal from '@/components/QuickInquiryModal.vue'
const route = useRoute()
const languageStore = useLanguageStore()
const userStore = useUserStore()
const loginModal = ref(false)
const quickInquiryOpen = ref(false)

const layoutType = computed(() => route.meta?.layout || 'default')
const isAdminAuthLayout = computed(() => layoutType.value === 'admin-auth')
const isAdminLayout = computed(() => layoutType.value === 'admin')

onMounted(() => {
  languageStore.setLocale(i18n.global.locale.value)
  userStore.checkAuth()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
