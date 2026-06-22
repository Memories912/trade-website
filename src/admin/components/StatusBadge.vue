<template>
  <span
    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
    :class="statusClasses"
  >
    <span class="w-1.5 h-1.5 rounded-full mr-1.5" :class="dotClass" />
    {{ label }}
  </span>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  status: { type: String, required: true },
  type: { type: String, default: 'inquiry' }, // 'inquiry' | 'sourcing' | 'user'
})

const { t } = useI18n()

const statusConfig = {
  // Inquiry / sourcing statuses
  pending: { bg: 'bg-amber-50 text-amber-700', dot: 'bg-amber-400', key: 'admin.status.pending' },
  processing: { bg: 'bg-blue-50 text-blue-700', dot: 'bg-blue-400', key: 'admin.status.processing' },
  quoted: { bg: 'bg-green-50 text-green-700', dot: 'bg-green-400', key: 'admin.status.quoted' },
  closed: { bg: 'bg-green-50 text-green-700', dot: 'bg-green-400', key: 'admin.status.closed' },
  cancelled: { bg: 'bg-red-50 text-red-600', dot: 'bg-red-400', key: 'admin.status.cancelled' },
  // User statuses
  active: { bg: 'bg-green-50 text-green-700', dot: 'bg-green-400', key: 'admin.status.active' },
  inactive: { bg: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400', key: 'admin.status.inactive' },
}

const config = computed(() => statusConfig[props.status] || statusConfig.pending)
const statusClasses = computed(() => config.value.bg)
const dotClass = computed(() => config.value.dot)
const label = computed(() => t(config.value.key))
</script>
