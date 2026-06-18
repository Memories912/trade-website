<template>
  <div>
    <!-- Page Header -->
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.products') }}</span>
      </div>
    </div>

    <div class="container-custom py-6 md:py-10">
      <div class="flex flex-col md:flex-row gap-8">
        <!-- Sidebar Categories -->
        <aside class="md:w-56 shrink-0">
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden md:sticky md:top-24">
            <div class="px-5 py-4 border-b border-gray-100">
              <h3 class="text-sm font-bold text-beike-heading">{{ $t('products.categories') }}</h3>
            </div>
            <div class="p-2">
              <button
                v-for="cat in categories"
                :key="cat.id"
                @click="selectCategory(cat.id)"
                class="block w-full text-left px-3 py-2.5 text-sm rounded-lg transition-colors"
                :class="selectedCategory === cat.id ? 'text-beike-primary bg-beike-primary-light font-bold' : 'text-beike-body hover:bg-gray-50'"
              >
                <span class="mr-1.5">{{ cat.icon }}</span>
                {{ catName(cat) }}
              </button>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <div class="flex-1 min-w-0">
          <!-- Results header -->
          <div class="flex items-center justify-between mb-6">
            <div class="relative">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-beike-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input v-model="searchQuery" type="text" :placeholder="$t('products.search_placeholder')"
                       class="input-custom pl-10 pr-4 py-2.5 text-sm w-full md:w-72" />
              </div>
              <p class="text-sm text-beike-muted">
              {{ $t("products.showing") }} <span class="font-bold text-beike-body">{{ paginatedProducts.length }}</span> {{ $t("products.of") }} <span class="font-bold text-beike-body">{{ filteredProducts.length }}</span> {{ $t("products.products_count") }}
            </p>
          </div>

          <!-- Product Grid (BeikeShop style) -->
          <div v-if="paginatedProducts.length" class="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div
              v-for="product in paginatedProducts"
              :key="product.id"
              class="product-card group"
              @click="$router.push(`/products/${product.id}`)"
            >
              <div class="product-card-image">
                <img :src="product.image" :alt="productName(product)"
                     class="product-card-img" loading="lazy" @error="onImgError" />
                <!-- Hover overlay buttons (BeikeShop style) -->
                <div class="product-card-overlay">
                  <button @click.stop="favStore.toggle(product.id)" class="overlay-btn"
                          :class="favStore.isFav(product.id) ? 'text-red-500' : ''">
                    <svg class="w-4 h-4" :fill="favStore.isFav(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                  </button>
                  <button @click.stop="$router.push(`/products/${product.id}`)" class="overlay-btn">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="p-3 md:p-4 text-center">
                <span class="badge-custom bg-beike-primary-light text-beike-primary text-[10px] mb-2">
                  {{ getCategoryLabel(product.category) }}
                </span>
                <h3 class="text-sm font-bold text-beike-heading line-clamp-1 mb-1">{{ productName(product) }}</h3>
                <p class="text-xs text-beike-light line-clamp-2 mb-3">{{ productDescription(product) }}</p>
                <div class="flex items-center justify-center gap-3 text-xs text-beike-muted">
                  <span class="badge-gray">MOQ: {{ product.moq }}</span>
                  <span class="badge-gray">{{ product.lead_time }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty state -->
          <div v-else class="text-center py-20">
            <div class="text-5xl mb-4">📦</div>
            <h3 class="text-lg font-bold text-beike-heading mb-1">{{ $t('products.no_products_found') }}</h3>
            <p class="text-sm text-beike-muted">{{ $t('products.try_different') }}</p>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="flex justify-center items-center gap-2 mt-10">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1"
                    class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm
                           text-beike-muted hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              v-for="page in displayPages"
              :key="page"
              @click="goToPage(page)"
              class="min-w-[36px] h-9 rounded-lg text-sm font-bold transition-colors"
              :class="page === currentPage
                ? 'bg-beike-primary text-white'
                : 'border border-gray-200 text-beike-muted hover:bg-gray-50'"
            >
              {{ page }}
            </button>
            <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages"
                    class="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-sm
                           text-beike-muted hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, categories } from '@/assets/mock/products'
import { useFavoriteStore } from '@/stores/favorites'

const route = useRoute()
const router = useRouter()
const { locale, t } = useI18n()
const favStore = useFavoriteStore()

const PAGE_SIZE = 6
const currentPage = ref(1)
const selectedCategory = ref('')

const fallbackImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect fill='%23f1f5f9' width='600' height='400'/><text x='300' y='210' text-anchor='middle' fill='%2394a3b8' font-size='20'>📷</text></svg>`)}`
function onImgError(e) { e.target.src = fallbackImg }

// Read category from query params
onMounted(() => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
})

watch(() => route.query.category, (val) => {
  if (val) {
    selectedCategory.value = val
    currentPage.value = 1
  }
})

const filteredProducts = computed(() => {
  let list = [...products]
  if (selectedCategory.value && selectedCategory.value !== 'all') {
    list = list.filter(p => p.category === selectedCategory.value)
  }
  return list
})

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / PAGE_SIZE))

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return filteredProducts.value.slice(start, start + PAGE_SIZE)
})

const displayPages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  let start = Math.max(1, current - 2)
  let end = Math.min(total, current + 2)
  if (end - start < 4) {
    if (start === 1) end = Math.min(total, start + 4)
    else start = Math.max(1, end - 4)
  }
  for (let i = start; i <= end; i++) pages.push(i)
  return pages
})

function goToPage(page) {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function selectAll() {
  selectedCategory.value = ''
  router.push('/products')
}

function selectCategory(catId) {
  selectedCategory.value = catId
  router.push({ path: '/products', query: { category: catId } })
  currentPage.value = 1
}

function productName(product) {
  const lang = locale.value
  if (lang === 'en') return product.name_en
  if (lang === 'ko') return product.name_ko
  if (lang === 'ja') return product.name_ja
  return product.name_cn
}

function productDescription(product) {
  const lang = locale.value
  if (lang === 'en') return product.desc_en
  if (lang === 'ko') return product.desc_ko
  if (lang === 'ja') return product.desc_ja
  return product.desc_cn
}

function catName(cat) {
  return t(cat.key || cat.id)
}

function getCategoryLabel(catId) {
  const cat = categories.find(c => c.id === catId)
  return cat ? t(cat.key) : catId
}
</script>

<style scoped>
.product-card {
  background: #fff;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.product-card:hover {
  box-shadow: none;
}

.product-card-image {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f3f4f6;
  transition: all 0.3s ease-in-out;
}

.product-card:hover .product-card-image {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.product-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all ease-out 0.4s;
}

.product-card:hover .product-card-img {
  transform: scale(1.05);
}

.product-card-overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding-bottom: 0.75rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.2s ease-in-out;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
  transform: translateY(0);
}

.overlay-btn {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4b5563;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.2s;
}
.overlay-btn:hover {
  background: #fff;
  color: #282828;
  transform: scale(1.1);
}
</style>
