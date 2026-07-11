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
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard v-for="post in paginatedPosts" :key="post.path" :post="post" />
      </div>

      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex flex-wrap justify-center items-center gap-2 mt-10">
        <UButton
          :disabled="page === 1"
          size="sm"
          variant="outline"
          color="primary"
          @click="goToPage(page - 1)"
        >Prev</UButton>

        <template v-for="p in totalPages" :key="p">
          <UButton
            :variant="p === page ? 'solid' : 'outline'"
            color="primary"
            size="sm"
            :disabled="p === page"
            @click="goToPage(p)"
          >{{ p }}</UButton>
        </template>

        <UButton
          :disabled="page === totalPages"
          size="sm"
          variant="outline"
          color="primary"
          @click="goToPage(page + 1)"
        >Next</UButton>
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
import { watchDebounced } from '@vueuse/core'

const route = useRoute()
const router = useRouter()

const PAGE_SIZE = 9
const page = ref(1)

// search term synced to query param `q`
const searchTerm = ref((route.query.q as string) || '')

watchDebounced(searchTerm, (val) => {
  // update URL query to keep navigation state
  router.replace({ query: { ...(route.query as any), q: val || undefined } })
}, { debounce: 300 })

watch(searchTerm, () => {
  page.value = 1
})

const { data: posts } = await useAsyncData('all-posts', async () => {
  return (await queryCollection('blog').order('publishedAt', 'DESC').all()) || []
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

const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE)))

const paginatedPosts = computed(() => {
  const start = (page.value - 1) * PAGE_SIZE
  return filteredPosts.value.slice(start, start + PAGE_SIZE)
})

function goToPage(p: number) {
  if (p < 1 || p > totalPages.value) return
  page.value = p
}

useSeoMeta({
  title: 'Blog',
  description: 'Browse all blog posts and tutorials.'
})

const config = useRuntimeConfig()
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/blog` }] })
</script>
