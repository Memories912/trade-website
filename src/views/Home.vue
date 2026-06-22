<template>
  <div>
    <!-- ======== Hero Carousel (BeikeShop style) ======== -->
    <section class="relative overflow-hidden bg-beike-bg">
      <div class="relative h-[300px] md:h-[450px] lg:h-[520px]">
        <div
          v-for="(slide, idx) in heroSlides"
          :key="idx"
          class="absolute inset-0 transition-all duration-700 ease-in-out"
          :class="currentSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'"
        >
          <div class="absolute inset-0" :class="slide.bg"></div>
          <!-- Pattern overlay -->
          <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 40px 40px;"></div>
          <!-- Decorative floating circles -->
          <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5"></div>
          <div class="absolute -bottom-32 -left-16 w-80 h-80 rounded-full bg-white/5"></div>
          <div class="container-custom relative h-full flex items-center">
            <div class="max-w-xl">
              <span class="inline-block px-3 py-1 text-xs font-bold rounded-full bg-white/20 text-white mb-4 backdrop-blur-sm">
                {{ $t(slide.tagKey) }}
              </span>
              <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
                {{ $t(slide.titleKey) }}
              </h1>
              <p class="text-sm md:text-base text-white/80 mb-6 max-w-md leading-relaxed">
                {{ $t(slide.descKey) }}
              </p>
              <div class="flex gap-3">
                <router-link to="/products" class="btn-dark-custom px-6 py-3 text-sm">
                  {{ $t(slide.ctaKey) }}
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </router-link>
                <router-link to="/inquiry" class="inline-flex items-center gap-2 text-sm font-bold text-white/90 hover:text-white border border-white/30 hover:border-white/60 rounded-md px-5 py-3 transition-all">
                  {{ $t("nav.contact") }}
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <!-- Carousel Controls -->
        <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all z-10">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all z-10">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>

        <!-- Dots -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          <button v-for="(_, idx) in heroSlides" :key="idx" @click="currentSlide = idx"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlide === idx ? 'w-8 bg-white' : 'bg-white/50'"
          ></button>
        </div>
      </div>
    </section>

    <!-- ======== Featured Products (BeikeShop style) ======== -->
    <section class="py-12 md:py-20 bg-white scroll-reveal" ref="sectionRefs" data-index="0">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title-custom">{{ $t('home.featured_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
          <p class="section-sub-title">{{ $t('home.featured_subtitle') }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="product in featuredProducts" :key="product.id"
               class="product-card group" @click="$router.push(`/products/${product.id}`)">
            <div class="product-card-image">
              <img :src="product.image" :alt="productName(product)" class="product-card-img"
                   loading="lazy" @error="onImgError" />
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
                <span class="badge-custom bg-beike-primary-light text-beike-primary text-[10px] mb-2 inline-flex items-center gap-1">
                  <component :is="iconMap[getCategoryIcon(product.category)] || iconMap['package']" class="w-3 h-3" />
                  {{ getCategoryLabel(product.category) }}
                </span>
                <h3 class="text-sm font-bold text-beike-heading line-clamp-1 mb-1">{{ productName(product) }}</h3>
                <div v-if="product.price_range" class="text-sm font-bold text-beike-primary mb-2">{{ product.price_range }}</div>
                <div class="flex items-center justify-center gap-3 text-xs text-beike-muted mb-3">
                  <span class="badge-gray">MOQ: {{ product.moq }}</span>
                  <span class="badge-gray">{{ product.lead_time }}</span>
                </div>
                <router-link :to="`/products/${product.id}`" class="btn-primary-custom text-xs px-4 py-2 w-full justify-center inline-flex">
                  {{ $t('products.inquiry_now') }}
                </router-link>
              </div>
          </div>
        </div>

        <div class="text-center mt-10">
          <router-link to="/products" class="btn-outline-custom px-8 py-3">
            {{ $t('home.view_all') }}
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- ======== Categories (BeikeShop style) ======== -->
    <section class="py-12 md:py-20 bg-orange-50/50 scroll-reveal" ref="sectionRefs" data-index="1">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title-custom">{{ $t('home.categories_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
          <p class="section-sub-title">{{ $t('home.categories_subtitle') }}</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div v-for="cat in categories" :key="cat.id"
               @click="goToCategory(cat)"
               class="bg-white rounded-xl border border-gray-200 p-6 text-center cursor-pointer
                      transition-all duration-300 hover:shadow-card-hover hover:border-beike-primary/30 hover:-translate-y-1"
          >
            <div class="w-10 h-10 mx-auto mb-3 rounded-lg bg-beike-primary-light flex items-center justify-center">
              <component :is="iconMap[cat.icon] || iconMap['package']" class="w-5 h-5 text-beike-primary" />
            </div>
            <h3 class="text-sm font-bold text-beike-heading">{{ catName(cat) }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== How it Works ======== -->
    <section class="py-12 md:py-20 scroll-reveal" ref="sectionRefs" data-index="2">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title-custom">{{ $t('home.how_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
          <p class="section-sub-title">{{ $t('home.how_subtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div v-for="(step, idx) in howSteps" :key="idx" class="text-center">
            <div class="relative">
              <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-beike-primary-light flex items-center justify-center">
                <component :is="iconMap[step.icon] || iconMap['file-text']" class="w-7 h-7 text-beike-primary" />
              </div>
              <!-- Connector line -->
              <div v-if="idx < howSteps.length - 1" class="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-beike-primary/20 -z-10"></div>
            </div>
            <div class="w-7 h-7 mx-auto mb-2 rounded-full bg-beike-primary text-white text-xs font-bold flex items-center justify-center relative z-10">{{ idx + 1 }}</div>
            <h3 class="text-sm font-bold text-beike-heading mb-1">{{ t(step.titleKey) }}</h3>
            <p class="text-xs text-beike-muted leading-relaxed">{{ t(step.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== Why Choose Us ======== -->
    <section class="py-12 md:py-20 bg-white scroll-reveal" ref="sectionRefs" data-index="3">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title-custom">{{ $t('home.why_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
          <p class="section-sub-title">{{ $t('home.why_subtitle') }}</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(item, idx) in features" :key="idx"
               class="bg-white rounded-xl border border-gray-200 p-8 text-center
                      transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-beike-primary-light flex items-center justify-center">
              <component :is="iconMap[item.icon]" class="w-7 h-7 text-beike-primary" />
            </div>
            <h3 class="text-lg font-bold text-beike-heading mb-3">{{ t(item.titleKey) }}</h3>
            <p class="text-sm text-beike-muted leading-relaxed">{{ t(item.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ======== CTA Banner ======== -->
    <section class="py-16 md:py-24 bg-beike-primary scroll-reveal" ref="sectionRefs" data-index="4">
      <div class="container-custom text-center">
        <h2 class="text-2xl md:text-4xl font-bold text-white mb-4">{{ $t('home.cta_title') }}</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8 text-sm md:text-base">
          {{ $t('home.cta_desc') }}
        </p>
          <div class="flex justify-center gap-4">
            <router-link to="/inquiry" class="inline-flex items-center gap-2 bg-white text-beike-primary font-bold px-8 py-3.5 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              <SendIcon class="w-4 h-4" />
              {{ $t("home.cta_inquiry") }}
            </router-link>
            <router-link to="/contact" class="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all duration-300">
              {{ $t("home.cta_contact") }}
            </router-link>
          </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { products, categories } from '@/assets/mock/products'
import { useFavoriteStore } from '@/stores/favorites'
import { Factory, BadgeCheck, Globe, Package, Image, Send, FileText, MessageSquare, Zap, Plug, Search, SprayCan, Crosshair, Cog, Gauge, Droplet } from 'lucide-vue-next'

const { locale, t } = useI18n()
const router = useRouter()
const favStore = useFavoriteStore()

const iconMap = {
  'factory': Factory,
  'badge-check': BadgeCheck,
  'globe': Globe,
  'package': Package,
  'image': Image,
  'file-text': FileText,
  'message-square': MessageSquare,
  'send': Send,
  'zap': Zap,
  'plug': Plug,
  'search': Search,
  'spray-can': SprayCan,
  'crosshair': Crosshair,
  'cog': Cog,
  'gauge': Gauge,
  'droplet': Droplet,
}

const fallbackImg = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect fill='%23f1f5f9' width='600' height='400'/><text x='300' y='210' text-anchor='middle' fill='%2394a3b8' font-size='20'>📷</text></svg>`)}`
function onImgError(e) { e.target.src = fallbackImg }

// ======== Hero Carousel ========
const currentSlide = ref(0)
const heroSlides = [
  { tagKey: "hero.slide1_tag", titleKey: "hero.slide1_title", descKey: "hero.slide1_desc", ctaKey: "hero.slide1_cta", bg: "bg-gradient-to-r from-[#fd560f] via-[#ff7a2f] to-[#ff9a4a]" },
  { tagKey: "hero.slide2_tag", titleKey: "hero.slide2_title", descKey: "hero.slide2_desc", ctaKey: "hero.slide2_cta", bg: "bg-gradient-to-r from-[#0f4c81] via-[#2a6fbf] to-[#4a9eff]" },
  { tagKey: "hero.slide3_tag", titleKey: "hero.slide3_title", descKey: "hero.slide3_desc", ctaKey: "hero.slide3_cta", bg: "bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#c084fc]" },
]

let carouselTimer = null
function startCarousel() {
  carouselTimer = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  }, 5000)
}
function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + heroSlides.length) % heroSlides.length
  resetCarousel()
}
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % heroSlides.length
  resetCarousel()
}
function resetCarousel() {
  clearInterval(carouselTimer)
  startCarousel()
}

// ======== Product data ========
const featuredProducts = computed(() => products.filter(p => p.status !== 'inactive').slice(0, 4))

function productName(product) {
  const lang = locale.value
  if (lang === 'en') return product.name_en
  if (lang === 'ko') return product.name_ko
  if (lang === 'ja') return product.name_ja
  return product.name_cn
}

function getPrice(product) {
  const prices = product.prices || {}
  return (prices[locale.value] || prices.en) ? (prices[locale.value] || prices.en) : t("home.price_contact")
}

function catName(cat) {
  return t(cat.key || cat.id)
}

function goToCategory(cat) {
  if (cat.id === 'all') {
    router.push('/products')
  } else {
    router.push({ path: '/products', query: { category: cat.id } })
  }
}

function getCategoryLabel(catId) {
  const cat = categories.find(c => c.id === catId)
  return cat ? t(cat.key) : catId
}

function getCategoryIcon(catId) {
  const cat = categories.find(c => c.id === catId)
  return cat ? cat.icon : 'package'
}

const howSteps = [
  { icon: 'file-text', titleKey: 'home.how_step1_title', descKey: 'home.how_step1_desc' },
  { icon: 'message-square', titleKey: 'home.how_step2_title', descKey: 'home.how_step2_desc' },
  { icon: 'package', titleKey: 'home.how_step3_title', descKey: 'home.how_step3_desc' },
  { icon: 'badge-check', titleKey: 'home.how_step4_title', descKey: 'home.how_step4_desc' },
]

const features = [
  { icon: 'factory', titleKey: "home.feature_factory", descKey: "home.feature_factory_desc" },
  { icon: 'badge-check', titleKey: "home.feature_quality", descKey: "home.feature_quality_desc" },
  { icon: 'globe', titleKey: "home.feature_logistics", descKey: "home.feature_logistics_desc" },
]

// ======== Scroll Reveal ========
const sectionRefs = ref([])

function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  // Use setTimeout to ensure DOM is ready
  setTimeout(() => {
    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el)
    })
  }, 100)

  return observer
}

let observer = null
onMounted(() => {
  startCarousel()
  observer = setupScrollReveal()
})

onUnmounted(() => {
  clearInterval(carouselTimer)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* ===== Section Title Decoration ===== */
.section-title-custom {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  color: #282828;
  text-align: center;
}

.wave-line {
  width: 50px;
  height: 3px;
  margin: 0.5rem auto 0;
  border-radius: 2px;
  position: relative;
  overflow: hidden;
}
.wave-line::after {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 200%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
  animation: shimmer 2s infinite;
}
.wave-line-primary { background: #fd560f; }
@keyframes shimmer {
  0% { transform: translateX(0); }
  100% { transform: translateX(50%); }
}

.section-sub-title {
  font-size: 0.875rem;
  color: #999;
  margin-top: 0.25rem;
  text-align: center;
}

/* ===== Product Card (BeikeShop style) ===== */
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

/* ===== Hero Carousel ===== */
.hero-carousel {
  overflow: hidden;
}

/* ===== Scroll Reveal ===== */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.scroll-reveal.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* ===== Buttons ===== */
.btn-dark-custom {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #282828;
  color: #fff;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}
.btn-dark-custom:hover {
  background: #1a1a1a;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-outline-custom {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border: 2px solid #fff;
  color: #fff;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  transition: all 0.2s;
}
.btn-outline-custom:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-1px);
}
</style>
