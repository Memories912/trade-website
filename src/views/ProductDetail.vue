<template>
  <div>
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <router-link to="/products" class="hover:text-beike-primary">{{ $t('nav.products') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium line-clamp-1">{{ product ? productName(product) : '' }}</span>
      </div>
    </div>

    <div v-if="product" class="container-custom py-6 md:py-10">
      <div class="grid md:grid-cols-2 gap-8 md:gap-12">
        <!-- Image (BeikeShop product image style) -->
        <div>
          <div class="relative border border-gray-200 rounded-xl overflow-hidden bg-gray-50 group cursor-crosshair"
               @mousemove="onImageZoom" @mouseleave="zoomStyle = null">
            <div class="aspect-square overflow-hidden">
              <img ref="mainImage" :src="product.images?.[currentImageIndex] || product.image"
                   :alt="productName(product)" class="w-full h-full object-cover transition-opacity duration-300"
                   @error="onImgError" />
            </div>
            <!-- Zoom lens -->
            <div v-if="zoomStyle" class="absolute inset-0 pointer-events-none z-10"
                 :style="{ background: zoomBg, backgroundSize: '200% 200%', backgroundPosition: zoomPos }">
            </div>
          </div>
          <!-- Thumbnail strip -->
          <div v-if="product.images && product.images.length > 1" class="flex gap-2 mt-3 overflow-x-auto pb-1">
            <button v-for="(img, idx) in product.images" :key="idx"
                    @click="currentImageIndex = idx"
                    class="w-16 h-16 rounded-lg border-2 shrink-0 overflow-hidden transition-all duration-200"
                    :class="currentImageIndex === idx ? 'border-beike-primary' : 'border-gray-200 hover:border-gray-400'">
              <img :src="img" :alt="productName(product) + ' ' + (idx+1)" class="w-full h-full object-cover"
                   @error="onImgError" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <div class="flex items-start justify-between gap-4">
            <div>
              <span class="badge-primary mb-2 inline-block">{{ getCategoryLabel(product.category) }}</span>
              <h1 class="text-2xl md:text-3xl font-bold text-beike-heading leading-tight">{{ productName(product) }}</h1>
            </div>
            <button
              @click="favStore.toggle(product.id)"
              class="shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border"
              :class="favStore.isFav(product.id) ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200 hover:border-gray-400'"
            >
              <svg class="w-5 h-5" :class="favStore.isFav(product.id) ? 'text-red-500' : 'text-beike-muted'"
                   :fill="favStore.isFav(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>

          <!-- Description -->
          <p class="text-sm text-beike-muted leading-relaxed mt-4 mb-6">{{ productDescription(product) }}</p>

          <!-- Specs like BeikeShop stock-and-sku -->
          <div class="space-y-2.5 text-sm border-t border-gray-100 pt-4 mb-6">
            <div class="flex" v-if="product.model"><span class="w-24 text-beike-muted shrink-0">{{ $t('products.model') }}:</span><span class="text-beike-body font-medium">{{ product.model }}</span></div>
            <div class="flex"><span class="w-24 text-beike-muted shrink-0">{{ $t('products.moq') }}:</span><span class="text-beike-body font-medium">{{ product.moq }}</span></div>
            <div class="flex"><span class="w-24 text-beike-muted shrink-0">{{ $t('products.lead_time') }}:</span><span class="text-beike-body font-medium">{{ product.lead_time }}</span></div>
            <div class="flex"><span class="w-24 text-beike-muted shrink-0">{{ $t('products.packaging') }}:</span><span class="text-beike-body font-medium">{{ product.packaging || t('products.packaging') }}</span></div>
          </div>

          <!-- Inquiry CTAs (BeikeShop style) -->
          <div class="flex gap-3">
            <router-link
              :to="{ path: '/inquiry', query: { product: productName(product) } }"
              class="btn-primary-custom flex-1 justify-center py-3 px-6"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {{ $t('products.inquiry_now') }}
            </router-link>
            <button
              @click="quickInquiryOpen = true"
              class="btn-outline-custom px-4"
              :title="$t('common.quick_inquiry')"
            >
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
          </div>

          <!-- Promo badges -->
          <div class="grid grid-cols-3 gap-3 mt-6 border-t border-gray-100 pt-6">
            <div class="text-center">
              <div class="text-lg mb-1">✓</div>
              <div class="text-[10px] text-beike-muted font-medium">{{ $t('products.certified') }}</div>
            </div>
            <div class="text-center">
              <div class="text-lg mb-1">📦</div>
              <div class="text-[10px] text-beike-muted font-medium">{{ $t('products.oem_odm') }}</div>
            </div>
            <div class="text-center">
              <div class="text-lg mb-1">🌍</div>
              <div class="text-[10px] text-beike-muted font-medium">{{ $t('products.global_shipping') }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Full Description tab (BeikeShop style) -->
      <div class="mt-12 md:mt-16 border-t border-gray-200 pt-8">
        <div class="flex gap-6 border-b border-gray-200 mb-6">
          <button
            @click="detailTab = 'desc'"
            class="pb-3 text-sm font-bold transition-colors relative"
            :class="detailTab === 'desc' ? 'text-beike-primary' : 'text-beike-muted hover:text-beike-body'"
          >
            {{ $t('products.product_details') }}
            <span v-if="detailTab === 'desc'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-beike-primary"></span>
          </button>
          <button
            @click="detailTab = 'specs'"
            class="pb-3 text-sm font-bold transition-colors relative"
            :class="detailTab === 'specs' ? 'text-beike-primary' : 'text-beike-muted hover:text-beike-body'"
          >
            {{ $t('products.specifications') }}
            <span v-if="detailTab === 'specs'" class="absolute bottom-0 left-0 right-0 h-0.5 bg-beike-primary"></span>
          </button>
        </div>
        <div v-if="detailTab === 'desc'" class="prose prose-sm max-w-none text-beike-muted leading-relaxed">
          <p>{{ productDescription(product) }}</p>
          <p class="mt-4">{{ $t('products.product_desc_detail') }}</p>
        </div>
        <div v-else class="overflow-x-auto">
          <table class="w-full text-sm">
            <tbody>
              <tr v-for="(spec, key) in specs" :key="key" class="border-b border-gray-100">
                <td class="py-3 pr-6 text-beike-muted w-48">{{ key }}</td>
                <td class="py-3 text-beike-body font-medium">{{ spec }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Related Products (BeikeShop style) -->
      <div v-if="relatedProducts.length" class="mt-12 md:mt-16 border-t border-gray-200 pt-10">
        <h2 class="text-xl font-bold text-beike-heading text-center mb-8">{{ $t('products.related_products') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="rp in relatedProducts" :key="rp.id"
               class="product-card group" @click="$router.push(`/products/${rp.id}`)">
            <div class="product-card-image">
              <img :src="rp.image" :alt="productName(rp)" class="product-card-img" loading="lazy" @error="onImgError" />
              <div class="product-card-overlay">
                <button @click.stop="favStore.toggle(rp.id)" class="overlay-btn"
                        :class="favStore.isFav(rp.id) ? 'text-red-500' : ''">
                  <svg class="w-4 h-4" :fill="favStore.isFav(rp.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-3 text-center">
              <h3 class="text-sm font-bold text-beike-heading line-clamp-1">{{ productName(rp) }}</h3>
              <div class="price-new text-sm">{{ rp.price_range || $t("home.price_contact") }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Not found -->
    <div v-else class="container-custom py-20 text-center">
      <div class="text-5xl mb-4">🔍</div>
      <h2 class="text-xl font-bold text-beike-heading mb-2">{{ $t('common.no_data') }}</h2>
      <router-link to="/products" class="text-beike-primary hover:underline text-sm">← {{ $t('products.back_to_list') }}</router-link>
    </div>

    <QuickInquiryModal :visible="quickInquiryOpen" :product-name="product ? productName(product) : ''" @close="quickInquiryOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { products, categories } from '@/assets/mock/products'
import { useFavoriteStore } from '@/stores/favorites'
import QuickInquiryModal from '@/components/QuickInquiryModal.vue'

const route = useRoute()
const { locale, t } = useI18n()
const favStore = useFavoriteStore()
const mainImage = ref(null)
const zoomStyle = ref(null)
const zoomPos = ref('0% 0%')
const zoomBg = ref('none')

function onImageZoom(e) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  zoomPos.value = x + '% ' + y + '%'
  zoomBg.value = 'url(' + (product.value?.images?.[currentImageIndex.value] || product.value?.image) + ')'
  zoomStyle.value = 'zoom'
}

function resetZoom() {
  zoomStyle.value = null
  zoomPos.value = '0% 0%'
}
const quickInquiryOpen = ref(false)
const currentImageIndex = ref(0)
const detailTab = ref('desc')

const fallbackImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect fill='%23f1f5f9' width='600' height='400'/><text x='300' y='210' text-anchor='middle' fill='%2394a3b8' font-size='20'>📷</text></svg>`)}`
function onImgError(e) { e.target.src = fallbackImg }

const product = computed(() => products.find(p => p.id === route.params.id))

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.category === product.value.category && p.id !== product.value.id).slice(0, 4)
})

const specs = computed(() => {
  if (!product.value) return {}
  return product.value.specs || {
    [t('products.material')]: product.value.material || t('products.oem_odm'),
    [t('products.power')]: product.value.power || t('products.certified'),
    [t('products.warranty')]: t('products.lead_time'),
    [t('products.certification')]: 'CE, RoHS, ISO 9001',
    [t('products.weight')]: t('inquiry.contact_name'),
  }
})

function productName(p) {
  const lang = locale.value
  if (lang === 'en') return p.name_en
  if (lang === 'ko') return p.name_ko
  if (lang === 'ja') return p.name_ja
  return p.name_cn
}

function productDescription(p) {
  const lang = locale.value
  if (lang === 'en') return p.desc_en
  if (lang === 'ko') return p.desc_ko
  if (lang === 'ja') return p.desc_ja
  return p.desc_cn
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
