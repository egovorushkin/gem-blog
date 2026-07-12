<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        About Me
      </h1>
      <Avatar wrapper-class="w-32 h-32 mx-auto mb-6" icon-class="w-16 h-16 text-white" />
    </div>

    <div>
      <p class="text-xl text-gray-600 dark:text-gray-300 text-center mb-8">
        Software engineer, mostly backend and architecture. In free time I build pet projects and write here about what I learn from them.
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
            <li>• Technical writing & blogging</li>
          </ul>
        </UCard>
      </div>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">My Journey</h2>
      <p class="text-gray-600 dark:text-gray-300 mb-4">
        I got into software development because I like solving problems and I like when code still
        makes sense a year later. Over the years I worked on different kind of projects, from small
        apps to big enterprise systems.
      </p>

      <p class="text-gray-600 dark:text-gray-300 mb-4">
        This blog is mostly where I write down things I learn or figure out, so I don't forget them,
        and maybe it helps someone else too. I try to keep learning and stay up to date with what is
        happening in tech.
      </p>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <UCard>
          <template #header>
            <div class="flex items-center space-x-2">
              <img src="/images/sysMon.png" alt="SysMon app icon" class="w-5 h-5 rounded-md">
              <h3 class="text-lg font-semibold">SysMon</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            A macOS app that shows CPU, RAM, disk and temperature usage at a glance.
          </p>
          <UButton icon="i-simple-icons-github" variant="outline" color="gray" size="sm"
            to="https://github.com/egovorushkin/sysmon" target="_blank">
            View on GitHub
          </UButton>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center space-x-2">
              <img src="/images/infinite_todo.png" alt="Infinite TODO app icon" class="w-5 h-5 rounded-md">
              <h3 class="text-lg font-semibold">Infinite TODO</h3>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            A simple to-do app for iOS.
          </p>
          <UButton icon="i-simple-icons-github" variant="outline" color="gray" size="sm"
            to="https://github.com/egovorushkin/infinite-todo" target="_blank">
            View on GitHub
          </UButton>
        </UCard>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-2">
                <img src="/images/rcivitas_icon.png" alt="RCivitas app icon" class="w-5 h-5 rounded-md">
                <h3 class="text-lg font-semibold">RCivitas</h3>
              </div>
              <UBadge variant="soft" color="amber" size="sm">In progress</UBadge>
            </div>
          </template>
          <p class="text-gray-600 dark:text-gray-300">
            A social network for RC (remote control) modellers. Still building it, repo is private for now.
          </p>
        </UCard>
      </div>

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
  description: 'Learn more about my background as a software engineer and my passion for backend engineering and side projects.'
})

const config = useRuntimeConfig()
useHead({ link: [{ rel: 'canonical', href: `${config.public.siteUrl}/about` }] })

defineOgImage('Default', {
  title: 'About Evgenii Govorushkin',
  description: 'Software engineer sharing knowledge about backend engineering, architecture, and side projects.'
})
</script>