import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Lightweight scroll-triggered visibility animation.
 * Uses IntersectionObserver with GPU-friendly class toggling.
 */
export function useScrollAnimation(options = {}) {
  const visible = ref(false)
  const elRef = ref(null)

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -40px 0px',
    once = true,
  } = options

  let observer = null

  onMounted(() => {
    if (!elRef.value) return

    // Use requestAnimationFrame to avoid layout thrashing
    requestAnimationFrame(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visible.value = true
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            visible.value = false
          }
        },
        { threshold, rootMargin }
      )
      observer.observe(elRef.value)
    })
  })

  onUnmounted(() => {
    if (observer) observer.disconnect()
  })

  return { visible, elRef }
}
