import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { InquiryForm } from '@/components/InquiryForm'

export const meta: PageMeta = {
  path: '/support/organizational-support',
  title: 'Organizational Support — Endorse the mTBI Study',
  description:
    'Lend your organization’s voice to the mTBI Keystone Study. Endorsements from groups serving veterans, operators, and athletes signal to funders and policymakers.',
  updatedAt: '2026-08-15',
  priority: 0.7,
  changefreq: 'monthly',
}

export default function Organizational() {
  return (
    <>
      <PageBanner
        eyebrow="Support the Research"
        title="Organizational Support"
        tag="Stand with us"
        image="/images/banners/research-partnership.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              If your organization has been fighting for veterans, operators, athletes,
              or the truth about brain injury, your endorsement carries weight. It tells
              funders and policymakers that the people who understand what is at stake
              believe in this work — and that belief is often what moves a study from
              the margins to the center of the conversation.
            </p>
            <h3>What an endorsement does</h3>
            <p>
              Endorsing organizations are recognized as part of the scientific and
              advocacy coalition behind the study. Your name helps open doors at the
              institutions whose decisions determine whether this research reaches the
              veterans and service members who need it.
            </p>
          </div>
          <div style={{ marginTop: '48px' }}>
            <SectionHeading eyebrow="Add Your Endorsement" title="Lend Your Voice" />
            <InquiryForm
              kind="organizational-support"
              fields={[
                { name: 'organization', label: 'Organization', required: true },
                { name: 'phone', label: 'Phone (optional)', type: 'tel' },
                {
                  name: 'message',
                  label: 'Tell us about your organization',
                  type: 'textarea',
                },
              ]}
              submitLabel="Add Our Endorsement"
              successMessage="Thank you for standing with us. The team will follow up to confirm your organization’s endorsement."
            />
          </div>
        </div>
      </section>
    </>
  )
}
