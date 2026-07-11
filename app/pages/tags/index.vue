<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Browse by Tags
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Explore articles by topic and technology
      </p>
    </div>

    <!-- Tag Cloud -->
    <div class="flex flex-wrap gap-3 justify-center mb-12" v-if="tags.length">
      <NuxtLink
        v-for="tag in tags"
        :key="tag.name"
        :to="`/tags/${tag.name}`"
        class="group"
      >
        <span :class="[tagSizeClass(tag.count), 'inline-flex items-center rounded-full border-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-medium group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors']">
          {{ tag.name }} <span class="ml-1.5 opacity-60">({{ tag.count }})</span>
        </span>
      </NuxtLink>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-16">
      <UIcon name="i-heroicons-tag" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No tags found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Tags will appear here once posts are published.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Fetch all posts and compute tag frequencies (Nuxt Content v4)
const { data: posts } = await useAsyncData('tags-all-posts', async () => {
  try {
    return await queryCollection('blog').all() || []
  } catch (err) {
    console.warn('Failed to load posts for tags', err)
    return []
  }
})

function tagSizeClass(count: number) {
  if (count >= 4) return 'text-lg px-4 py-1.5'
  if (count >= 2) return 'text-sm px-3 py-1'
  return 'text-xs px-2 py-0.5'
}

// Calculate tag frequencies
const tags = computed(() => {
  const tagCounts = {}
  posts.value?.forEach(post => {
    const postTags = post.tags || []
    postTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })

  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count: count as number }))
    .sort((a, b) => b.count - a.count)
})

// SEO
useSeoMeta({
  title: 'Tags',
  description: 'Browse blog posts by tags and categories. Find articles about Java, Spring Boot, microservices, and more.'
})

const config = useRuntimeConfig()
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/tags` }] })

defineOgImage('Default', {
  title: 'Tags',
  description: 'Browse blog posts by tags and categories.'
})
</script>