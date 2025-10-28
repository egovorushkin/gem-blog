<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Welcome to My Tech Blog
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
          Exploring Java development, software architecture, and modern engineering practices
        </p>
        <UButton size="xl" color="white" variant="solid" to="/about">
          Learn More About Me
        </UButton>
      </div>
    </section>

    <!-- Featured Posts -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Latest Posts
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Insights and tutorials from the world of software development
        </p>
      </div>

      <!-- Blog Posts Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" v-if="posts && posts.length > 0">
        <BlogCard 
          v-for="post in posts" 
          :key="post.path" 
          :post="post" 
        />
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No posts yet
        </h3>
        <p class="text-gray-600 dark:text-gray-400">
          Check back soon for new content!
        </p>
      </div>

      <!-- View All Button -->
      <div class="text-center mt-12" v-if="posts && posts.length >= 6">
        <UButton to="/blog" size="lg" variant="outline" color="neutral">
          View All Posts
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Fetch blog posts with error handling

const { data: posts } = await useAsyncData('blog', async () => {
  const result = await queryCollection('blog')
  .order('publishedAt', 'DESC')
  .limit(6)
  .all();
  // console.log('DEBUG blog posts:', result);
  return result;
})

// Ensure posts is always an array
const safePosts = computed(() => posts.value || [])

// SEO
useSeoMeta({
  title: 'Home',
  description: 'A personal tech blog sharing insights about Java development and software engineering best practices.'
})


function queryContent(arg0: string) {
  throw new Error('Function not implemented.')
}
</script>