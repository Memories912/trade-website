<template>
  <div class="admin-root">
    <!-- Desktop sidebar -->
    <aside class="admin-sidebar">
      <div class="admin-logo">
        <div class="logo-icon">GT</div>
        <span class="logo-text">GlobalTrade</span>
      </div>
      <nav class="admin-nav">
        <router-link
          v-for="item in navItems" :key="item.path" :to="item.path"
          class="nav-link" active-class="active"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="admin-sidebar-footer">
        <button class="nav-link" @click="handleLogout">
          <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
          <span class="nav-label">{{ $t('nav.sign_out') }}</span>
        </button>
      </div>
    </aside>

    <!-- Mobile sidebar -->
    <div v-if="mobileOpen" class="mobile-overlay" @click="mobileOpen = false"></div>
    <aside v-if="mobileOpen" class="mobile-sidebar">
      <div class="admin-logo">
        <div class="logo-icon">GT</div>
        <span class="logo-text">GlobalTrade</span>
        <button class="ml-auto text-white/50 hover:text-white" @click="mobileOpen = false">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <nav class="admin-nav">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="nav-link" active-class="active" @click="mobileOpen = false"
        >
          <span class="nav-icon" v-html="item.icon"></span>
          <span class="nav-label">{{ item.label }}</span>
        </router-link>
      </nav>
      <div class="admin-sidebar-footer">
        <button class="nav-link" @click="handleLogout">
          <span class="nav-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
          <span class="nav-label">{{ $t('nav.sign_out') }}</span>
        </button>
      </div>
    </aside>

    <!-- Main area -->
    <div class="admin-main">
      <!-- Top bar -->
      <header class="topbar">
        <div class="topbar-left">
          <button class="hamburger lg:hidden" @click="mobileOpen = true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          <nav class="bc">
            <router-link to="/admin/dashboard" class="bc-home">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>
            </router-link>
            <svg class="bc-chev" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span class="bc-current">{{ pageTitle }}</span>
          </nav>
        </div>
        <div class="topbar-right">
          <!-- Language switcher -->
          <div class="dd-wrap" ref="refLang">
            <button class="tb-btn" @click="langOpen = !langOpen" title="Language">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              <span class="lang-lbl">{{ currentLang }}</span>
            </button>
            <div v-if="langOpen" class="dd" @click.stop>
              <button v-for="l in langs" :key="l.code" class="dd-item" :class="{ active: locale === l.code }" @click="switchLang(l.code)">{{ l.label }}</button>
            </div>
          </div>
          <!-- Notifications -->
          <div class="dd-wrap" ref="refNotif">
            <button class="tb-btn" @click="notifOpen = !notifOpen" title="Notifications">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              <span v-if="notifBadge > 0" class="notif-dot">{{ notifBadge > 9 ? '9+' : notifBadge }}</span>
            </button>
            <div v-if="notifOpen" class="dd dd-right" @click.stop>
              <div class="dd-title">{{ $t('admin.header.notifications') }}</div>
              <div v-if="notifList.length" class="dd-scroll">
                <button v-for="n in notifList" :key="n.id" class="dd-item notif-item">
                  <div class="notif-bullet" :class="{ seen: n.seen }"></div>
                  <div><p class="notif-txt">{{ n.text }}</p><p class="notif-ts">{{ n.time }}</p></div>
                </button>
              </div>
              <div v-else class="dd-empty">{{ $t('admin.header.no_notifications') }}</div>
            </div>
          </div>
          <!-- Fullscreen -->
          <button class="tb-btn hidden-sm" @click="toggleFS" :title="$t('admin.header.fullscreen')">
            <svg v-if="!isFS" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
            <svg v-else width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3v3a2 2 0 01-2 2H3m0 0h5M3 3v5m18 0h-5m5 0v-3a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
          </button>
          <!-- Admin menu -->
          <div class="dd-wrap" ref="refAdmin">
            <button class="admin-trigger" @click="adminOpen = !adminOpen">
              <div class="admin-avatar">{{ adminInitial }}</div>
              <span class="admin-name hidden-sm">{{ adminName }}</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="adminOpen ? 'rot' : ''"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div v-if="adminOpen" class="dd dd-right" @click.stop>
              <div class="dd-title"><p class="fw-600">{{ adminName }}</p><p class="c-muted fs-xs">{{ adminEmail }}</p></div>
              <div class="dd-hr"></div>
              <router-link to="/admin/settings" class="dd-item" @click="adminOpen = false">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                {{ $t('admin.sidebar.settings') }}
              </router-link>
              <div class="dd-hr"></div>
              <button class="dd-item c-red" @click="handleLogout">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                {{ $t('nav.sign_out') }}
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAdminAuth } from '@/admin/composables/useAdminAuth'

const route = useRoute()
const { t, locale } = useI18n()
const { logout, checkAuth, adminUser } = useAdminAuth()

const mobileOpen = ref(false)
const langOpen = ref(false)
const notifOpen = ref(false)
const adminOpen = ref(false)
const isFS = ref(false)

const refLang = ref(null)
const refNotif = ref(null)
const refAdmin = ref(null)

onMounted(() => { checkAuth() })

// Nav items
const navItems = [
  { path: '/admin/dashboard', labelKey: 'admin.sidebar.dashboard',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"/></svg>' },
  { path: '/admin/users', labelKey: 'admin.sidebar.users',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>' },
  { path: '/admin/products', labelKey: 'admin.sidebar.products',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>' },
  { path: '/admin/categories', labelKey: 'admin.sidebar.categories',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 20h16a2 2 0 002-2V8a2 2 0 00-2-2h-7.93a2 2 0 01-1.66-.9l-.82-1.2A2 2 0 007.93 3H4a2 2 0 00-2 2v13c0 1.1.9 2 2 2z"/></svg>' },
  { path: '/admin/certifications', labelKey: 'admin.sidebar.certifications',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-2 5 2-1 2 1-2-5z"/><circle cx="12" cy="8" r="6"/></svg>' },
  { path: '/admin/inquiries', labelKey: 'admin.sidebar.inquiries',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' },
  { path: '/admin/sourcing', labelKey: 'admin.sidebar.sourcing',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' },
  { path: '/admin/knowledge', labelKey: 'admin.sidebar.knowledge',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>' },
  { path: '/admin/ai-chat', labelKey: 'admin.sidebar.ai_chat',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>' },
  { path: '/admin/settings', labelKey: 'admin.sidebar.settings',
    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.32 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
].map(item => ({ ...item, label: t(item.labelKey) }))

// Page title
const titleMap = {
  '/admin/dashboard': 'admin.sidebar.dashboard',
  '/admin/users': 'admin.sidebar.users',
  '/admin/products': 'admin.sidebar.products',
  '/admin/categories': 'admin.sidebar.categories',
  '/admin/certifications': 'admin.sidebar.certifications',
  '/admin/inquiries': 'admin.sidebar.inquiries',
  '/admin/sourcing': 'admin.sidebar.sourcing',
  '/admin/knowledge': 'admin.sidebar.knowledge',
  '/admin/ai-chat': 'admin.sidebar.ai_chat',
  '/admin/settings': 'admin.sidebar.settings',
}
const pageTitle = computed(() => t(titleMap[route.path] || 'Admin'))

// Language
const langs = [
  { code: 'zh', label: '简体中文' },
  { code: 'en', label: 'English' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
]
const currentLang = computed(() => langs.find(l => l.code === locale.value)?.label.substring(0, 2) || 'EN')
function switchLang(code) {
  locale.value = code
  localStorage.setItem('locale', code)
  document.documentElement.lang = code
  langOpen.value = false
}

// Admin user
const adminName = computed(() => adminUser.value?.name || 'Admin')
const adminEmail = computed(() => adminUser.value?.email || '')
const adminInitial = computed(() => adminName.value.charAt(0).toUpperCase())

// Notifications
const notifBadge = ref(2)
const notifList = ref([
  { id: 1, text: 'New inquiry from Kim Min-su', time: '5 min ago', seen: false },
  { id: 2, text: 'Sourcing request SR-007 needs review', time: '1 hour ago', seen: false },
])

// Fullscreen
function toggleFS() {
  if (!document.fullscreenElement) { document.documentElement.requestFullscreen().catch(() => {}); isFS.value = true }
  else { document.exitFullscreen().catch(() => {}); isFS.value = false }
}
function onFSChange() { isFS.value = !!document.fullscreenElement }

// Close dropdowns on outside click
function closeAll(e) {
  if (refLang.value && !refLang.value.contains(e.target)) langOpen.value = false
  if (refNotif.value && !refNotif.value.contains(e.target)) notifOpen.value = false
  if (refAdmin.value && !refAdmin.value.contains(e.target)) adminOpen.value = false
}

onMounted(() => {
  document.addEventListener('click', closeAll)
  document.addEventListener('fullscreenchange', onFSChange)
})
onUnmounted(() => {
  document.removeEventListener('click', closeAll)
  document.removeEventListener('fullscreenchange', onFSChange)
})

function handleLogout() {
  adminOpen.value = false
  logout()
}
</script>

<style scoped>
/* === Layout === */
.admin-root {
  display: flex;
  min-height: 100vh;
  height: 100vh;
  overflow: hidden;
  background: #f6f6f8;
}

/* === Desktop sidebar === */
.admin-sidebar {
  width: 220px;
  background: #282828;
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 50;
}
@media (min-width: 1024px) { .admin-sidebar { display: flex; } }

.mobile-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 60; }
.mobile-sidebar {
  position: fixed; top: 0; left: 0; bottom: 0; width: 260px;
  background: #282828; z-index: 70; display: flex; flex-direction: column;
}

.admin-logo { display: flex; align-items: center; gap: 10px; padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,0.08); }
.logo-icon { width: 32px; height: 32px; border-radius: 8px; background: #fd560f; color: white; font-weight: 800; font-size: 14px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.logo-text { color: white; font-weight: 600; font-size: 15px; }

.admin-nav { flex: 1; overflow-y: auto; padding: 10px 8px; }
.nav-link {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 10px; border-radius: 8px;
  color: rgba(255,255,255,0.6); font-size: 13px;
  text-decoration: none; transition: all 0.12s;
  cursor: pointer; width: 100%; border: none; background: none; text-align: left;
}
.nav-link:hover { color: white; background: rgba(255,255,255,0.08); }
.nav-link.active { color: #fd560f; background: rgba(253,86,15,0.15); }
.nav-icon { display: flex; align-items: center; justify-content: center; width: 20px; height: 20px; flex-shrink: 0; }
.nav-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.admin-sidebar-footer { padding: 10px 8px; border-top: 1px solid rgba(255,255,255,0.08); }

/* === Main === */
.admin-main { flex: 1; margin-left: 0; min-width: 0; display: flex; flex-direction: column; }
@media (min-width: 1024px) { .admin-main { margin-left: 220px; } }

.admin-content { flex: 1; padding: 12px; overflow-y: auto; }
@media (min-width: 768px) { .admin-content { padding: 16px; } }

/* === Top bar === */
.topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  z-index: 40;
  flex-shrink: 0;
}
.topbar-left { display: flex; align-items: center; gap: 8px; }

.hamburger {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; border-radius: 6px;
  border: none; background: none; cursor: pointer; color: #666;
}
.hamburger:hover { background: #f6f6f8; }

.bc { display: none; align-items: center; gap: 4px; }
@media (min-width: 640px) { .bc { display: flex; } }
.bc-home { display: flex; padding: 4px; border-radius: 4px; color: #8D94A0; }
.bc-home:hover { color: #fd560f; }
.bc-chev { flex-shrink: 0; }
.bc-current { font-size: 13px; font-weight: 600; color: #282828; white-space: nowrap; }

.topbar-right { display: flex; align-items: center; gap: 2px; }

.tb-btn {
  display: flex; align-items: center; justify-content: center; gap: 3px;
  height: 32px; padding: 0 6px; border-radius: 6px;
  border: none; background: none; color: #666; cursor: pointer;
  font-size: 12px; position: relative;
}
.tb-btn:hover { background: #f6f6f8; color: #282828; }

.lang-lbl { font-size: 11px; font-weight: 600; color: #666; }

.hidden-sm { display: none !important; }
@media (min-width: 640px) {
  .tb-btn { padding: 0 8px; }
  .hidden-sm { display: flex !important; }
}

/* Notif badge */
.notif-dot {
  position: absolute; top: 2px; right: 1px;
  min-width: 16px; height: 16px; border-radius: 8px;
  background: #fd560f; color: white;
  font-size: 9px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  padding: 0 3px;
}

/* Admin trigger */
.admin-trigger {
  display: flex; align-items: center; gap: 6px;
  padding: 2px 6px 2px 2px; border-radius: 8px;
  border: none; background: none; cursor: pointer;
}
.admin-trigger:hover { background: #f6f6f8; }
.admin-avatar {
  width: 28px; height: 28px; border-radius: 50%;
  background: #fff1eb; color: #fd560f;
  font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.admin-name { font-size: 12px; font-weight: 600; color: #282828; }
.rot { transform: rotate(180deg); transition: transform 0.2s; }

/* Dropdown */
.dd-wrap { position: relative; }
.dd {
  position: absolute; top: calc(100% + 6px); left: 50%;
  transform: translateX(-50%);
  min-width: 170px; background: white;
  border-radius: 10px; border: 1px solid #eee;
  box-shadow: 0 6px 24px rgba(0,0,0,0.10);
  z-index: 100; padding: 4px;
}
.dd-right { left: auto; right: 0; transform: none; }
.dd-title { padding: 10px 12px 8px; font-size: 12px; color: #666; }
.dd-scroll { max-height: 220px; overflow-y: auto; }
.dd-item {
  display: flex; align-items: center; gap: 8px;
  width: 100%; padding: 8px 12px; border-radius: 6px;
  font-size: 12px; color: #333; border: none; background: none;
  cursor: pointer; text-align: left; text-decoration: none;
}
.dd-item:hover { background: #fff1eb; color: #fd560f; }
.dd-item.active { color: #fd560f; font-weight: 600; background: #fff1eb; }
.dd-hr { height: 1px; background: #f0f0f0; margin: 4px 8px; }
.dd-empty { padding: 20px 12px; text-align: center; font-size: 12px; color: #999; }

/* Notif item */
.notif-item { gap: 10px; align-items: flex-start; }
.notif-bullet { width: 6px; height: 6px; border-radius: 50%; background: #fd560f; flex-shrink: 0; margin-top: 5px; }
.notif-bullet.seen { opacity: 0; }
.notif-txt { font-size: 12px; color: #333; line-height: 1.4; }
.notif-ts { font-size: 10px; color: #999; margin-top: 2px; }

/* Utils */
.fw-600 { font-weight: 600; }
.c-muted { color: #666; }
.c-red { color: #e53e3e !important; }
.c-red:hover { background: #fef2f2 !important; }
.fs-xs { font-size: 11px; margin-top: 1px; }
</style>
