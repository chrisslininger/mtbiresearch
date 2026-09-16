import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { FaqList, type Faq } from '@/components/FaqList'
import { faqNode } from '@/seo/schema'

const UPDATED = '2026-09-16'

const FAQS: Faq[] = [
  {
    q: 'What is the craniocervical junction and why does it matter in mTBI?',
    a: 'The craniocervical junction (CCJ) is where the skull meets the upper cervical spine — the neurological, vascular, and cerebrospinal-fluid crossroads between body and brain. The study hypothesizes that misalignment here contributes to persistent mild traumatic brain injury (mTBI) symptoms that standard evaluation misses.',
  },
  {
    q: 'How many participants will the study enroll?',
    a: 'The randomized controlled trial is designed for 400 participants across three arms — Phase 2’s 20 participants plus 380 more in Phase 3 — with comprehensive diagnostic imaging for every trial participant so structural findings can be correlated with symptom change. A separate 50-participant pilot (Phase 1) precedes the trial.',
  },
  {
    q: 'What are the three arms?',
    a: 'One arm receives structural care at the craniocervical junction, one receives brain-focused care (hyperbaric oxygen therapy paired with photobiomodulation), and one receives both in coordinated sequence. Comparing all three is what lets the study attribute improvement rather than assume it.',
  },
]

export const meta: PageMeta = {
  path: '/study-design',
  title: 'Study Design — mTBI Keystone Research Study',
  description:
    'How the mTBI Keystone Research Study is designed: a three-arm investigation of the craniocervical junction with full diagnostic imaging across 400 trial participants.',
  updatedAt: UPDATED,
  priority: 0.9,
  changefreq: 'monthly',
  schema: [faqNode(FAQS)],
}

export default function StudyDesign() {
  return (
    <>
      <PageBanner
        eyebrow="About the Research"
        title="Study Design"
        tag="A structural investigation into a problem medicine has treated as invisible"
        image="/images/banners/study-design.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              The mTBI Keystone Research Study is built to answer one question with
              enough rigor that medicine and policy cannot look away: do persistent
              post-concussive symptoms arise from the brain, from the craniocervical
              junction, or from both? Every design decision — the imaging, the arms, the
              outcome measures — serves that question.
            </p>

            <h2>Why the neck may hold the answer</h2>
            <p>
              The craniocervical junction (CCJ) is the small, mobile region where the
              skull meets the top two vertebrae of the spine. It is held together not by
              bone but by a network of delicate ligaments, and it is built for movement
              rather than for absorbing extreme force. A blast can transmit forces
              exceeding 150 times the pull of gravity through the head and neck. The
              rigid skull protects the brain; the junction beneath it has far less
              protection, and it is where much of that force is absorbed. When those
              ligaments stretch or tear, the top vertebrae can shift — and a cascade of
              consequences follows, each traceable to a specific piece of anatomy.
            </p>

            <h2>A drainage problem in the brain</h2>
            <p>
              The jugular veins carry blood and metabolic waste out of the brain, and
              they run directly past the upper cervical spine. A rotational shift of the
              top vertebra can pinch a jugular vein against the base of the skull,
              slowing outflow and allowing pressure and waste to build inside the head.
              The glymphatic system — the brain’s own waste-clearance network — depends
              on that same drainage path. This is the most likely source of the brain
              fog so many veterans describe: not vague or imagined, but a plumbing
              problem, and plumbing problems can be fixed.
            </p>

            <h2>A blood-flow problem and a brainstem under strain</h2>
            <p>
              The arteries that feed the back of the brain thread through channels in
              these same upper vertebrae before turning sharply to enter the skull.
              Misalignment can put tension on them and reduce oxygen-rich blood flow to
              the brainstem and cerebellum — the regions that govern balance,
              coordination, and basic regulation. The brainstem itself sits at this
              junction, and disruption there affects the nerves that control eye
              movement, balance, facial sensation, and the body’s stress response. This
              is why the symptoms cluster the way they do: dizziness, visual
              instability, headaches, and a nervous system locked in a state of alarm.
            </p>

            <h2>The connection that matters most</h2>
            <p>
              Among the structures affected is the trigeminal nucleus, the brain’s
              central processor for pain in the head, face, and neck. When the junction
              is misaligned, it can irritate this center and produce relentless, severe
              pain. If a meaningful share of the chronic suffering attributed to brain
              injury actually stems from a correctable structural problem, then
              identifying it is not an academic exercise — it is a matter of lives.
            </p>

            <h2>Who the study is for</h2>
            <p>
              The study enrolls veterans, special operators, and athletes living with
              persistent symptoms after mild traumatic brain injury — people who have
              often already tried everything the conventional system offers. Phase 1 is
              a fifty-participant pilot drawn from a fixed cohort; open enrollment for
              referred participants begins in Phase 2.
            </p>

            <h2>Design: three arms, one definitive comparison</h2>
            <p>
              The randomized controlled trial enrolls 400 participants across three
              arms — craniocervical care, brain-focused care (hyperbaric oxygen therapy
              paired with photobiomodulation), and both in coordinated sequence — so any
              measured improvement can be attributed, not assumed. Phase 2 contributes
              the first twenty participants and Phase 3 the remaining 380. Each trial
              participant moves through a comprehensive imaging battery — MRI,
              single-photon emission CT (SPECT), quantitative EEG (qEEG), and cone beam
              CT (CBCT) — and objective testing at every stage, producing a detailed map
              of which specific symptoms trace to direct injury of the brain versus
              injury to the neck that disrupts the brain. That distinction — drawn from
              imaging and objective data rather than from stories — is what makes this
              work unique, and what could reshape how the Department of War (formerly
              the Department of Defense) and the Department of Veterans Affairs (VA)
              screen, diagnose, and treat one of the signature injuries of modern
              service.
            </p>
          </div>

          <div className="center mt-l">
            <Link to="/research-phases" className="btn">
              See the Research Phases
            </Link>
          </div>
          <div className="center mt-m">
            <LastUpdated date={UPDATED} />
          </div>
        </div>
      </section>

      <FaqList items={FAQS} />
    </>
  )
}
