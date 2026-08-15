import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { SITE } from '@/content/site'

export const meta: PageMeta = {
  path: '/privacy',
  title: 'Privacy Policy — mTBI Research',
  description:
    'How the mTBI Keystone Research Study collects, uses, and protects information submitted through mtbiresearch.com, including contact and referral form data.',
  updatedAt: '2026-08-15',
  priority: 0.3,
  changefreq: 'yearly',
}

export default function Privacy() {
  return (
    <>
      <PageBanner title="Privacy Policy" />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              This policy explains how {SITE.legalName} handles information collected
              through mtbiresearch.com. It is provided as a starting template and should
              be reviewed by counsel before launch.
            </p>
            <h3>Information we collect</h3>
            <p>
              We collect the information you voluntarily submit through our contact,
              referral, contribution, partnership, and endorsement forms — such as your
              name, email, phone, organization, and message. We do not sell your
              information.
            </p>
            <h3>How we use it</h3>
            <p>
              Submitted information is used solely to respond to your inquiry, process
              contributions and referrals, and coordinate the research effort. Referral
              information is handled with particular care and shared only with the
              research team responsible for enrollment.
            </p>
            <h3>Contact</h3>
            <p>
              Questions about this policy can be directed to{' '}
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
