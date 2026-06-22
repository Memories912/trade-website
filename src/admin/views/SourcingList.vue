<template>
  <div class="flex flex-col min-h-full pl-0">
    <h1 class="text-xl font-bold text-beike-heading pt-3 inline-flex items-center gap-2">
      {{ t('admin.sourcing.title') }}
      <span v-if="sourcingStore.totalUnread > 0" class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-red-500">
        <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        {{ sourcingStore.totalUnread }} 条未读
      </span>
    </h1>

    <div class="flex flex-col sm:flex-row gap-2 pt-3">
      <div class="relative sm:flex-[2]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
        <input
          v-model="list.search.value"
          type="text"
          :placeholder="t('admin.sourcing.search_placeholder')"
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm placeholder:text-gray-400 focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        />
      </div>
      <select
        v-model="list.filters.value.status"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none appearance-none transition-colors"
        :class="list.filters.value.status ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.sourcing.all_status') }}</option>
        <option value="pending">{{ t('admin.status.pending') }}</option>
        <option value="processing">{{ t('admin.status.processing') }}</option>
        <option value="quoted">{{ t('admin.status.quoted') }}</option>
        <option value="closed">{{ t('admin.status.closed') }}</option>
      </select>
    </div>

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
        <template #title="{ row }">
          <p class="font-medium text-beike-heading">{{ row.title }}</p>
        </template>
        <template #customer="{ row }">
          <div>
            <p class="text-beike-heading">{{ row.customer.name }}</p>
            <p class="text-xs text-beike-muted">{{ row.customer.country }}</p>
          </div>
        </template>
        <template #status="{ row }">
          <div class="flex items-center gap-2">
            <StatusBadge :status="row.status" />
            <span v-if="row.unreadMessages > 0"
                  @click.stop="sourcingStore.markAsRead(row.id)"
                  class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold text-white bg-orange-400 cursor-pointer hover:bg-orange-500 transition-colors"
                  title="点击标记已读">
              <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              {{ row.unreadMessages }}
            </span>
          </div>
        </template>
        <template #actions="{ row }">
          <router-link
            :to="'/admin/sourcing/' + row.id"
            @click="handleView(row)"
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
import { useAdminSourcingStore } from '@/stores/adminSourcing'
import { useCrudList } from '@/admin/composables/useCrudList'
import DataTable from '@/admin/components/DataTable.vue'
import Pagination from '@/admin/components/Pagination.vue'
import StatusBadge from '@/admin/components/StatusBadge.vue'

const { t } = useI18n()
const sourcingStore = useAdminSourcingStore()

const columns = computed(() => [
  { key: 'id', label: t('admin.sourcing.id'), class: 'w-24' },
  { key: 'title', label: t('admin.sourcing.title_col'), sortable: true },
  { key: 'customer', label: t('admin.sourcing.customer') },
  { key: 'status', label: t('admin.sourcing.status'), sortable: true },
  { key: 'createdAt', label: t('admin.sourcing.date'), sortable: true },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-24' },
])

const list = useCrudList(
  () => sourcingStore.requests,
  {
    searchFields: ['title', 'customer.name', 'customer.email', 'customer.company'],
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
  sourcingStore.fetchRequests()
  list.load()
})

function handleView(row) {
  sourcingStore.markAsRead(row.id)
  if (row.status === 'pending') {
    sourcingStore.updateStatus(row.id, 'processing')
  }
}
</script>