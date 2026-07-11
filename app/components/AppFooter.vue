<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Brand -->
        <div>
          <div class="flex items-center space-x-2.5 mb-4">
            <span class="flex items-center justify-center w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">EG</span>
            <span class="text-lg font-bold text-gray-900 dark:text-white">Evgenii Govorushkin</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Backend engineering, side projects, and the occasional deep dive — from Java and distributed systems to whatever I'm tinkering with this month.
          </p>
          <div class="flex space-x-4">
            <UButton icon="i-simple-icons-github" variant="ghost" color="neutral" to="https://github.com/egovorushkin" target="_blank"/>
            <UButton icon="i-simple-icons-linkedin" variant="ghost" color="neutral" to="https://www.linkedin.com/in/evgenii-govorushkin/" target="_blank"/>
            <UButton icon="i-simple-icons-x" variant="ghost" color="neutral" to="https://x.com/evgenii_swe" target="_blank"/>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Blog</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">Tags</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">About</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
        <p class="text-center text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} Evgenii Govorushkin. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>