<template>
  <div ref="wrapperRef" style="width:100%;height:100%;position:relative;background:#fafafa;border-radius:4px;min-height:180px">
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
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

ChartJS.register(
  LineController, DoughnutController, BarController,
  CategoryScale, LinearScale, PointElement, LineElement,
  ArcElement, BarElement, Title, Tooltip, Legend, Filler
)

const props = defineProps({
  type: { type: String, default: 'line' },
  data: { type: Object, required: true },
  options: { type: Object, default: () => ({}) },
})

const canvasRef = ref(null)
const wrapperRef = ref(null)
let chartInstance = null

function createChart() {
  const canvas = canvasRef.value
  const wrapper = wrapperRef.value
  if (!canvas || !wrapper || !props.data) return

  try {
    if (chartInstance) {
      chartInstance.destroy()
      chartInstance = null
    }

    // Force explicit canvas size
    canvas.width = wrapper.clientWidth || 400
    canvas.height = wrapper.clientHeight || 200

    // Merge default options with user options
    const mergedOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      ...props.options,
      plugins: {
        legend: { display: false },
        ...(props.options?.plugins || {}),
      },
    }

    chartInstance = new ChartJS(canvas, {
      type: props.type,
      data: props.data,
      options: mergedOptions,
    })
  } catch (err) {
    console.warn('[Chart] error:', props.type, err.message)
  }
}

// Use requestAnimationFrame to wait for layout
function scheduleCreate() {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      createChart()
    })
  })
}

onMounted(() => {
  scheduleCreate()
})

watch(() => props.data, () => {
  scheduleCreate()
}, { deep: true })

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>
