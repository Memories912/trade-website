<template>
  <div class="bg-white rounded-xl shadow-card p-4">
    <div class="flex items-center gap-4">
      <!-- Icon -->
      <div
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        :class="iconBgClass"
      >
        <component :is="icon" class="w-6 h-6" :class="iconClass" />
      </div>
      <!-- Content -->
      <div class="min-w-0">
        <p class="text-sm text-beike-muted">{{ title }}</p>
        <p class="text-2xl font-bold text-beike-heading mt-0.5">{{ displayValue }}</p>
      </div>
      <!-- Trend indicator -->
      <div v-if="trend !== null && trend !== undefined" class="ml-auto shrink-0">
        <span
          class="inline-flex items-center gap-1 text-sm font-medium"
          :class="trend >= 0 ? 'text-green-600' : 'text-red-500'"
        >
          <TrendingUp v-if="trend >= 0" class="w-4 h-4" />
          <TrendingDown v-else class="w-4 h-4" />
          {{ Math.abs(trend) }}%
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { TrendingUp, TrendingDown } from 'lucide-vue-next'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [Number, String], required: true },
  icon: { type: Object, required: true },
  iconBgClass: { type: String, default: 'bg-beike-primary-light' },
  iconClass: { type: String, default: 'text-beike-primary' },
  trend: { type: Number, default: null },
})

const displayValue = typeof props.value === 'number'
  ? props.value.toLocaleString()
  : props.value
</script>
