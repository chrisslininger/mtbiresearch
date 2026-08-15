/**
 * Build-time renderer. Called by scripts/prerender.mjs for every public route.
 * Returns the page's inner HTML and its <head> string; also exports the
 * manifest that the prerenderer, sitemap generator, and verifier all read.
 */
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import { routes } from './routes'
import { renderHead } from './seo/meta'
import { metaForPath } from './routes'
import { SITE } from './content/site'
import './styles/global.css'

export function render(path: string): { html: string; head: string } {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  })

  const html = renderToString(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      </QueryClientProvider>
    </StrictMode>,
  )

  const head = renderHead(metaForPath(path))
  return { html, head }
}

export const manifest = {
  origin: SITE.origin,
  paths: routes.filter((r) => r.prerender).map((r) => r.path),
  entries: routes
    .filter((r) => r.prerender)
    .map((r) => ({
      path: r.path,
      prerender: r.prerender,
      meta: {
        title: r.meta.title,
        description: r.meta.description,
        noindex: r.meta.noindex ?? false,
        updatedAt: r.meta.updatedAt,
        changefreq: r.meta.changefreq,
        priority: r.meta.priority,
      },
    })),
}
