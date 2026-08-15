import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { SITE } from '@/content/site'

export const meta: PageMeta = {
  path: '/media',
  title: 'Media — mTBI Keystone Research Study',
  description:
    'Press resources and media contact for the mTBI Keystone Research Study — a root-cause investigation of mild traumatic brain injury in veterans and athletes.',
  updatedAt: '2026-08-15',
  priority: 0.6,
  changefreq: 'monthly',
}

export default function Media() {
  return (
    <>
      <PageBanner eyebrow="Newsroom" title="Media" tag="For press and coverage" />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              The mTBI Keystone Study is a clinical research effort tracing the
              persistent symptoms of mild traumatic brain injury to the craniocervical
              junction, with the goal of changing how the Department of War and the VA
              treat it. Journalists covering veterans’ health, brain injury, or
              military medicine are welcome to reach out for interviews, background, and
              data.
            </p>
            <h3>Media contact</h3>
            <p>
              Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{' '}
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a> to arrange an
              interview or request the study press kit.
            </p>
            <h3>Coverage &amp; announcements</h3>
            <p>
              <em>Press releases and media coverage will be collected here (in progress).</em>
            </p>
          </div>
          <div className="center mt-l">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
