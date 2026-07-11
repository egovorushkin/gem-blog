<template>
  <div class="relative">
    <pre :class="$props.class"><slot /></pre>
    <button
      type="button"
      class="absolute top-2 right-2 flex items-center gap-1 rounded-md bg-gray-700/80 dark:bg-gray-600/80 px-2 py-1 text-xs text-gray-100 opacity-70 hover:opacity-100 focus-visible:opacity-100 transition-opacity"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      @click="copy"
    >
      <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="w-3.5 h-3.5" />
      {{ copied ? 'Copied' : 'Copy' }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  code: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: null
  },
  filename: {
    type: String,
    default: null
  },
  highlights: {
    type: Array,
    default: () => []
  },
  meta: {
    type: String,
    default: null
  },
  class: {
    type: String,
    default: null
  }
})

const copied = ref(false)
let resetTimeout

async function copy() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    clearTimeout(resetTimeout)
    resetTimeout = setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    // Clipboard API unavailable (e.g. insecure context) — no-op
  }
}
</script>
