# mTBI Research — mtbiresearch.com

The public website for the Mild Traumatic Brain Injury Keystone Research Study.

Built to the house web standard: **React 19 + Vite 7 + TypeScript (strict) +
React Router 7 + Supabase + TanStack Query**, prerendered to static HTML so
every page is fully readable by AI answer engines (ChatGPT, Claude, Perplexity)
and search crawlers before any JavaScript runs.

## What's wired

- **Funding progress reads live from Supabase.** The homepage and the
  Financial Contribution page pull the funding goal and total raised from the
  `mtbi-os` project via a read-only aggregate RPC (`public_funding_totals`).
  Today that is **$20,000,000 goal / $0 raised**, and it updates automatically
  as contributions are recorded — no code change needed.
- **Lead forms** (contribute, endorse, partner, refer, contact) post to the
  `web_inquiries` table, failing soft so a config issue can never break the
  form UI.
- Only the **publishable** Supabase key is ever in the browser; every table has
  RLS and the public site sees only aggregate totals.

## Local development

```bash
npm install
npm run dev            # http://localhost:5173
```

## Production build (what Cloudflare runs)

```bash
npm run build          # typecheck → client → ssr → prerender → seo → verify
npm run preview        # serve the built static site locally
```

`npm run build` fails if any public page is missing its title, description,
canonical, JSON-LD, an `<h1>`, or 300+ characters of real text in the raw HTML
— the gate that keeps the site visible to AI crawlers.

## Deploy: GitHub → Cloudflare Pages → GoDaddy domain

1. **GitHub** — push this repo to a new repository.
2. **Cloudflare Pages** — Create a project → connect the GitHub repo.
   - Framework preset: **None / Vite**
   - Build command: `npm run build`
   - Build output directory: `dist/client`
   - Node version: 20 or newer (set `NODE_VERSION=20` if needed)
   - Environment variables are optional (safe defaults are baked in); to point
     at a Supabase preview branch set `VITE_SUPABASE_URL` and
     `VITE_SUPABASE_ANON_KEY`.
   - The first build produces a **preview URL** (`*.pages.dev`) — review there.
3. **Domain (mtbiresearch.com, at GoDaddy)** — In Cloudflare Pages → Custom
   domains, add `mtbiresearch.com` and `www.mtbiresearch.com`. Cloudflare shows
   the exact DNS records. At GoDaddy, either:
   - point the records Cloudflare specifies (CNAME `www` → `<project>.pages.dev`,
     and the apex per Cloudflare's instructions), **or**
   - change the GoDaddy nameservers to Cloudflare's for full DNS management.
   DNS changes are the only step that touches the live domain — everything
   before it is safe and reversible.

## Structure

```
src/
  routes.tsx          the route manifest — one array, four consumers
  content/site.ts     org identity, nav, footer (single source of truth)
  seo/                PageMeta contract, head rendering, JSON-LD @graph builders
  lib/                supabase client, funding + inquiry query hooks, utils
  components/         Header, Footer, Layout, FundingBar, InquiryForm, blocks
  pages/              one file per route (content + its PageMeta + schema)
  styles/             tokens.css (OKLCH design system) + site.css + global.css
scripts/              prerender / generate-seo-files / verify-prerender
public/               robots.txt, images, Cloudflare _headers
```

### Design system note

The client-approved visual design is delivered as component CSS
(`src/styles/site.css`) consuming the OKLCH token layer (`src/styles/tokens.css`),
rather than re-expressed as Tailwind utilities. This preserves the approved look
exactly. All GEO-critical rules (prerendered content, typed `PageMeta`, JSON-LD
`@graph`, semantic HTML, single `<h1>`, real `<a href>` navigation) are fully
honored.
