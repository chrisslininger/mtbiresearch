import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'

export const meta: PageMeta = {
  path: '/404',
  title: 'Page Not Found — mTBI Research',
  description:
    'The page you are looking for could not be found. Return to the mTBI Keystone Research Study home page.',
  noindex: true,
  priority: 0.1,
}

export default function NotFound() {
  return (
    <section className="nf-hero">
      <div className="container center">
        <div className="nf-code" aria-hidden="true">
          404
        </div>
        <p className="eyebrow">Page Not Found</p>
        <h1 className="display">This Page Could Not Be Found</h1>
        <p className="nf-sub">
          The page you were looking for doesn’t exist or may have moved. Let’s get you
          back on track.
        </p>
        <div className="nf-actions">
          <Link to="/" className="btn">
            Return to Homepage
          </Link>
        </div>
        <nav className="nf-links" aria-label="Helpful links">
          <Link to="/study-design">Study Design</Link>
          <Link to="/research-phases">Research Phases</Link>
          <Link to="/events">Events</Link>
          <Link to="/support/financial-contribution">Support the Research</Link>
          <Link to="/contact">Contact Us</Link>
        </nav>
      </div>
    </section>
  )
}
