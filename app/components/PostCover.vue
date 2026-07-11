<template>
  <div :class="['relative flex items-center justify-center overflow-hidden', gradientClass]">
    <span class="absolute -right-2 -bottom-8 text-[8rem] font-black text-white/15 select-none leading-none pointer-events-none">
      {{ initial }}
    </span>
    <span
      v-if="primaryTag"
      class="absolute top-3 left-3 text-[11px] font-semibold tracking-wide uppercase text-white/90 bg-black/15 backdrop-blur-sm px-2 py-1 rounded-md"
    >
      {{ primaryTag }}
    </span>
    <UIcon :name="icon" class="w-10 h-10 text-white/90 relative z-10" />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  title?: string
  tags?: string[]
}>(), {
  title: '',
  tags: () => []
})

const GRADIENTS = [
  'bg-gradient-to-br from-indigo-500 to-purple-600',
  'bg-gradient-to-br from-blue-500 to-cyan-500',
  'bg-gradient-to-br from-emerald-500 to-teal-600',
  'bg-gradient-to-br from-orange-500 to-rose-500',
  'bg-gradient-to-br from-fuchsia-500 to-pink-600',
  'bg-gradient-to-br from-slate-600 to-blue-700'
]

const ICONS_BY_TAG: Record<string, string> = {
  java: 'i-ri-java-fill',
  spring: 'i-heroicons-cog-6-tooth',
  'spring-boot': 'i-heroicons-cog-6-tooth',
  sql: 'i-heroicons-circle-stack',
  git: 'i-simple-icons-git',
  devops: 'i-heroicons-server-stack',
  architecture: 'i-heroicons-cube-transparent',
  microservices: 'i-heroicons-square-3-stack-3d',
  'distributed-systems': 'i-heroicons-square-3-stack-3d',
  performance: 'i-heroicons-bolt',
  jvm: 'i-heroicons-bolt',
  mermaid: 'i-heroicons-chart-bar-square'
}

function hashString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const gradientClass = computed(() => GRADIENTS[hashString(props.title) % GRADIENTS.length])
const initial = computed(() => props.title.trim().charAt(0).toUpperCase() || '?')
const primaryTag = computed(() => props.tags?.[0])
const icon = computed(() => ICONS_BY_TAG[primaryTag.value?.toLowerCase() || ''] || 'i-heroicons-code-bracket')
</script>
