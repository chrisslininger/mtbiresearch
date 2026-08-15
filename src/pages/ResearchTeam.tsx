import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'

export const meta: PageMeta = {
  path: '/research-team',
  title: 'The Research Team — mTBI Keystone Study',
  description:
    'The clinicians and scientists leading the mTBI Keystone Study, and the institutional coalition — Advanced Orthogonal Institute, Cerebral, and Genesis Brain Institute.',
  updatedAt: '2026-08-15',
  priority: 0.7,
  changefreq: 'monthly',
}

interface Member {
  initials: string
  name: string
  role: string
  bio: string
}

// Provisional team roster — confirm names, roles, and bios before launch.
const TEAM: Member[] = [
  {
    initials: 'AOI',
    name: 'Advanced Orthogonal Institute',
    role: 'Principal Research Sponsor',
    bio: 'The clinical and scientific home of the study, coordinating protocol design, craniocervical care delivery, and the imaging program across all four phases.',
  },
  {
    initials: 'C',
    name: 'Cerebral Chiropractic Center of Tampa Bay',
    role: 'Clinical Partner',
    bio: 'A treating clinical site contributing craniocervical expertise and participant care within the study protocol.',
  },
  {
    initials: 'GBI',
    name: 'Genesis Brain Institute',
    role: 'Research Partner',
    bio: 'Contributing neurological research capacity and analytic support toward the trial’s outcome measures and publication.',
  },
]

export default function ResearchTeam() {
  return (
    <>
      <PageBanner
        eyebrow="About the Research"
        title="The Research Team"
        tag="The coalition behind the science"
        image="/images/banners/the-research-team.jpg"
      />
      <section className="section">
        <div className="container">
          <p className="narrow center prose">
            The Keystone Study is led by clinicians who have spent their careers on the
            craniocervical junction, supported by a coalition with the institutional
            depth to produce findings medicine and policy cannot ignore.
          </p>
          <div className="mt-l">
            {TEAM.map((m) => (
              <div className="team-member" key={m.name}>
                <div className="team-photo" aria-hidden="true">
                  {m.initials}
                </div>
                <div>
                  <div className="team-name">{m.name}</div>
                  <div className="team-role">{m.role}</div>
                  <p>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="center mt-m">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
