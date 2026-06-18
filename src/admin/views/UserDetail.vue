<template>
  <div class="space-y-3">
    <!-- Back button -->
    <div class="flex items-center gap-2">
      <button class="p-1.5 rounded-md hover:bg-beike-bg transition-colors" @click="router.push('/admin/users')">
        <ArrowLeft class="w-5 h-5 text-beike-body" />
      </button>
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.users.detail_title') }}</h1>
    </div>

    <div v-if="user" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- User info card -->
      <div class="bg-white rounded-xl shadow-card p-4">
        <div class="flex flex-col items-center text-center mb-6">
          <div class="w-16 h-16 rounded-full bg-beike-primary/10 flex items-center justify-center mb-3">
            <span class="text-beike-primary text-xl font-bold">{{ user.name.charAt(0) }}</span>
          </div>
          <h2 class="text-lg font-semibold text-beike-heading">{{ user.name }}</h2>
          <StatusBadge :status="user.status" type="user" class="mt-2" />
        </div>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.users.email') }}</span>
            <span class="text-beike-body">{{ user.email }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.users.company') }}</span>
            <span class="text-beike-body">{{ user.company }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.users.country') }}</span>
            <span class="text-beike-body">{{ user.country }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.users.registered') }}</span>
            <span class="text-beike-body">{{ user.createdAt }}</span>
          </div>
        </div>
        <button
          class="w-full mt-6 py-2 rounded-lg text-sm font-medium transition-colors"
          :class="user.status === 'active'
            ? 'border border-red-200 text-red-600 hover:bg-red-50'
            : 'bg-green-500 text-white hover:bg-green-600'"
          @click="user.status = user.status === 'active' ? 'inactive' : 'active'"
        >
          {{ user.status === 'active' ? t('admin.users.disable') : t('admin.users.enable') }}
        </button>
      </div>

      <!-- Activity panels -->
      <div class="lg:col-span-2 space-y-3">
        <!-- User's inquiries -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.users.user_inquiries') }}</h3>
          <div v-if="userInquiries.length" class="space-y-3">
            <div
              v-for="inq in userInquiries"
              :key="inq.id"
              class="flex items-center justify-between py-2 border-b border-beike-border last:border-0"
            >
              <div>
                <p class="text-sm font-medium text-beike-heading">{{ inq.productName }}</p>
                <p class="text-xs text-beike-muted">{{ inq.createdAt }}</p>
              </div>
              <StatusBadge :status="inq.status" />
            </div>
          </div>
          <p v-else class="text-sm text-beike-muted">{{ t('admin.common.no_data') }}</p>
        </div>

        <!-- User's sourcing requests -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.users.user_sourcing') }}</h3>
          <div v-if="userSourcing.length" class="space-y-3">
            <div
              v-for="sr in userSourcing"
              :key="sr.id"
              class="flex items-center justify-between py-2 border-b border-beike-border last:border-0"
            >
              <div>
                <p class="text-sm font-medium text-beike-heading">{{ sr.title }}</p>
                <p class="text-xs text-beike-muted">{{ sr.createdAt }}</p>
              </div>
              <StatusBadge :status="sr.status" type="sourcing" />
            </div>
          </div>
          <p v-else class="text-sm text-beike-muted">{{ t('admin.common.no_data') }}</p>
        </div>
      </div>
    </div>

    <EmptyState v-else :title="t('admin.users.not_found')" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'
import { mockUsers, mockInquiries, mockSourcingRequests } from '@/assets/mock/admin'
import StatusBadge from '@/admin/components/StatusBadge.vue'
import EmptyState from '@/admin/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const user = computed(() => mockUsers.find(u => u.id === route.params.id) || null)

const userInquiries = computed(() =>
  mockInquiries.filter(i => i.customer.email === user.value?.email)
)

const userSourcing = computed(() =>
  mockSourcingRequests.filter(s => s.customer.email === user.value?.email)
)
</script>
