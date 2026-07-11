// @nuxt/content's client-side query engine (@sqlite.org/sqlite-wasm) fetches its
// wasm binary from a hardcoded "sqlite3.wasm" path at runtime, but Vite emits it
// with a content hash (e.g. sqlite3.AbCd1234.wasm). That mismatch makes the fetch
// 404 unconditionally on any static deployment (no server to fall back to).
// This copies the hashed file to the literal name the runtime code expects.
import { readdirSync, copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const candidateDirs = ['dist/_nuxt', '.output/public/_nuxt']

let fixed = false

for (const dir of candidateDirs) {
  if (!existsSync(dir)) continue

  const match = readdirSync(dir).find(f => /^sqlite3\..*\.wasm$/.test(f))
  if (!match) continue

  const src = join(dir, match)
  const dest = join(dir, 'sqlite3.wasm')
  copyFileSync(src, dest)
  console.log(`[fix-sqlite-wasm] Copied ${src} -> ${dest}`)
  fixed = true
}

if (!fixed) {
  console.warn('[fix-sqlite-wasm] No hashed sqlite3.*.wasm file found in dist/_nuxt or .output/public/_nuxt — skipping.')
}
