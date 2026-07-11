<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
// Global SEO and meta configuration
useSeoMeta({
  titleTemplate: '%s | Evgenii Govorushkin',
  description: 'Backend engineering, side projects, and the occasional deep dive from a software engineer who builds things and writes about it.',
  twitterCard: 'summary_large_image'
})
</script>
