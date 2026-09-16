import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner } from '@/components/blocks'
import { PostCard } from '@/components/PostCard'
import { POSTS, postsByCategory, CATEGORY_LABEL, type PostCategory } from '@/content/blog'
import { blogNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/blog',
  title: 'Blog — mTBI Keystone Research Study',
  description:
    'Articles and plain-language research reviews from the mTBI Keystone Research Study team on concussion, the craniocervical junction, and recovery.',
  updatedAt: '2026-09-16',
  priority: 0.8,
  changefreq: 'weekly',
  schema: [blogNode(POSTS)],
}

const FILTERS: Array<{ key: PostCategory | 'all'; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'article', label: CATEGORY_LABEL.article },
  { key: 'research-review', label: CATEGORY_LABEL['research-review'] },
]

function activeFilter(search: string): PostCategory | 'all' {
  const c = new URLSearchParams(search).get('category')
  return c === 'article' || c === 'research-review' ? c : 'all'
}

export default function Blog() {
  const { search } = useLocation()
  // Prerendered HTML is always the unfiltered list; apply the URL filter after
  // hydration so server and client markup match on first paint.
  const [active, setActive] = useState<PostCategory | 'all'>('all')
  useEffect(() => {
    setActive(activeFilter(search))
  }, [search])
  const posts = useMemo(() => postsByCategory(active), [active])

  return (
    <>
      <PageBanner
        eyebrow="Articles & Research Reviews"
        title="Blog"
        tag="Plain-language writing on concussion, the craniocervical junction, and recovery"
      />

      <section className="section">
        <div className="container">
          <nav className="post-filters" aria-label="Filter posts by category">
            {FILTERS.map((f) => (
              <Link
                key={f.key}
                to={f.key === 'all' ? '/blog' : `/blog?category=${f.key}`}
                className={`post-filter${active === f.key ? ' on' : ''}`}
                aria-current={active === f.key ? 'page' : undefined}
              >
                {f.label}
              </Link>
            ))}
          </nav>

          {posts.length > 0 ? (
            <div className="post-grid">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          ) : (
            <div className="post-empty narrow center">
              <p className="lead">
                {active === 'all'
                  ? 'The first articles and research reviews are on their way.'
                  : `No ${CATEGORY_LABEL[active as PostCategory].toLowerCase()}s yet — check back soon.`}
              </p>
              <p>
                In the meantime, explore the <Link to="/study-design">study design</Link>,
                the <Link to="/research-phases">research phases</Link>, or{' '}
                <Link to="/events">upcoming events</Link>.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
