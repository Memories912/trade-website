<template>
  <div class="space-y-3">
    <!-- Page header -->
    <div class="flex items-center gap-2">
      <button class="p-1.5 rounded-md hover:bg-beike-bg transition-colors" @click="router.push('/admin/products')">
        <ArrowLeft class="w-5 h-5 text-beike-body" />
      </button>
      <h1 class="text-xl font-bold text-beike-heading">
        {{ isEdit ? t('admin.products.edit_product') : t('admin.products.new_product') }}
      </h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <!-- Main form -->
      <div class="lg:col-span-2 space-y-3">
        <!-- Product name (multilang) -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.products.product_name') }}</h3>
          <MultilangInput v-model="form.name" :locales="locales" :placeholder="t('admin.products.name_placeholder')" />
        </div>

        <!-- Description (multilang) -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-4">{{ t('admin.products.description') }}</h3>
          <MultilangInput v-model="form.description" :locales="locales" multiline :placeholder="t('admin.products.desc_placeholder')" />
        </div>

        <!-- Specifications (dynamic key-value) -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-beike-muted">{{ t('admin.products.specifications') }}</h3>
            <button class="text-sm text-beike-primary hover:underline" @click="addSpec">
              + {{ t('admin.products.add_spec') }}
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="(spec, idx) in specEntries" :key="idx" class="flex gap-3">
              <input
                v-model="spec.key"
                class="flex-1 px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
                :placeholder="t('admin.products.spec_key')"
              />
              <input
                v-model="spec.value"
                class="flex-1 px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
                :placeholder="t('admin.products.spec_value')"
              />
              <button class="p-2 text-red-400 hover:text-red-600" @click="specEntries.splice(idx, 1)">
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-medium text-beike-muted">{{ t('admin.products.features') }}</h3>
            <button class="text-sm text-beike-primary hover:underline" @click="form.features.push('')">
              + {{ t('admin.products.add_feature') }}
            </button>
          </div>
          <div class="space-y-2">
            <div v-for="(feat, idx) in form.features" :key="idx" class="flex gap-2">
              <input
                v-model="form.features[idx]"
                class="flex-1 px-3 py-2 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
                :placeholder="t('admin.products.feature_placeholder')"
              />
              <button class="p-2 text-red-400 hover:text-red-600" @click="form.features.splice(idx, 1)">
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="space-y-3">
        <!-- General info -->
        <div class="bg-white rounded-xl shadow-card p-4 space-y-4">
          <h3 class="text-sm font-medium text-beike-muted">{{ t('admin.products.general_info') }}</h3>
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.products.category') }}</label>
            <select
              v-model="form.category"
              class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none"
            >
              <option v-for="cat in productStore.categories.filter(c => c.id !== 'all')" :key="cat.id" :value="cat.id">
                {{ cat.name_cn }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.products.moq') }}</label>
            <input v-model="form.moq" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
          </div>
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.products.lead_time') }}</label>
            <input v-model="form.lead_time" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
          </div>
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.products.packaging') }}</label>
            <input v-model="form.packaging" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none" />
          </div>
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">{{ t('admin.products.status') }}</label>
            <select v-model="form.status" class="w-full px-3 py-2.5 rounded-lg border border-beike-border text-sm focus:border-beike-primary outline-none">
              <option value="active">{{ t('admin.status.active') }}</option>
              <option value="inactive">{{ t('admin.status.inactive') }}</option>
            </select>
          </div>
        </div>

        <!-- Certifications -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.products.certifications') }}</h3>
          <div class="space-y-2">
            <label v-for="cert in productStore.certifications" :key="cert.code" class="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                :value="cert.code"
                :checked="form.certifications.includes(cert.code)"
                class="rounded border-beike-border text-beike-primary focus:ring-beike-primary"
                @change="toggleCert(cert.code)"
              />
              <span class="text-sm text-beike-body">{{ cert.code }} - {{ cert.name }}</span>
            </label>
          </div>
        </div>

        <!-- Image placeholder -->
        <div class="bg-white rounded-xl shadow-card p-4">
          <h3 class="text-sm font-medium text-beike-muted mb-3">{{ t('admin.products.image') }}</h3>
          <div class="border-2 border-dashed border-beike-border rounded-lg p-6 text-center text-sm text-beike-muted">
            <ImageIcon class="w-8 h-8 mx-auto mb-2 text-beike-light" />
            <p>{{ t('admin.products.image_placeholder') }}</p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-3">
          <button
            class="flex-1 py-2.5 rounded-lg bg-beike-primary text-white text-sm font-medium hover:bg-beike-primary-dark transition-colors"
            @click="saveProduct"
          >
            {{ t('admin.common.save') }}
          </button>
          <button
            class="flex-1 py-2.5 rounded-lg border border-beike-border text-beike-body text-sm hover:bg-beike-bg transition-colors"
            @click="router.push('/admin/products')"
          >
            {{ t('admin.common.cancel') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, X, Image as ImageIcon } from 'lucide-vue-next'
import { useAdminProductStore } from '@/stores/adminProduct'
import MultilangInput from '@/admin/components/MultilangInput.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const productStore = useAdminProductStore()

const locales = ['zh', 'en', 'ko', 'ja']
const isEdit = computed(() => !!route.params.id)

const form = reactive({
  name: { zh: '', en: '', ko: '', ja: '' },
  description: { zh: '', en: '', ko: '', ja: '' },
  category: 'power_tools',
  moq: '500 pcs',
  lead_time: '30-45 days',
  packaging: '',
  status: 'active',
  certifications: [],
  features: [''],
  image: 'https://picsum.photos/seed/newproduct/400/400',
  images: [],
  specs: {},
})

const specEntries = ref([{ key: '', value: '' }])

onMounted(() => {
  if (isEdit.value) {
    const product = productStore.getProduct(route.params.id)
    if (product) {
      form.name = { zh: product.name_cn || '', en: product.name_en || '', ko: product.name_ko || '', ja: product.name_ja || '' }
      form.description = { zh: product.description_cn || '', en: product.description_en || '', ko: product.description_ko || '', ja: product.description_ja || '' }
      form.category = product.category || ''
      form.moq = product.moq || ''
      form.lead_time = product.lead_time || ''
      form.packaging = product.packaging || ''
      form.status = product.status || 'active'
      form.certifications = [...(product.certifications || [])]
      form.features = [...(product.features || [''])]
      form.image = product.image || ''
      form.images = [...(product.images || [])]
      // Convert specs object to entries
      specEntries.value = Object.entries(product.specs || {}).map(([key, value]) => ({ key, value: String(value) }))
    }
  }
})

function addSpec() {
  specEntries.value.push({ key: '', value: '' })
}

function toggleCert(code) {
  const idx = form.certifications.indexOf(code)
  if (idx >= 0) form.certifications.splice(idx, 1)
  else form.certifications.push(code)
}

function saveProduct() {
  // Build specs from entries
  const specs = {}
  specEntries.value.forEach(e => {
    if (e.key.trim()) specs[e.key.trim()] = e.value
  })

  const data = {
    name_cn: form.name.zh,
    name_en: form.name.en,
    name_ko: form.name.ko,
    name_ja: form.name.ja,
    description_cn: form.description.zh,
    description_en: form.description.en,
    description_ko: form.description.ko,
    description_ja: form.description.ja,
    category: form.category,
    moq: form.moq,
    lead_time: form.lead_time,
    packaging: form.packaging,
    status: form.status,
    certifications: form.certifications,
    features: form.features.filter(f => f.trim()),
    specs,
    image: form.image,
    images: form.images,
  }

  if (isEdit.value) {
    productStore.updateProduct(route.params.id, data)
  } else {
    productStore.addProduct(data)
  }
  router.push('/admin/products')
}
</script>
