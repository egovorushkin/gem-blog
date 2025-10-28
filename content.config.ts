import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        title: z.string().min(3),
        description: z.string().min(10),
        publishedAt: z.date(),
        tags: z.array(z.string()),
        image: z.string(),
        author: z.string().optional(),
      })
    })
  }
})