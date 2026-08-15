import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner } from '@/components/blocks'

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
    <>
      <PageBanner title="Page Not Found" tag="That page could not be found" />
      <section className="section">
        <div className="container center prose">
          <p>
            The page you were looking for doesn’t exist or may have moved. Let’s get you
            back on track.
          </p>
          <div className="mt-m">
            <Link to="/" className="btn">
              Return Home
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
