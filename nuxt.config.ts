// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteUrl: 'https://egovorushkin.dev'
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    'nuxt-gtag'
  ],
  gtag: {
    id: 'G-EFCLZ9Y3VQ'
  },
  // ui: {
  //   prefix: 'Nuxt'
  // }
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          'remark-reading-time': {},
        },
        // toc: {
        //   depth: 3,
        //   searchDepth: 4,
        // },
        highlight: {
          // Theme configuration
          theme: {
            default: 'catppuccin-latte',
            dark: 'catppuccin-frappe',
            // Alternative beautiful themes:
            // default: 'vitesse-light',
            // dark: 'vitesse-dark',
            // default: 'min-light',
            // dark: 'min-dark',
          },

          // Preload languages for better performance
          preload: [
            'java',
            'javascript',
            'typescript',
            'bash',
            'shell',
            'json',
            'xml',
            'sql',
            'yaml',
            'dockerfile',
            'python',
            'go',
            'vue',
            'html',
            'css',
            'scss',
            'markdown'
          ],

          // Additional Shiki options
          langs: [
            // You can add custom language definitions here
            'java',
            'js',
            'ts',
            'vue',
            'bash',
            'json',
            'yaml',
            'dockerfile',
            'sql'
          ]
        },
      }
    },
  },
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})