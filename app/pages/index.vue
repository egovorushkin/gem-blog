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
      <div v-if="posts && posts.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard 
            v-for="post in posts" 
            :key="post.path" 
            :post="post" 
          />
        </div>

        <!-- Pagination Controls -->
        <div class="flex flex-wrap justify-center items-center gap-2 mt-10">
          <UButton
            :disabled="page === 1"
            @click="goToPage(page - 1)"
            size="sm"
            variant="outline"
            color="grey"
          >Prev</UButton>

          <template v-for="p in totalPages" :key="p">
            <UButton
              :variant="p === page ? 'solid' : 'outline'"
              :color="p === page ? 'primary' : 'neutral'"
              size="sm"
              @click="goToPage(p)"
              :disabled="p === page"
            >{{ p }}</UButton>
          </template>

          <UButton
            :disabled="page === totalPages"
            @click="goToPage(page + 1)"
            size="sm"
            variant="outline"
            color="neutral"
          >Next</UButton>
        </div>
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
        <UButton to="/blog?view=list" size="lg" variant="outline" color="neutral">
          View All Posts
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const PAGE_SIZE = 6
const page = ref(1)

const { data: totalCount } = await useAsyncData('blog-count', async () => {
  // Get total count of posts for pagination
  const all = await queryCollection('blog').all()
  return all.length
})

const { data: posts } = await useAsyncData(() => `blog-page-${page.value}`, async () => {
  // Use new Nuxt Content v4 API for paginated fetch
  return await queryCollection('blog')
    .order('publishedAt', 'DESC')
    .limit(PAGE_SIZE)
    .skip((page.value - 1) * PAGE_SIZE)
    .all() || []
})

const totalPages = computed(() => Math.ceil((totalCount.value || 0) / PAGE_SIZE))

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
}

useSeoMeta({
  title: 'Home',
  description: 'A personal tech blog sharing insights about Java development and software engineering best practices.'
})
</script>