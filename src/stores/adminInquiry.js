import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { mockInquiries } from '@/assets/mock/admin'

export const useAdminInquiryStore = defineStore('adminInquiry', () => {
  const inquiries = ref(JSON.parse(JSON.stringify(mockInquiries)))
  const loading = ref(false)

  const pendingCount = computed(() => inquiries.value.filter(i => i.status === 'pending').length)
  const totalCount = computed(() => inquiries.value.length)
  const totalUnread = computed(() => inquiries.value.reduce((sum, i) => sum + (i.unreadMessages || 0), 0))

  /** Simulate fetching inquiries */
  function fetchInquiries() {
    loading.value = true
    setTimeout(() => { loading.value = false }, 300)
  }

  /** Get a single inquiry by ID */
  function getInquiry(id) {
    return inquiries.value.find(i => i.id === id) || null
  }

  /** Update inquiry status */
  function updateStatus(id, status) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      inquiries.value[idx].status = status
      inquiries.value[idx].updatedAt = new Date().toISOString().split('T')[0]
      return inquiries.value[idx]
    }
    return null
  }

  /** Add an internal note to an inquiry */
  function addNote(id, content) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      const note = {
        id: 'n_' + Date.now(),
        content,
        author: 'Admin',
        createdAt: new Date().toISOString(),
      }
      inquiries.value[idx].notes.push(note)
      inquiries.value[idx].updatedAt = new Date().toISOString().split('T')[0]
      return note
    }
    return null
  }

  /** Add a reply to an inquiry */
  function addReply(id, content) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      const reply = {
        id: 'r_' + Date.now(),
        content,
        sentAt: new Date().toISOString(),
      }
      inquiries.value[idx].replies.push(reply)
      inquiries.value[idx].updatedAt = new Date().toISOString().split('T')[0]
      console.log('[Mock] Email notification sent for inquiry reply:', id)
      return reply
    }
    return null
  }

  /** Mark user messages as read */
  function markAsRead(id) {
    const idx = inquiries.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      inquiries.value[idx].unreadMessages = 0
    }
  }

  return {
    inquiries, loading, pendingCount, totalCount, totalUnread,
    fetchInquiries, getInquiry, updateStatus, addNote, addReply, markAsRead,
  }
})
