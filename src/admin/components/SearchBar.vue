<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
    <!-- Search input -->
    <div class="relative">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
      <input
        :value="modelValue"
        type="text"
        class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <!-- Filter slots：每个子元素占一列 -->
    <slot />
  </div>
</template>

<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Search...' },
})

defineEmits(['update:modelValue'])
</script>
