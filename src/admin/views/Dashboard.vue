<template>
  <div class="flex flex-col gap-4 pb-[60px]">

    <!-- Stats cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <StatsCard :title="t('admin.dashboard.total_users')" :value="stats.totalUsers" :icon="Users"
        icon-bg-class="bg-blue-50" icon-class="text-blue-500" :trend="12" />
      <StatsCard :title="t('admin.dashboard.total_products')" :value="stats.totalProducts" :icon="Package"
        icon-bg-class="bg-green-50" icon-class="text-green-500" :trend="5" />
      <StatsCard :title="t('admin.dashboard.pending_inquiries')" :value="stats.pendingInquiries" :icon="MessageSquare"
        icon-bg-class="bg-amber-50" icon-class="text-amber-500" :trend="-3" />
      <StatsCard :title="t('admin.dashboard.pending_sourcing')" :value="stats.pendingSourcing" :icon="Search"
        icon-bg-class="bg-purple-50" icon-class="text-purple-500" :trend="8" />
    </div>

    <!-- 近30天询盘趋势 —— 直接画canvas -->
    <div class="bg-white rounded-lg shadow-card p-5">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-sm font-semibold text-beike-heading">{{ t('admin.dashboard.inquiry_trend') }}</h3>
          <p class="text-xs text-beike-light mt-0.5">{{ trendRangeText }} · 共 {{ trendTotal }} 条</p>
        </div>
      </div>
      <div style="height:220px;position:relative">
        <canvas ref="trendCanvas" style="width:100%;height:100%" />
      </div>
      <div class="flex flex-wrap gap-x-5 gap-y-1 mt-2 text-xs">
        <span class="text-beike-muted">日期范围: <strong class="text-beike-heading">{{ trendRangeText }}</strong></span>
        <span class="text-beike-muted">总计: <strong class="text-beike-heading">{{ trendTotal }}</strong> 条</span>
        <span class="text-beike-muted">日均: <strong class="text-beike-heading">{{ trendDailyAvg }}</strong> 条</span>
        <span class="text-beike-muted">最高: <strong class="text-beike-heading">{{ trendMax }}</strong> 条</span>
        <span class="text-beike-muted">最低: <strong class="text-beike-heading">{{ trendMin }}</strong> 条</span>
      </div>
    </div>

    <!-- 产品分类 + 用户国家 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div class="bg-white rounded-lg shadow-card p-5">
        <h3 class="text-sm font-semibold text-beike-heading mb-4">{{ t('admin.dashboard.category_distribution') }}</h3>
        <div style="height:220px;position:relative">
          <canvas ref="catCanvas" style="width:100%;height:100%" />
        </div>
        <div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
          <div v-for="c in categoryBreakdown" :key="c.name" class="flex items-center gap-1.5 text-xs">
            <span class="w-2.5 h-2.5 rounded-full shrink-0" :style="{ background: c.color }"></span>
            <span class="text-beike-body">{{ c.name }}</span>
            <span class="font-semibold text-beike-heading">{{ c.count }}</span>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-card p-5">
        <h3 class="text-sm font-semibold text-beike-heading mb-4">{{ t('admin.dashboard.country_distribution') }}</h3>
        <div style="height:220px;position:relative">
          <canvas ref="countryCanvas" style="width:100%;height:100%" />
        </div>
      </div>
    </div>

    <!-- Recent lists -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div class="bg-white rounded-lg shadow-card p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-beike-heading">{{ t('admin.dashboard.recent_inquiries') }}</h3>
          <router-link to="/admin/inquiries" class="text-xs text-beike-primary hover:underline">{{ t('admin.common.view_all') }}</router-link>
        </div>
        <div class="space-y-2">
          <div v-for="inq in recentInquiries" :key="inq.id" class="flex items-center justify-between py-1.5 border-b border-beike-border last:border-0">
            <div class="min-w-0 flex-1 mr-2">
              <p class="text-sm font-medium text-beike-heading truncate">{{ inq.productName }}</p>
              <p class="text-xs text-beike-muted">{{ inq.customer.name }} · {{ inq.customer.country }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <StatusBadge :status="inq.status" />
              <span class="text-xs text-beike-light">{{ inq.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-lg shadow-card p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-semibold text-beike-heading">{{ t('admin.dashboard.recent_sourcing') }}</h3>
          <router-link to="/admin/sourcing" class="text-xs text-beike-primary hover:underline">{{ t('admin.common.view_all') }}</router-link>
        </div>
        <div class="space-y-2">
          <div v-for="sr in recentSourcing" :key="sr.id" class="flex items-center justify-between py-1.5 border-b border-beike-border last:border-0">
            <div class="min-w-0 flex-1 mr-2">
              <p class="text-sm font-medium text-beike-heading truncate">{{ sr.title }}</p>
              <p class="text-xs text-beike-muted">{{ sr.customer.name }} · {{ sr.customer.country }}</p>
            </div>
            <div class="flex items-center gap-2 shrink-0">
              <StatusBadge :status="sr.status" type="sourcing" />
              <span class="text-xs text-beike-light">{{ sr.createdAt }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { Users, Package, MessageSquare, Search } from 'lucide-vue-next'
import { useAdminInquiryStore } from '@/stores/adminInquiry'
import { useAdminSourcingStore } from '@/stores/adminSourcing'
import { useAdminProductStore } from '@/stores/adminProduct'
import { mockUsers, mockInquiryTrend } from '@/assets/mock/admin'
import {
  Chart as ChartJS,
  LineController,
  DoughnutController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import StatsCard from '@/admin/components/StatsCard.vue'
import StatusBadge from '@/admin/components/StatusBadge.vue'

ChartJS.register(
  LineController, DoughnutController, BarController,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
)

const { t } = useI18n()
const inquiryStore = useAdminInquiryStore()
const sourcingStore = useAdminSourcingStore()
const productStore = useAdminProductStore()

const trendCanvas = ref(null)
const catCanvas = ref(null)
const countryCanvas = ref(null)

onMounted(() => {
  inquiryStore.fetchInquiries()
  sourcingStore.fetchRequests()
  productStore.fetchProducts()
})

// ─── Stats ───
const stats = computed(() => ({
  totalUsers: mockUsers.length,
  totalProducts: productStore.totalProducts,
  pendingInquiries: inquiryStore.pendingCount,
  pendingSourcing: sourcingStore.pendingCount,
}))

// ─── Recent lists ───
const recentInquiries = computed(() =>
  [...inquiryStore.inquiries].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
)
const recentSourcing = computed(() =>
  [...sourcingStore.requests].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5)
)

// ─── 近30天询盘趋势 ───
const trendRangeText = computed(() => {
  if (!mockInquiryTrend.length) return ''
  const first = mockInquiryTrend[0].date
  const last = mockInquiryTrend[mockInquiryTrend.length - 1].date
  return `${first} ~ ${last}`
})

const trendTotal = computed(() =>
  mockInquiryTrend.reduce((sum, d) => sum + d.count, 0)
)

const trendDailyAvg = computed(() =>
  mockInquiryTrend.length ? (trendTotal.value / mockInquiryTrend.length).toFixed(1) : '0'
)

const trendMax = computed(() =>
  mockInquiryTrend.length ? Math.max(...mockInquiryTrend.map(d => d.count)) : 0
)

const trendMin = computed(() =>
  mockInquiryTrend.length ? Math.min(...mockInquiryTrend.map(d => d.count)) : 0
)

// ─── 产品分类 ───
const categoryColors = ['#fd560f', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#6366f1']

const categoryBreakdown = computed(() => {
  const catMap = {}
  productStore.products.forEach(p => {
    const cat = p.category || 'other'
    catMap[cat] = (catMap[cat] || 0) + 1
  })
  const keys = Object.keys(catMap)
  return keys.map((key, i) => ({
    name: t(`products.${key}`),
    key, count: catMap[key],
    color: categoryColors[i % categoryColors.length],
  }))
})

// ─── 国家旗帜映射 ───
const countryFlags = {
  'Korea': '🇰🇷', 'Japan': '🇯🇵', 'USA': '🇺🇸', 'Germany': '🇩🇪',
  'China': '🇨🇳', 'UK': '🇬🇧', 'France': '🇫🇷', 'Australia': '🇦🇺',
  'Spain': '🇪🇸', 'Italy': '🇮🇹', 'Canada': '🇨🇦',
}

// 国家柱状图配色（高对比度）
const countryBarColors = [
  '#fd560f', '#2563eb', '#059669', '#d97706', '#7c3aed',
  '#db2777', '#0891b2', '#65a30d', '#ca8a04', '#be185d',
  '#0d9488',
]

// ─── 用户国家 ───
const countryBreakdown = computed(() => {
  const countryMap = {}
  mockUsers.forEach(u => { countryMap[u.country] = (countryMap[u.country] || 0) + 1 })
  return Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count], i) => ({
      name,
      flag: countryFlags[name] || '🏳️',
      count,
      color: countryBarColors[i % countryBarColors.length],
    }))
})

// ─── 绘制所有图表（带动画+悬浮效果） ───
function drawCharts() {
  if (!trendCanvas.value || !catCanvas.value || !countryCanvas.value) return

  const dailyData = mockInquiryTrend
  const catData = categoryBreakdown.value
  const countryData = countryBreakdown.value

  // 1) 趋势 — 每日波动折线图
  const ctx1 = trendCanvas.value.getContext('2d')
  const parent1 = trendCanvas.value.parentElement
  trendCanvas.value.width = parent1.clientWidth || 600
  trendCanvas.value.height = parent1.clientHeight || 200

  // 每日涨跌颜色标记
  const dailyColors = dailyData.map((d, i) => {
    if (i === 0) return '#fd560f'
    return d.count >= dailyData[i - 1].count ? '#10b981' : '#ef4444'
  })

  const grad1 = ctx1.createLinearGradient(0, 0, 0, trendCanvas.value.height)
  grad1.addColorStop(0, 'rgba(253,86,15,0.2)')
  grad1.addColorStop(0.6, 'rgba(253,86,15,0.06)')
  grad1.addColorStop(1, 'rgba(253,86,15,0.01)')

  new ChartJS(ctx1, {
    type: 'line',
    data: {
      labels: dailyData.map(d => d.date.slice(5)),
      datasets: [{
        label: '询盘数',
        data: dailyData.map(d => d.count),
        borderColor: '#fd560f',
        borderWidth: 2.5,
        backgroundColor: grad1,
        fill: true,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 9,
        pointBackgroundColor: dailyColors,
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#fd560f',
        pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2d',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 14,
          cornerRadius: 8,
          boxPadding: 8,
          callbacks: {
            title: (items) => {
              const raw = dailyData[items[0].dataIndex]
              return raw ? `${raw.date} · 周${['日','一','二','三','四','五','六'][new Date(raw.date).getDay()]}` : ''
            },
            label: (ctx) => {
              const prev = ctx.dataIndex > 0 ? dailyData[ctx.dataIndex - 1].count : ctx.parsed.y
              const diff = ctx.parsed.y - prev
              const arrow = diff > 0 ? '↑' : diff < 0 ? '↓' : '→'
              return `  ${ctx.parsed.y} 条  ${arrow} ${Math.abs(diff)}`
            },
          },
        },
      },
      hover: {
        mode: 'index',
        intersect: false,
      },
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
          ticks: { stepSize: 1, padding: 8, color: '#999' },
        },
        x: {
          grid: { display: false },
          ticks: { maxTicksLimit: 10, color: '#999', font: { size: 11 } },
        },
      },
    },
  })

  // 2) 分类 — 带悬浮效果的环形图
  const ctx2 = catCanvas.value.getContext('2d')
  const parent2 = catCanvas.value.parentElement
  catCanvas.value.width = parent2.clientWidth || 300
  catCanvas.value.height = parent2.clientHeight || 200

  new ChartJS(ctx2, {
    type: 'doughnut',
    data: {
      labels: catData.map(c => c.name),
      datasets: [{
        data: catData.map(c => c.count),
        backgroundColor: catData.map(c => c.color),
        borderWidth: 3,
        borderColor: '#fff',
        hoverBorderColor: '#fff',
        hoverBorderWidth: 4,
        hoverOffset: 12,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '58%',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2d',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            label: (ctx) => {
              const total = ctx.dataset.data.reduce((a, b) => a + b, 0)
              const pct = ((ctx.parsed / total) * 100).toFixed(1)
              return `  ${ctx.label}: ${ctx.parsed} 个 (${pct}%)`
            },
          },
        },
      },
      animation: {
        animateRotate: true,
        duration: 1000,
        easing: 'easeOutElastic',
      },
    },
  })

  // 3) 国家 — 带动画的横向柱状图（含国旗标识+高对比色）
  const ctx3 = countryCanvas.value.getContext('2d')
  const parent3 = countryCanvas.value.parentElement
  countryCanvas.value.width = parent3.clientWidth || 300
  countryCanvas.value.height = parent3.clientHeight || 200

  new ChartJS(ctx3, {
    type: 'bar',
    data: {
      labels: countryData.map(c => c.flag + ' ' + c.name),
      datasets: [{
        label: '用户数',
        data: countryData.map(c => c.count),
        backgroundColor: countryData.map(c => c.color),
        borderRadius: 6,
        borderSkipped: false,
        barThickness: 26,
        hoverBackgroundColor: countryData.map(c => c.color),
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e1e2d',
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 12,
          cornerRadius: 8,
          callbacks: {
            title: (items) => items[0].label,
            label: (ctx) => `  ${ctx.parsed.x} 个用户`,
          },
        },
      },
      hover: {
        mode: 'index',
        intersect: true,
      },
      animation: {
        duration: 800,
        easing: 'easeOutBounce',
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.06)', drawBorder: false },
          ticks: { stepSize: 1, color: '#999' },
        },
        y: {
          grid: { display: false },
          ticks: { color: '#555', font: { size: 11, weight: 'bold' } },
        },
      },
    },
  })
}

onMounted(() => {
  requestAnimationFrame(() => requestAnimationFrame(drawCharts))
})
</script>
