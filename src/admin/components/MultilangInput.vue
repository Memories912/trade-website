<template>
  <div>
    <!-- Language tabs -->
    <div class="flex border-b border-beike-border mb-4">
      <button
        v-for="loc in locales"
        :key="loc"
        class="px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px"
        :class="activeLocale === loc
          ? 'border-beike-primary text-beike-primary'
          : 'border-transparent text-beike-muted hover:text-beike-body'"
        @click="activeLocale = loc"
      >
        {{ localeNames[loc] || loc }}
      </button>
    </div>
    <!-- Input area for active locale -->
    <div v-for="loc in locales" :key="loc" v-show="activeLocale === loc">
      <textarea
        v-if="multiline"
        :value="modelValue[loc] || ''"
        rows="4"
        class="w-full px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors resize-y"
        :placeholder="placeholder"
        @input="updateValue(loc, $event.target.value)"
      />
      <input
        v-else
        :value="modelValue[loc] || ''"
        type="text"
        class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        :placeholder="placeholder"
        @input="updateValue(loc, $event.target.value)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: { type: Object, default: () => ({}) },
  locales: { type: Array, default: () => ['zh', 'en', 'ko', 'ja'] },
  multiline: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
})

const emit = defineEmits(['update:modelValue'])

const activeLocale = ref(props.locales[0] || 'zh')

const localeNames = {
  zh: '中文',
  en: 'English',
  ko: '한국어',
  ja: '日本語',
}

function updateValue(locale, value) {
  emit('update:modelValue', { ...props.modelValue, [locale]: value })
}
</script>
