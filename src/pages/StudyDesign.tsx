import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { faqNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/study-design',
  title: 'Study Design — mTBI Keystone Research Study',
  description:
    'How the mTBI Keystone Study is designed: a three-arm investigation of the craniocervical junction with full diagnostic imaging across 400 participants.',
  updatedAt: '2026-08-15',
  priority: 0.9,
  changefreq: 'monthly',
  schema: [
    faqNode([
      {
        q: 'What is the craniocervical junction and why does it matter in mTBI?',
        a: 'The craniocervical junction is where the skull meets the upper cervical spine — the neurological, vascular, and cerebrospinal-fluid crossroads between body and brain. The study hypothesizes that misalignment here contributes to persistent mTBI symptoms that standard evaluation misses.',
      },
      {
        q: 'How many participants will the study enroll?',
        a: 'The full study is designed for 400 participants across three arms, with comprehensive diagnostic imaging for every participant so structural findings can be correlated with symptom change.',
      },
    ]),
  ],
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
              The mTBI Keystone Study is built to answer one question with enough rigor
              that medicine and policy cannot look away: does the craniocervical
              junction (CCJ) drive the persistent symptoms of mild traumatic brain
              injury that standard care has never resolved? Every design decision — the
              imaging, the arms, the outcome measures — serves that question.
            </p>

            <h3>The hypothesis</h3>
            <p>
              Persistent mTBI symptoms — headache, cognitive fog, sleep disruption,
              emotional dysregulation, and dizziness — frequently outlast every
              conventional treatment because their structural origin is upstream of
              where care is aimed. The CCJ, where the skull meets the upper cervical
              spine, governs neurological signaling, blood flow, and cerebrospinal
              fluid dynamics. The study evaluates whether restoring CCJ alignment
              changes the trajectory of symptoms that have otherwise been considered
              permanent.
            </p>

            <h3>Three arms, one comparison</h3>
            <p>
              The full randomized controlled trial compares craniocervical care against
              alternative treatment lanes so that any measured improvement can be
              attributed, not assumed. Each participant receives a comprehensive
              imaging suite at baseline and at defined intervals, so structural change
              is measured directly rather than inferred from self-report alone.
            </p>

            <h3>Who the study is for</h3>
            <p>
              The population centers on those most affected by repetitive head trauma —
              veterans, special operators, and athletes — because they carry both the
              highest burden of persistent symptoms and the clearest exposure history.
              Findings are structured for direct handoff to SOCOM, CENTCOM, the VA, and
              the Department of War.
            </p>
          </div>

          <div className="center mt-l">
            <Link to="/research-phases" className="btn">
              See the Research Phases
            </Link>
          </div>
          <div className="center mt-m">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
