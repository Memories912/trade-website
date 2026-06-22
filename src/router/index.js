import { createRouter, createWebHistory } from 'vue-router'
import { useAdminAuthStore } from '@/stores/adminAuth'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
  { path: '/about', name: 'About', component: () => import('@/views/About.vue') },
  { path: '/pricing', name: 'Pricing', component: () => import('@/views/Pricing.vue') },
  { path: '/products', name: 'Products', component: () => import('@/views/Products.vue') },
  { path: '/products/:id', name: 'ProductDetail', component: () => import('@/views/ProductDetail.vue') },
  { path: '/inquiry', name: 'Inquiry', component: () => import('@/views/Inquiry.vue') },
  { path: '/knowledge', name: 'KnowledgeBase', component: () => import('@/views/KnowledgeBase.vue') },
  { path: '/sourcing', name: 'Sourcing', component: () => import('@/views/Sourcing.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/Contact.vue') },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/UserLayout.vue'),
    children: [
      { path: 'favorites', name: 'Favorites', component: () => import('@/views/UserFavorites.vue') },
      { path: 'inquiries', name: 'UserInquiries', component: () => import('@/views/UserInquiries.vue') },
      { path: 'sourcing', name: 'UserSourcing', component: () => import('@/views/UserSourcing.vue') },
    ],
  },
  // Admin routes
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/admin/views/AdminLogin.vue'),
    meta: { layout: 'admin-auth', requiresAdmin: false },
  },
  {
    path: '/admin',
    component: () => import('@/admin/layouts/AdminLayout.vue'),
    meta: { layout: 'admin', requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/dashboard' },
      { path: 'dashboard', name: 'AdminDashboard', component: () => import('@/admin/views/Dashboard.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.dashboard', icon: 'LayoutDashboard' } },
      { path: 'users', name: 'AdminUserList', component: () => import('@/admin/views/UserList.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.users', icon: 'Users' } },
      { path: 'users/:id', name: 'AdminUserDetail', component: () => import('@/admin/views/UserDetail.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.users', icon: 'Users' } },
      { path: 'products', name: 'AdminProductList', component: () => import('@/admin/views/ProductList.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.products', icon: 'Package' } },
      { path: 'products/new', name: 'AdminProductNew', component: () => import('@/admin/views/ProductForm.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.products.new_product', icon: 'Package' } },
      { path: 'products/:id/edit', name: 'AdminProductEdit', component: () => import('@/admin/views/ProductForm.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.products.edit_product', icon: 'Package' } },
      { path: 'categories', name: 'AdminCategories', component: () => import('@/admin/views/CategoryManager.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.categories', icon: 'FolderTree' } },
      { path: 'certifications', name: 'AdminCertifications', component: () => import('@/admin/views/CertificationManager.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.certifications', icon: 'Award' } },
      { path: 'inquiries', name: 'AdminInquiryList', component: () => import('@/admin/views/InquiryList.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.inquiries', icon: 'MessageSquare' } },
      { path: 'inquiries/:id', name: 'AdminInquiryDetail', component: () => import('@/admin/views/InquiryDetail.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.inquiries', icon: 'MessageSquare' } },
      { path: 'sourcing', name: 'AdminSourcingList', component: () => import('@/admin/views/SourcingList.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.sourcing', icon: 'Search' } },
      { path: 'sourcing/:id', name: 'AdminSourcingDetail', component: () => import('@/admin/views/SourcingDetail.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.sourcing', icon: 'Search' } },
      { path: 'knowledge', name: 'AdminKnowledgeList', component: () => import('@/admin/views/KnowledgeList.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.knowledge', icon: 'BookOpen' } },
      { path: 'knowledge/new', name: 'AdminKnowledgeNew', component: () => import('@/admin/views/KnowledgeForm.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.knowledge.new_faq', icon: 'BookOpen' } },
      { path: 'knowledge/:id/edit', name: 'AdminKnowledgeEdit', component: () => import('@/admin/views/KnowledgeForm.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.knowledge.edit_faq', icon: 'BookOpen' } },
      { path: 'ai-chat', name: 'AdminAiChat', component: () => import('@/admin/views/AiChatRecords.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.ai_chat', icon: 'Bot' } },
      { path: 'settings', name: 'AdminSettings', component: () => import('@/admin/views/Settings.vue'), meta: { layout: 'admin', requiresAdmin: true, title: 'admin.sidebar.settings', icon: 'Settings' } },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },
})

// Global route guard for admin authentication
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin')) {
    const authStore = useAdminAuthStore()

    // Restore session from localStorage
    authStore.checkAuth()

    if (to.path === '/admin/login') {
      if (authStore.isAuthenticated) {
        return next('/admin/dashboard')
      }
      return next()
    }

    // Other admin routes require authentication
    if (!authStore.isAuthenticated) {
      return next('/admin/login')
    }
  }
  next()
})

// Catch route errors silently
router.onError((err) => {
  console.warn('[Router Error]', err.message)
})

export default router
