import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('auth-token') || null)
  const router = useRouter()

  const isLoggedIn = computed(() => !!user.value)

  // Demo account
  const DEMO_ACCOUNT = {
    email: 'demo@yanzhen.com',
    password: 'demo123',
    name: '燕臻进出口',
    company: '燕臻进出口有限公司',
    country: 'China',
  }

  // Mock login
  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
          const mockUser = {
            id: 'u_demo',
            name: DEMO_ACCOUNT.name,
            email: DEMO_ACCOUNT.email,
            company: DEMO_ACCOUNT.company,
            country: DEMO_ACCOUNT.country,
            avatar: null,
            createdAt: '2026-01-15',
          }
          user.value = mockUser
          token.value = 'mock-token-demo'
          localStorage.setItem('auth-token', 'mock-token-demo')
          resolve(mockUser)
        } else if (email && password) {
          const mockUser = {
            id: 'u_' + Date.now(),
            name: email.split('@')[0],
            email: email,
            company: '',
            country: '',
            avatar: null,
            createdAt: '2026-01-15',
          }
          user.value = mockUser
          token.value = 'mock-token-' + Date.now()
          localStorage.setItem('auth-token', token.value)
          resolve(mockUser)
        } else {
          reject(new Error('邮箱或密码错误'))
        }
      }, 500)
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
        id: 'u_demo',
        name: DEMO_ACCOUNT.name,
        email: DEMO_ACCOUNT.email,
        company: DEMO_ACCOUNT.company,
        country: DEMO_ACCOUNT.country,
        avatar: null,
        createdAt: '2026-01-15',
      }
    }
  }

  return { user, token, isLoggedIn, login, register, logout, checkAuth }
})
