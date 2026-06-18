<template>
  <div class="flex flex-col min-h-full pl-0">
    <div class="flex items-center justify-between pt-3">
      <h1 class="text-xl font-bold text-beike-heading">{{ t('admin.certifications.title') }}</h1>
      <button
        class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
        @click="openForm(null)"
      >
        + {{ t('admin.certifications.add') }}
      </button>
    </div>

    <div class="overflow-hidden">
      <DataTable
        :columns="columns"
        :rows="productStore.certifications"
        :empty-text="t('admin.common.no_data')"
      >
        <template #icon="{ row }">
          <span class="text-lg">{{ row.icon }}</span>
        </template>
        <template #actions="{ row }">
          <div class="flex items-center gap-2">
            <button
              class="px-3 py-1.5 rounded-md text-xs text-beike-primary hover:bg-beike-primary-light transition-colors"
              @click="openForm(row)"
            >
              {{ t('admin.common.edit') }}
            </button>
            <button
              class="px-3 py-1.5 rounded-md text-xs text-red-500 hover:bg-red-50 transition-colors"
              @click="confirmDelete(row)"
            >
              {{ t('admin.common.delete') }}
            </button>
          </div>
        </template>
      </DataTable>
    </div>

    <!-- Edit dialog -->
    <Teleport to="body">
      <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40" @click="showForm = false" />
        <div class="relative bg-white rounded-xl shadow-card p-4 w-full max-w-md">
          <h3 class="text-lg font-semibold text-beike-heading mb-4">
            {{ formIsNew ? t('admin.certifications.add') : t('admin.certifications.edit') }}
          </h3>
          <div class="space-y-4">
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.certifications.code') }}</label>
              <input v-model="formData.code" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.certifications.name') }}</label>
              <input v-model="formData.name" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
            </div>
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.certifications.icon') }}</label>
              <input v-model="formData.icon" class="w-16 px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
            </div>
          </div>
          <div class="flex justify-end gap-3 mt-6">
            <button class="px-4 py-2 rounded-lg border border-beike-border text-sm text-beike-body hover:bg-beike-bg" @click="showForm = false">
              {{ t('admin.common.cancel') }}
            </button>
            <button class="px-4 py-2 rounded-lg bg-beike-primary text-white text-sm hover:bg-beike-primary-dark" @click="saveCert">
              {{ t('admin.common.save') }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <ConfirmDialog
      :visible="showDeleteConfirm"
      :title="t('admin.certifications.delete_title')"
      :message="t('admin.certifications.delete_message')"
      :confirm-text="t('admin.common.delete')"
      :cancel-text="t('admin.common.cancel')"
      @confirm="doDelete"
      @cancel="showDeleteConfirm = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAdminProductStore } from '@/stores/adminProduct'
import DataTable from '@/admin/components/DataTable.vue'
import ConfirmDialog from '@/admin/components/ConfirmDialog.vue'

const { t } = useI18n()
const productStore = useAdminProductStore()

const columns = computed(() => [
  { key: 'code', label: t('admin.certifications.code'), sortable: true },
  { key: 'name', label: t('admin.certifications.name') },
  { key: 'icon', label: t('admin.certifications.icon'), class: 'w-16' },
  { key: 'actions', label: t('admin.common.actions'), class: 'w-36' },
])

const showForm = ref(false)
const formIsNew = ref(false)
const editId = ref(null)
const formData = reactive({ code: '', name: '', icon: '' })

const showDeleteConfirm = ref(false)
const deleteTarget = ref(null)

function openForm(cert) {
  if (cert) {
    formIsNew.value = false
    editId.value = cert.id
    Object.assign(formData, { code: cert.code, name: cert.name, icon: cert.icon })
  } else {
    formIsNew.value = true
    editId.value = null
    Object.assign(formData, { code: '', name: '', icon: '' })
  }
  showForm.value = true
}

function saveCert() {
  const data = { code: formData.code, name: formData.name, icon: formData.icon }
  if (formIsNew.value) {
    productStore.addCertification(data)
  } else {
    productStore.updateCertification(editId.value, data)
  }
  showForm.value = false
}

function confirmDelete(cert) {
  deleteTarget.value = cert
  showDeleteConfirm.value = true
}

function doDelete() {
  if (deleteTarget.value) {
    productStore.deleteCertification(deleteTarget.value.id)
  }
  showDeleteConfirm.value = false
  deleteTarget.value = null
}
</script>
