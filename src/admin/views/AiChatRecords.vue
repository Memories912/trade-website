<template>
  <div class="flex flex-col min-h-full pl-0">
    <h1 class="text-xl font-bold text-beike-heading pt-3">{{ t('admin.ai_chat.title') }}</h1>

    <div class="overflow-hidden" style="height: calc(100vh - 220px)">
      <div class="flex h-full">
        <!-- User list sidebar -->
        <div class="w-72 border-r border-beike-border flex flex-col shrink-0">
          <!-- Search -->
          <div class="p-3 border-b border-beike-border">
            <div class="relative">
              <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-beike-light" />
              <input
                v-model="userSearch"
                class="w-full pl-8 pr-3 py-2 rounded-lg border border-beike-border text-xs focus:border-beike-primary outline-none"
                :placeholder="t('admin.ai_chat.search_placeholder')"
              />
            </div>
          </div>
          <!-- User items -->
          <div class="flex-1 overflow-y-auto">
            <button
              v-for="record in filteredRecords"
              :key="record.userId"
              class="w-full text-left px-4 py-3 hover:bg-beike-primary-light transition-colors border-b border-beike-border"
              :class="selectedUserId === record.userId ? 'bg-beike-primary-light' : ''"
              @click="selectedUserId = record.userId"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-beike-primary/10 flex items-center justify-center shrink-0">
                  <span class="text-beike-primary text-xs font-medium">{{ record.userName.charAt(0) }}</span>
                </div>
                <div class="min-w-0">
                  <p class="text-sm font-medium text-beike-heading truncate">{{ record.userName }}</p>
                  <p class="text-xs text-beike-muted truncate">{{ lastMessage(record) }}</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Chat area -->
        <div class="flex-1 flex flex-col min-w-0">
          <div v-if="currentRecord" class="flex-1 overflow-y-auto p-6 space-y-4">
            <div
              v-for="msg in currentRecord.messages"
              :key="msg.id"
              class="flex gap-3"
              :class="msg.role === 'user' ? '' : 'flex-row-reverse'"
            >
              <div
                class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                :class="msg.role === 'user' ? 'bg-blue-50' : 'bg-beike-primary/10'"
              >
                <User v-if="msg.role === 'user'" class="w-4 h-4 text-blue-500" />
                <Bot v-else class="w-4 h-4 text-beike-primary" />
              </div>
              <div
                class="max-w-md rounded-xl px-4 py-3 text-sm"
                :class="msg.role === 'user' ? 'bg-beike-bg text-beike-body' : 'bg-beike-primary text-white'"
              >
                <p>{{ msg.content }}</p>
                <p
                  class="text-xs mt-1"
                  :class="msg.role === 'user' ? 'text-beike-light' : 'text-white/70'"
                >
                  {{ formatTime(msg.timestamp) }}
                </p>
              </div>
            </div>
          </div>
          <EmptyState v-else :title="t('admin.ai_chat.select_user')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search, User, Bot } from 'lucide-vue-next'
import dayjs from 'dayjs'
import { mockChatRecords } from '@/assets/mock/admin'
import EmptyState from '@/admin/components/EmptyState.vue'

const { t } = useI18n()

const userSearch = ref('')
const selectedUserId = ref(mockChatRecords[0]?.userId || '')

const filteredRecords = computed(() => {
  if (!userSearch.value) return mockChatRecords
  const q = userSearch.value.toLowerCase()
  return mockChatRecords.filter(r =>
    r.userName.toLowerCase().includes(q) ||
    r.messages.some(m => m.content.toLowerCase().includes(q))
  )
})

const currentRecord = computed(() =>
  mockChatRecords.find(r => r.userId === selectedUserId.value) || null
)

function lastMessage(record) {
  if (!record.messages.length) return ''
  const last = record.messages[record.messages.length - 1]
  return last.content.length > 40 ? last.content.slice(0, 40) + '...' : last.content
}

function formatTime(ts) {
  return dayjs(ts).format('MM-DD HH:mm')
}
</script>
