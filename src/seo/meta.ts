/**
 * Renders the contents of <head> for a route as an HTML string, injected into
 * the <!--app-head--> placeholder at build time. Also drives client-side head
 * updates on navigation.
 */
import type { PageMeta } from './types'
import { SITE } from '@/content/site'
import { absoluteUrl } from '@/lib/utils'
import { buildGraph } from './schema'

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const DEFAULT_OG = '/images/brand/og-default.jpg'

/** Full <head> markup for build-time injection. */
export function renderHead(meta: PageMeta): string {
  const canonical = absoluteUrl(meta.path)
  const ogImage = absoluteUrl(meta.ogImage ?? DEFAULT_OG)
  const robots = meta.noindex ? 'noindex, nofollow' : 'index, follow'
  const graph = buildGraph(meta)

  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${graph}</script>`,
  ].join('\n    ')
}

/** Apply a route's metadata to document.head in the browser (client nav). */
export function applyHead(meta: PageMeta): void {
  if (typeof document === 'undefined') return
  document.title = meta.title

  const set = (selector: string, attr: string, value: string, create: () => HTMLElement) => {
    let el = document.head.querySelector(selector)
    if (!el) {
      el = create()
      document.head.appendChild(el)
    }
    el.setAttribute(attr, value)
  }

  set('meta[name="description"]', 'content', meta.description, () => {
    const m = document.createElement('meta')
    m.setAttribute('name', 'description')
    return m
  })
  set('link[rel="canonical"]', 'href', absoluteUrl(meta.path), () => {
    const l = document.createElement('link')
    l.setAttribute('rel', 'canonical')
    return l
  })

  const existing = document.head.querySelector('script[type="application/ld+json"]')
  const graph = buildGraph(meta)
  if (existing) {
    existing.textContent = graph
  } else {
    const s = document.createElement('script')
    s.type = 'application/ld+json'
    s.textContent = graph
    document.head.appendChild(s)
  }
}
