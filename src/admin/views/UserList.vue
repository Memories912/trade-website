<template>
  <div class="flex flex-col min-h-full pl-0">
    <!-- Page header -->
    <div class="flex items-center justify-between pt-3">
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.users.title') }}</h1>
    </div>

    <!-- Search and filters — 搜索宽、筛选窄 -->
    <div class="flex flex-col sm:flex-row gap-2 pt-3">
      <div class="relative sm:flex-[2]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
        <input
          v-model="list.search.value"
          type="text"
          :placeholder="t('admin.users.search_placeholder')"
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm placeholder:text-gray-400 focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        />
      </div>
      <select
        v-model="list.filters.value.country"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none appearance-none transition-colors"
        :class="list.filters.value.country ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.users.all_countries') }}</option>
        <option v-for="c in countries" :key="c" :value="c">{{ c }}</option>
      </select>
      <select
        v-model="list.filters.value.status"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none appearance-none transition-colors"
        :class="list.filters.value.status ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.users.all_status') }}</option>
        <option value="active">{{ t('admin.status.active') }}</option>
        <option value="inactive">{{ t('admin.status.inactive') }}</option>
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
        <template #name="{ row }">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-beike-primary/10 flex items-center justify-center shrink-0">
              <span class="text-beike-primary text-xs font-medium">{{ row.name.charAt(0) }}</span>
            </div>
            <div>
              <p class="font-medium text-beike-heading">{{ row.name }}</p>
              <p class="text-xs text-beike-muted">{{ row.email }}</p>
            </div>
          </div>
        </template>
        <template #status="{ row }">
          <StatusBadge :status="row.status" type="user" />
        </template>
        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <router-link
              :to="'/admin/users/' + row.id"
              class="px-3 py-1.5 rounded-md text-xs text-beike-primary hover:bg-beike-primary-light transition-colors"
            >
              {{ t('admin.common.view') }}
            </router-link>
            <button
              class="px-3 py-1.5 rounded-md text-xs transition-colors"
              :class="row.status === 'active' ? 'text-red-500 hover:bg-red-50' : 'text-green-600 hover:bg-green-50'"
              @click="toggleUserStatus(row)"
            >
              {{ row.status === 'active' ? t('admin.users.disable') : t('admin.users.enable') }}
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
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'
import { mockUsers } from '@/assets/mock/admin'
import { useCrudList } from '@/admin/composables/useCrudList'
import DataTable from '@/admin/components/DataTable.vue'
import Pagination from '@/admin/components/Pagination.vue'
import StatusBadge from '@/admin/components/StatusBadge.vue'

const { t } = useI18n()

// Local reactive copy of users
const users = ref(JSON.parse(JSON.stringify(mockUsers)))

const countries = computed(() => [...new Set(users.value.map(u => u.country))].sort())

function toggleUserStatus(user) {
  user.status = user.status === 'active' ? 'inactive' : 'active'
}

const columns = computed(() => [
  { key: 'name', label: t('admin.users.name') },
  { key: 'company', label: t('admin.users.company') },
  { key: 'country', label: t('admin.users.country'), sortable: true },
  { key: 'status', label: t('admin.users.status') },
  { key: 'createdAt', label: t('admin.users.registered'), sortable: true },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-40' },
])

const list = useCrudList(
  () => users.value,
  {
    searchFields: ['name', 'email', 'company'],
    filterFn: (item, filters) => {
      if (filters.country && item.country !== filters.country) return false
      if (filters.status && item.status !== filters.status) return false
      return true
    },
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
)

onMounted(() => {
  list.filters.value = { country: '', status: '' }
  list.load()
})
</script>
