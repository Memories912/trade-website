<template>
  <div class="flex flex-col min-h-full pl-0">
    <div class="flex items-center justify-between pt-3">
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.categories.title') }}</h1>
      <button
        class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
        @click="startAdd"
      >
        + {{ t('admin.categories.add') }}
      </button>
    </div>

    <div class="overflow-hidden rounded-lg border border-gray-100">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 text-beike-heading text-left border-b border-gray-200">
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">{{ t('admin.categories.icon') }}</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">{{ t('admin.categories.key') }}</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">{{ t('admin.categories.name_zh') }}</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">{{ t('admin.categories.name_en') }}</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">{{ t('admin.categories.sort_order') }}</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase">更新时间</th>
            <th class="px-4 py-3 font-semibold text-xs tracking-wide uppercase w-44">{{ t('admin.common.actions') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="cat in sortedCategories"
            :key="cat.id"
            class="hover:bg-orange-50/40 transition-colors"
          >
            <td class="px-4 py-3 text-lg">{{ cat.icon }}</td>
            <td class="px-4 py-3">
              <span v-if="editingId !== cat.id" class="font-mono text-beike-body text-xs bg-gray-50 px-2 py-0.5 rounded">{{ cat.id }}</span>
              <input v-else v-model="editForm.id" class="px-2 py-1 border border-gray-200 rounded text-sm" disabled />
            </td>
            <td class="px-4 py-3">
              <span v-if="editingId !== cat.id" class="inline-flex items-center gap-1.5">
                <span class="text-beike-heading font-medium">{{ cat.key }}</span>
                <span v-if="savedId === cat.id" class="inline-flex items-center text-green-500 animate-check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
              </span>
              <input v-else v-model="editForm.key" class="px-2 py-1 border border-gray-200 rounded text-sm" />
            </td>
            <td class="px-4 py-3">
              <span v-if="editingId !== cat.id" class="text-beike-body">{{ cat.name_en || cat.id }}</span>
              <input v-else v-model="editForm.name_en" class="px-2 py-1 border border-gray-200 rounded text-sm" />
            </td>
            <td class="px-4 py-3">
              <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
                :class="cat.count > 0 ? 'bg-orange-50 text-beike-primary' : 'bg-gray-50 text-beike-light'"
              >
                {{ cat.count }}
              </span>
            </td>
            <td class="px-4 py-3">
              <span class="text-xs text-beike-light">{{ cat.updatedAt }}</span>
            </td>
            <td class="px-4 py-3">
              <div v-if="editingId !== cat.id" class="flex gap-1.5">
                <button class="min-w-[50px] text-center px-2 py-1 rounded text-xs font-medium bg-orange-50 text-beike-primary hover:bg-beike-primary-light transition-colors" @click="startEdit(cat)">
                  ✏️ {{ t('admin.common.edit') }}
                </button>
                <button
                  class="min-w-[50px] text-center px-2 py-1 rounded text-xs font-medium transition-colors"
                  :class="cat.count > 0
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    : 'bg-red-50 text-red-500 hover:bg-red-100'"
                  :disabled="cat.count > 0"
                  :title="cat.count > 0 ? '该分类下有 ' + cat.count + ' 个产品，无法删除' : ''"
                  @click="cat.count === 0 && confirmDeleteCat(cat)"
                >
                  🗑️ {{ t('admin.common.delete') }}
                </button>
              </div>
              <div v-else class="flex gap-1.5">
                <button class="min-w-[50px] text-center px-2 py-1 rounded text-xs font-medium bg-beike-primary text-white hover:bg-beike-primary-dark transition-colors" @click="saveCat">
                  ✅ {{ t('admin.common.save') }}
                </button>
                <button class="min-w-[50px] text-center px-2 py-1 rounded text-xs font-medium text-beike-muted bg-gray-50 hover:bg-gray-100 transition-colors" @click="cancelEdit">
                  {{ t('admin.common.cancel') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <ConfirmDialog
      :visible="showDelete"
      :title="t('admin.categories.delete_title')"
      :message="t('admin.categories.delete_message')"
      :confirm-text="t('admin.common.delete')"
      :cancel-text="t('admin.common.cancel')"
      @confirm="doDeleteCat"
      @cancel="showDelete = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminProductStore } from '@/stores/adminProduct'
import ConfirmDialog from '@/admin/components/ConfirmDialog.vue'

const { t } = useI18n()
const productStore = useAdminProductStore()

const editingId = ref(null)
const isNew = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)
const savedId = ref(null) // 保存成功后闪烁提示

const editForm = reactive({
  id: '',
  key: '',
  icon: '',
  name_en: '',
  name_cn: '',
  name_ko: '',
  name_ja: '',
  sortOrder: 0,
})

// 每个分类下的产品数量
const productCountMap = computed(() => {
  const map = {}
  productStore.products.forEach(p => {
    const cat = p.category || 'other'
    map[cat] = (map[cat] || 0) + 1
  })
  return map
})

const sortedCategories = computed(() =>
  [...productStore.categories]
    .filter(c => c.id !== 'all')
    .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
    .map(c => ({
      ...c,
      count: productCountMap.value[c.id] || 0,
      updatedAt: c.updatedAt || '2026-03-21',
    }))
)

function startEdit(cat) {
  isNew.value = false
  editingId.value = cat.id
  Object.assign(editForm, {
    id: cat.id,
    key: cat.key,
    icon: cat.icon,
    name_en: cat.name_en || cat.id,
    name_cn: cat.name_cn || '',
    name_ko: cat.name_ko || '',
    name_ja: cat.name_ja || '',
    sortOrder: cat.sortOrder || 0,
  })
}

function startAdd() {
  isNew.value = true
  editingId.value = 'new'
  const maxSort = productStore.categories.reduce((max, c) => Math.max(max, c.sortOrder || 0), 0)
  Object.assign(editForm, {
    id: 'cat_' + Date.now(),
    key: '',
    icon: '📦',
    name_en: '',
    name_cn: '',
    name_ko: '',
    name_ja: '',
    sortOrder: maxSort + 1,
  })
}

function saveCat() {
  const data = {
    id: editForm.id,
    key: editForm.key,
    icon: editForm.icon,
    name_en: editForm.name_en,
    name_cn: editForm.name_cn,
    name_ko: editForm.name_ko,
    name_ja: editForm.name_ja,
    sortOrder: editForm.sortOrder,
  }
  if (isNew.value) {
    productStore.addCategory(data)
  } else {
    productStore.updateCategory(editForm.id, data)
  }
  editingId.value = null
  // 显示打勾提示
  savedId.value = editForm.id
  setTimeout(() => { savedId.value = null }, 1500)
}

function cancelEdit() {
  editingId.value = null
}

function confirmDeleteCat(cat) {
  deleteTarget.value = cat
  showDelete.value = true
}

function doDeleteCat() {
  if (deleteTarget.value) {
    productStore.deleteCategory(deleteTarget.value.id)
  }
  showDelete.value = false
  deleteTarget.value = null
}
</script>

<style scoped>
@keyframes pop-check {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.3); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-check { animation: pop-check 0.4s ease-out both; }
</style>
