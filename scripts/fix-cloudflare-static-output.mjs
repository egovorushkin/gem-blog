// Post-build patches for static output deployed to Cloudflare (Workers + Assets).
import { readdirSync, copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const candidateDirs = ['dist', '.output/public']

for (const dir of candidateDirs) {
  if (!existsSync(dir)) continue
  fixSqliteWasmPath(join(dir, '_nuxt'))
  fixInvalidRedirectStatus(join(dir, '_redirects'))
}

// @nuxt/content's client-side query engine (@sqlite.org/sqlite-wasm) fetches its
// wasm binary from a hardcoded "sqlite3.wasm" path at runtime, but Vite emits it
// with a content hash (e.g. sqlite3.AbCd1234.wasm). That mismatch makes the fetch
// 404 unconditionally on any static deployment (no server to fall back to).
// This copies the hashed file to the literal name the runtime code expects.
function fixSqliteWasmPath(nuxtDir) {
  if (!existsSync(nuxtDir)) return

  const match = readdirSync(nuxtDir).find(f => /^sqlite3\..*\.wasm$/.test(f))
  if (!match) {
    console.warn(`[fix-cloudflare-static-output] No hashed sqlite3.*.wasm file found in ${nuxtDir} — skipping.`)
    return
  }

  const src = join(nuxtDir, match)
  const dest = join(nuxtDir, 'sqlite3.wasm')
  copyFileSync(src, dest)
  console.log(`[fix-cloudflare-static-output] Copied ${src} -> ${dest}`)
}

// Nitro's cloudflare preset unconditionally emits `/* /404.html 404` in _redirects
// whenever a 404.html exists (which static generate always produces). Cloudflare's
// deploy API only accepts 200/301/302/303/307/308 in _redirects rules and rejects
// the whole deploy on this line — Cloudflare already serves a top-level 404.html
// automatically on its own, so this rule is both invalid and redundant. Strip it.
function fixInvalidRedirectStatus(redirectsFile) {
  if (!existsSync(redirectsFile)) return

  const lines = readFileSync(redirectsFile, 'utf-8').split('\n')
  const filtered = lines.filter(line => !/^\/\*\s+\/404\.html\s+404\s*$/.test(line.trim()))

  if (filtered.length !== lines.length) {
    writeFileSync(redirectsFile, filtered.join('\n'))
    console.log(`[fix-cloudflare-static-output] Removed invalid 404 redirect rule from ${redirectsFile}`)
  }
}
