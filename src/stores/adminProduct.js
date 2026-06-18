import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { products as mockProducts, categories as mockCategories, certifications as mockCertifications } from '@/assets/mock/products'

export const useAdminProductStore = defineStore('adminProduct', () => {
  const products = ref(JSON.parse(JSON.stringify(mockProducts)))
  const categories = ref(JSON.parse(JSON.stringify(mockCategories)))
  const certifications = ref(JSON.parse(JSON.stringify(mockCertifications)))
  const loading = ref(false)

  /** Add status and timestamps to products if missing */
  function ensureProductFields(product) {
    return {
      ...product,
      status: product.status || 'active',
      createdAt: product.createdAt || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    }
  }

  // Initialize products with additional fields
  products.value = products.value.map(p => ensureProductFields(p))

  const activeProducts = computed(() => products.value.filter(p => p.status === 'active'))
  const totalProducts = computed(() => products.value.length)

  /** Fetch (simulate) products list */
  function fetchProducts() {
    loading.value = true
    setTimeout(() => { loading.value = false }, 300)
  }

  /** Add a new product */
  function addProduct(data) {
    const newProduct = ensureProductFields({
      ...data,
      id: data.id || 'prod_' + Date.now(),
    })
    products.value.unshift(newProduct)
    return newProduct
  }

  /** Update an existing product */
  function updateProduct(id, data) {
    const idx = products.value.findIndex(p => p.id === id)
    if (idx !== -1) {
      products.value[idx] = {
        ...products.value[idx],
        ...data,
        updatedAt: new Date().toISOString().split('T')[0],
      }
      return products.value[idx]
    }
    return null
  }

  /** Delete a product */
  function deleteProduct(id) {
    products.value = products.value.filter(p => p.id !== id)
  }

  /** Get a single product by ID */
  function getProduct(id) {
    return products.value.find(p => p.id === id) || null
  }

  /** Add a new category */
  function addCategory(data) {
    const maxSort = categories.value.reduce((max, c) => Math.max(max, c.sortOrder || 0), 0)
    const newCat = {
      ...data,
      id: data.id || 'cat_' + Date.now(),
      sortOrder: data.sortOrder ?? maxSort + 1,
    }
    categories.value.push(newCat)
    return newCat
  }

  /** Update a category */
  function updateCategory(id, data) {
    const idx = categories.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      categories.value[idx] = { ...categories.value[idx], ...data }
      return categories.value[idx]
    }
    return null
  }

  /** Delete a category */
  function deleteCategory(id) {
    categories.value = categories.value.filter(c => c.id !== id)
  }

  /** Add a new certification */
  function addCertification(data) {
    const newCert = {
      ...data,
      id: data.id || 'cert_' + Date.now(),
    }
    certifications.value.push(newCert)
    return newCert
  }

  /** Update a certification */
  function updateCertification(id, data) {
    const idx = certifications.value.findIndex(c => c.id === id)
    if (idx !== -1) {
      certifications.value[idx] = { ...certifications.value[idx], ...data }
      return certifications.value[idx]
    }
    return null
  }

  /** Delete a certification */
  function deleteCertification(id) {
    certifications.value = certifications.value.filter(c => c.id !== id)
  }

  return {
    products, categories, certifications, loading,
    activeProducts, totalProducts,
    fetchProducts, getProduct, addProduct, updateProduct, deleteProduct,
    addCategory, updateCategory, deleteCategory,
    addCertification, updateCertification, deleteCertification,
  }
})
