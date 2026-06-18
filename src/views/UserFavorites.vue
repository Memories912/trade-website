<template>
  <div>
    <div class="flex items-center gap-2 text-sm text-beike-muted mb-6">
      <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
      <span>/</span>
      <span class="text-beike-body font-medium">{{ $t('nav.my_favorites') }}</span>
    </div>

    <div class="section-header-custom text-left mb-8">
      <h1 class="section-title-custom text-left">{{ $t('nav.my_favorites') }}</h1>
      <div class="wave-line wave-line-primary mt-3" style="margin-left: 0;"></div>
    </div>

    <!-- Empty state -->
    <div v-if="favItems.length === 0" class="text-center py-20">
      <div class="text-5xl mb-4">🤍</div>
      <h3 class="text-lg font-bold text-beike-heading mb-2">{{ $t('common.no_favorites') }}</h3>
      <p class="text-sm text-beike-muted mb-6">{{ $t('common.no_favorites_desc') }}</p>
      <router-link to="/products" class="btn-primary-custom">{{ $t('common.browse_products') }}</router-link>
    </div>

    <!-- Favorites grid -->
    <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div
        v-for="product in favItems"
        :key="product.id"
        class="product-card group"
        @click="$router.push(`/products/${product.id}`)"
      >
        <div class="product-card-image">
          <img :src="product.image" :alt="productName(product)" class="product-card-img"
               loading="lazy" @error="onImgError" />
          <button
            @click.stop="removeFav(product.id)"
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm z-10"
          >
            <svg class="h-4 w-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </button>
        </div>
        <div class="p-4 text-center">
          <span class="badge-custom bg-beike-primary-light text-beike-primary text-[10px] mb-2">
            {{ getCategoryLabel(product.category) }}
          </span>
          <h3 class="text-sm font-bold text-beike-heading line-clamp-1 mb-1">{{ productName(product) }}</h3>
          <div class="flex items-center justify-center gap-3 text-xs text-beike-muted mt-2">
            <span class="badge-gray">MOQ: {{ product.moq }}</span>
            <span class="badge-gray">{{ product.lead_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useFavoriteStore } from '@/stores/favorites'
import { products, categories } from '@/assets/mock/products'

const { locale, t } = useI18n()
const favStore = useFavoriteStore()

const fallbackImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect fill='%23f1f5f9' width='600' height='400'/><text x='300' y='210' text-anchor='middle' fill='%2394a3b8' font-size='20'>📷</text></svg>`)}`
function onImgError(e) { e.target.src = fallbackImg }

const favItems = computed(() =>
  products.filter(p => favStore.isFav(p.id))
)

function productName(product) {
  const lang = locale.value
  if (lang === 'en') return product.name_en
  if (lang === 'ko') return product.name_ko
  if (lang === 'ja') return product.name_ja
  return product.name_cn
}

function removeFav(id) { favStore.toggle(id) }

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
  transition: all 0.3s;
}
.product-card:hover { box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15); }
.product-card-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f3f4f6;
}
.product-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.product-card:hover .product-card-img { transform: scale(1.08); }
</style>
