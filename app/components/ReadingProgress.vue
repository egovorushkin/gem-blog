<template>
  <div class="fixed top-0 left-0 z-50 h-1 w-full bg-transparent">
    <div class="h-full bg-indigo-600 transition-[width] duration-150 ease-out" :style="{ width: `${progress}%` }" />
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

function updateProgress() {
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  progress.value = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0
}

onMounted(() => {
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
  window.addEventListener('resize', updateProgress)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateProgress)
  window.removeEventListener('resize', updateProgress)
})
</script>
