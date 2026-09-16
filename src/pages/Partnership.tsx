import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { InquiryForm } from '@/components/InquiryForm'

export const meta: PageMeta = {
  path: '/support/research-partnership',
  title: 'Research Partnership — mTBI Keystone Study',
  description:
    'Partner on the mTBI Keystone Study. Imaging centers, universities, and clinical experts can strengthen the science behind a root-cause investigation of mTBI.',
  updatedAt: '2026-09-16',
  priority: 0.7,
  changefreq: 'monthly',
}

export default function Partnership() {
  return (
    <>
      <PageBanner
        eyebrow="Support the Research"
        title="Research Partnership"
        tag="The right partners make the science stronger"
        image="/images/banners/research-partnership.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              We are building a research coalition with the institutional depth to
              produce findings that medicine and policy cannot ignore. If you represent
              an imaging center, a university, a clinical practice, or bring
              methodological or neurological expertise, there may be a place for you in
              this work.
            </p>
            <h2>Where partners fit</h2>
            <p>
              Partnership opportunities span diagnostic imaging capacity, participant
              recruitment and care, biostatistics and study design, and dissemination.
              Institutional partners lend both capability and credibility — the two
              things that turn a promising result into an accepted standard.
            </p>
          </div>
          <div style={{ marginTop: '48px' }}>
            <SectionHeading eyebrow="Explore a Partnership" title="Get in Touch" />
            <InquiryForm
              kind="research-partnership"
              fields={[
                { name: 'organization', label: 'Organization', required: true },
                { name: 'phone', label: 'Phone (optional)', type: 'tel' },
                {
                  name: 'message',
                  label: 'How might we work together?',
                  type: 'textarea',
                  required: true,
                },
              ]}
              submitLabel="Start the Conversation"
            />
          </div>
        </div>
      </section>
    </>
  )
}
