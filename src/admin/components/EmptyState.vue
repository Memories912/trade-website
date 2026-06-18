<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <component :is="icon" v-if="icon" class="w-12 h-12 text-beike-light mb-4" />
    <div v-else class="w-16 h-16 rounded-full bg-beike-bg flex items-center justify-center mb-4">
      <Inbox class="w-8 h-8 text-beike-light" />
    </div>
    <h3 class="text-lg font-medium text-beike-heading mb-1">{{ title }}</h3>
    <p class="text-sm text-beike-muted max-w-sm">{{ description }}</p>
    <slot />
  </div>
</template>

<script setup>
import { Inbox } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: 'No data' },
  description: { type: String, default: '' },
  icon: { type: [Object, null], default: null },
})
</script>
