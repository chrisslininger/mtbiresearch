import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { InquiryForm } from '@/components/InquiryForm'
import { SITE } from '@/content/site'

export const meta: PageMeta = {
  path: '/contact',
  title: 'Contact Us — mTBI Keystone Research Study',
  description:
    'Contact the mTBI Keystone Research Study team at the Advanced Orthogonal Institute in St. Petersburg, Florida — for funding, partnership, media, and referrals.',
  updatedAt: '2026-08-15',
  priority: 0.6,
  changefreq: 'yearly',
}

export default function Contact() {
  return (
    <>
      <PageBanner eyebrow="Get in Touch" title="Contact Us" />
      <section className="section">
        <div className="container">
          <div className="grid-2">
            <div className="prose">
              <h3>The Research Team</h3>
              <p>
                {SITE.legalName}
                <br />
                7601 Dr. M.L.K. Jr. St. N., Suite E
                <br />
                {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
              </p>
              <p>
                Phone: <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
                <br />
                Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </p>
              <p>
                For funding, partnership, media inquiries, or participant referrals,
                use the form and we will route your message to the right person on the
                team.
              </p>
            </div>
            <div>
              <SectionHeading title="Send a Message" />
              <InquiryForm
                kind="contact"
                fields={[
                  { name: 'organization', label: 'Organization (optional)' },
                  { name: 'message', label: 'Message', type: 'textarea', required: true },
                ]}
                submitLabel="Send Message"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
