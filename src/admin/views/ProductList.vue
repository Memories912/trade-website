<template>
  <div class="flex flex-col min-h-full pl-0 pt-0.5">
    <!-- Page header -->
    <div class="flex items-center justify-between pt-3">
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.products.title') }}</h1>
      <router-link
        to="/admin/products/new"
        class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
      >
        + {{ t('admin.products.new_product') }}
      </router-link>
    </div>

    <!-- Search and filters -->
    <div class="flex flex-col sm:flex-row gap-2 pt-3">
      <div class="relative sm:flex-[2]">
        <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" />
        <input
          v-model="list.search.value"
          type="text"
          :placeholder="t('admin.products.search_placeholder')"
          class="w-full pl-9 pr-3 py-2 rounded-lg border border-beike-border bg-white text-sm placeholder:text-gray-400 focus:border-beike-primary focus:ring-1 focus:ring-beike-primary outline-none transition-colors"
        />
      </div>
      <select
        v-model="list.filters.value.category"
        class="sm:flex-1 w-full px-3 py-2 rounded-lg border border-beike-border text-sm bg-white focus:border-beike-primary outline-none appearance-none transition-colors"
        :class="list.filters.value.category ? 'text-beike-body' : 'text-gray-400'"
      >
        <option value="">{{ t('admin.products.all_categories') }}</option>
        <option v-for="cat in productStore.categories.filter(c => c.id !== 'all')" :key="cat.id" :value="cat.id">
          {{ cat.name_cn }}
        </option>
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
        <template #image="{ row }">
          <img :src="row.image" :alt="row.name_en" class="w-10 h-10 rounded-lg object-cover" />
        </template>
        <template #name_en="{ row }">
          <span class="font-medium text-beike-heading">{{ row.name_cn }}</span>
        </template>
        <template #category="{ row }">
          <span class="text-sm text-beike-body">{{ getCategoryCn(row.category) }}</span>
        </template>
        <template #moq="{ row }">
          <span class="text-sm text-beike-body">{{ row.moq }}</span>
        </template>
        <template #status="{ row }">
          <StatusBadge :status="row.status" />
        </template>
        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <router-link
              :to="'/admin/products/' + row.id + '/edit'"
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

    <!-- Confirm dialog -->
    <ConfirmDialog
      :visible="showDeleteConfirm"
      :title="t('admin.products.delete_title')"
      :message="t('admin.products.delete_message')"
      :confirm-text="t('admin.common.delete')"
      :cancel-text="t('admin.common.cancel')"
      @confirm="doDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'
import { useAdminProductStore } from '@/stores/adminProduct'
import { useCrudList } from '@/admin/composables/useCrudList'
import DataTable from '@/admin/components/DataTable.vue'
import Pagination from '@/admin/components/Pagination.vue'
import StatusBadge from '@/admin/components/StatusBadge.vue'
import ConfirmDialog from '@/admin/components/ConfirmDialog.vue'

const { t } = useI18n()
const productStore = useAdminProductStore()

const showDeleteConfirm = ref(false)
const deleteTarget = ref(null)

const columns = computed(() => [
  { key: 'image', label: t('admin.products.image'), class: 'w-16' },
  { key: 'name_en', label: t('admin.products.product_name'), sortable: true },
  { key: 'category', label: t('admin.products.category'), sortable: true },
  { key: 'moq', label: t('admin.products.moq') },
  { key: 'status', label: t('admin.products.status') },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-36' },
])

const list = useCrudList(
  () => productStore.products,
  {
    searchFields: ['name_en', 'name_cn', 'category'],
    filterFn: (item, filters) => {
      if (filters.category && item.category !== filters.category) return false
      return true
    },
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
)

onMounted(() => {
  list.filters.value = { category: '' }
  productStore.fetchProducts()
  list.load()
})

function confirmDelete(product) {
  deleteTarget.value = product
  showDeleteConfirm.value = true
}

function getCategoryCn(catId) {
  const cat = productStore.categories.find(c => c.id === catId)
  return cat ? cat.name_cn : catId
}

function doDelete() {
  if (deleteTarget.value) {
    productStore.deleteProduct(deleteTarget.value.id)
    list.load()
  }
  showDeleteConfirm.value = false
  deleteTarget.value = null
}
</script>
