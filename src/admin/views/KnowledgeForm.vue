<template>
  <div class="space-y-3">
    <div class="flex items-center gap-2">
      <button class="p-1.5 rounded-md hover:bg-beike-bg" @click="router.push('/admin/knowledge')">
        <ArrowLeft class="w-5 h-5 text-beike-body" />
      </button>
      <h1 class="text-xl font-bold text-beike-heading">
        {{ isEdit ? t('admin.knowledge.edit_faq') : t('admin.knowledge.new_faq') }}
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div class="lg:col-span-2 space-y-3">
        <!-- Question (multilang) -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.knowledge.question') }}</h3>
          <MultilangInput v-model="form.q" :locales="locales" :placeholder="t('admin.knowledge.question_placeholder')" />
        </div>

        <!-- Answer (multilang) -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.knowledge.answer') }}</h3>
          <MultilangInput v-model="form.a" :locales="locales" multiline :placeholder="t('admin.knowledge.answer_placeholder')" />
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-3">
        <!-- Tags -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.knowledge.tags') }}</h3>
          <div class="space-y-2">
            <div v-for="(tag, idx) in form.tags" :key="idx" class="flex gap-2">
              <input
                v-model="form.tags[idx]"
                class="flex-1 px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
                :placeholder="t('admin.knowledge.tag_placeholder')"
              />
              <button class="p-2 text-red-400 hover:text-red-600" @click="form.tags.splice(idx, 1)">
                <X class="w-4 h-4" />
              </button>
            </div>
            <button
              class="text-sm text-beike-primary hover:underline"
              @click="form.tags.push('')"
            >
              + {{ t('admin.knowledge.add_tag') }}
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            class="flex-1 py-2.5 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
            @click="saveFaq"
          >
            {{ t('admin.common.save') }}
          </button>
          <button
            class="flex-1 py-2.5 rounded-lg border border-beike-border text-beike-body text-sm hover:bg-beike-bg transition-colors"
            @click="router.push('/admin/knowledge')"
          >
            {{ t('admin.common.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, X } from 'lucide-vue-next'
import { useAdminSettingsStore } from '@/stores/adminSettings'
import MultilangInput from '@/admin/components/MultilangInput.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const settingsStore = useAdminSettingsStore()

const locales = ['zh', 'en', 'ko', 'ja']
const isEdit = computed(() => !!route.params.id)

const form = reactive({
  q: { zh: '', en: '', ko: '', ja: '' },
  a: { zh: '', en: '', ko: '', ja: '' },
  tags: [''],
})

onMounted(() => {
  if (isEdit.value) {
    const faq = settingsStore.getFaqItem(route.params.id)
    if (faq) {
      form.q = { zh: faq.q_cn || '', en: faq.q_en || '', ko: faq.q_ko || '', ja: faq.q_ja || '' }
      form.a = { zh: faq.a_cn || '', en: faq.a_en || '', ko: faq.a_ko || '', ja: faq.a_ja || '' }
      form.tags = [...(faq.tags || [''])]
    }
  }
})

function saveFaq() {
  const data = {
    q_cn: form.q.zh, q_en: form.q.en, q_ko: form.q.ko, q_ja: form.q.ja,
    a_cn: form.a.zh, a_en: form.a.en, a_ko: form.a.ko, a_ja: form.a.ja,
    tags: form.tags.filter(t => t.trim()),
  }
  if (isEdit.value) {
    settingsStore.updateFaqItem(route.params.id, data)
  } else {
    settingsStore.addFaqItem(data)
  }
  router.push('/admin/knowledge')
}
</script>
