<template>
  <UModal
    v-model:open="open"
    title="Search posts"
    close-icon="i-heroicons-x-mark"
    :ui="{ content: 'sm:max-w-xl' }"
  >
    <template #content>
      <UCommandPalette
        :groups="groups"
        icon="i-heroicons-magnifying-glass"
        selected-icon="i-heroicons-check"
        trailing-icon="i-heroicons-chevron-right"
        back-icon="i-heroicons-arrow-left"
        placeholder="Search posts by title, description or tag..."
        @update:model-value="onSelect"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
const open = useCommandPalette()
const router = useRouter()

const { data: posts } = await useAsyncData('search-all-posts', async () => {
  return (await queryCollection('blog').all()) || []
})

const groups = computed(() => [{
  id: 'posts',
  label: 'Posts',
  items: (posts.value || []).map((post: any) => ({
    label: post.title,
    suffix: post.description,
    icon: 'i-heroicons-document-text',
    to: post.path
  }))
}])

function onSelect(item: any) {
  if (item?.to) {
    router.push(item.to)
    open.value = false
  }
}

defineShortcuts({
  meta_k: () => {
    open.value = true
  }
})
</script>
