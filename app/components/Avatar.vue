<template>
  <div :class="['overflow-hidden rounded-full shrink-0', wrapperClass]">
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      class="w-full h-full object-cover"
      :style="{ objectPosition }"
      @error="failed = true"
    >
    <div v-else :class="['w-full h-full flex items-center justify-center', fallbackClass]">
      <UIcon name="i-heroicons-user" :class="iconClass" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  src?: string
  alt?: string
  wrapperClass?: string
  fallbackClass?: string
  iconClass?: string
  objectPosition?: string
}>(), {
  src: '/images/avatar.jpg',
  alt: 'Evgenii Govorushkin',
  wrapperClass: '',
  fallbackClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  iconClass: 'w-1/2 h-1/2 text-white',
  // The source photo has a lot of headroom above the head, with the face sitting
  // in the lower-middle of the frame — bias the crop up so object-cover centers
  // on the face instead of the image's literal center.
  objectPosition: '50% 30%'
})

const failed = ref(false)
</script>
