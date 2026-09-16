/**
 * Blog — Markdown posts in src/content/posts/*.md, loaded at build time and
 * prerendered like every other page. Two categories: "article" and
 * "research-review". Files whose name starts with "_" (e.g. _TEMPLATE.md) are
 * ignored, as are posts with `draft: true`.
 *
 * To publish: add a .md file with the frontmatter shown in _TEMPLATE.md, push,
 * and Cloudflare rebuilds the site with the new post, its route, its sitemap
 * entry, and its BlogPosting structured data.
 */
import { marked } from 'marked'

export type PostCategory = 'article' | 'research-review'

export const CATEGORY_LABEL: Record<PostCategory, string> = {
  article: 'Article',
  'research-review': 'Research Review',
}

export interface Post {
  slug: string
  path: string
  title: string
  date: string // ISO yyyy-mm-dd
  updatedAt?: string
  category: PostCategory
  categoryLabel: string
  excerpt: string
  author: string
  authorType: 'Person' | 'Organization'
  image?: string
  tags: string[]
  /** Rendered HTML body (trusted: authored in-repo). */
  html: string
  readingMinutes: number
}

marked.use({ gfm: true, breaks: false })

// ---- frontmatter ----------------------------------------------------------

type Front = Record<string, string | string[]>

function parseValue(raw: string): string | string[] {
  const v = raw.trim()
  if (v.startsWith('[') && v.endsWith(']')) {
    return v
      .slice(1, -1)
      .split(',')
      .map((s) => s.trim().replace(/^["']|["']$/g, ''))
      .filter(Boolean)
  }
  return v.replace(/^["']|["']$/g, '')
}

function parseFrontmatter(src: string): { front: Front; body: string } {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!m) return { front: {}, body: src }
  const front: Front = {}
  let listKey: string | null = null
  for (const line of m[1].split(/\r?\n/)) {
    if (!line.trim() || line.trim().startsWith('#')) continue
    const item = line.match(/^\s*-\s+(.*)$/)
    if (item && listKey) {
      const arr = (front[listKey] as string[] | undefined) ?? []
      arr.push(item[1].trim().replace(/^["']|["']$/g, ''))
      front[listKey] = arr
      continue
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)
    if (!kv) continue
    const [, key, rest] = kv
    if (rest.trim() === '') {
      listKey = key
      front[key] = []
    } else {
      listKey = null
      front[key] = parseValue(rest)
    }
  }
  return { front, body: m[2] }
}

function str(front: Front, key: string, fallback = ''): string {
  const v = front[key]
  return Array.isArray(v) ? v.join(', ') : (v ?? fallback)
}

function list(front: Front, key: string): string[] {
  const v = front[key]
  if (Array.isArray(v)) return v
  if (typeof v === 'string' && v.trim()) return v.split(',').map((s) => s.trim())
  return []
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// ---- load -----------------------------------------------------------------

const files = import.meta.glob<string>(['/src/content/posts/*.md', '!/src/content/posts/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
})

function build(file: string, src: string): Post | null {
  const { front, body } = parseFrontmatter(src)
  if (str(front, 'draft') === 'true') return null
  const filename = file.split('/').pop()?.replace(/\.md$/, '') ?? ''
  const title = str(front, 'title', filename)
  const slug = slugify(str(front, 'slug', filename))
  const category = (str(front, 'category', 'article') as PostCategory)
  const cat: PostCategory = category === 'research-review' ? 'research-review' : 'article'
  const author = str(front, 'author', 'mTBI Research Team')
  const authorType = str(front, 'authorType') === 'Person' || /^dr\.?\s/i.test(author)
    ? 'Person'
    : 'Organization'
  const html = marked.parse(body, { async: false }) as string
  const words = body.split(/\s+/).filter(Boolean).length
  const updated = str(front, 'updatedAt')
  return {
    slug,
    path: `/blog/${slug}`,
    title,
    date: str(front, 'date', '2026-01-01'),
    ...(updated ? { updatedAt: updated } : {}),
    category: cat,
    categoryLabel: CATEGORY_LABEL[cat],
    excerpt: str(front, 'excerpt'),
    author,
    authorType,
    ...(str(front, 'image') ? { image: str(front, 'image') } : {}),
    tags: list(front, 'tags'),
    html,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  }
}

export const POSTS: Post[] = Object.entries(files)
  .map(([file, src]) => build(file, src))
  .filter((p): p is Post => p !== null)
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

export function postBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug)
}

export function postsByCategory(category?: PostCategory | 'all'): Post[] {
  if (!category || category === 'all') return POSTS
  return POSTS.filter((p) => p.category === category)
}

export function formatPostDate(iso: string): string {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
