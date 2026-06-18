import { ref } from 'vue'

export function useImageFallback() {
  const imgError = ref(false)
  const fallbackColor = ref('#e2e8f0')

  function onError(e) {
    imgError.value = true
    const el = e.target
    if (el) {
      el.style.display = 'none'
      // Create a fallback placeholder
      const parent = el.parentElement
      if (parent && !parent.querySelector('.img-fallback')) {
        const fallback = document.createElement('div')
        fallback.className = 'img-fallback absolute inset-0 flex items-center justify-center bg-gray-100'
        fallback.innerHTML = '<span class="text-4xl">📷</span>'
        parent.classList.add('relative')
        parent.appendChild(fallback)
      }
    }
  }

  return { imgError, fallbackColor, onError }
}
