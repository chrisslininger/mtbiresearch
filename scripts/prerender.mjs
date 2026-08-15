/**
 * Static HTML generation. Renders every public route at build time and writes
 * complete HTML to disk. Cloudflare Pages serves those files directly — no
 * server work per request, no JavaScript required to read the content.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const clientDir = join(root, 'dist', 'client')
const serverEntry = join(root, 'dist', 'server', 'entry-server.js')

const template = await readFile(join(clientDir, 'index.html'), 'utf-8')
const { render, manifest } = await import(serverEntry)

if (!template.includes('<!--app-html-->') || !template.includes('<!--app-head-->')) {
  throw new Error('index.html is missing <!--app-html--> or <!--app-head--> placeholders.')
}

function fill(path) {
  const { html, head } = render(path)
  return template.replace('<!--app-head-->', head).replace('<!--app-html-->', html)
}

let written = 0
for (const path of manifest.paths) {
  const page = fill(path)
  const outFile =
    path === '/'
      ? join(clientDir, 'index.html')
      : join(clientDir, path.replace(/^\//, ''), 'index.html')
  await mkdir(dirname(outFile), { recursive: true })
  await writeFile(outFile, page, 'utf-8')
  const kb = (Buffer.byteLength(page) / 1024).toFixed(1)
  console.log(`  prerendered  ${path.padEnd(34)} ${kb} kB`)
  written += 1
}

// A real static 404 so Cloudflare Pages serves crawler-readable "not found"
// content for unmatched URLs instead of an empty SPA shell.
const notFound = fill('/__not_found__')
await writeFile(join(clientDir, '404.html'), notFound, 'utf-8')
console.log('  prerendered  404.html')

console.log(`\n✓ ${written} route${written === 1 ? '' : 's'} + 404 prerendered to static HTML`)
