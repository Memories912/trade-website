import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockSourcingRequests } from '@/assets/mock/admin'

export const useAdminSourcingStore = defineStore('adminSourcing', () => {
  const requests = ref(JSON.parse(JSON.stringify(mockSourcingRequests)))
  const loading = ref(false)

  const pendingCount = computed(() => requests.value.filter(r => r.status === 'pending').length)
  const totalCount = computed(() => requests.value.length)

  /** Simulate fetching requests */
  function fetchRequests() {
    loading.value = true
    setTimeout(() => { loading.value = false }, 300)
  }

  /** Get a single request by ID */
  function getRequest(id) {
    return requests.value.find(r => r.id === id) || null
  }

  /** Update request status */
  function updateStatus(id, status) {
    const idx = requests.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      requests.value[idx].status = status
      requests.value[idx].updatedAt = new Date().toISOString().split('T')[0]
      return requests.value[idx]
    }
    return null
  }

  /** Add a quote to a request */
  function addQuote(id, quote) {
    const idx = requests.value.findIndex(r => r.id === id)
    if (idx !== -1) {
      requests.value[idx].quote = {
        ...quote,
        quotedAt: new Date().toISOString().split('T')[0],
      }
      requests.value[idx].status = 'quoted'
      requests.value[idx].updatedAt = new Date().toISOString().split('T')[0]
      return requests.value[idx]
    }
    return null
  }

  return {
    requests, loading, pendingCount, totalCount,
    fetchRequests, getRequest, updateStatus, addQuote,
  }
})
