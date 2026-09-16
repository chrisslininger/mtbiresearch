import { Link, useLocation } from 'react-router-dom'
import { LastUpdated } from '@/components/blocks'
import { PostCard } from '@/components/PostCard'
import { POSTS, postBySlug, formatPostDate } from '@/content/blog'
import NotFound from '@/pages/NotFound'

const HERO_SCRIM =
  'linear-gradient(180deg, oklch(0.20 0.009 255 / .30) 0%, oklch(0.20 0.009 255 / .45) 35%, oklch(0.20 0.009 255 / .80) 75%, oklch(0.20 0.009 255 / .95) 100%)'

export default function BlogPost() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const post = postBySlug(slug)
  if (!post) return <NotFound />

  const related = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 2)

  return (
    <>
      <section
        className="page-banner ev-photo-hero post-photo-hero"
        style={{
          backgroundImage: `${HERO_SCRIM}, url('${post.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
        }}
      >
        <div
          className="ev-hero-img"
          role={post.imageAlt ? 'img' : undefined}
          aria-label={post.imageAlt || undefined}
          aria-hidden={post.imageAlt ? undefined : true}
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        <div className="container">
          <p className="eyebrow">
            <Link to={`/blog?category=${post.category}`}>{post.categoryLabel}</Link>
          </p>
          <h1 className="display">{post.title}</h1>
          <p className="post-hero-meta">
            <span>By {post.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingMinutes} min read</span>
          </p>
        </div>
      </section>

      <article className="section">
        <div className="container">
          <div
            className="narrow prose post-body"
            // Markdown is authored in this repository by the research team.
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          {post.tags.length > 0 && (
            <ul className="topics narrow post-tags" aria-label="Topics">
              {post.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}
          <div className="narrow mt-m">
            <LastUpdated date={post.updatedAt ?? post.date} />
          </div>
          <div className="narrow mt-m">
            <Link to="/blog" className="btn btn-outline">
              ← All Posts
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-light section">
          <div className="container">
            <div className="sh">
              <p className="eyebrow">Keep Reading</p>
              <h2 className="display-sm">More {post.categoryLabel}s</h2>
            </div>
            <div className="post-grid">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
