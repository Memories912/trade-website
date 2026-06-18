import { ref, computed, watch } from 'vue'

/**
 * Generic CRUD list composable for admin pages.
 * Encapsulates pagination, search, sorting, and filtering logic.
 *
 * @param {Function} fetchFn - Function that returns the full list array
 * @param {Object} options - Configuration options
 * @returns {Object} Reactive list state and methods
 */
export function useCrudList(fetchFn, options = {}) {
  const {
    pageSize: defaultPageSize = 10,
    searchFields = [],
    filterFn = null,
    sortBy: defaultSortBy = 'createdAt',
    sortOrder: defaultSortOrder = 'desc',
  } = options

  const items = ref([])
  const loading = ref(false)
  const page = ref(1)
  const pageSize = ref(defaultPageSize)
  const search = ref('')
  const filters = ref({})
  const sortBy = ref(defaultSortBy)
  const sortOrder = ref(defaultSortOrder)

  /** Load all items from the source */
  function load() {
    loading.value = true
    try {
      items.value = fetchFn()
    } finally {
      loading.value = false
    }
  }

  /** Filtered, searched, and sorted items */
  const processedItems = computed(() => {
    let result = [...items.value]

    // Apply search
    if (search.value && searchFields.length > 0) {
      const query = search.value.toLowerCase()
      result = result.filter(item =>
        searchFields.some(field => {
          const val = field.split('.').reduce((obj, key) => obj?.[key], item)
          return val && String(val).toLowerCase().includes(query)
        })
      )
    }

    // Apply custom filter
    if (filterFn) {
      result = result.filter(item => filterFn(item, filters.value))
    }

    // Apply sorting
    if (sortBy.value) {
      result.sort((a, b) => {
        const aVal = sortBy.value.split('.').reduce((obj, key) => obj?.[key], a)
        const bVal = sortBy.value.split('.').reduce((obj, key) => obj?.[key], b)
        if (aVal == null && bVal == null) return 0
        if (aVal == null) return 1
        if (bVal == null) return -1
        const cmp = typeof aVal === 'string'
          ? aVal.localeCompare(bVal)
          : aVal - bVal
        return sortOrder.value === 'asc' ? cmp : -cmp
      })
    }

    return result
  })

  /** Total count after filtering */
  const total = computed(() => processedItems.value.length)

  /** Paginated items for the current page */
  const pagedItems = computed(() => {
    const start = (page.value - 1) * pageSize.value
    return processedItems.value.slice(start, start + pageSize.value)
  })

  /** Total number of pages */
  const totalPages = computed(() => Math.ceil(total.value / pageSize.value))

  /** Go to a specific page */
  function goToPage(p) {
    page.value = Math.max(1, Math.min(p, totalPages.value))
  }

  /** Reset to first page when search or filters change */
  watch([search, filters], () => {
    page.value = 1
  }, { deep: true })

  /** Toggle sort */
  function toggleSort(field) {
    if (sortBy.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortBy.value = field
      sortOrder.value = 'desc'
    }
  }

  return {
    items, loading, page, pageSize, search, filters, sortBy, sortOrder,
    processedItems, pagedItems, total, totalPages,
    load, goToPage, toggleSort,
  }
}
