<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        All Blog Posts
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Browse all articles and tutorials
      </p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" v-if="posts && posts.length">
      <BlogCard v-for="post in posts" :key="post.path" :post="post" />
    </div>
    <div v-else class="text-center py-16">
      <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        No posts found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        Check back soon for new content!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">

const { data: posts } = await useAsyncData('all-posts', async () => {
  return await queryCollection('blog').all()
})

useSeoMeta({
  title: 'Blog',
  description: 'Browse all blog posts and tutorials.'
})
</script>
