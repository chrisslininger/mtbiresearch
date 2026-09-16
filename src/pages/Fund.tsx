import type { PageMeta } from '@/seo/types'
import { PageBanner, SectionHeading } from '@/components/blocks'
import { MilestoneStepper } from '@/components/MilestoneStepper'
import { InquiryForm } from '@/components/InquiryForm'
import { FaqList, type Faq } from '@/components/FaqList'
import { faqNode } from '@/seo/schema'

const FAQS: Faq[] = [
  {
    q: 'Where does my contribution go?',
    a: 'Contributions fund comprehensive diagnostic imaging for participants, direct treatment across the study arms, and the research infrastructure required to bring findings to the Department of War, U.S. Special Operations Command (SOCOM), U.S. Central Command (CENTCOM), and the Department of Veterans Affairs (VA).',
  },
  {
    q: 'Can I fund a specific participant or a specific phase?',
    a: 'Yes. Contributions can be directed to a specific research phase or to sponsor a participant. Contact the research team to arrange directed or named giving.',
  },
  {
    q: 'How do I actually make a gift?',
    a: 'Gifts are arranged personally. Tell us how you would like to give using the form on this page, and the research team will follow up to complete your contribution.',
  },
  {
    q: 'Is the sponsoring organization a nonprofit?',
    a: 'Yes. The study is sponsored by the Advanced Orthogonal Institute, a 501(c)(3) nonprofit organization. The research team can provide documentation for your records on request.',
  },
]

export const meta: PageMeta = {
  path: '/support/financial-contribution',
  title: 'Financial Contribution — Fund the mTBI Study',
  description:
    'Fund the mTBI Keystone Research Study. Contributions cover diagnostic imaging, participant treatment, and the infrastructure to bring findings to the Department of War and VA.',
  updatedAt: '2026-09-16',
  priority: 0.9,
  changefreq: 'weekly',
  schema: [faqNode(FAQS)],
}

export default function Fund() {
  return (
    <>
      <PageBanner
        eyebrow="Support the Research"
        title="Financial Contribution"
        tag="Fund the work, one phase at a time"
        image="/images/banners/financial-contribution.jpg"
      />

      <section className="section-dark section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">Every Dollar Moves This Forward</p>
            <h2 className="display">Where the Funding Stands</h2>
          </div>
          <p className="narrow center">
            The full program is $23.5 million, staged across four phases so each stands
            on its own. Choose the phase we're funding now, or commit early to the ones
            ahead — click any phase to see exactly where it stands.
          </p>
          <div className="mt-l">
            <MilestoneStepper />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Ways to Give" title="Giving Levels" />
          <div className="narrow">
            <div className="tier">
              <h3>Sponsor a Participant</h3>
              <p className="amt">$57,500</p>
              <p>
                Underwrite the full diagnostic imaging and treatment pathway for one
                participant through the study.
              </p>
            </div>
            <div className="tier">
              <h3>Fund the Pilot</h3>
              <p className="amt">Phase 1 · $384,702</p>
              <p>
                Move the current phase across the finish line and prove the signal that
                unlocks everything after it.
              </p>
            </div>
            <div className="tier">
              <h3>Coalition Partner</h3>
              <p className="amt">Custom · $250,000+</p>
              <p>
                Major and institutional gifts that anchor a phase and place your
                organization alongside the sponsoring institute and research partners
                at the center of the study.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-light section">
        <div className="container">
          <SectionHeading eyebrow="Start the Conversation" title="Make a Contribution" />
          <p className="narrow center form-lead">
            Gifts are arranged personally, not through an online checkout. Tell us how
            you'd like to give and the research team will follow up to complete your
            contribution. The study is sponsored by the Advanced Orthogonal Institute, a
            501(c)(3) nonprofit.
          </p>
          <InquiryForm
            kind="financial-contribution"
            fields={[
              { name: 'organization', label: 'Organization (optional)' },
              { name: 'phone', label: 'Phone (optional)', type: 'tel' },
              { name: 'message', label: 'How would you like to give?', type: 'textarea' },
            ]}
            submitLabel="Start the Conversation"
            successMessage="Thank you. Your interest in funding the study has been received — the research team will reach out to arrange your contribution."
          />
        </div>
      </section>

      <FaqList items={FAQS} />
    </>
  )
}
