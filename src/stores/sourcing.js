import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useSourcingStore = defineStore('sourcing', () => {
  const requests = ref([])

  function submitRequest(data) {
    const req = {
      id: 'SR' + Date.now().toString(36).toUpperCase(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    requests.value.unshift(req)
    // In production: send to backend API
    console.log('Sourcing request submitted:', req)
    return req
  }

  const pendingCount = computed(() =>
    requests.value.filter(r => r.status === 'pending').length
  )

  return { requests, submitRequest, pendingCount }
})
