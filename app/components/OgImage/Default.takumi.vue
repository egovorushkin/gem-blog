<template>
  <div style="display:flex; flex-direction:column; justify-content:space-between; width:1200px; height:630px; padding:80px; background:linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); font-family:sans-serif;">
    <div style="display:flex; align-items:center; gap:16px;">
      <div style="display:flex; align-items:center; justify-content:center; width:56px; height:56px; border-radius:9999px; background:rgba(255,255,255,0.15); color:white; font-size:22px; font-weight:700;">
        EG
      </div>
      <div style="display:flex; font-size:28px; font-weight:600; color:rgba(255,255,255,0.9);">
        Evgenii Govorushkin
      </div>
    </div>

    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="display:flex; font-size:56px; font-weight:800; line-height:1.15; color:white;">
        {{ title }}
      </div>
      <div v-if="description" style="display:flex; font-size:28px; line-height:1.4; color:rgba(255,255,255,0.85);">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
