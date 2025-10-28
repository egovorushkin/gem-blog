<template>
  <div>
    <template v-if="data">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        <!-- TOC: visible on large screens -->
        <aside class="hidden lg:block">
          <nav class="sticky top-24 max-h-screen overflow-auto pr-4">
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">On this page</h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li v-for="item in toc" :key="item.id">
                <a :href="`#${item.id}`" class="block hover:text-indigo-600 dark:hover:text-indigo-300">
                  <span :class="item.level === 3 ? 'pl-4' : ''">{{ item.text }}</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        <article>
          <!-- Article Header -->
          <header class="mb-12">
            <div class="flex flex-wrap gap-2 mb-4">
              <UBadge
                v-for="tag in data.tags"
                :key="tag"
                variant="soft"
                color="indigo"
              >
                {{ tag }}
              </UBadge>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {{ data.title }}
            </h1>

            <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {{ data.description }}
            </p>

            <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
                  <time :datetime="data.publishedAt">
                    {{ formatDate(data.publishedAt) }}
                  </time>
                </div>
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  <span>{{ data.readTime || '5 min read' }}</span>
                </div>
              </div>
            </div>
          </header>

          <!-- Article Content -->
          <div class="prose prose-lg prose-indigo max-w-none dark:prose-invert" ref="contentRef">
            <ContentRenderer :value="data" />
          </div>

          <!-- Article Footer -->
          <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
                <NuxtLink
                  v-for="tag in data.tags"
                  :key="tag"
                  :to="`/tags/${tag}`"
                  class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
                >
                  #{{ tag }}
                </NuxtLink>
              </div>
            </div>
          </footer>
        </article>
      </div>

      <!-- Navigation -->
      <nav class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="flex justify-between">
          <div v-if="prev">
            <NuxtLink
              :to="prev.path"
              class="group flex items-center space-x-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Previous</div>
                <div class="font-medium">{{ prev.title }}</div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="next" class="text-right">
            <NuxtLink
              :to="next.path"
              class="group flex items-center space-x-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200"
            >
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Next</div>
                <div class="font-medium">{{ next.title }}</div>
              </div>
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
            </NuxtLink>
          </div>
        </div>
      </nav>
    </template>

    <template v-else>
      <!-- Post Not Found -->
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <UIcon name="i-heroicons-document-text" class="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been moved.</p>
        <UButton to="/blog" color="indigo">Back to Blog</UButton>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const slug = route.params.slug
const postPath = `/blog/${slug}`
console.log('DEBUG slug:', slug, 'postPath:', postPath)

// Fetch the current post
const { data } = await useAsyncData(`content-${postPath}`, async () => {
  try {
    const result = await queryCollection('blog').path(postPath).first();
    // console.log('DEBUG current post:', result)
    return result
  } catch (err) {
    // console.error('ERROR fetching post:', err)
    return null
  }
})

// Fetch all posts for navigation
const allPosts = await queryCollection('blog').all();
const currentIndex = allPosts.findIndex(post => post.path === postPath);
const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Table of Contents (client-side extraction)
const contentRef = ref(null)
const toc = ref([])

onMounted(() => {
  const el = contentRef.value
  if (!el) return
  toc.value = []
  const headings = el.querySelectorAll('h2, h3')
  const slugify = (text) => text.toString().toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')
  headings.forEach(h => {
    let id = h.id
    if (!id) {
      id = slugify(h.textContent || '')
      // ensure unique
      let suffix = 0
      const base = id
      while (document.getElementById(id)) {
        suffix++
        id = `${base}-${suffix}`
      }
      h.id = id
    }
    toc.value.push({ id, text: (h.textContent || '').trim(), level: Number(h.tagName.slice(1)) })
  })
})

// SEO
useSeoMeta({
  title: data.value?.title || 'Post Not Found',
  description: data.value?.description || 'The requested blog post could not be found.',
  ogTitle: data.value?.title || 'Post Not Found',
  ogDescription: data.value?.description || 'The requested blog post could not be found.',
  ogType: 'article',
  articlePublishedTime: data.value?.publishedAt,
  articleTag: data.value?.tags
})
</script>