import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { FundingBar } from '@/components/FundingBar'
import { InquiryForm } from '@/components/InquiryForm'
import { faqNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/support/financial-contribution',
  title: 'Financial Contribution — Fund the mTBI Study',
  description:
    'Fund the mTBI Keystone Study. Contributions cover diagnostic imaging, participant treatment, and the research infrastructure to bring findings to the DoD and VA.',
  updatedAt: '2026-08-15',
  priority: 0.9,
  changefreq: 'weekly',
  schema: [
    faqNode([
      {
        q: 'Where does my contribution go?',
        a: 'Contributions fund comprehensive diagnostic imaging for participants, direct treatment across the study arms, and the research infrastructure required to bring findings to SOCOM, CENTCOM, and the VA.',
      },
      {
        q: 'Can I fund a specific veteran or a specific phase?',
        a: 'Yes. Contributions can be directed to a specific research phase or to sponsor a participant. Contact the research team to arrange directed or named giving.',
      },
    ]),
  ],
}

export default function Fund() {
  return (
    <>
      <PageBanner
        eyebrow="Support the Research"
        title="Financial Contribution"
        tag="Every dollar moves this forward"
        image="/images/banners/financial-contribution.jpg"
      />

      <section className="section-dark section">
        <div className="container">
          <p className="narrow center">
            We are raising $20,000,000 to execute this study at the level of scientific
            rigor that makes its findings impossible to ignore. Here is where the
            funding stands today.
          </p>
          <FundingBar />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Ways to Give" title="Giving Levels" />
          <div className="narrow">
            <div className="tier">
              <h4>Sponsor a Participant</h4>
              <p className="amt">$57,500</p>
              <p>
                Underwrite the full diagnostic imaging and treatment pathway for one
                veteran through the study.
              </p>
            </div>
            <div className="tier">
              <h4>Fund the Pilot</h4>
              <p className="amt">Phase 1 · $384,702</p>
              <p>
                Move the current phase across the finish line and prove the signal that
                unlocks everything after it.
              </p>
            </div>
            <div className="tier">
              <h4>Coalition Partner</h4>
              <p className="amt">Custom · $250,000+</p>
              <p>
                Major and institutional gifts that anchor a phase and place your
                organization at the center of the scientific coalition.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section">
        <div className="container">
          <SectionHeading eyebrow="Start the Conversation" title="Make a Contribution" />
          <InquiryForm
            kind="financial-contribution"
            fields={[
              { name: 'organization', label: 'Organization (optional)' },
              { name: 'phone', label: 'Phone (optional)', type: 'tel' },
              { name: 'message', label: 'How would you like to give?', type: 'textarea' },
            ]}
            submitLabel="Send"
            successMessage="Thank you. Your interest in funding the study has been received — the research team will reach out to arrange your contribution."
          />
        </div>
      </section>
    </>
  )
}
