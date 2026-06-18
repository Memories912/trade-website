<template>
  <footer class="bg-[#f6f6f8] mt-4 md:mt-20">
    <!-- Services Bar (like BeikeShop .services-wrap) -->
    <div class="border-b border-gray-200 hidden md:block">
      <div class="container-custom py-6">
        <div class="grid grid-cols-4 gap-6">
          <div v-for="s in services" :key="s.titleKey" class="flex items-center gap-3">
            <div class="text-2xl shrink-0">{{ s.icon }}</div>
            <div>
              <div class="text-sm font-bold text-beike-heading">{{ t(s.titleKey) }}</div>
              <div class="text-xs text-beike-light">{{ t(s.subKey) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Content (like BeikeShop .footer-content) -->
    <div class="container-custom py-8 md:py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 rounded-lg bg-beike-primary flex items-center justify-center text-white font-bold text-lg">
              B
            </div>
            <div>
              <div class="text-base font-bold text-beike-heading leading-tight">{{ $t('nav.brand_name') }}</div>
              <div class="text-[10px] text-beike-light leading-tight">{{ $t('nav.brand_sub') }}</div>
            </div>
          </div>
          <p class="text-sm text-beike-muted leading-relaxed mb-4">
            {{ $t("footer.company_desc") }}
          </p>
          <div class="flex gap-2">
            <!-- WhatsApp -->
            <a href="https://wa.me/8613900000000" target="_blank"
               class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center
                      text-beike-muted hover:text-[#25D366] hover:border-[#25D366]
                      transition-all duration-300 hover:-translate-y-1" title="WhatsApp">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            <!-- Facebook -->
            <a href="https://facebook.com" target="_blank"
               class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center
                      text-beike-muted hover:text-[#1877F2] hover:border-[#1877F2]
                      transition-all duration-300 hover:-translate-y-1" title="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <!-- LinkedIn -->
            <a href="https://linkedin.com" target="_blank"
               class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center
                      text-beike-muted hover:text-[#0A66C2] hover:border-[#0A66C2]
                      transition-all duration-300 hover:-translate-y-1" title="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <!-- YouTube -->
            <a href="https://youtube.com" target="_blank"
               class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center
                      text-beike-muted hover:text-[#FF0000] hover:border-[#FF0000]
                      transition-all duration-300 hover:-translate-y-1" title="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <!-- Instagram -->
            <a href="https://instagram.com" target="_blank"
               class="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center
                      text-beike-muted hover:text-[#E4405F] hover:border-[#E4405F]
                      transition-all duration-300 hover:-translate-y-1" title="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.05 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.362 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.362-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.909-1.38-.164-.42-.362-1.065-.413-2.235-.058-1.274-.07-1.649-.07-4.859 0-3.211.015-3.586.07-4.859.061-1.17.255-1.816.42-2.236.224-.569.479-.96.899-1.379.419-.421.824-.69 1.38-.909.42-.164 1.065-.362 2.235-.413 1.256-.057 1.632-.07 4.85-.07zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.881 0 1.441 1.441 0 012.882 0z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h6 class="text-sm font-bold text-beike-heading mb-4">{{ $t('footer.quick_links') }}</h6>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.labelKey">
              <router-link :to="link.path" class="text-sm text-beike-muted hover:text-beike-primary transition-colors">
                {{ t(link.labelKey) }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Products -->
        <div>
          <h6 class="text-sm font-bold text-beike-heading mb-4">{{ $t("footer.products") }}</h6>
          <ul class="space-y-2">
            <li v-for="cat in footerCategories" :key="cat.id">
              <router-link :to="{ path: '/products', query: { category: cat.id } }"
                          class="text-sm text-beike-muted hover:text-beike-primary transition-colors">
                {{ catIcon(cat.icon) }} {{ catName(cat) }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h6 class="text-sm font-bold text-beike-heading mb-4">{{ $t('footer.contact_us') }}</h6>
          <ul class="space-y-3">
            <li class="flex items-start gap-2.5">
              <svg class="w-4 h-4 text-beike-primary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span class="text-sm text-beike-muted">{{ $t("contact.address_detail") }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-beike-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span class="text-sm text-beike-muted">{{ $t("topbar.phone") }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-beike-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span class="text-sm text-beike-muted">{{ $t("topbar.email") }}</span>
            </li>
            <li class="flex items-center gap-2.5">
              <svg class="w-4 h-4 text-beike-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="text-sm text-beike-muted">{{ $t("contact.work_time_detail") }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Bottom Bar (like BeikeShop .footer-bottom) -->
    <div class="bg-[#EFEFF4]">
      <div class="container-custom py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-beike-muted">
        <span>{{ $t('footer.rights') }}</span>
        <span class="flex items-center gap-4">
          <a href="#" class="hover:text-beike-primary transition-colors">{{ $t('footer.privacy') }}</a>
          <a href="#" class="hover:text-beike-primary transition-colors">{{ $t('footer.terms') }}</a>
        </span>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { categories } from '@/assets/mock/products'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const services = [
  { icon: '🚚', titleKey: 'footer.service_free_shipping', subKey: 'footer.service_free_shipping_sub' },
  { icon: '🔒', titleKey: 'footer.service_secure_payment', subKey: 'footer.service_secure_payment_sub' },
  { icon: '🔄', titleKey: 'footer.service_easy_return', subKey: 'footer.service_easy_return_sub' },
  { icon: '💬', titleKey: 'footer.service_support', subKey: 'footer.service_support_sub' },
]


const quickLinks = [
  { path: '/products', labelKey: 'nav.products' },
  { path: '/inquiry', labelKey: 'nav.inquiry' },
  { path: '/sourcing', labelKey: 'nav.sourcing' },
  { path: '/knowledge', labelKey: 'nav.knowledge' },
  { path: '/contact', labelKey: 'nav.contact' },
  { path: '/about', labelKey: 'nav.about' },
]

const footerCategories = categories.slice(0, 4)

function catIcon(icon) {
  return icon || '📦'
}

function catName(cat) {
  return t(cat.key || cat.id)
}
</script>
