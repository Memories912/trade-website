import { defineStore } from "pinia"
import { ref } from "vue"

export const useAiChatStore = defineStore("aiChat", () => {
  const open = ref(false)

  function toggle() {
    open.value = !open.value
  }

  function openChat() {
    open.value = true
  }

  function closeChat() {
    open.value = false
  }

  return { open, toggle, openChat, closeChat }
})
