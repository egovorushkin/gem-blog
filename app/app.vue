<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <WIPBanner />
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
  titleTemplate: '%s | TechBlog',
  description: 'A personal tech blog sharing insights about Java development and software engineering best practices.',
  ogImage: '/og-image.jpg',
  twitterCard: 'summary_large_image'
})
</script>
