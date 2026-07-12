<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <AppHeader />
    <main>
      <NuxtPage />
    </main>
    <AppFooter />
    <ClientOnly>
      <GlobalSearch :posts="searchPosts" />
    </ClientOnly>
  </div>
</template>

<script setup>
// Global SEO and meta configuration
useSeoMeta({
  titleTemplate: '%s | Evgenii Govorushkin',
  description: 'Backend engineering, side projects, and the occasional deep dive from a software engineer who builds things and writes about it.',
  twitterCard: 'summary_large_image'
})

// Fetched here (outside ClientOnly) so it's resolved during SSR/prerendering
// and baked into the payload — GlobalSearch itself stays client-only to avoid
// UModal/UCommandPalette's known SSR hydration-mismatch risk.
const { data: searchPosts } = await useAsyncData('search-all-posts', async () => {
  return (await queryCollection('blog').all()) || []
})
</script>
