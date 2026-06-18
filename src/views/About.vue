<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-[#f6f6f6]">
      <div class="container-custom py-4 flex items-center gap-2 text-sm text-beike-muted">
        <router-link to="/" class="hover:text-beike-primary">{{ $t('common.home') }}</router-link>
        <span>/</span>
        <span class="text-beike-body font-medium">{{ $t('nav.about') }}</span>
      </div>
    </div>

    <!-- Hero -->
    <section class="relative overflow-hidden">
      <div class="h-48 md:h-64 bg-gradient-to-r from-gray-900 to-gray-800 flex items-center">
        <div class="container-custom">
          <h1 class="text-3xl md:text-5xl font-bold text-white">{{ $t('about.title') }}</h1>
          <p class="text-white/70 mt-2 max-w-lg">{{ $t("about.subtitle") }}</p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-12 md:py-20">
      <div class="container-custom">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="section-title-custom text-left">{{ $t('about.story_title') }}</h2>
            <div class="wave-line wave-line-primary mt-3 mb-6" style="margin-left: 0;"></div>
            <p class="text-sm text-beike-muted leading-relaxed mb-4">
              {{ $t("about.story_p1") }}
            </p>
            <p class="text-sm text-beike-muted leading-relaxed mb-4">
              {{ $t("about.story_p2") }}
            </p>
            <p class="text-sm text-beike-muted leading-relaxed">
              {{ $t("about.story_p3") }}
            </p>
          </div>
          <div class="bg-gray-100 rounded-2xl h-80 flex items-center justify-center text-6xl">
            🏢
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-12 md:py-16 bg-[#f6f6f8]">
      <div class="container-custom">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-beike-primary mb-1">{{ stat.value }}</div>
            <div class="text-sm text-beike-muted">{{ t(stat.labelKey) }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-12 md:py-20">
      <div class="container-custom">
        <div class="text-center mb-10">
          <h2 class="section-title-custom">{{ $t('about.values_title') }}</h2>
          <div class="wave-line wave-line-primary mt-3"></div>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="(v, idx) in values" :key="idx"
               class="bg-white rounded-xl border border-gray-200 p-8 text-center
                      transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
            <div class="w-16 h-16 mx-auto mb-5 rounded-full bg-beike-primary-light flex items-center justify-center">
              <span class="text-2xl">{{ v.icon }}</span>
            </div>
            <h3 class="text-lg font-bold text-beike-heading mb-3">{{ t(v.titleKey) }}</h3>
            <p class="text-sm text-beike-muted leading-relaxed">{{ t(v.descKey) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-16 bg-beike-primary">
      <div class="container-custom text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ $t('about.cta_title') }}</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8 text-sm">{{ $t("about.cta_desc") }}</p>
        <router-link to="/contact" class="inline-flex items-center gap-2 bg-white text-beike-primary font-bold px-8 py-3.5 rounded-md hover:bg-gray-100 transition-all">
          {{ $t('nav.contact') }}
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const stats = [
  { value: "2010", labelKey: "about.stats_founded" },
  { value: "50+", labelKey: "about.stats_countries" },
  { value: "200+", labelKey: "about.stats_team" },
  { value: "$150M+", labelKey: "about.stats_export" },
]

const values = [
  { icon: "🤝", titleKey: "about.value1_title", descKey: "about.value1_desc" },
  { icon: "⭐", titleKey: "about.value2_title", descKey: "about.value2_desc" },
  { icon: "💡", titleKey: "about.value3_title", descKey: "about.value3_desc" },
]
</script>
