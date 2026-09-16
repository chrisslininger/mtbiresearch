import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PhaseCards } from '@/components/PhaseCards'
import { MilestoneStepper } from '@/components/MilestoneStepper'
import { EventCard } from '@/components/EventCard'
import { upcomingEvents } from '@/content/events'
import { medicalStudyNode, faqNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/',
  title: 'mTBI Research — The Mild Traumatic Brain Injury Keystone Study',
  description:
    'A clinical study tracing persistent mild traumatic brain injury symptoms to the craniocervical junction — evidence built to change how the DoD and VA treat mTBI.',
  updatedAt: '2026-08-15',
  priority: 1.0,
  changefreq: 'weekly',
  ogImage: '/images/brand/hero.jpg',
  schema: [
    medicalStudyNode(),
    faqNode([
      {
        q: 'What is the mTBI Keystone Research Study?',
        a: 'It is a phased clinical research study investigating the craniocervical junction — where the skull meets the upper cervical spine — as a structural root cause of persistent mild traumatic brain injury symptoms in veterans, special operators, and athletes.',
      },
      {
        q: 'Why focus on the craniocervical junction?',
        a: 'The craniocervical junction is the neurological, vascular, and fluid-dynamic crossroads between the body and the brain. Prevailing mTBI evaluation models have never fully assessed it, which may explain why symptoms like headaches, fog, and dizziness so often outlast standard treatment.',
      },
      {
        q: 'How much funding does the study need?',
        a: 'The study is raising $20,000,000 to fund comprehensive diagnostic imaging for 400 participants, direct treatment across all three study arms, and the research infrastructure required to bring findings to SOCOM, CENTCOM, and the VA.',
      },
    ]),
  ],
}

export default function Home() {
  const events = upcomingEvents()

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-inner container">
          <h1 className="hero-title">
            Mild Traumatic
            <br />
            Brain Injury
          </h1>
          <div className="hero-sub">Keystone Research Study</div>
          <div>
            <Link to="/support/financial-contribution" className="btn">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* Mission band */}
      <section className="section-bronze band-mission">
        <div className="container narrow center">
          <h2 className="display-sm">Making the Invisible Wounds Visible</h2>
          <p className="lead" style={{ marginTop: '18px' }}>
            This is sixteen years of foundational science arriving at its moment of
            proof. We have traced the persistent, debilitating symptoms of mild
            traumatic brain injury back to their structural roots — and we are now
            conducting the clinical trial that will make those findings impossible for
            medicine and policy to ignore. What we discover, we will hand directly to
            the Department of War, SOCOM, CENTCOM, and the VA — not to manage the
            wounds, but to end them.
          </p>
        </div>
      </section>

      {/* A Unique Approach */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">What Makes the Study Different</p>
            <h2 className="display">A Unique Approach</h2>
          </div>
          <div className="narrow prose">
            <p>
              For decades, mild traumatic brain injury has been called an invisible
              wound — not because the suffering isn't real, but because the existing
              evaluation models have never been able to identify its full root cause.
              The headaches that outlast every treatment, the fog, the sleeplessness,
              the emotional dysregulation, the dizziness — these are real symptoms,
              thoroughly documented and consistently unresolved. They point to an
              origin that the prevailing model of mTBI has never fully evaluated — the
              craniocervical junction.
            </p>
            <p>
              The craniocervical junction (CCJ), where the skull meets the upper
              cervical spine, is the neurological, vascular, and fluid-dynamic
              crossroads between the body and the brain. This study is not about
              replacing what we know. It is about revealing what we have been missing.
            </p>
          </div>
          <div className="mt-l">
            <div className="video-embed">
              <div className="play" aria-hidden="true" />
              <div className="cap">
                Statistics of TBI &amp; New Research Being Done on It
              </div>
            </div>
          </div>
          <div className="center mt-l">
            <Link to="/study-design" className="btn">
              Learn More About the Study Design
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="section home-ev">
          <div className="container">
            <div className="sh">
              <p className="eyebrow">Join Us</p>
              <h2 className="display">Upcoming Events</h2>
            </div>
            <div className="ev2-grid">
              {events.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
            <div className="center mt-l">
              <Link to="/events" className="btn btn-outline">
                See All Events
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Sponsors */}
      <section className="section-dark section-tight">
        <div className="container center">
          <p className="eyebrow" style={{ marginBottom: '34px' }}>
            Sponsors &amp; Support — The Scientific Coalition
          </p>
          <div className="sponsor-row">
            <div className="sponsor">
              <span className="logo-badge">AOI</span>
              <span className="s-name">
                Advanced Orthogonal<small>Institute</small>
              </span>
            </div>
            <div className="sponsor">
              <span className="logo-badge">C</span>
              <span className="s-name">
                Cerebral Chiropractic Center<small>Of Tampa Bay</small>
              </span>
            </div>
            <div className="sponsor">
              <span className="logo-badge">gbi</span>
              <span className="s-name">
                Genesis Brain Institute<small>&nbsp;</small>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Four Phases */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">A Four-Phase Path</p>
            <h2 className="display">Where We Are</h2>
          </div>
          <p className="narrow center prose">
            This study does not end with data collection. It ends with policy change —
            and it gets there in four funded research phases. Each one is a complete,
            publishable body of work that de-risks the next. We are currently in Phase
            1. Explore each phase to see its goal, its impact, and where the funding
            stands today.
          </p>
          <div className="mt-l">
            <PhaseCards />
          </div>
          <div className="center mt-l">
            <Link to="/research-phases" className="btn">
              See All Research Phases
            </Link>
          </div>
        </div>
      </section>

      {/* Funding — milestone stepper */}
      <section className="section-dark section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">Every Dollar Moves This Forward</p>
            <h2 className="display">Fund the Work, One Phase at a Time</h2>
          </div>
          <p className="narrow center">
            The full program is $23.5 million, staged across four phases. You can stand
            behind the phase we're funding now, or commit early to the ones ahead.
            Click any phase to see exactly where it stands.
          </p>
          <div className="mt-l">
            <MilestoneStepper />
          </div>
        </div>
      </section>

      {/* How To Support */}
      <section className="section">
        <div className="container">
          <div className="sh">
            <p className="eyebrow">A Mission That Takes a Team</p>
            <h2 className="display">How To Support</h2>
          </div>
          <div className="card-grid">
            <div className="s-card">
              <div className="thumb thumb-brain" />
              <h3>Invest in the Science</h3>
              <p>
                This study is designed to move the standard of care — a full-spectrum,
                root-cause investigation into mild traumatic brain injury rigorous
                enough to reshape DoD policy and redirect VA treatment.
              </p>
              <p className="emph">Your investment is that belief in action.</p>
              <Link to="/support/financial-contribution" className="btn">
                Fund the Mission
              </Link>
            </div>
            <div className="s-card">
              <div className="thumb thumb-hands" />
              <h3>Lend Your Voice</h3>
              <p>
                If your organization has been fighting for veterans, operators,
                athletes, or the truth about brain injury — your endorsement tells
                funders and policymakers that the people who understand what is at
                stake believe in this work.
              </p>
              <p className="emph">Stand with us.</p>
              <Link to="/support/organizational-support" className="btn">
                Add Your Endorsement
              </Link>
            </div>
            <div className="s-card">
              <div className="thumb thumb-network" />
              <h3>Strengthen the Science</h3>
              <p>
                We are building a research coalition with the institutional depth to
                produce findings that medicine and policy cannot ignore. If you
                represent an imaging center, a university, or bring clinical expertise
                — there may be a place for you.
              </p>
              <p className="emph">The right partners make the science stronger.</p>
              <Link to="/support/research-partnership" className="btn">
                Explore a Partnership
              </Link>
            </div>
            <div className="s-card">
              <div className="thumb thumb-door" />
              <h3>Connect Someone to an Answer</h3>
              <p>
                Do you know a veteran, an operator, or an NFL athlete who has been
                living with symptoms that no treatment has resolved? Refer them to this
                study. Enrollment opens in Phase 2.
              </p>
              <p className="emph">They have been waiting long enough.</p>
              <Link to="/refer" className="btn">
                Refer a Participant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
