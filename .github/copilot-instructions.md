# Copilot Instructions for gem-blog

## Project Overview
- This is a Nuxt veriosn 4 blog project using TypeScript, with content-driven pages and a minimal starter template.
- Blog content is stored in `content/blog/` as markdown files. Each file represents a blog post and must have frontmatter (title, description, publishedAt, tags).
- The app structure follows Nuxt conventions: `pages/` for routes, `components/` for reusable UI, and `app.vue` as the root entry.

## Key Files & Folders
- `nuxt.config.ts`: Nuxt configuration, modules, and global CSS import.
- `content/blog/`: Markdown blog posts. Slugs are derived from filenames.
- `app/pages/blog/[slug].vue`: Dynamic route for rendering individual blog posts using Nuxt Content.
- `app/pages/index.vue`: Homepage, fetches and displays latest posts using `queryContent` from `#content`.
- `app/assets/css/main.css`: Tailwind and custom styles, imported globally via Nuxt config.

## Development Workflow
- Install dependencies: `npm install` (or `pnpm install`, `yarn install`, `bun install`)
- Start dev server: `npm run dev` (or `pnpm dev`, `yarn dev`, `bun run dev`)
- Build for production: `npm run build`
- Preview production: `npm run preview`

## Patterns & Conventions
- Blog posts require frontmatter: `title`, `description`, `publishedAt`, `tags`.
- Use `queryContent` (imported from `#content`) to fetch posts in Vue files.
- Components are auto-imported by Nuxt (no need for manual import statements).
- Use TypeScript in `.ts` and `.vue` files where possible.
- Global CSS is imported via `app/assets/css/main.css` in `nuxt.config.ts`.
- Do not use a custom `content.config.ts` unless you have advanced needs; default Nuxt Content behavior is preferred.

## Integration Points
- Nuxt Content module for markdown/blog integration.
- No custom backend; all content is static or markdown-based.
- No explicit test or CI setup found—add as needed.

## Examples
- To add a new blog post: create a markdown file in `content/blog/` with frontmatter.
- To add a new route: add a Vue file in `app/pages/`.
- To add a new component: add a `.vue` file in `app/components/`.

## References
- See `README.md` for setup and build commands.
- See Nuxt docs: https://nuxt.com/docs/4.x/getting-started/introduction
