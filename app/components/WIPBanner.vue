<template>
  <div class="bg-linear-to-r from-amber-100 to-orange-100 dark:from-amber-900 dark:to-orange-900 border-b-2 border-amber-400 dark:border-amber-600 px-4 py-4 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-center gap-3">
      <span class="text-2xl">🚧</span>
      <div class="text-center">
        <h3 class="font-bold text-gray-900 dark:text-white text-lg">
          Work in Progress
        </h3>
        <p class="text-sm text-gray-700 dark:text-gray-300">
          This blog is still under development. Content and features may change.
        </p>
      </div>
      <span class="text-2xl">🚧</span>
    </div>
  </div>
</template>

<script setup>
// No logic needed for this presentational banner
</script>

<style scoped>
/* Subtle animation for the banner */
@keyframes pulse-subtle {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

div {
  animation: pulse-subtle 3s ease-in-out infinite;
}
</style>
