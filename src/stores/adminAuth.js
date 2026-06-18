import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { adminCredentials, adminProfile } from '@/assets/mock/admin'

export const useAdminAuthStore = defineStore('adminAuth', () => {
  const admin = ref(null)
  const token = ref(localStorage.getItem('admin-token') || null)

  const isAuthenticated = computed(() => !!admin.value && !!token.value)

  /** Mock login: validates against hardcoded credentials */
  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === adminCredentials.email && password === adminCredentials.password) {
          const user = { ...adminProfile }
          admin.value = user
          token.value = 'admin-token-' + Date.now()
          localStorage.setItem('admin-token', token.value)
          resolve(user)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 600)
    })
  }

  /** Logout and clear session */
  function logout() {
    admin.value = null
    token.value = null
    localStorage.removeItem('admin-token')
  }

  /** Restore session from localStorage token */
  function checkAuth() {
    if (token.value) {
      admin.value = { ...adminProfile }
    }
  }

  return { admin, token, isAuthenticated, login, logout, checkAuth }
})
