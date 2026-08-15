import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'

export const meta: PageMeta = {
  path: '/research-team',
  title: 'The Research Team — mTBI Keystone Study',
  description:
    'Led by Dr. Chris Slininger — Army veteran, principal investigator — the mTBI Keystone Study team pairs lived experience with a coalition built for scientific rigor.',
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

const INVESTIGATORS: Member[] = [
  {
    initials: 'B',
    name: 'Billiris',
    role: 'Co-Investigator',
    bio: 'Co-investigator on the clinical protocol, contributing craniocervical expertise across the pilot and the full randomized trial.',
  },
  {
    initials: 'K',
    name: 'Kalambaheti',
    role: 'Co-Investigator',
    bio: 'Co-investigator supporting protocol delivery and participant care across the study’s treatment lanes.',
  },
  {
    initials: 'C',
    name: 'Cabrera',
    role: 'Research Director',
    bio: 'Directs research operations — coordinating data systems, imaging pipeline, and two-site execution across every phase.',
  },
]

const COALITION: Member[] = [
  {
    initials: 'AOI',
    name: 'Advanced Orthogonal Institute (dba Craniocervical Institute)',
    role: 'Principal Research Sponsor · 501(c)(3)',
    bio: 'A Florida 501(c)(3) nonprofit and the clinical and scientific home of the study, coordinating protocol design, craniocervical care, and the imaging program across all four phases.',
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
        tag="Led from inside the population it serves"
        image="/images/banners/the-research-team.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="team-member">
            <div className="team-photo" aria-hidden="true">
              CS
            </div>
            <div>
              <div className="team-name">Dr. Chris Slininger</div>
              <div className="team-role">Principal Investigator</div>
              <p>
                This work is led by someone who understands the population it serves from
                the inside. Dr. Chris Slininger served in the United States Army from
                2004 to 2013, including service overseas during Operation Iraqi Freedom.
                Between athletics and military service he sustained roughly ten mild
                traumatic brain injuries, and by the time he left service he was living
                with significant cognitive decline.
              </p>
              <p>
                Through the same kind of care this study investigates, he experienced a
                recovery that did not simply return his brain to its pre-service baseline
                but carried his cognitive function beyond anything he had known before.
                It is precisely because he knows how persuasive a personal story can be
                that he insists this study not rest on one — a single recovery is an
                anecdote, and anecdotes do not change national policy. The study is
                designed to let the science lead and the evidence shape the conclusion,
                whatever it turns out to be.
              </p>
            </div>
          </div>

          <h2 className="display-sm" style={{ marginTop: '20px', marginBottom: '28px' }}>
            Investigators
          </h2>
          {INVESTIGATORS.map((m) => (
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
      </section>

      <section className="section-light section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">The Scientific Coalition</p>
            <h2 className="display">Institutional Partners</h2>
          </div>
          <div className="grid-3">
            {COALITION.map((m) => (
              <div className="info-card" key={m.name}>
                <h3>{m.name}</h3>
                <div className="team-role">{m.role}</div>
                <p>{m.bio}</p>
              </div>
            ))}
          </div>
          <div className="center mt-l">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
