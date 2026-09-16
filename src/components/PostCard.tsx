import { Link } from 'react-router-dom'
import { formatPostDate, type Post } from '@/content/blog'

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="post-card">
      {post.image && (
        <Link to={post.path} className="post-card-img" tabIndex={-1} aria-hidden="true">
          <img src={post.image} alt="" loading="lazy" />
        </Link>
      )}
      <div className="post-card-body">
        <p className="post-meta">
          <span className={`post-cat ${post.category}`}>{post.categoryLabel}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readingMinutes} min read</span>
        </p>
        <h2 className="post-card-title">
          <Link to={post.path}>{post.title}</Link>
        </h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <Link to={post.path} className="post-card-more">
          Read more →
        </Link>
      </div>
    </article>
  )
}
