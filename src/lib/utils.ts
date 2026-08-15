import { SITE } from '@/content/site'

/** Join class names, dropping falsy values. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

/** Turn a root-relative path into an absolute URL on the production origin. */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path
  return `${SITE.origin.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
}

/** Format a whole-dollar USD amount with no cents. */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount)
}
