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

    <!-- 保存成功动画 -->
    <Transition name="check-pop">
      <div v-if="savedId" class="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <div class="flex flex-col items-center gap-3">
          <!-- 圆形打勾 -->
          <div class="relative w-16 h-16">
            <svg class="w-16 h-16" viewBox="0 0 64 64">
              <!-- 背景圆 -->
              <circle cx="32" cy="32" r="28" fill="#ecfdf5" stroke="#34d399" stroke-width="2.5"
                class="animate-circle" />
              <!-- 打勾路径 -->
              <path d="M20 33 L28 42 L44 24"
                fill="none" stroke="#059669" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"
                class="animate-check-path" />
            </svg>
          </div>
          <span class="text-sm font-semibold text-emerald-600 tracking-wide">保存成功</span>
        </div>
      </div>
    </Transition>

    <div class="overflow-hidden rounded-lg border border-gray-100">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-gray-50 text-beike-heading text-left border-b border-gray-200">
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase w-12 text-center">图标</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase w-20">ID</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase">中文名</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase">English</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase">한국어</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase">日本語</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase w-16 text-center">数量</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase w-24">更新时间</th>
            <th class="px-3 py-2 font-semibold text-xs tracking-wide uppercase w-36 text-center">操作</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="cat in sortedCategories"
            :key="cat.id"
            class="hover:bg-orange-50/40 transition-colors"
          >
            <!-- 图标列：直接渲染 Lucide 图标 -->
            <td class="px-3 py-2.5 text-center">
              <span class="inline-flex items-center justify-center w-7 h-7 rounded-md bg-beike-primary-light">
                <component :is="iconMap[cat.icon] || iconMap['package']" class="w-4 h-4 text-beike-primary" />
              </span>
            </td>
            <!-- ID -->
            <td class="px-3 py-2.5"><span class="font-mono text-beike-body text-xs bg-gray-50 px-2 py-0.5 rounded">{{ cat.id }}</span></td>
            <!-- 中文名 -->
            <td class="px-3 py-2.5 text-xs text-beike-heading font-medium">{{ cat.name_cn || '-' }}</td>
            <!-- 英文名 -->
            <td class="px-3 py-2.5 text-xs text-beike-body">{{ capitalize(cat.name_en) || '-' }}</td>
            <!-- 한국어 -->
            <td class="px-3 py-2.5 text-xs text-beike-body">{{ cat.name_ko || '-' }}</td>
            <!-- 日本語 -->
            <td class="px-3 py-2.5 text-xs text-beike-body">{{ cat.name_ja || '-' }}</td>
            <!-- 产品数量 -->
            <td class="px-3 py-2.5 text-center">
              <span class="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 rounded-full text-xs font-semibold"
                :class="cat.count > 0 ? 'bg-orange-50 text-beike-primary' : 'bg-gray-50 text-beike-light'"
              >{{ cat.count }}</span>
            </td>
            <!-- 更新时间 -->
            <td class="px-3 py-2.5 text-xs text-beike-light">{{ cat.updatedAt }}</td>
            <!-- 操作 -->
            <td class="px-3 py-2.5">
              <div class="flex gap-1.5 justify-center">
                <button class="min-w-[44px] text-center px-2 py-1 rounded text-xs font-medium bg-orange-50 text-beike-primary hover:bg-beike-primary-light transition-colors" @click="startEdit(cat)">
                  编辑
                </button>
                <button
                  class="min-w-[44px] text-center px-2 py-1 rounded text-xs font-medium transition-colors"
                  :class="cat.count > 0
                    ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    : 'bg-red-50 text-red-500 hover:bg-red-100'"
                  :disabled="cat.count > 0"
                  :title="cat.count > 0 ? '该分类下有 ' + cat.count + ' 个产品，无法删除' : ''"
                  @click="cat.count === 0 && confirmDeleteCat(cat)"
                >
                  删除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 新增/编辑弹窗 -->
    <div v-if="showForm" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black/40" @click="showForm = false"></div>
      <div class="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-lg font-bold text-beike-heading mb-4">{{ isNew ? '新增分类' : '编辑分类' }}</h3>

        <!-- 图标选择器 -->
        <div class="mb-4">
          <label class="block text-xs font-medium text-beike-body mb-2">图标</label>
          <div class="grid grid-cols-8 gap-1.5 mb-2">
            <button
              v-for="iconOpt in iconOptions"
              :key="iconOpt"
              @click="editForm.icon = iconOpt"
              class="w-9 h-9 rounded-lg flex items-center justify-center border transition-colors"
              :class="editForm.icon === iconOpt
                ? 'border-beike-primary bg-beike-primary-light text-beike-primary'
                : 'border-gray-200 hover:bg-gray-50 text-beike-muted'"
            >
              <component :is="iconMap[iconOpt]" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- 表单字段 -->
        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-beike-body mb-1">ID</label>
            <input v-model="editForm.id" class="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" :disabled="!isNew" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">中文名</label>
              <input v-model="editForm.name_cn" class="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" placeholder="中文名" />
            </div>
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">English</label>
              <input v-model="editForm.name_en" class="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" placeholder="English name" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">한국어</label>
              <input v-model="editForm.name_ko" class="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" placeholder="Korean name" />
            </div>
            <div>
              <label class="block text-xs font-medium text-beike-body mb-1">日本語</label>
              <input v-model="editForm.name_ja" class="w-full px-3 py-1.5 border border-gray-200 rounded text-xs" placeholder="Japanese name" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-2 mt-6">
          <button class="px-4 py-2 rounded-lg text-xs font-medium text-beike-muted bg-gray-50 hover:bg-gray-100 transition-colors" @click="showForm = false">
            {{ t('admin.common.cancel') }}
          </button>
          <button class="px-4 py-2 rounded-lg text-xs font-medium bg-beike-primary text-white hover:bg-beike-primary-dark transition-colors" @click="saveCat">
            {{ t('admin.common.save') }}
          </button>
        </div>
      </div>
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
import {
  Package, Zap, Plug, Search, SprayCan, Crosshair, Cog, Gauge, Droplet,
  Factory, Home, ShoppingBag, Wrench, Settings, Trash2, Truck, Box,
  Layers, Tag, Compass, FlaskConical, Drill, ZapOff, Wind, Droplets,
  Scissors, Ruler, Thermometer, Laptop, Smartphone, Monitor, Cable,
  Hammer, Shovel, Leaf, Flower, Sun, Moon,
  Star, Heart, ThumbsUp, Shield, Bell, Lock, Key, User, Users, MapPin,
} from 'lucide-vue-next'

const { t } = useI18n()

function capitalize(str) {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const productStore = useAdminProductStore()

const editingId = ref(null)
const isNew = ref(false)
const showForm = ref(false)
const showDelete = ref(false)
const deleteTarget = ref(null)
const savedId = ref(null)

// Lucide icon map（与 products.js 中 icon 字段对应）
const iconMap = {
  'package': Package,
  'zap': Zap,
  'plug': Plug,
  'search': Search,
  'spray-can': SprayCan,
  'crosshair': Crosshair,
  'cog': Cog,
  'gauge': Gauge,
  'droplet': Droplet,
  'factory': Factory,
  'home': Home,
  'shopping-bag': ShoppingBag,
  'wrench': Wrench,
  'settings': Settings,
  'trash-2': Trash2,
  'truck': Truck,
  'box': Box,
  'layers': Layers,
  'tag': Tag,
  'compass': Compass,
  'flask-conical': FlaskConical,
  'drill': Drill,
  'wind': Wind,
  'droplets': Droplets,
  'scissors': Scissors,
  'ruler': Ruler,
  'thermometer': Thermometer,
  'laptop': Laptop,
  'smartphone': Smartphone,
  'monitor': Monitor,
  'cable': Cable,
  'hammer': Hammer,
  'shovel': Shovel,
  'leaf': Leaf,
  'flower': Flower,
  'sun': Sun,
  'star': Star,
  'heart': Heart,
  'thumbs-up': ThumbsUp,
  'shield': Shield,
  'bell': Bell,
  'lock': Lock,
  'key': Key,
  'user': User,
  'users': Users,
  'map-pin': MapPin,
}

// 图标选择器中的图标列表（供用户选择）
const iconOptions = Object.keys(iconMap)

const editForm = reactive({
  id: '',
  key: '',
  icon: 'package',
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
  showForm.value = true
  Object.assign(editForm, {
    id: cat.id,
    key: cat.key || ('products.' + cat.id),
    icon: cat.icon || 'package',
    name_en: cat.name_en || '',
    name_cn: cat.name_cn || '',
    name_ko: cat.name_ko || '',
    name_ja: cat.name_ja || '',
    sortOrder: cat.sortOrder || 0,
  })
}

function startAdd() {
  isNew.value = true
  editingId.value = 'new'
  showForm.value = true
  const maxSort = productStore.categories.reduce((max, c) => Math.max(max, c.sortOrder || 0), 0)
  Object.assign(editForm, {
    id: '',
    key: '',
    icon: 'package',
    name_en: '',
    name_cn: '',
    name_ko: '',
    name_ja: '',
    sortOrder: maxSort + 1,
  })
}

function saveCat() {
  if (!editForm.id.trim()) return
  // 自动生成 key
  const autoKey = 'products.' + editForm.id.trim()
  const data = {
    id: editForm.id.trim(),
    key: autoKey,
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
  showForm.value = false
  editingId.value = null
  savedId.value = editForm.id
  setTimeout(() => { savedId.value = null }, 1500)
}

function cancelEdit() {
  showForm.value = false
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
/* 圆形背景动画 */
:deep(.animate-circle) {
  stroke-dasharray: 180;
  stroke-dashoffset: 180;
  animation: circle-in 0.5s ease-out 0.1s forwards;
}

/* 打勾路径动画 */
:deep(.animate-check-path) {
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
  animation: check-draw 0.4s ease-out 0.45s forwards;
}

@keyframes circle-in {
  to { stroke-dashoffset: 0; }
}

@keyframes check-draw {
  to { stroke-dashoffset: 0; }
}

/* 整体弹出 + 淡出 */
.check-pop-enter-active { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
.check-pop-leave-active { transition: all 0.3s ease-in; }
.check-pop-enter-from { opacity: 0; transform: scale(0.7); }
.check-pop-leave-to { opacity: 0; transform: scale(0.85); }
</style>
