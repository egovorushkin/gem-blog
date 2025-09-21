<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <UBadge 
        :label="tag"
        variant="soft"
        color="indigo"
        size="lg"
        class="mb-4"
      />
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Posts tagged with "{{ tag }}"
      </h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        {{ posts.length }} {{ posts.length === 1 ? 'post' : 'posts' }} found
      </p>
    </div>

    <!-- Posts Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" v-if="posts.length">
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
        No posts found
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        No posts have been tagged with "{{ tag }}" yet.
      </p>
      <div class="mt-6">
        <UButton to="/tags" variant="outline" color="indigo">
          Browse All Tags
        </UButton>
      </div>
    </div>

    <!-- Back to Tags -->
    <div class="text-center mt-12" v-if="posts.length">
      <UButton to="/tags" variant="outline" color="indigo">
        View All Tags
      </UButton>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const tag = route.params.tag

// Fetch posts with the specified tag
const { data: posts } = await useAsyncData(`tag-${tag}`, async () => {
  const result = await queryCollection('blog')
    // .where('tag', 'IN', 'tags')
    .all();
    console.log('DEBUG posts with tag:', tag, result);
  return result;
});

// SEO
useSeoMeta({
  title: `Posts tagged "${tag}"`,
  description: `Browse all blog posts tagged with ${tag}. Find tutorials, guides, and insights about ${tag}.`
})
</script>