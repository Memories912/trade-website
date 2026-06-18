import { computed } from 'vue'
import { useAdminAuthStore } from '@/stores/adminAuth'
import { useRouter } from 'vue-router'

/**
 * Composable for admin authentication logic.
 * Provides reactive auth state and login/logout helpers.
 */
export function useAdminAuth() {
  const authStore = useAdminAuthStore()
  const router = useRouter()

  const isAdmin = computed(() => authStore.isAuthenticated)
  const adminUser = computed(() => authStore.admin)

  /** Attempt login, redirect to dashboard on success */
  async function login(email, password) {
    try {
      await authStore.login(email, password)
      router.push('/admin/dashboard')
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  /** Logout and redirect to admin login */
  function logout() {
    authStore.logout()
    router.push('/admin/login')
  }

  return { isAdmin, adminUser, login, logout, checkAuth: authStore.checkAuth }
}
