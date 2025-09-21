// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  // ui: {
  //   prefix: 'Nuxt'
  // }
  // content: {
  //   build: {
  //     markdown: {
  //       highlight: {
  //         theme: {
  //           default: 'github-light',
  //           dark: 'github-dark'
  //         },
  //         preload: ['java', 'javascript', 'typescript', 'bash', 'json', 'xml', 'sql']
  //       }
  //     }
  //   }
  // },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'TechBlog - Java & Software Development',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A personal tech blog sharing insights about Java development and software engineering best practices.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})