<template>
  <div class="flex flex-col items-center gap-2 pt-4">
    <p class="text-xs text-beike-light">
      {{ t('admin.common.showing') }} {{ startItem }}-{{ endItem }} {{ t('admin.common.of') }} {{ total }}
    </p>
    <div class="flex items-center gap-1">
      <button
        class="p-2 rounded-md text-beike-body hover:bg-beike-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        :disabled="page <= 1"
        @click="$emit('go-to', page - 1)"
      >
        <ChevronLeft class="w-4 h-4" />
      </button>
      <template v-for="p in visiblePages" :key="p">
        <button
          v-if="p !== '...'"
          class="w-8 h-8 rounded-md text-sm font-medium transition-colors"
          :class="p === page ? 'bg-beike-primary text-white' : 'text-beike-body hover:bg-beike-bg'"
          @click="$emit('go-to', p)"
        >
          {{ p }}
        </button>
        <span v-else class="w-8 h-8 flex items-center justify-center text-beike-light">…</span>
      </template>
      <button
        class="p-2 rounded-md text-beike-body hover:bg-beike-bg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        :disabled="page >= totalPages"
        @click="$emit('go-to', page + 1)"
      >
        <ChevronRight class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps({
  page: { type: Number, required: true },
  pageSize: { type: Number, default: 10 },
  total: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

defineEmits(['go-to'])

const { t } = useI18n()

const startItem = computed(() => (props.page - 1) * props.pageSize + 1)
const endItem = computed(() => Math.min(props.page * props.pageSize, props.total))

const visiblePages = computed(() => {
  const pages = []
  const tp = props.totalPages
  const cp = props.page

  if (tp <= 7) {
    for (let i = 1; i <= tp; i++) pages.push(i)
  } else {
    pages.push(1)
    if (cp > 3) pages.push('...')
    for (let i = Math.max(2, cp - 1); i <= Math.min(tp - 1, cp + 1); i++) {
      pages.push(i)
    }
    if (cp < tp - 2) pages.push('...')
    pages.push(tp)
  }
  return pages
})
</script>
