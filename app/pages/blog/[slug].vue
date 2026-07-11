<template>
  <div>
    <template v-if="data">
      <ReadingProgress />
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
        <!-- TOC: visible on large screens -->
        <aside v-if="toc.length" class="hidden lg:block">
          <nav class="sticky top-24 max-h-screen overflow-auto pr-4">
            <h3 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">On this page</h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li v-for="item in toc" :key="item.id">
                <a :href="`#${item.id}`" class="block hover:text-indigo-600 dark:hover:text-indigo-300">
                  {{ item.text }}
                </a>
                <ul v-if="item.children?.length" class="mt-2 space-y-2 pl-4">
                  <li v-for="child in item.children" :key="child.id">
                    <a :href="`#${child.id}`" class="block hover:text-indigo-600 dark:hover:text-indigo-300">
                      {{ child.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </aside>

        <article>
          <!-- Article Header -->
          <header class="mb-12">
            <div class="w-full h-64 md:h-80 rounded-xl overflow-hidden mb-8">
              <NuxtImg v-if="data.image" :src="data.image" :alt="data.title" class="w-full h-full object-cover" />
              <PostCover v-else class="w-full h-full" :title="data.title" :tags="data.tags" />
            </div>

            <div class="flex flex-wrap gap-2 mb-4">
              <NuxtLink v-for="tag in data.tags" :key="tag" :to="`/tags/${tag}`" class="group">
                <UBadge variant="soft" color="indigo"
                  class="group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">
                  {{ tag }}
                </UBadge>
              </NuxtLink>
            </div>

            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {{ data.title }}
            </h1>

            <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {{ data.description }}
            </p>

            <div
              class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-6">
              <div class="flex items-center space-x-4">
                <div class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
                  <time :datetime="data.publishedAt">
                    {{ formatDate(data.publishedAt) }}
                  </time>
                </div>
                <div v-if="data.readingTime?.text" class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4" />
                  <span>{{ data.readingTime.text }}</span>
                </div>
              </div>
            </div>
          </header>

          <!-- Article Content -->
          <div class="prose prose-lg prose-indigo max-w-none dark:prose-invert">
            <ContentRenderer :value="data" />
          </div>

          <!-- Article Footer -->
          <footer class="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between">
              <div class="flex flex-wrap gap-2">
                <span class="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
                <NuxtLink v-for="tag in data.tags" :key="tag" :to="`/tags/${tag}`"
                  class="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200">
                  #{{ tag }}
                </NuxtLink>
              </div>
            </div>
          </footer>
        </article>
      </div>

      <!-- Related Posts -->
      <section v-if="relatedPosts.length" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Related Posts</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <BlogCard v-for="post in relatedPosts" :key="post.path" :post="post" />
        </div>
      </section>

      <!-- Navigation -->
      <nav class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div class="flex justify-between">
          <div v-if="prev">
            <NuxtLink :to="prev.path"
              class="group flex items-center space-x-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
              <div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Previous</div>
                <div class="font-medium">{{ prev.title }}</div>
              </div>
            </NuxtLink>
          </div>

          <div v-if="next" class="text-right">
            <NuxtLink :to="next.path"
              class="group flex items-center space-x-3 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200">
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
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">The blog post you're looking for doesn't exist or has
          been moved.</p>
        <UButton to="/blog" color="indigo">Back to Blog</UButton>
      </div>
    </template>
  </div>
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const postPath = `/blog/${slug}`

// Fetch the current post
const { data } = await useAsyncData(`content-${postPath}`, async () => {
  try {
    const result = await queryCollection('blog').path(postPath).first();
    return result
  } catch (err) {
    return null
  }
})

// Fetch all posts for navigation
const allPosts = await queryCollection('blog').all();
const currentIndex = allPosts.findIndex(post => post.path === postPath);
const prev = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
const next = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

// Related posts: ranked by number of shared tags, then recency
const relatedPosts = computed(() => {
  const currentTags = data.value?.tags || []
  if (!currentTags.length) return []

  return allPosts
    .filter(post => post.path !== postPath)
    .map(post => ({
      post,
      sharedTags: (post.tags || []).filter(tag => currentTags.includes(tag)).length
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags || new Date(b.post.publishedAt).getTime() - new Date(a.post.publishedAt).getTime())
    .slice(0, 3)
    .map(({ post }) => post)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Table of Contents (SSR'd by Nuxt Content's markdown toc pipeline)
const toc = computed(() => data.value?.body?.toc?.links || [])

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

const config = useRuntimeConfig()
useHead({
  link: [{ rel: 'canonical', href: `${config.public.siteUrl}/blog/${slug}` }],
  script: data.value ? [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: data.value.title,
      description: data.value.description,
      datePublished: data.value.publishedAt,
      keywords: data.value.tags?.join(', '),
      author: { '@type': 'Person', name: 'Evgenii Govorushkin' },
      url: `${config.public.siteUrl}/blog/${slug}`
    })
  }] : []
})

if (data.value) {
  defineOgImage('Default', {
    title: data.value.title,
    description: data.value.description
  })
}
</script>