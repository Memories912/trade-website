import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFavoriteStore = defineStore('favorites', () => {
  const items = ref(JSON.parse(localStorage.getItem('favorites') || '[]'))

  function save() {
    localStorage.setItem('favorites', JSON.stringify(items.value))
  }

  const count = computed(() => items.value.length)
  const list = computed(() => items.value)

  function toggle(productId) {
    const idx = items.value.indexOf(productId)
    if (idx >= 0) {
      items.value.splice(idx, 1)
    } else {
      items.value.push(productId)
    }
    save()
  }

  function isFav(productId) {
    return items.value.includes(productId)
  }

  function clear() {
    items.value = []
    save()
  }

  return { items, count, list, toggle, isFav, clear }
})
