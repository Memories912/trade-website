<template>
  <div>
    <h2 class="text-xl font-bold text-beike-heading mb-6">{{ $t('user.my_inquiries') }}</h2>
    
    <div v-if="inquiryStore.inquiries.length === 0" class="text-center py-16">
      <div class="text-5xl mb-4">📋</div>
      <p class="text-beike-muted text-sm mb-4">{{ $t('user.no_inquiries') }}</p>
      <router-link to="/inquiry" class="btn-primary-custom inline-flex items-center gap-2 px-6 py-3">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        {{ $t('inquiry.new_inquiry') }}
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="inq in inquiryStore.inquiries" :key="inq.id"
           class="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="text-sm font-bold text-beike-heading truncate">{{ inq.productName }}</h3>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    :class="inq.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'">
                {{ inq.status === 'pending' ? $t('user.status_pending') : $t('user.status_replied') }}
              </span>
            </div>
            <p class="text-xs text-beike-muted mb-1">
              <span class="font-medium text-beike-body">{{ $t('inquiry.contact_name') }}:</span> {{ inq.contactName || '-' }}
            </p>
            <p class="text-xs text-beike-muted mb-1">
              <span class="font-medium text-beike-body">{{ $t('inquiry.email') }}:</span> {{ inq.email || '-' }}
            </p>
            <p class="text-xs text-beike-muted">
              <span class="font-medium text-beike-body">{{ $t('user.inquiry_time') }}:</span> {{ formatDate(inq.createdAt) }}
            </p>
          </div>
        </div>
        <div v-if="inq.requirements" class="mt-3 pt-3 border-t border-gray-100">
          <p class="text-xs text-beike-muted">{{ inq.requirements }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useInquiryStore } from '@/stores/inquiry'
const inquiryStore = useInquiryStore()

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>