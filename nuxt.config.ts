// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      siteUrl: 'https://egovorushkin.dev'
    }
  },

  site: {
    url: 'https://egovorushkin.dev',
    name: 'Evgenii Govorushkin'
  },

  // Hashed assets (_nuxt/*, _og/*, etc.) are safe to cache forever — their filename
  // changes on every build. HTML pages are not: force browsers/CDN to always
  // revalidate them so a stale document referencing an old build's hashed assets
  // (or missing endpoints) never gets served from cache after a redeploy.
  routeRules: {
    '/**': {
      headers: { 'cache-control': 'public, max-age=0, must-revalidate' }
    }
  },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxtjs/sitemap',
    'nuxt-gtag',
    'nuxt-og-image'
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
        toc: {
          depth: 3,
          searchDepth: 3,
        },
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
      title: 'Evgenii Govorushkin - Software Engineering & Side Projects',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Backend engineering, side projects, and the occasional deep dive from a software engineer who builds things and writes about it.' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})