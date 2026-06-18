<template>
  <div>
    <!-- Floating button (bottom-right, above FloatingContact) -->
    <button
      @click="aiChat.toggle()"
      class="fixed bottom-6 right-6 z-30 float-btn w-14 h-14 bg-beike-heading text-white shadow-xl"
      title="AI Assistant"
    >
      <svg v-if="!aiChat.open" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <svg v-else class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Chat panel -->
    <Transition name="slide-up">
      <div v-if="aiChat.open" class="fixed bottom-20 right-6 z-30 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl border border-gray-200 shadow-2xl overflow-hidden">
        <!-- Header -->
        <div class="bg-beike-heading px-5 py-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm">🤖</div>
            <div>
              <h3 class="text-sm font-bold text-white">{{ $t('ai_chat.title') }}</h3>
              <p class="text-[10px] text-white/60">{{ $t('ai_chat.online_status') }}</p>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div class="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50" ref="chatBox">
          <div v-for="(msg, idx) in messages" :key="idx" class="flex" :class="msg.role === 'user' ? 'justify-end' : 'justify-start'">
            <div v-if="msg.role === 'bot'" class="w-6 h-6 rounded-full bg-beike-primary-light flex items-center justify-center mr-2 shrink-0 mt-1 text-xs">🤖</div>
            <div
              class="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
              :class="msg.role === 'user'
                ? 'bg-beike-primary text-white rounded-tr-md'
                : 'bg-white border border-gray-200 text-beike-body rounded-tl-md'"
            >
              {{ msg.content || t(msg.contentKey) }}
            </div>
          </div>
          <div v-if="loading" class="flex items-start">
            <div class="w-6 h-6 rounded-full bg-beike-primary-light flex items-center justify-center mr-2 shrink-0 text-xs">🤖</div>
            <div class="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-4 py-2.5">
              <div class="flex gap-1">
                <div class="w-2 h-2 rounded-full bg-beike-muted animate-bounce" style="animation-delay: 0ms"></div>
                <div class="w-2 h-2 rounded-full bg-beike-muted animate-bounce" style="animation-delay: 150ms"></div>
                <div class="w-2 h-2 rounded-full bg-beike-muted animate-bounce" style="animation-delay: 300ms"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick questions -->
        <div v-if="messages.length <= 1" class="px-4 pb-2 flex flex-wrap gap-1.5">
          <button v-for="(q, idx) in quickQuestions" :key="idx"
                  @click="sendQuickQuestion(q)"
                  class="text-xs px-2.5 py-1.5 rounded-full border border-gray-200 text-beike-muted hover:border-beike-primary hover:text-beike-primary hover:bg-beike-primary-light transition-all">
            {{ t(q) }}
          </button>
        </div>

        <!-- Input -->
        <div class="p-4 border-t border-gray-100">
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input v-model="input" class="input-custom flex-1 text-sm py-2" placeholder="Ask about products..." />
            <button type="submit" :disabled="!input.trim() || loading"
                    class="btn-primary-custom px-3 py-2 disabled:opacity-40">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAiChatStore } from '@/stores/aiChat'
const { t } = useI18n()
const aiChat = useAiChatStore()


const input = ref('')
const loading = ref(false)
const chatBox = ref(null)

const messages = ref([
  { role: 'bot', contentKey: 'ai_chat.greeting' },
])

const quickQuestions = ['ai_chat.q_moq', 'ai_chat.q_cert', 'ai_chat.q_payment', 'ai_chat.q_shipping']

function sendQuickQuestion(q) {
  input.value = t(q)
  sendMessage()
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text || loading.value) return

  messages.value.push({ role: 'user', content: text })
  input.value = ''
  loading.value = true
  scrollToBottom()

  // Simulate AI response
  await new Promise(r => setTimeout(r, 1000 + Math.random() * 1500))

  const responses = [
    'Our standard MOQ starts at 100-500 units depending on the product category. For large industrial equipment, MOQ can be as low as 1-5 units.',
    'All our products are CE, RoHS, and ISO 9001 certified. Many also have UL, FCC, or CSA certifications for specific target markets.',
    'We accept T/T (30% deposit, 70% before shipment), L/C at sight, and for established partners, D/P terms.',
    'We ship worldwide via sea (FCL/LCL), air freight, and express (DHL/FedEx/UPS). Sea freight is most economical for bulk orders.',
    'Sample lead time: 3-5 days for stock samples, 10-15 days for custom samples. Sample cost is refundable for bulk orders.',
    'Standard warranty is 12 months from shipment date for manufacturing defects. Extended warranties available for select products.',
    'Yes! We offer comprehensive OEM/ODM services. Our R&D team can work with your specifications. Minimum 500-1000 units for custom orders.',
    'Our typical production lead time is 15-30 days for standard orders, 30-45 days for OEM orders.',
  ]

  const idx = Math.floor(Math.random() * responses.length)
  messages.value.push({ role: 'bot', content: responses[idx] })
  loading.value = false
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
  })
}
</script>

<style scoped>
.slide-up-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.slide-up-leave-active { transition: all 0.2s ease-in; }
.slide-up-enter-from { opacity: 0; transform: translateY(20px) scale(0.95); }
.slide-up-leave-to { opacity: 0; transform: translateY(20px); }
</style>
