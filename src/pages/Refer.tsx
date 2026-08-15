import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { InquiryForm } from '@/components/InquiryForm'
import { faqNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/refer',
  title: 'Refer a Participant — mTBI Keystone Study',
  description:
    'Know a veteran, operator, or athlete with unresolved brain-injury symptoms? Refer them to the mTBI Keystone Study. Enrollment opens in Phase 2.',
  updatedAt: '2026-08-15',
  priority: 0.8,
  changefreq: 'monthly',
  schema: [
    faqNode([
      {
        q: 'Who is eligible for the mTBI study?',
        a: 'The study focuses on veterans, special operators, and athletes living with persistent symptoms of mild traumatic brain injury that have not resolved with standard treatment. Formal eligibility criteria are applied at enrollment, which opens in Phase 2.',
      },
      {
        q: 'When does enrollment open?',
        a: 'Participant enrollment opens in Phase 2 of the study. Referrals submitted now are held and contacted as enrollment begins.',
      },
    ]),
  ],
}

export default function Refer() {
  return (
    <>
      <PageBanner
        eyebrow="Get Involved"
        title="Refer a Participant"
        tag="They have been waiting long enough"
        image="/images/banners/refer-a-participant.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              Do you know a veteran, a special operator, or an athlete who has been
              living with symptoms that no treatment has resolved — the headaches, the
              fog, the sleeplessness, the dizziness? This study exists for them. Refer
              them here, and as enrollment opens in Phase 2, the research team will
              reach out with next steps.
            </p>
          </div>
          <div style={{ marginTop: '48px' }}>
            <SectionHeading eyebrow="Connect Someone to an Answer" title="Make a Referral" />
            <InquiryForm
              kind="refer-participant"
              fields={[
                { name: 'phone', label: 'Your Phone (optional)', type: 'tel' },
                {
                  name: 'message',
                  label: 'Who are you referring, and how can we reach them?',
                  type: 'textarea',
                  required: true,
                },
              ]}
              submitLabel="Submit Referral"
              successMessage="Thank you. The referral has been received — the research team will reach out as enrollment opens in Phase 2."
            />
          </div>
        </div>
      </section>
    </>
  )
}
