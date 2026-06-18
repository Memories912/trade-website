<template>
  <aside
    :class="[
      'fixed lg:relative z-40 h-full transition-all duration-300 bg-beike-heading text-white flex flex-col',
      collapsed ? 'w-16' : 'w-60',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <!-- Logo -->
    <div class="h-16 flex items-center px-4 border-b border-white/10 shrink-0">
      <router-link to="/admin/dashboard" class="flex items-center gap-2 overflow-hidden">
        <div class="w-8 h-8 rounded-lg bg-beike-primary flex items-center justify-center shrink-0">
          <span class="text-white font-bold text-sm">GT</span>
        </div>
        <span v-if="!collapsed" class="text-lg font-semibold whitespace-nowrap">GlobalTrade</span>
      </router-link>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-4">
      <div v-for="group in navGroups" :key="group.label" class="mb-2">
        <div v-if="group.label && !collapsed" class="px-4 py-1.5 text-[10px] uppercase tracking-wider text-white/40 font-medium">
          {{ group.label }}
        </div>
        <router-link
          v-for="item in group.items"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-sm transition-colors"
          :class="[
            isActive(item.path)
              ? 'bg-white/10 text-beike-primary font-medium'
              : 'text-white/70 hover:bg-white/5 hover:text-white',
          ]"
          @click="$emit('close')"
        >
          <component :is="item.icon" class="w-5 h-5 shrink-0" />
          <span v-if="!collapsed" class="truncate">{{ item.label }}</span>
        </router-link>
      </div>
    </nav>

    <!-- Collapse toggle -->
    <div class="hidden lg:flex items-center justify-center p-3 border-t border-white/10">
      <button class="p-1.5 rounded-md hover:bg-white/10 transition-colors" @click="$emit('toggle-collapse')">
        <ChevronLeft v-if="!collapsed" class="w-4 h-4 text-white/60" />
        <ChevronRight v-else class="w-4 h-4 text-white/60" />
      </button>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {
  LayoutDashboard,
  Users,
  Package,
  FolderTree,
  Award,
  MessageSquare,
  Search,
  BookOpen,
  Bot,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'

defineProps({
  collapsed: { type: Boolean, default: false },
  open: { type: Boolean, default: false },
})
defineEmits(['toggle-collapse', 'close'])

const route = useRoute()
const { t } = useI18n()

const navGroups = computed(() => [
  {
    label: '',
    items: [
      { path: '/admin/dashboard', label: t('admin.sidebar.dashboard'), icon: LayoutDashboard },
      { path: '/admin/users', label: t('admin.sidebar.users'), icon: Users },
    ],
  },
  {
    label: t('admin.sidebar.group_products'),
    items: [
      { path: '/admin/products', label: t('admin.sidebar.products'), icon: Package },
      { path: '/admin/categories', label: t('admin.sidebar.categories'), icon: FolderTree },
      { path: '/admin/certifications', label: t('admin.sidebar.certifications'), icon: Award },
    ],
  },
  {
    label: t('admin.sidebar.group_trade'),
    items: [
      { path: '/admin/inquiries', label: t('admin.sidebar.inquiries'), icon: MessageSquare },
      { path: '/admin/sourcing', label: t('admin.sidebar.sourcing'), icon: Search },
    ],
  },
  {
    label: t('admin.sidebar.group_content'),
    items: [
      { path: '/admin/knowledge', label: t('admin.sidebar.knowledge'), icon: BookOpen },
      { path: '/admin/ai-chat', label: t('admin.sidebar.ai_chat'), icon: Bot },
    ],
  },
  {
    label: t('admin.sidebar.group_system'),
    items: [
      { path: '/admin/settings', label: t('admin.sidebar.settings'), icon: Settings },
    ],
  },
])

function isActive(path) {
  return route.path === path || route.path.startsWith(path + '/')
}
</script>
