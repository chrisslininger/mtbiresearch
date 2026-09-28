import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { InquiryForm } from '@/components/InquiryForm'
import { FaqList, type Faq } from '@/components/FaqList'
import { faqNode } from '@/seo/schema'

const FAQS: Faq[] = [
  {
    q: 'Who is eligible for the mTBI study?',
    a: 'The study focuses on veterans, special operators, and athletes living with persistent symptoms of mild traumatic brain injury that have not resolved with standard treatment. Formal eligibility criteria are applied at enrollment.',
  },
  {
    q: 'When does enrollment open?',
    a: 'Phase 1 is onboarding veterans now. The person you refer can apply directly at mtbiresearch.com/apply, or the research team will reach out to them after reviewing your referral. Later phases expand enrollment to special operators and athletes.',
  },
  {
    q: 'What happens after I submit a referral?',
    a: 'The research team reviews every referral personally and reaches out to the person you referred to explain the study, answer questions, and confirm eligibility. Phase 1 is conducted under the oversight of the Institutional Review Board of Sherman College of Chiropractic.',
  },
]

export const meta: PageMeta = {
  path: '/refer',
  title: 'Refer a Participant — mTBI Keystone Research Study',
  description:
    'Know a veteran, operator, or athlete with unresolved brain-injury symptoms? Refer them to the mTBI Keystone Research Study — Phase 1 is onboarding veterans now.',
  updatedAt: '2026-09-28',
  priority: 0.8,
  changefreq: 'monthly',
  schema: [faqNode(FAQS)],
}

export default function Refer() {
  return (
    <>
      <PageBanner
        eyebrow="Support the Research"
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
              them here — or send them straight to the{' '}
              <Link to="/apply">Phase 1 application</Link>. Phase 1 is onboarding
              veterans now, and the research team will reach out to every referral with
              next steps.
            </p>
          </div>
          <div className="mt-l">
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
              successMessage="Thank you. The referral has been received — the research team will reach out to the person you referred with next steps."
            />
          </div>
        </div>
      </section>

      <FaqList items={FAQS} />
    </>
  )
}
