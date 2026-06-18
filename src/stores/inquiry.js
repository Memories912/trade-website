import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useInquiryStore = defineStore('inquiry', () => {
  const inquiries = ref([])

  function submitInquiry(data) {
    const inquiry = {
      id: Date.now().toString(),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    inquiries.value.unshift(inquiry)
    // In production: send to backend API
    console.log('New inquiry submitted:', inquiry)
    return inquiry
  }

  const pendingCount = computed(() =>
    inquiries.value.filter(i => i.status === 'pending').length
  )

  return { inquiries, submitInquiry, pendingCount }
})
