<template>
  <div class="py-8 lg:py-12">
    <div class="container-custom">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar nav -->
        <aside class="md:w-56 shrink-0">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div class="p-2 space-y-1">
              <router-link to="/user/favorites"
                class="flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors"
                :class="$route.path === '/user/favorites' ? 'text-beike-primary bg-beike-primary-light font-bold' : 'text-beike-body hover:bg-gray-50'">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {{ $t('nav.my_favorites') }}
              </router-link>
              <router-link to="/user/inquiries"
                class="flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors"
                :class="$route.path === '/user/inquiries' ? 'text-beike-primary bg-beike-primary-light font-bold' : 'text-beike-body hover:bg-gray-50'">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {{ $t('nav.my_inquiries') }}
              </router-link>
              <router-link to="/user/sourcing"
                class="flex items-center gap-3 px-4 py-3 text-sm rounded-lg transition-colors"
                :class="$route.path === '/user/sourcing' ? 'text-beike-primary bg-beike-primary-light font-bold' : 'text-beike-body hover:bg-gray-50'">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35"/>
                </svg>
                {{ $t('nav.my_sourcing') }}
              </router-link>
            </div>
          </div>
        </aside>

        <!-- Content -->
        <div class="flex-1 min-w-0">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const $route = useRoute()
</script>
