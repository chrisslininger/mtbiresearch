import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { SITE } from '@/content/site'

export const meta: PageMeta = {
  path: '/terms',
  title: 'Terms of Use — mTBI Research',
  description:
    'The terms governing use of mtbiresearch.com, the informational website for the mTBI Keystone Research Study.',
  updatedAt: '2026-08-15',
  priority: 0.3,
  changefreq: 'yearly',
}

export default function Terms() {
  return (
    <>
      <PageBanner title="Terms of Use" />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              These terms govern your use of mtbiresearch.com, operated by{' '}
              {SITE.legalName}. They are provided as a starting template and should be
              reviewed by counsel before launch.
            </p>
            <h3>Informational purpose</h3>
            <p>
              Content on this site describes a research study and is provided for
              informational purposes only. It is not medical advice and does not create
              a doctor–patient relationship. Participation in the study is subject to
              formal eligibility screening and informed consent.
            </p>
            <h3>No warranty</h3>
            <p>
              The site is provided “as is.” While we work to keep information accurate
              and current, we make no warranty as to completeness and may update content
              as the study progresses.
            </p>
            <h3>Contact</h3>
            <p>
              Questions about these terms can be directed to{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
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
