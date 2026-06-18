<template>
  <div class="flex flex-col min-h-full pl-0">
    <h1 class="text-xl font-bold text-beike-heading pt-3">{{ t('admin.inquiries.title') }}</h1>

    <!-- Search and filters -->
    <div class="flex flex-col sm:flex-row gap-2 pt-3">
      <div class="relative sm:flex-[2]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
        <input
          v-model="list.search.value"
          type="text"
          :placeholder="t('admin.inquiries.search_placeholder')"
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm placeholder:text-gray-400 focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        />
      </div>
      <select
        v-model="list.filters.value.status"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none transition-colors"
        :class="list.filters.value.status ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.inquiries.all_status') }}</option>
        <option value="pending">{{ t('admin.status.pending') }}</option>
        <option value="processing">{{ t('admin.status.processing') }}</option>
        <option value="quoted">{{ t('admin.status.quoted') }}</option>
        <option value="closed">{{ t('admin.status.closed') }}</option>
      </select>
    </div>

    <!-- Data table -->
    <div class="overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="list.pagedItems.value"
        :sort-by="list.sortBy.value"
        :sort-order="list.sortOrder.value"
        :empty-text="t('admin.common.no_data')"
        @sort="list.toggleSort"
      >
        <template #id="{ row }">
          <span class="font-mono text-xs text-beike-primary">{{ row.id }}</span>
        </template>
        <template #productName="{ row }">
          <p class="font-medium text-beike-heading">{{ row.productName }}</p>
        </template>
        <template #customer="{ row }">
          <div>
            <p class="text-beike-heading">{{ row.customer.name }}</p>
            <p class="text-xs text-beike-muted">{{ row.customer.company }}</p>
          </div>
        </template>
        <template #status="{ row }">
          <StatusBadge :status="row.status" />
        </template>
        <template #actions="{ row }">
          <router-link
            :to="'/admin/inquiries/' + row.id"
            class="px-3 py-1.5 rounded-md text-xs text-beike-primary hover:bg-beike-primary-light transition-colors"
          >
            {{ t('admin.common.view') }}
          </router-link>
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
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'
import { useAdminInquiryStore } from '@/stores/adminInquiry'
import { useCrudList } from '@/admin/composables/useCrudList'
import DataTable from '@/admin/components/DataTable.vue'
import Pagination from '@/admin/components/Pagination.vue'
import StatusBadge from '@/admin/components/StatusBadge.vue'

const { t } = useI18n()
const inquiryStore = useAdminInquiryStore()

const columns = computed(() => [
  { key: 'id', label: t('admin.inquiries.id'), class: 'w-28' },
  { key: 'productName', label: t('admin.inquiries.product'), sortable: true },
  { key: 'customer', label: t('admin.inquiries.customer') },
  { key: 'status', label: t('admin.inquiries.status'), sortable: true },
  { key: 'createdAt', label: t('admin.inquiries.date'), sortable: true },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-24' },
])

const list = useCrudList(
  () => inquiryStore.inquiries,
  {
    searchFields: ['productName', 'customer.name', 'customer.email', 'customer.company'],
    filterFn: (item, filters) => {
      if (filters.status && item.status !== filters.status) return false
      return true
    },
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
)

onMounted(() => {
  list.filters.value = { status: '' }
  inquiryStore.fetchInquiries()
  list.load()
})
</script>
