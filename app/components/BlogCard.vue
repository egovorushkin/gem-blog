<template>
  <article class="blog-card bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
    <NuxtLink :to="post.path" class="block">
      <div class="h-40 overflow-hidden">
        <NuxtImg v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full bg-linear-to-br from-indigo-500 to-purple-600" />
      </div>
      <div class="p-6">
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
          <UBadge 
            v-for="tag in post.tags"
            :key="tag" 
            variant="soft" 
            color="indigo"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>

        <!-- Title and Description -->
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {{ post.title }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {{ post.description }}
        </p>

        <!-- Metadata -->
        <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div class="flex items-center space-x-2">
            <UIcon name="i-heroicons-calendar-days" class="w-4 h-4" />
                <time :datetime="post.publishedAt">
                  {{ formatDate(post.publishedAt) }}
                </time>
          </div>
          <div v-if="post.readingTime?.text" class="flex items-center space-x-2">
            <UIcon name="i-heroicons-clock" class="w-4 h-4" />
            <span>{{ post.readingTime.text }}</span>
          </div>
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>