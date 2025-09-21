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
        <UBadge 
          :label="`${tag.name} (${tag.count})`"
          variant="outline"
          color="indigo"
          size="lg"
          class="group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors"
        />
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

<script setup>
// Fetch all tags with post counts
const { data: posts } = await useAsyncData('all-posts', () => 
  queryContent('/blog').only(['tags']).find()
)

// Calculate tag frequencies
const tags = computed(() => {
  const tagCounts = {}
  
  posts.value?.forEach(post => {
    post.meta.tags?.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
})

// SEO
useSeoMeta({
  title: 'Tags',
  description: 'Browse blog posts by tags and categories. Find articles about Java, Spring Boot, microservices, and more.'
})
</script>