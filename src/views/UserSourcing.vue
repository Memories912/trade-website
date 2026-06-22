<template>
  <div>
    <h2 class="text-xl font-bold text-beike-heading mb-6">我的定制</h2>

    <div v-if="sourcingStore.requests.length === 0" class="text-center py-16">
      <div class="text-5xl mb-4">🔍</div>
      <p class="text-beike-muted text-sm mb-4">{{ $t('user.no_sourcing') }}</p>
      <router-link to="/sourcing" class="btn-primary-custom inline-flex items-center gap-2 px-6 py-3">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
        {{ $t('sourcing.submit') }}
      </router-link>
    </div>

    <div v-else class="space-y-4">
      <div v-for="req in sourcingStore.requests" :key="req.id"
           class="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">

        <!-- Header -->
        <div class="p-5 pb-0">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[10px] font-mono bg-gray-100 text-beike-muted px-2 py-0.5 rounded">{{ req.id }}</span>
                <h3 class="text-sm font-bold text-beike-heading">{{ req.productName }}</h3>
              </div>
              <p class="text-xs text-beike-muted mb-3">{{ $t('user.inquiry_time') }}: {{ formatDate(req.createdAt) }}</p>

              <!-- Progress -->
              <OrderProgress :status="req.status" :messages="req.messages" :created-at="req.createdAt" :order-id="req.id" :collapsed="true" />
            </div>
            <button v-if="req.status === 'pending'"
                    @click="confirmCancel(req)"
                    class="shrink-0 px-3 py-1.5 text-xs font-medium text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              取消需求
            </button>
          </div>
        </div>

        <!-- Details collapsible -->
        <div class="px-5 mt-2">
          <button @click="toggleExpand(req.id)"
                  class="flex items-center gap-1 text-xs text-beike-primary hover:text-beike-primary-dark transition-colors">
            <svg class="w-3 h-3 transition-transform" :class="expanded[req.id] ? 'rotate-90' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
            {{ expanded[req.id] ? '收起详情' : '查看详情' }}
          </button>
          <div v-if="expanded[req.id]" class="mt-3 pb-3 space-y-4">
            <!-- Contact info grid -->
            <div class="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
              <div><span class="text-beike-muted">联系人：</span><span class="text-beike-body">{{ req.contactName }}</span></div>
              <div><span class="text-beike-muted">邮箱：</span><span class="text-beike-body">{{ req.contactEmail }}</span></div>
              <div v-if="req.contactPhone"><span class="text-beike-muted">电话：</span><span class="text-beike-body">{{ req.contactPhone }}</span></div>
              <div v-if="req.contactCompany"><span class="text-beike-muted">公司：</span><span class="text-beike-body">{{ req.contactCompany }}</span></div>
              <div v-if="req.quantity"><span class="text-beike-muted">数量：</span><span class="text-beike-body">{{ req.quantity }}</span></div>
              <div v-if="req.targetPriceMin || req.targetPriceMax">
                <span class="text-beike-muted">预算：</span>
                <span class="text-beike-body">{{ req.targetCurrency || 'USD' }} {{ req.targetPriceMin || '—' }} ~ {{ req.targetPriceMax || '—' }}</span>
              </div>
              <div v-if="req.productDesc" class="col-span-2">
                <span class="text-beike-muted">产品描述：</span>
                <p class="text-beike-body mt-0.5">{{ req.productDesc }}</p>
              </div>
              <div v-if="req.specs" class="col-span-2">
                <span class="text-beike-muted">规格要求：</span>
                <pre class="text-beike-body mt-0.5 font-sans whitespace-pre-wrap">{{ req.specs }}</pre>
              </div>
              <div v-if="req.photos && req.photos.length" class="col-span-2 mt-1">
                <span class="text-beike-muted">参考图片：</span>
                <div class="flex flex-wrap gap-2 mt-1.5">
                  <img v-for="(photo, idx) in req.photos" :key="idx" :src="photo.url"
                       class="w-16 h-16 object-cover rounded-lg border border-gray-200" loading="lazy" />
                </div>
              </div>
            </div>

            <!-- Timeline -->
            <div class="border-t border-gray-100 pt-3">
              <p class="text-xs font-medium text-beike-heading mb-2">处理进度</p>
              <OrderProgress :status="req.status" :messages="req.messages" :created-at="req.createdAt" :order-id="req.id" :collapsed="false" />
            </div>

            <!-- Messages -->
            <div class="border-t border-gray-100 pt-3">
              <p class="text-xs font-medium text-beike-heading mb-2">留言记录</p>
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                <div v-for="msg in req.messages" :key="msg.id"
                     class="flex" :class="msg.isAdmin ? 'justify-start' : 'justify-end'">
                  <div class="max-w-[85%] rounded-lg px-3 py-2 text-xs"
                       :class="msg.isAdmin ? 'bg-gray-50 text-beike-body' : 'bg-beike-primary-light text-beike-primary'">
                    <p>{{ msg.content }}</p>
                    <p class="text-[10px] mt-0.5 opacity-60">{{ formatTime(msg.timestamp) }}</p>
                  </div>
                </div>
              </div>
              <div class="flex gap-2 mt-3">
                <input v-model="msgInput[req.id]" type="text" placeholder="输入留言..."
                       class="flex-1 px-3 py-2 text-xs border border-gray-200 rounded-lg focus:border-beike-primary outline-none"
                       @keyup.enter="sendMessage(req.id)" />
                <button @click="sendMessage(req.id)"
                        class="shrink-0 px-3 py-2 text-xs font-medium text-white bg-beike-primary rounded-lg hover:bg-beike-primary-dark transition-colors"
                        :disabled="!msgInput[req.id]?.trim()">发送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cancel dialog -->
    <div v-if="showCancel" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/40" @click="showCancel = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl max-w-sm mx-4 p-6">
        <h3 class="text-sm font-bold text-beike-heading mb-2">确认取消</h3>
        <p class="text-xs text-beike-muted mb-4">确定要取消这条定制需求吗？取消后状态将变为"已关闭"。</p>
        <div class="flex justify-end gap-2">
          <button @click="showCancel = false" class="px-4 py-2 text-xs font-medium text-beike-muted bg-gray-50 rounded-lg hover:bg-gray-100">再想想</button>
          <button @click="doCancel" class="px-4 py-2 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600">确认取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSourcingStore } from '@/stores/sourcing'
import OrderProgress from '@/components/OrderProgress.vue'

const sourcingStore = useSourcingStore()
const expanded = reactive({})
const msgInput = reactive({})
const showCancel = ref(false)
const cancelTarget = ref(null)

function toggleExpand(id) { expanded[id] = !expanded[id] }

function sendMessage(id) {
  const text = msgInput[id]?.trim()
  if (!text) return
  sourcingStore.addMessage(id, text)
  msgInput[id] = ''
}

function confirmCancel(req) { cancelTarget.value = req; showCancel.value = true }

function doCancel() {
  if (cancelTarget.value) { sourcingStore.cancelOrder(cancelTarget.value.id) }
  showCancel.value = false; cancelTarget.value = null
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function formatTime(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>