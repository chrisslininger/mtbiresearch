/**
 * The four funded research phases — the single source of truth for the Research
 * Phases page and any phase reference elsewhere. Figures are the working budget
 * totals from the study's phased rollout (subject to final confirmation).
 */

export interface PhaseSpec {
  label: string
  value: string
}

export interface Phase {
  number: number
  slug: string
  name: string
  subtitle: string
  meta: string
  goal: number
  current: boolean
  /** "At a glance" fact rows. */
  specs: PhaseSpec[]
  /** Narrative paragraphs. */
  body: string[]
  /** Heading for the outcome block. */
  deliversHeading: string
  /** The outcome statement. */
  delivers: string
  /** What a contribution to this phase funds. */
  covers: string
}

export const FULL_PROGRAM_TOTAL = 23_540_662

export const PHASES: Phase[] = [
  {
    number: 1,
    slug: 'ccj-feasibility-pilot',
    name: 'CCJ Feasibility Pilot',
    subtitle: 'Proving the Signal',
    meta: '50 veterans · single-arm craniocervical care · six months',
    goal: 384_702,
    current: true,
    specs: [
      { label: 'Participants', value: '50 (40 funded, 10 in-kind)' },
      { label: 'Design', value: 'Single-arm, open-label' },
      { label: 'Intervention', value: 'Advanced Orthogonal (C1000)' },
      { label: 'Imaging', value: 'In-clinic X-ray (pre/post)' },
      { label: 'Duration', value: '6 months' },
      { label: 'Total ask', value: '$384,702' },
    ],
    body: [
      'Phase 1 asks the first and most fundamental question, and answers it. In fifty veterans living with persistent symptoms, it tests whether correcting alignment at the craniocervical junction produces measurable improvement, using nothing but precise, image-guided upper cervical care. These are people who have often already tried everything the conventional system offers. Phase 1 gives them a genuinely different approach, and it measures the result with real instruments: validated symptom scales, neurological and cognitive testing, balance and sensory-motor evaluation, and imaging before and after.',
      'The impact of this phase reaches well beyond the fifty who take part. Its findings become the first published evidence that the craniocervical model works — evidence shared openly with the biomedical and military research communities. In the language of federal science, this is the preliminary data that opens doors. Without it, the larger trial is a hypothesis. With it, the larger trial becomes a credible, fundable national priority.',
    ],
    deliversHeading: 'What it proves',
    delivers:
      'Recruitment and retention feasibility, protocol fidelity, and a within-subject signal on symptomatic, neurocognitive, and neurological measures — producing the peer-reviewed preliminary dataset that federal funding mechanisms require as pilot data.',
    covers:
      'The care these veterans receive, the clinical and neurological evaluations that document their progress, the foundational data system that carries every future phase, the ethical and regulatory oversight that protects participants, the financial stewardship that keeps the work accountable, and the publication that shares what is learned.',
  },
  {
    number: 2,
    slug: 'prep-preliminary-outcomes',
    name: 'Prep & Preliminary Outcomes',
    subtitle: 'Building the Research Machine and Comparing Results',
    meta: '20 veterans · two treatment lanes · full imaging suite · six months',
    goal: 2_050_070,
    current: false,
    specs: [
      { label: 'Participants', value: '20 (10 CCJ + 10 Brain)' },
      { label: 'Design', value: 'Two-lane feasibility' },
      { label: 'Care period', value: '90 days' },
      { label: 'Structure', value: '3-mo prep + 3-mo execution' },
      { label: 'Imaging', value: 'Full suite, baseline + 90-day' },
      { label: 'Total ask', value: '$2,050,070' },
    ],
    body: [
      'Phase 2 does two powerful things at once. It builds and tests the entire operational apparatus of the full national trial, and it runs the first direct, side-by-side comparison between structural care and brain-focused care. Twenty veterans take part — ten receiving craniocervical correction and ten receiving hyperbaric oxygen therapy paired with photobiomodulation. Every one of them moves through the complete diagnostic battery: advanced MRI, SPECT, qEEG, and cone beam CT.',
      'This is the phase that transforms a promising approach into a fully operational research program. Its preparation is deliberately front-loaded, so that when Phase 2 ends the data can be published immediately and the full trial can begin enrolling veterans without a single day of setup delay. The dedicated treatment and imaging equipment purchased here does not disappear when the study ends — it becomes permanent capacity to care for veterans for years to come.',
    ],
    deliversHeading: 'What it proves',
    delivers:
      'That the full study machine runs: simultaneous enrollment across two clinics, the complete imaging battery (MRI, SPECT, qEEG, CBCT), and the data acquisition system, all operating together — plus the first comparative signal across the craniocervical and brain intervention lanes.',
    covers:
      'The full research and clinical team, direct care across both treatment lanes, the complete imaging suite, comprehensive assessments for each veteran, dedicated equipment that becomes lasting capacity, the data acquisition system, participant travel, and the analysis and publication of the first comparative results.',
  },
  {
    number: 3,
    slug: 'full-randomized-controlled-trial',
    name: 'The Full Randomized Controlled Trial',
    subtitle: 'Measuring What Really Drives Root-Cause Recovery',
    meta: '380 additional veterans (400 total) · three arms · eighteen months',
    goal: 20_069_695,
    current: false,
    specs: [
      { label: 'Participants', value: '380 (400 total)' },
      { label: 'Design', value: 'Three-arm RCT, 1:1:1' },
      { label: 'Arms', value: 'CCJ / Brain / Combined' },
      { label: 'Duration', value: '18 months' },
      { label: 'Imaging', value: 'Full suite, all arms' },
      { label: 'Total ask', value: '$20,069,695' },
    ],
    body: [
      'Phase 3 is the study the entire program was built to make possible. It enrolls the remaining participants to reach four hundred veterans in total, randomized across three arms: one receiving structural care, one receiving brain-focused care, and one receiving both in coordinated sequence. This three-way comparison is what allows the study to answer the question definitively rather than suggestively — revealing not just whether these treatments work, but for whom, and which combination gives each veteran the best chance of real recovery.',
      'Because Phase 2 already built and proved the operational machine, Phase 3 requires no startup period. Nearly every dollar flows straight to the front line: to the care itself and to the imaging that documents its effect. Four hundred veterans receive care within this study. The findings it produces could change care for hundreds of thousands more.',
    ],
    deliversHeading: 'What it delivers',
    delivers:
      'The definitive, adequately powered comparison of structural, brain-focused, and combined intervention — findings of sufficient rigor to withstand scrutiny at the highest levels of military medical leadership and to inform Department of Defense and Veterans Affairs policy on mTBI screening, diagnosis, and treatment.',
    covers:
      'The direct treatment of hundreds of veterans across all three arms, the comprehensive imaging that gives the findings their scientific weight, the full assessment battery at every stage, the research leadership that holds an eighteen-month trial to the highest standard, added treatment capacity, and travel support so no veteran is turned away by distance.',
  },
  {
    number: 4,
    slug: 'analytics-publication',
    name: 'Analytics & Publication',
    subtitle: 'Turning Evidence into Change',
    meta: 'final analysis and multi-journal dissemination · six months',
    goal: 1_036_195,
    current: false,
    specs: [
      { label: 'Duration', value: '6 months' },
      { label: 'Focus', value: 'Analysis & dissemination' },
      { label: 'Team', value: 'Core team + biostatistician' },
      { label: 'Publication', value: 'Multi-journal reserve' },
      { label: 'Total ask', value: '$1,036,195' },
    ],
    body: [
      'A study only changes the world if its findings reach the people with the power to act on them. Phase 4 carries the results out of the clinic and into policy. Over six months, the research team — joined by a dedicated biostatistician — analyzes the full body of data and publishes it across multiple peer-reviewed journals, then brings it directly to military medical leadership, the Department of Defense, and the Veterans Affairs system through presentation and briefing.',
      'This is where the return on every earlier phase is realized. The purpose of the study was never simply to run a trial, but to generate evidence strong enough to reshape how an entire medical system understands and treats this injury. Phase 4 is the deliberate, funded effort to make that happen.',
    ],
    deliversHeading: 'What it delivers',
    delivers:
      'The definitive published record of the trial across multiple high-tier journals, plus direct dissemination to the Department of Defense, Veterans Affairs, and military medical leadership — the phase that converts findings into policy influence.',
    covers:
      'The analytical team and the dedicated biostatistician who bring rigor to the final findings, the reserve for publication across multiple respected journals, the data and analytics support required to complete the work, and the travel to present and disseminate the results where they can drive real change.',
  },
]
