<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        About Me
      </h1>
      <div
        class="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 mx-auto mb-6 flex items-center justify-center">
        <UIcon name="i-heroicons-user" class="w-16 h-16 text-white" />
      </div>
    </div>

    <div class="prose prose-lg prose-indigo max-w-none dark:prose-invert">
      <p class="text-xl text-gray-600 dark:text-gray-300 text-center mb-8">
        Passionate Java developer sharing knowledge about software engineering, best practices, and modern development
        techniques.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <UCard>
          <template #header>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-indigo-600" />
              <h3 class="text-lg font-semibold">Technical Skills</h3>
            </div>
          </template>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• Java & Spring Boot</li>
            <li>• Microservices Architecture</li>
            <li>• Cloud Technologies (AWS/GCP)</li>
            <li>• Database Design & Optimization</li>
            <li>• DevOps & CI/CD</li>
          </ul>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center space-x-2">
              <UIcon name="i-heroicons-academic-cap" class="w-5 h-5 text-indigo-600" />
              <h3 class="text-lg font-semibold">Experience</h3>
            </div>
          </template>
          <ul class="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• 5+ years in Java development</li>
            <li>• Enterprise application development</li>
            <li>• Team leadership & mentoring</li>
            <li>• Open source contributions</li>
            <li>• Technical writing & blogging</li>
          </ul>
        </UCard>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        I started my journey in software development with a passion for problem-solving and clean code.
        Over the years, I've worked on various projects ranging from small applications to large-scale
        enterprise systems.
      </p>

      <p class="text-gray-600 dark:text-gray-300 mb-4">
        This blog is my way of giving back to the developer community by sharing the knowledge and
        experiences I've gained throughout my career. I believe in continuous learning and staying
        updated with the latest trends in technology.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">What You'll Find Here</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <UCard class="text-center">
          <UIcon name="i-ri-java-fill" class="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <h4 class="font-semibold text-gray-900 dark:text-white">Java Tutorials</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">In-depth guides and best practices</p>
        </UCard>
        <UCard class="text-center">
          <UIcon name="i-heroicons-cog-6-tooth" class="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <h4 class="font-semibold text-gray-900 dark:text-white">Architecture</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">System design and patterns</p>
        </UCard>
        <UCard class="text-center">
          <UIcon name="i-heroicons-rocket-launch" class="w-8 h-8 text-green-600 mx-auto mb-2" />
          <h4 class="font-semibold text-gray-900 dark:text-white">DevOps</h4>
          <p class="text-sm text-gray-600 dark:text-gray-400">Deployment and automation</p>
        </UCard>
      </div>

      <div class="text-center">
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Let's Connect</h3>
        <div class="flex justify-center space-x-4">
          <UButton icon="i-simple-icons-github" variant="outline" color="gray" size="lg"
            to="https://github.com/egovorushkin" target="_blank">
            GitHub
          </UButton>
          <UButton icon="i-simple-icons-linkedin" variant="outline" color="blue" size="lg"
            to="https://www.linkedin.com/in/evgenii-govorushkin/" target="_blank">
            LinkedIn
          </UButton>
          <UButton icon="i-simple-icons-x" variant="outline" color="sky" size="lg" to="https://x.com/evgenii_swe"
            target="_blank" >
            X (Twitter)
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'About',
  description: 'Learn more about my background as a Java developer and my passion for software engineering.'
})
</script>