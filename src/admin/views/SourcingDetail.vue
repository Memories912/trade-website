<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <button class="p-1.5 rounded-md hover:bg-beike-bg" @click="router.push('/admin/sourcing')">
        <ArrowLeft class="w-5 h-5 text-beike-body" />
      </button>
      <h1 class="text-xl font-bold text-beike-heading">
        {{ t('admin.sourcing.detail_title') }} {{ request?.id }}
      </h1>
      <StatusBadge v-if="request" :status="request.status" type="sourcing" class="ml-2" />
    </div>

    <div v-if="request" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-3">
        <!-- Description -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.sourcing.description') }}</h3>
          <p class="text-sm text-beike-body leading-relaxed">{{ request.description }}</p>
        </div>

        <!-- Status actions -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.sourcing.status_actions') }}</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="s in nextStatuses"
              :key="s"
              class="px-4 py-2 rounded-lg text-sm font-medium border transition-colors"
              :class="statusBtnClass(s)"
              @click="changeStatus(s)"
            >
              {{ t('admin.status.' + s) }}
            </button>
          </div>
        </div>

        <!-- Quote section -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.sourcing.quote') }}</h3>
          <div v-if="request.quote" class="space-y-3 text-sm mb-4">
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.price') }}</span>
              <span class="text-beike-heading font-semibold">{{ request.quote.currency }} {{ request.quote.price }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.lead_time') }}</span>
              <span class="text-beike-body">{{ request.quote.leadTime }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.notes') }}</span>
              <span class="text-beike-body">{{ request.quote.notes }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.quoted_at') }}</span>
              <span class="text-beike-body">{{ request.quote.quotedAt }}</span>
            </div>
          </div>
          <p v-else class="text-sm text-beike-muted mb-4">{{ t('admin.sourcing.no_quote') }}</p>
          <!-- Add/update quote form -->
          <div class="space-y-3 border-t border-beike-border pt-4">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs text-beike-muted mb-1">{{ t('admin.sourcing.price') }}</label>
                <input v-model.number="quoteForm.price" type="number" class="w-full px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
              </div>
              <div>
                <label class="block text-xs text-beike-muted mb-1">{{ t('admin.sourcing.currency') }}</label>
                <select v-model="quoteForm.currency" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none">
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="CNY">CNY</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs text-beike-muted mb-1">{{ t('admin.sourcing.lead_time') }}</label>
              <input v-model="quoteForm.leadTime" class="w-full px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs text-beike-muted mb-1">{{ t('admin.sourcing.notes') }}</label>
              <textarea v-model="quoteForm.notes" rows="2" class="w-full px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none resize-y" />
            </div>
            <button
              class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm hover:bg-beike-primary-dark transition-colors"
              @click="submitQuote"
            >
              {{ t('admin.sourcing.submit_quote') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-3">
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.sourcing.customer_info') }}</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.customer_name') }}</span>
              <span class="text-beike-heading font-medium">{{ request.customer.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.email') }}</span>
              <span class="text-beike-body">{{ request.customer.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.company') }}</span>
              <span class="text-beike-body">{{ request.customer.company }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.sourcing.country') }}</span>
              <span class="text-beike-body">{{ request.customer.country }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-card p-4 text-sm">
          <div class="flex justify-between mb-2">
            <span class="text-beike-muted">{{ t('admin.sourcing.created') }}</span>
            <span class="text-beike-body">{{ request.createdAt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.sourcing.updated') }}</span>
            <span class="text-beike-body">{{ request.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else :title="t('admin.sourcing.not_found')" />
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft } from 'lucide-vue-next'
import { useAdminSourcingStore } from '@/stores/adminSourcing'
import StatusBadge from '@/admin/components/StatusBadge.vue'
import EmptyState from '@/admin/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const sourcingStore = useAdminSourcingStore()

const request = computed(() => sourcingStore.getRequest(route.params.id))

const quoteForm = reactive({
  price: null,
  currency: 'USD',
  leadTime: '',
  notes: '',
})

const statusFlow = {
  pending: ['processing', 'quoted'],
  processing: ['quoted'],
  quoted: ['closed'],
  closed: ['pending'],
}

const nextStatuses = computed(() => statusFlow[request.value?.status] || [])

function statusBtnClass(status) {
  const map = {
    pending: 'border-amber-300 text-amber-700 hover:bg-amber-50',
    processing: 'border-blue-300 text-blue-700 hover:bg-blue-50',
    quoted: 'border-green-300 text-green-700 hover:bg-green-50',
    closed: 'border-gray-300 text-gray-600 hover:bg-gray-50',
  }
  return map[status] || ''
}

function changeStatus(status) {
  sourcingStore.updateStatus(route.params.id, status)
}

function submitQuote() {
  if (quoteForm.price == null) return
  sourcingStore.addQuote(route.params.id, { ...quoteForm })
}
</script>
