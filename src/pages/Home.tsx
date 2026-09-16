import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { SITE } from '@/content/site'
import { PhaseCards } from '@/components/PhaseCards'
import { MilestoneStepper } from '@/components/MilestoneStepper'
import { EventCard } from '@/components/EventCard'
import { FaqList, type Faq } from '@/components/FaqList'
import { upcomingEvents } from '@/content/events'
import { medicalStudyNode, faqNode } from '@/seo/schema'

const FAQS: Faq[] = [
  {
    q: 'What is the mTBI Keystone Research Study?',
    a: 'It is a phased clinical research study investigating the craniocervical junction (CCJ) — where the skull meets the upper cervical spine — as a structural root cause of persistent mild traumatic brain injury (mTBI) symptoms in veterans, special operators, and athletes.',
  },
  {
    q: 'Why focus on the craniocervical junction?',
    a: 'The craniocervical junction is the neurological, vascular, and fluid-dynamic crossroads between the body and the brain. Prevailing mTBI evaluation models have never fully assessed it, which may explain why symptoms like headaches, fog, and dizziness so often outlast standard treatment.',
  },
  {
    q: 'How much funding does the study need?',
    a: 'The full four-phase program is $23.5 million. It funds a 50-participant pilot, a 400-participant randomized trial with comprehensive diagnostic imaging and direct treatment across three study arms, and the analysis and publication needed to bring the findings to the Department of War, U.S. Special Operations Command (SOCOM), U.S. Central Command (CENTCOM), and the Department of Veterans Affairs (VA).',
  },
  {
    q: 'Who can take part, and when does enrollment open?',
    a: 'The study is for veterans, special operators, and athletes living with persistent symptoms after mild traumatic brain injury. Phase 1 is a small pilot with a fixed cohort; open enrollment for referred participants begins in Phase 2.',
  },
]

export const meta: PageMeta = {
  path: '/',
  title: SITE.title,
  description:
    'A clinical study tracing persistent mild traumatic brain injury symptoms to the craniocervical junction — evidence built to change how the Department of War and VA treat mTBI.',
  updatedAt: '2026-09-16',
  priority: 1.0,
  changefreq: 'weekly',
  ogImage: '/images/brand/hero.jpg',
  schema: [medicalStudyNode(), faqNode(FAQS)],
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
              Support the Research
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
            the Department of War (formerly the Department of Defense), U.S. Special
            Operations Command (SOCOM), U.S. Central Command (CENTCOM), and the
            Department of Veterans Affairs (VA) — not to manage the wounds, but to end
            them.
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
          <p className="eyebrow" style={{ marginBottom: '10px' }}>
            The Scientific Coalition
          </p>
          <p className="coalition-note">
            The sponsoring institute and clinical and research partners executing the study.
          </p>
          <div className="sponsor-row">
            <div className="sponsor">
              <span className="logo-badge" aria-hidden="true">AOI</span>
              <span className="s-name">
                Advanced Orthogonal Institute<small>Principal Research Sponsor</small>
              </span>
            </div>
            <div className="sponsor">
              <span className="logo-badge" aria-hidden="true">CCC</span>
              <span className="s-name">
                Cerebral Chiropractic Center<small>Clinical Partner · of Tampa Bay</small>
              </span>
            </div>
            <div className="sponsor">
              <span className="logo-badge" aria-hidden="true">GBI</span>
              <span className="s-name">
                Genesis Brain Institute<small>Research Partner</small>
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
            new Department of War and VA standards for how mTBI is screened, diagnosed,
            and treated — and it gets there in four funded research phases. Each one is
            a complete, publishable body of work that de-risks the next. We are
            currently raising funds for Phase 1. Explore each phase to see its goal, its
            impact, and where the funding stands today.
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
                enough to reshape Department of War policy and redirect VA treatment.
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
                Do you know a veteran, a special operator, or an athlete who has been
                living with symptoms that no treatment has resolved? Refer them to this
                study. Open enrollment for referred participants begins in Phase 2.
              </p>
              <p className="emph">They have been waiting long enough.</p>
              <Link to="/refer" className="btn">
                Refer a Participant
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FaqList items={FAQS} />
    </>
  )
}
