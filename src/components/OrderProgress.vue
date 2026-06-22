<template>
  <div>
    <!-- Progress Bar -->
    <div class="flex items-center gap-3 mb-3">
      <div class="flex-1 h-2 rounded-full bg-gray-100 overflow-hidden">
        <div class="h-full rounded-full transition-all duration-500" :style="{ width: percent + '%', background: barColor }"></div>
      </div>
      <span class="text-xs font-bold whitespace-nowrap" :style="{ color: barColor }">{{ statusLabel }} · {{ percent }}%</span>
    </div>

    <!-- Status blocks -->
    <div class="grid grid-cols-4 gap-1.5 mb-1">
      <div v-for="(s, idx) in steps" :key="s.key"
           class="text-center py-1.5 px-1 rounded-md text-[10px] font-medium transition-all"
           :class="stepClass(s.key, idx)">
        {{ s.label }}
        <span class="block text-xs mt-0.5">{{ idx < currentStepIdx ? '✓' : idx === currentStepIdx ? '●' : '○' }}</span>
      </div>
    </div>

    <!-- Timeline (expandable) -->
    <div v-if="!timelineCollapsed">
      <div class="mt-3 pt-3 border-t border-gray-100">
        <div class="relative pl-6">
          <div class="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gray-200"></div>
          <div v-for="(entry, i) in timeline" :key="i" class="relative pb-4 last:pb-0">
            <div class="absolute left-[-22px] top-[3px] w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center"
                 :style="{ background: entry.active ? entry.color : 'white', borderColor: entry.active ? entry.color : '#d1d5db' }">
              <span v-if="entry.active && i <= currentStepIdx" class="block w-1.5 h-1.5 rounded-full bg-white"></span>
            </div>
            <p class="text-xs font-medium" :style="{ color: entry.active ? entry.color : '#9ca3af' }">{{ entry.label }}</p>
            <p class="text-[11px] text-beike-muted mt-0.5">{{ entry.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  status: { type: String, default: 'pending' },
  messages: { type: Array, default: () => [] },
  createdAt: { type: String, default: '' },
  orderId: { type: String, default: '' },
  collapsed: { type: Boolean, default: true },
})

const timelineCollapsed = ref(props.collapsed)
defineExpose({ timelineCollapsed })

const steps = [
  { key: 'pending', label: '待处理', color: '#378ADD', desc: '已提交' },
  { key: 'processing', label: '处理中', color: '#EF9F27', desc: '客服跟进中' },
  { key: 'quoted', label: '已报价', color: '#639922', desc: '已提供报价' },
  { key: 'closed', label: '已完成', color: '#639922', desc: '订单已完成' },
]

const statusOrder = ['pending', 'processing', 'quoted', 'closed']

// For cancelled: show progress at the cancelled-at step (one before where they were)
const isCancelled = computed(() => props.status === 'cancelled')

const currentStepIdx = computed(() => {
  if (isCancelled.value) {
    // Show cancelled at the last completed step
    const idx = statusOrder.indexOf(props.status)
    return idx >= 0 ? idx : 0
  }
  const idx = statusOrder.indexOf(props.status)
  return idx >= 0 ? idx : 0
})

const cancelStepIdx = computed(() => {
  // For cancelled orders, find the step they were at before cancelling
  // If they cancelled from 'pending', they were at step 0
  const idx = statusOrder.indexOf(props.status)
  return idx >= 0 ? Math.max(0, idx - 1) : 0
})

const percent = computed(() => {
  if (isCancelled.value) {
    return [25, 50, 75, 100][cancelStepIdx.value] || 25
  }
  const idx = currentStepIdx.value
  return [25, 50, 75, 100][idx] || 25
})

const barColor = computed(() => {
  if (isCancelled.value) return '#E24B4A'
  return steps[currentStepIdx.value]?.color || '#378ADD'
})

const statusLabel = computed(() => {
  if (isCancelled.value) return '已取消'
  return steps[currentStepIdx.value]?.label || '待处理'
})

function stepClass(key, idx) {
  if (isCancelled.value) {
    // Completed steps
    if (idx < cancelStepIdx.value) return 'bg-blue-50 text-blue-700'
    // The cancelled step itself
    if (idx === cancelStepIdx.value) return 'bg-red-50 text-red-600 font-bold'
    // Future steps (gray out)
    return 'bg-gray-50 text-gray-400'
  }
  if (idx < currentStepIdx.value) return 'bg-blue-50 text-blue-700'
  if (idx === currentStepIdx.value) return 'bg-amber-50 text-amber-700 font-bold'
  return 'bg-gray-50 text-gray-400'
}

const timeline = computed(() => {
  const entries = []

  // Step 1: submitted
  const idSuffix = props.orderId ? ' (ID: ' + props.orderId + ')' : ''
  entries.push({
    label: '待处理',
    desc: props.createdAt ? formatTime(props.createdAt) + ' · 已提交' + idSuffix : '已提交',
    color: '#378ADD',
    active: true,
  })

  // Step 2: processing
  const processingMsg = props.messages.find(function(m) { return m.isAdmin })
  entries.push({
    label: '处理中',
    desc: processingMsg ? formatTime(processingMsg.timestamp) + ' · ' + processingMsg.content.slice(0, 30) + '…' : (isCancelled.value ? '客服未跟进，用户已取消' : '等待客服查看'),
    color: '#EF9F27',
    active: !isCancelled.value || cancelStepIdx.value >= 1,
  })

  // Step 3: quoted
  const quotedMsg = props.messages.filter(function(m) { return m.isAdmin && m.content.includes('报价') })
  entries.push({
    label: '已报价',
    desc: quotedMsg.length ? formatTime(quotedMsg[0].timestamp) + ' · 已提供报价' : (isCancelled.value ? '—' : '等待客服报价'),
    color: '#639922',
    active: !isCancelled.value && currentStepIdx.value >= 2,
  })

  // Step 4: terminal
  if (isCancelled.value) {
    const cancelMsg = [...props.messages].reverse().find(function(m) { return m.content.includes('取消') })
    entries.push({
      label: '已取消',
      desc: cancelMsg ? formatTime(cancelMsg.timestamp) + ' · 用户主动取消' : '用户已取消',
      color: '#E24B4A',
      active: true,
    })
  } else if (props.status === 'closed') {
    const lastMsg = props.messages[props.messages.length - 1]
    entries.push({
      label: '已完成',
      desc: lastMsg ? formatTime(lastMsg.timestamp) + ' · 订单已完成' : '订单已完成',
      color: '#639922',
      active: true,
    })
  } else {
    entries.push({
      label: '已完成',
      desc: '订单完成后将显示在此',
      color: '#888780',
      active: false,
    })
  }

  return entries
})

function formatTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return month + '/' + day + ' ' + hour + ':' + min
}
</script>