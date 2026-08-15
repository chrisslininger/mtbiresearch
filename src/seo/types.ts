/**
 * The metadata contract. Required and typed, so a page cannot ship missing its
 * title, description, or canonical path — the compiler rejects it.
 * See web-build-standard §6.
 */

export type JsonLdNode = Record<string, unknown>

export type ChangeFreq =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never'

export interface PageMeta {
  /** Route path, e.g. "/" or "/study-design". Used for canonical + sitemap. */
  path: string
  /** Under ~60 chars. */
  title: string
  /** 140–160 chars, written as a real answer. */
  description: string
  /** Absolute or root-relative OG image. */
  ogImage?: string
  /** ISO date the content was last meaningfully updated. */
  updatedAt?: string
  /** Exclude from indexing + sitemap. */
  noindex?: boolean
  /** Extra JSON-LD nodes merged into the sitewide @graph for this page. */
  schema?: JsonLdNode[]
  /** Sitemap priority 0.0–1.0. */
  priority?: number
  /** Sitemap change frequency. */
  changefreq?: ChangeFreq
}
