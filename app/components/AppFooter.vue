<template>
  <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-20">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <UIcon name="i-heroicons-code-bracket" class="w-6 h-6 text-indigo-600" />
            <span class="text-lg font-bold text-gray-900 dark:text-white">TechBlog</span>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            Sharing insights about Java development, software engineering best practices, and the latest in tech.
          </p>
          <div class="flex space-x-4">
            <UButton icon="i-simple-icons-github" variant="ghost" color="gray" />
            <UButton icon="i-simple-icons-linkedin" variant="ghost" color="gray" />
            <UButton icon="i-simple-icons-twitter" variant="ghost" color="gray" />
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                About
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Tags
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Categories -->
        <div>
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
            Categories
          </h3>
          <ul class="space-y-2">
            <li>
              <NuxtLink to="/tags/java" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Java
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags/spring" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Spring Boot
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/tags/architecture" class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                Architecture
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8">
        <p class="text-center text-gray-500 dark:text-gray-400">
          © {{ new Date().getFullYear() }} TechBlog. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>