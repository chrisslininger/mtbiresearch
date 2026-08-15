import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'

export const meta: PageMeta = {
  path: '/supporting-research',
  title: 'Supporting Research — mTBI Keystone Study',
  description:
    'The scientific groundwork behind the mTBI Keystone Study: sixteen years of research linking the craniocervical junction to persistent brain-injury symptoms.',
  updatedAt: '2026-08-15',
  priority: 0.7,
  changefreq: 'monthly',
}

export default function SupportingResearch() {
  return (
    <>
      <PageBanner
        eyebrow="About the Research"
        title="Supporting Research"
        tag="Sixteen years of science arriving at its moment of proof"
        image="/images/banners/supporting-research.jpg"
      />
      <section className="section">
        <div className="container">
          <div className="narrow prose">
            <p>
              The Keystone Study did not begin in a vacuum. It rests on more than a
              decade of clinical observation and imaging work connecting the
              craniocervical junction to the neurological, vascular, and
              cerebrospinal-fluid disturbances that accompany persistent mild traumatic
              brain injury. This page collects the peer-reviewed literature, imaging
              findings, and clinical case series that motivated the trial.
            </p>

            <h3>What the existing evidence shows</h3>
            <p>
              Across the published record, three threads converge: mTBI symptoms
              frequently persist long after the expected recovery window; conventional
              imaging often reads as normal even when patients remain profoundly
              symptomatic; and structural assessment of the upper cervical spine
              repeatedly surfaces abnormalities that standard protocols never evaluate.
              The Keystone Study is designed to test whether those abnormalities are
              incidental or causal.
            </p>

            <h3>A living bibliography</h3>
            <p>
              As the study progresses, this page will host the full citation list,
              links to primary sources, and plain-language summaries of each finding, so
              that clinicians, funders, and journalists can trace every claim back to
              its evidence. Citable content gets cited — and every number on this site
              is meant to be checkable.
            </p>
            <p>
              <em>
                Reference list and downloadable summaries are being compiled for
                publication here (provisional — content in progress).
              </em>
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
