<template>
  <div class="space-y-3">
    <!-- Back + header -->
    <div class="flex items-center gap-2">
      <button class="p-1.5 rounded-md hover:bg-beike-bg" @click="router.push('/admin/inquiries')">
        <ArrowLeft class="w-5 h-5 text-beike-body" />
      </button>
      <h1 class="text-xl font-bold text-beike-heading">
        {{ t('admin.inquiries.detail_title') }} {{ inquiry?.id }}
      </h1>
      <StatusBadge v-if="inquiry" :status="inquiry.status" class="ml-2" />
    </div>

    <div v-if="inquiry" class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main content -->
      <div class="lg:col-span-2 space-y-3">
        <!-- Inquiry message -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.inquiries.message') }}</h3>
          <p class="text-sm text-beike-body leading-relaxed">{{ inquiry.message }}</p>
        </div>

        <!-- Status actions -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.inquiries.status_actions') }}</h3>
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

        <!-- Notes timeline -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.inquiries.notes') }}</h3>
          <div v-if="inquiry.notes.length" class="space-y-4 mb-4">
            <div v-for="note in inquiry.notes" :key="note.id" class="flex gap-3">
              <div class="w-8 h-8 rounded-full bg-beike-bg flex items-center justify-center shrink-0">
                <User class="w-4 h-4 text-beike-muted" />
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-beike-heading">{{ note.author }}</span>
                  <span class="text-xs text-beike-light">{{ formatTime(note.createdAt) }}</span>
                </div>
                <p class="text-sm text-beike-body">{{ note.content }}</p>
              </div>
            </div>
          </div>
          <p v-else class="text-sm text-beike-muted mb-4">{{ t('admin.inquiries.no_notes') }}</p>
          <!-- Add note -->
          <div class="flex gap-3">
            <input
              v-model="noteContent"
              class="flex-1 px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
              :placeholder="t('admin.inquiries.note_placeholder')"
              @keyup.enter="addNote"
            />
            <button
              class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm hover:bg-beike-primary-dark transition-colors"
              @click="addNote"
            >
              {{ t('admin.common.add') }}
            </button>
          </div>
        </div>

        <!-- Replies -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.inquiries.replies') }}</h3>
          <div v-if="inquiry.replies.length" class="space-y-4 mb-4">
            <div v-for="reply in inquiry.replies" :key="reply.id" class="bg-beike-primary-light rounded-lg p-4">
              <p class="text-sm text-beike-body">{{ reply.content }}</p>
              <p class="text-xs text-beike-muted mt-2">{{ formatTime(reply.sentAt) }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-beike-muted mb-4">{{ t('admin.inquiries.no_replies') }}</p>
          <!-- Add reply -->
          <textarea
            v-model="replyContent"
            rows="3"
            class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none resize-y mb-3"
            :placeholder="t('admin.inquiries.reply_placeholder')"
          />
          <button
            class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm hover:bg-beike-primary-dark transition-colors"
            @click="addReply"
          >
            {{ t('admin.inquiries.send_reply') }}
          </button>
        </div>
      </div>

      <!-- Sidebar: customer info -->
      <div class="space-y-3">
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.inquiries.customer_info') }}</h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.inquiries.customer_name') }}</span>
              <span class="text-beike-heading font-medium">{{ inquiry.customer.name }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.inquiries.email') }}</span>
              <span class="text-beike-body">{{ inquiry.customer.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.inquiries.company') }}</span>
              <span class="text-beike-body">{{ inquiry.customer.company }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-beike-muted">{{ t('admin.inquiries.country') }}</span>
              <span class="text-beike-body">{{ inquiry.customer.country }}</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.inquiries.product_info') }}</h3>
          <p class="text-sm font-medium text-beike-heading">{{ inquiry.productName }}</p>
          <p class="text-xs text-beike-muted mt-1">ID: {{ inquiry.productId }}</p>
        </div>

        <div class="bg-white rounded-xl shadow-card p-4 text-sm">
          <div class="flex justify-between mb-2">
            <span class="text-beike-muted">{{ t('admin.inquiries.created') }}</span>
            <span class="text-beike-body">{{ inquiry.createdAt }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-beike-muted">{{ t('admin.inquiries.updated') }}</span>
            <span class="text-beike-body">{{ inquiry.updatedAt }}</span>
          </div>
        </div>
      </div>
    </div>

    <EmptyState v-else :title="t('admin.inquiries.not_found')" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, User } from 'lucide-vue-next'
import dayjs from 'dayjs'
import { useAdminInquiryStore } from '@/stores/adminInquiry'
import StatusBadge from '@/admin/components/StatusBadge.vue'
import EmptyState from '@/admin/components/EmptyState.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const inquiryStore = useAdminInquiryStore()

const inquiry = computed(() => inquiryStore.getInquiry(route.params.id))

const noteContent = ref('')
const replyContent = ref('')

const statusFlow = {
  pending: ['processing'],
  processing: ['quoted', 'pending'],
  quoted: ['closed', 'processing'],
  closed: ['pending'],
}

const nextStatuses = computed(() => {
  const current = inquiry.value?.status
  return statusFlow[current] || []
})

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
  inquiryStore.updateStatus(route.params.id, status)
}

function addNote() {
  if (!noteContent.value.trim()) return
  inquiryStore.addNote(route.params.id, noteContent.value.trim())
  noteContent.value = ''
}

function addReply() {
  if (!replyContent.value.trim()) return
  inquiryStore.addReply(route.params.id, replyContent.value.trim())
  replyContent.value = ''
}

function formatTime(ts) {
  return dayjs(ts).format('YYYY-MM-DD HH:mm')
}
</script>
