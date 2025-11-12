<template>
  <div class="w-full">
    <label class="sr-only" for="search">Search posts</label>
    <div class="relative">
      <input
        id="search"
        type="search"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="w-full rounded-md border px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Search posts by title, description or tag..."
        aria-label="Search posts"
      />
      <button
        v-if="modelValue"
        @click="$emit('update:modelValue', '')"
        class="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
        aria-label="Clear search"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
/* small scoped styles if needed */
</style>
