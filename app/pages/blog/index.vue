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
    <div class="max-w-3xl mx-auto mb-8">
      <SearchBar v-model="searchTerm" />
    </div>
    <div v-if="filteredPosts && filteredPosts.length">
      <!-- List view when ?view=list is present -->
      <ul v-if="showList" class="space-y-4">
        <li v-for="post in filteredPosts" :key="post.path" class="py-3 border-b border-gray-100 dark:border-gray-800">
          <NuxtLink :to="getPostPath(post)" class="text-lg font-medium text-indigo-600 dark:text-indigo-400 hover:underline">{{ post.title }}</NuxtLink>
          <div class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(post.publishedAt) }}</div>
          <p class="text-gray-700 dark:text-gray-300 mt-1">{{ post.description }}</p>
        </li>
      </ul>

      <!-- Card grid (default) -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard v-for="post in filteredPosts" :key="post.path" :post="post" />
      </div>
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
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, watch } from 'vue'

const route = useRoute()
const router = useRouter()

const showList = computed(() => route.query.view === 'list')

// search term synced to query param `q`
const searchTerm = ref((route.query.q as string) || '')

watch(searchTerm, (val) => {
  // update URL query to keep navigation state
  router.replace({ query: { ...(route.query as any), q: val || undefined } })
})

const { data: posts } = await useAsyncData('all-posts', async () => {
  // fetch posts once; render either cards or list client-side based on query
  return (await queryCollection('blog').all()) || []
})

const filteredPosts = computed(() => {
  const list = (posts?.value as any[]) || []
  const q = (searchTerm.value || '').trim().toLowerCase()
  if (!q) return list
  return list.filter((p) => {
    const title = (p.title || '').toString().toLowerCase()
    const desc = (p.description || '').toString().toLowerCase()
    const tags = (p.tags || []).map(String).join(' ').toLowerCase()
    return title.includes(q) || desc.includes(q) || tags.includes(q)
  })
})

function getPostPath(post: any) {
  return post.path || post._path || `/blog/${post.slug || ''}`
}

function formatDate(d: string | number | Date) {
  try {
    return new Date(d).toLocaleDateString()
  } catch (e) {
    return String(d || '')
  }
}

useSeoMeta({
  title: 'Blog',
  description: 'Browse all blog posts and tutorials.'
})
</script>
