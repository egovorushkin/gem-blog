<template>
  <header class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2.5">
          <span class="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">EG</span>
          <span class="text-base sm:text-lg font-bold text-gray-900 dark:text-white whitespace-nowrap">
            Evgenii<span class="hidden sm:inline"> Govorushkin</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" :class="navLinkClass('/')">
            Home
          </NuxtLink>
          <NuxtLink to="/about" :class="navLinkClass('/about')">
            About
          </NuxtLink>
          <NuxtLink to="/tags" :class="navLinkClass('/tags')">
            Tags
          </NuxtLink>
        </div>

        <!-- Theme Toggle and Mobile Menu -->
        <div class="flex items-center space-x-4">
          <ClientOnly>
            <UButton
              :icon="$colorMode.value === 'dark' ? 'i-heroicons-sun' : 'i-heroicons-moon'"
              variant="ghost"
              color="gray"
              @click="$colorMode.preference = $colorMode.value === 'dark' ? 'light' : 'dark'"
            />
          </ClientOnly>

          <!-- Mobile menu button -->
          <UButton
            icon="i-heroicons-bars-3"
            variant="ghost"
            class="md:hidden"
            :aria-expanded="mobileMenuOpen"
            aria-controls="mobile-nav"
            @click="mobileMenuOpen = !mobileMenuOpen"
          />
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" id="mobile-nav" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <NuxtLink to="/" :class="['block px-3 py-2', navLinkClass('/')]">
            Home
          </NuxtLink>
          <NuxtLink to="/about" :class="['block px-3 py-2', navLinkClass('/about')]">
            About
          </NuxtLink>
          <NuxtLink to="/tags" :class="['block px-3 py-2', navLinkClass('/tags')]">
            Tags
          </NuxtLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
const route = useRoute()
const mobileMenuOpen = ref(false)

function isActivePath(path) {
  return path === '/' ? route.path === '/' : route.path.startsWith(path)
}

function navLinkClass(path) {
  return [
    'font-medium hover:text-indigo-600 dark:hover:text-indigo-400',
    isActivePath(path) ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-700 dark:text-gray-300'
  ]
}

// close the mobile drawer on any navigation, not just direct link clicks
watch(() => route.fullPath, () => {
  mobileMenuOpen.value = false
})
</script>
