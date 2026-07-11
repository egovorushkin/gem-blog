<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Avatar
          wrapper-class="w-20 h-20 mx-auto mb-6 ring-4 ring-white/30"
          fallback-class="bg-white/10"
          icon-class="w-10 h-10 text-white"
        />
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          I build things and write about it
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-indigo-100 max-w-3xl mx-auto">
          Backend engineering, side projects, and the occasional deep dive — from Java and distributed systems to whatever I'm tinkering with this month.
        </p>
        <UButton size="xl" color="neutral" variant="solid" to="/blog">
          Browse Posts
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
      <div class="text-center mt-12" v-if="hasMorePosts">
        <UButton to="/blog" size="lg" variant="outline" color="neutral">
          View All Posts
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const PAGE_SIZE = 6

const { data: posts } = await useAsyncData('home-latest-posts', async () => {
  return await queryCollection('blog').order('publishedAt', 'DESC').limit(PAGE_SIZE).all() || []
})

const { data: totalCount } = await useAsyncData('blog-count', async () => {
  const all = await queryCollection('blog').all()
  return all.length
})

const hasMorePosts = computed(() => (totalCount.value || 0) > PAGE_SIZE)

useSeoMeta({
  title: 'Home',
  description: 'Backend engineering, side projects, and the occasional deep dive from a software engineer who builds things and writes about it.'
})

const config = useRuntimeConfig()
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/` }] })
</script>