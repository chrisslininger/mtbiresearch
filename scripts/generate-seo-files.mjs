/**
 * Generates sitemap.xml and llms.txt, and stamps the real origin into
 * robots.txt. All derived from the route manifest, so these files can never
 * fall out of sync with the site.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const clientDir = join(root, 'dist', 'client')
const { manifest } = await import(join(root, 'dist', 'server', 'entry-server.js'))

const origin = String(manifest.origin).replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const indexable = manifest.entries.filter((e) => e.prerender && !e.meta.noindex)

/* sitemap.xml */
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...indexable.map((entry) => {
    const loc = `${origin}${entry.path === '/' ? '/' : entry.path}`
    return [
      '  <url>',
      `    <loc>${loc}</loc>`,
      `    <lastmod>${(entry.meta.updatedAt ?? today).slice(0, 10)}</lastmod>`,
      `    <changefreq>${entry.meta.changefreq ?? 'monthly'}</changefreq>`,
      `    <priority>${(entry.meta.priority ?? 0.5).toFixed(1)}</priority>`,
      '  </url>',
    ].join('\n')
  }),
  '</urlset>',
  '',
].join('\n')
await writeFile(join(clientDir, 'sitemap.xml'), sitemap, 'utf-8')

/* robots.txt origin stamp */
try {
  const robotsPath = join(clientDir, 'robots.txt')
  const robots = await readFile(robotsPath, 'utf-8')
  await writeFile(
    robotsPath,
    robots.replace(/^Sitemap: .*$/m, `Sitemap: ${origin}/sitemap.xml`),
    'utf-8',
  )
} catch {
  console.warn('  ! robots.txt not found in dist/client — skipped origin stamp')
}

/* llms.txt — shipped because it is cheap and correctly shaped; not relied on. */
const llms = [
  `# mTBI Research`,
  '',
  `> ${indexable.find((e) => e.path === '/')?.meta.description ?? ''}`,
  '',
  '## Pages',
  '',
  ...indexable.map((e) => `- [${e.meta.title}](${origin}${e.path}): ${e.meta.description}`),
  '',
].join('\n')
await writeFile(join(clientDir, 'llms.txt'), llms, 'utf-8')

console.log(`✓ sitemap.xml (${indexable.length} urls), llms.txt, robots.txt origin stamped`)
