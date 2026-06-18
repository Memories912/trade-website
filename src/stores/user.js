import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth-token') || null)
  const router = useRouter()

  const isLoggedIn = computed(() => !!user.value)

  // Mock login
  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: 'u_001',
            name: 'Demo User',
            email: email,
            company: 'ABC Trading Co.',
            country: 'Korea',
            avatar: null,
            createdAt: '2026-01-15',
          }
          user.value = mockUser
          token.value = 'mock-token-xxx'
          localStorage.setItem('auth-token', 'mock-token-xxx')
          resolve(mockUser)
        } else {
          reject(new Error('Login failed'))
        }
      }, 800)
    })
  }

  // Mock register
  function register(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password && data.name) {
          const newUser = {
            id: 'u_' + Date.now(),
            name: data.name,
            email: data.email,
            company: data.company || '',
            country: data.country || '',
            avatar: null,
            createdAt: new Date().toISOString().split('T')[0],
          }
          user.value = newUser
          token.value = 'mock-token-' + Date.now()
          localStorage.setItem('auth-token', token.value)
          resolve(newUser)
        } else {
          reject(new Error('Register failed'))
        }
      }, 800)
    })
  }

  function logout() {
    user.value = null
    token.value = null
    localStorage.removeItem('auth-token')
    router.push('/')
  }

  function checkAuth() {
    if (token.value) {
      // Mock: restore session
      user.value = {
        id: 'u_001',
        name: 'Demo User',
        email: 'demo@example.com',
        company: 'ABC Trading Co.',
        country: 'Korea',
        avatar: null,
        createdAt: '2026-01-15',
      }
    }
  }

  return { user, token, isLoggedIn, login, register, logout, checkAuth }
})
