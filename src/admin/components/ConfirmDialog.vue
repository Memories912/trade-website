<template>
  <Teleport to="body">
    <div
      v-if="visible"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40" @click="$emit('cancel')" />
      <!-- Dialog -->
      <div class="relative bg-white rounded-xl shadow-card p-4 w-full max-w-md">
        <h3 class="text-lg font-semibold text-beike-heading mb-2">{{ title }}</h3>
        <p class="text-sm text-beike-body mb-6">{{ message }}</p>
        <div class="flex justify-end gap-3">
          <button
            class="px-4 py-2 rounded-lg border border-beike-border text-beike-body text-sm hover:bg-beike-bg transition-colors"
            @click="$emit('cancel')"
          >
            {{ cancelText }}
          </button>
          <button
            class="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition-colors"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, default: false },
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Are you sure?' },
  confirmText: { type: String, default: 'Delete' },
  cancelText: { type: String, default: 'Cancel' },
})

defineEmits(['confirm', 'cancel'])
</script>
