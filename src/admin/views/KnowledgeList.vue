<template>
  <div class="flex flex-col min-h-full pl-0">
    <div class="flex items-center justify-between pt-3">
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.knowledge.title') }}</h1>
      <router-link
        to="/admin/knowledge/new"
        class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
      >
        + {{ t('admin.knowledge.new_faq') }}
      </router-link>
    </div>

    <div class="flex flex-col sm:flex-row gap-2 pt-3">
      <div class="relative sm:flex-[2]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
        <input
          v-model="list.search.value"
          type="text"
          :placeholder="t('admin.knowledge.search_placeholder')"
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm placeholder:text-gray-400 focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        />
      </div>
      <select
        v-model="list.filters.value.tag"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none appearance-none transition-colors"
        :class="list.filters.value.tag ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.knowledge.all_tags') }}</option>
        <option v-for="tag in allTags" :key="tag" :value="tag">{{ tag }}</option>
      </select>
    </div>

    <div class="overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="list.pagedItems.value"
        :empty-text="t('admin.common.no_data')"
      >
        <template #q_cn="{ row }">
          <p class="font-medium text-beike-heading">{{ row.q_cn }}</p>
          <p class="text-xs text-beike-muted">{{ row.q_en }}</p>
        </template>
        <template #tags="{ row }">
          <div class="flex flex-wrap gap-1">
            <span
              v-for="tag in (row.tags || [])"
              :key="tag"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-beike-primary-light text-beike-primary"
            >
              {{ tag }}
            </span>
          </div>
        </template>
        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <router-link
              :to="'/admin/knowledge/' + row.id + '/edit'"
              class="px-3 py-1.5 rounded-md text-xs text-beike-primary hover:bg-beike-primary-light transition-colors"
            >
              {{ t('admin.common.edit') }}
            </router-link>
            <button
              class="px-3 py-1.5 rounded-md text-xs text-red-500 hover:bg-red-50 transition-colors"
              @click="confirmDelete(row)"
            >
              {{ t('admin.common.delete') }}
            </button>
          </div>
        </template>
      </DataTable>
      <div class="px-4 pb-4">
        <Pagination
          :page="list.page.value"
          :page-size="list.pageSize.value"
          :total="list.total.value"
          :total-pages="list.totalPages.value"
          @go-to="list.goToPage"
        />
      </div>
    </div>

    <ConfirmDialog
      :visible="showDelete"
      :title="t('admin.knowledge.delete_title')"
      :message="t('admin.knowledge.delete_message')"
      :confirm-text="t('admin.common.delete')"
      :cancel-text="t('admin.common.cancel')"
      @confirm="doDelete"
      @cancel="showDelete = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'
import { useAdminSettingsStore } from '@/stores/adminSettings'
import { useCrudList } from '@/admin/composables/useCrudList'
import DataTable from '@/admin/components/DataTable.vue'
import Pagination from '@/admin/components/Pagination.vue'
import ConfirmDialog from '@/admin/components/ConfirmDialog.vue'

const { t } = useI18n()
const settingsStore = useAdminSettingsStore()

const showDelete = ref(false)
const deleteTarget = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  settingsStore.faqItems.forEach(f => (f.tags || []).forEach(tg => tags.add(tg)))
  return [...tags].sort()
})

const columns = computed(() => [
  { key: 'q_cn', label: t('admin.knowledge.question') },
  { key: 'tags', label: t('admin.knowledge.tags') },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-36' },
])

const list = useCrudList(
  () => settingsStore.faqItems,
  {
    searchFields: ['q_cn', 'q_en', 'q_ko', 'q_ja', 'a_cn', 'a_en'],
    filterFn: (item, filters) => {
      if (filters.tag && !(item.tags || []).includes(filters.tag)) return false
      return true
    },
  }
)

onMounted(() => {
  list.filters.value = { tag: '' }
  list.load()
})

function confirmDelete(item) {
  deleteTarget.value = item
  showDelete.value = true
}

function doDelete() {
  if (deleteTarget.value) {
    settingsStore.deleteFaqItem(deleteTarget.value.id)
    list.load()
  }
  showDelete.value = false
  deleteTarget.value = null
}
</script>
