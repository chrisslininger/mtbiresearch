/**
 * The four funded research phases — single source of truth for the Research
 * Phases overview cards, the individual phase pages, the homepage cards, and
 * the milestone stepper. Figures are the working budget totals (subject to
 * final confirmation).
 *
 * Participant model: Phase 1 (50) is a STANDALONE pilot. The 400-participant
 * randomized trial = Phase 2's 20 + Phase 3's 380. Keep every page consistent
 * with that. Population: veterans, special operators, and athletes.
 *
 * costPerParticipant + participantTarget drive the "lives covered" impact
 * counter. They are PROVISIONAL (direct-care cost per participant from the
 * phase budgets) — confirm the exact figures before launch.
 */

export interface PhaseSpec {
  label: string
  value: string
}

export interface Phase {
  number: number
  slug: string
  /** Full route to the phase's detail page. */
  path: string
  name: string
  subtitle: string
  meta: string
  goal: number
  current: boolean
  /** Short name for the milestone stepper. */
  stepperName: string
  /** Card thumbnail image. */
  image: string
  /** Short description for the card. */
  cardDesc: string
  /** Direct-care cost to carry one participant through this phase (provisional). */
  costPerParticipant: number | null
  /** Target number of participants this phase treats. */
  participantTarget: number | null
  specs: PhaseSpec[]
  body: string[]
  deliversHeading: string
  delivers: string
  covers: string
}

export const FULL_PROGRAM_TOTAL = 23_540_662

export const PHASES: Phase[] = [
  {
    number: 1,
    slug: 'ccj-feasibility-pilot',
    path: '/research-phases/ccj-feasibility-pilot',
    name: 'CCJ Pilot Study',
    subtitle: 'Proving the Signal',
    meta: '50 participants · single-arm craniocervical care · six months',
    goal: 384_702,
    current: true,
    stepperName: 'CCJ Pilot Study',
    image: '/images/phases/phase-1.jpg',
    cardDesc:
      'Fifty participants, precise upper-cervical care, and the first published evidence that the craniocervical junction (CCJ) model works.',
    costPerParticipant: 3_000,
    participantTarget: 50,
    specs: [
      { label: 'Participants', value: '50 (40 funded, 10 in-kind)' },
      { label: 'Design', value: 'Single-arm, open-label (every participant receives care)' },
      { label: 'Intervention', value: 'Advanced Orthogonal (C1000)' },
      { label: 'Imaging', value: 'In-clinic X-ray (pre/post)' },
      { label: 'Duration', value: '6 months' },
      { label: 'Total ask', value: '$384,702' },
    ],
    body: [
      'Phase 1 asks the first and most fundamental question, and answers it. In fifty participants — veterans, special operators, and athletes living with persistent symptoms — it tests whether correcting alignment at the craniocervical junction (CCJ, where the skull meets the upper cervical spine) produces measurable improvement, using nothing but precise, image-guided upper cervical care. These are people who have often already tried everything the conventional system offers. Phase 1 gives them a genuinely different approach, and it measures the result with real instruments: validated symptom scales, neurological and cognitive testing, balance and sensory-motor evaluation, and imaging before and after.',
      'Phase 1 is a standalone pilot: its fifty participants are drawn from a fixed pilot cohort, and they are not counted toward the 400-participant randomized trial that follows. Open enrollment for participants referred to the study begins in Phase 2.',
      'The impact of this phase reaches well beyond the fifty who take part. Its findings become the first published evidence that the craniocervical model works — evidence shared openly with the biomedical and military research communities. In the language of federal science, this is the preliminary data that opens doors. Without it, the larger trial is a hypothesis. With it, the larger trial becomes a credible, fundable national priority.',
    ],
    deliversHeading: 'What it proves',
    delivers:
      'Whether participants can be recruited and retained, whether the protocol can be delivered exactly as designed, and a before-and-after signal on symptomatic, neurocognitive, and neurological measures — producing the peer-reviewed preliminary dataset that federal funding mechanisms require as pilot data.',
    covers:
      'The care these participants receive, the clinical and neurological evaluations that document their progress, the foundational data system that carries every future phase, the ethical and regulatory oversight that protects participants, the financial stewardship that keeps the work accountable, and the publication that shares what is learned.',
  },
  {
    number: 2,
    slug: 'prep-preliminary-outcomes',
    path: '/research-phases/prep-preliminary-outcomes',
    name: 'Prep & Preliminary Outcomes',
    subtitle: 'Building the Research Machine',
    meta: '20 participants · two treatment lanes · full imaging suite · six months',
    goal: 2_050_070,
    current: false,
    stepperName: 'Prep & Preliminary Outcomes',
    image: '/images/phases/phase-2.jpg',
    cardDesc:
      "Twenty participants across two treatment lanes while we build and prove the full trial's operational machine.",
    costPerParticipant: 10_950,
    participantTarget: 20,
    specs: [
      { label: 'Participants', value: '20 (10 CCJ + 10 Brain)' },
      { label: 'Design', value: 'Two-lane feasibility' },
      { label: 'Care period', value: '90 days' },
      { label: 'Structure', value: '3-mo prep + 3-mo execution' },
      { label: 'Imaging', value: 'Full suite, baseline + 90-day' },
      { label: 'Total ask', value: '$2,050,070' },
    ],
    body: [
      'Phase 2 does two powerful things at once. It builds and tests the entire operational apparatus of the full national trial, and it runs the first direct, side-by-side comparison between structural care and brain-focused care. Twenty participants take part — ten receiving craniocervical correction and ten receiving brain-focused care, meaning hyperbaric oxygen therapy paired with photobiomodulation (light therapy). Every one of them moves through the complete diagnostic battery: advanced MRI, single-photon emission CT (SPECT), quantitative EEG (qEEG), and cone beam CT (CBCT).',
      'Phase 2 is also where open enrollment begins: participants referred to the study are enrolled from this phase forward, and its twenty participants become the first twenty of the 400-participant randomized trial completed in Phase 3.',
      'This is the phase that transforms a promising approach into a fully operational research program. Its preparation is deliberately front-loaded, so that when Phase 2 ends the data can be published immediately and the full trial can begin enrolling participants without a single day of setup delay. The dedicated treatment and imaging equipment purchased here does not disappear when the study ends — it becomes permanent capacity to care for veterans, operators, and athletes for years to come.',
    ],
    deliversHeading: 'What it proves',
    delivers:
      'That the full study machine runs: simultaneous enrollment across both clinical sites (St. Petersburg and Tampa), the complete imaging battery (MRI, SPECT, qEEG, CBCT), and the data acquisition system, all operating together — plus the first comparative signal across the craniocervical and brain intervention lanes.',
    covers:
      'The full research and clinical team, direct care across both treatment lanes, the complete imaging suite, comprehensive assessments for each participant, dedicated equipment that becomes lasting capacity, the data acquisition system, participant travel, and the analysis and publication of the first comparative results.',
  },
  {
    number: 3,
    slug: 'full-randomized-controlled-trial',
    path: '/research-phases/full-randomized-controlled-trial',
    name: 'The Full Randomized Controlled Trial',
    subtitle: 'Measuring What Drives Recovery',
    meta: '380 additional participants · 400 in the trial with Phase 2 · three arms · eighteen months',
    goal: 20_069_695,
    current: false,
    stepperName: 'The Full RCT',
    image: '/images/phases/phase-3.jpg',
    cardDesc:
      "380 more participants join Phase 2's twenty to complete the 400-participant trial, randomized across three arms — the definitive study.",
    costPerParticipant: 14_581,
    participantTarget: 380,
    specs: [
      { label: 'Participants', value: '380 new · 400 in trial (with Phase 2)' },
      { label: 'Design', value: 'Three-arm randomized controlled trial (RCT), equal 1:1:1 allocation' },
      { label: 'Arms', value: 'CCJ / Brain / Combined' },
      { label: 'Duration', value: '18 months' },
      { label: 'Imaging', value: 'Full suite, all arms' },
      { label: 'Total ask', value: '$20,069,695' },
    ],
    body: [
      "Phase 3 is the study the entire program was built to make possible. It enrolls 380 additional participants who, together with the twenty from Phase 2, bring the randomized trial to four hundred veterans, special operators, and athletes in total. (Phase 1's fifty-participant pilot is a standalone study and is not counted in the four hundred.) Participants are randomized across three arms: one receiving structural care at the craniocervical junction, one receiving brain-focused care (hyperbaric oxygen therapy with photobiomodulation), and one receiving both in coordinated sequence. This three-way comparison is what allows the study to answer the question definitively rather than suggestively — revealing not just whether these treatments work, but for whom, and which combination gives each participant the best chance of real recovery.",
      'Because Phase 2 already built and proved the operational machine, Phase 3 requires no startup period. Nearly every dollar flows straight to the front line: to the care itself and to the imaging that documents its effect. Four hundred participants receive care within this trial. The findings it produces could change care for hundreds of thousands more.',
    ],
    deliversHeading: 'What it delivers',
    delivers:
      'The definitive comparison of structural, brain-focused, and combined intervention, with enough participants to make the result statistically conclusive — findings of sufficient rigor to withstand scrutiny at the highest levels of military medical leadership and to inform Department of War and Department of Veterans Affairs (VA) policy on mTBI screening, diagnosis, and treatment.',
    covers:
      'The direct treatment of hundreds of participants across all three arms, the comprehensive imaging that gives the findings their scientific weight, the full assessment battery at every stage, the research leadership that holds an eighteen-month trial to the highest standard, added treatment capacity, and travel support so no participant is turned away by distance.',
  },
  {
    number: 4,
    slug: 'analytics-publication',
    path: '/research-phases/analytics-publication',
    name: 'Analytics & Publication',
    subtitle: 'Turning Evidence into Change',
    meta: 'final analysis and multi-journal dissemination · six months',
    goal: 1_036_195,
    current: false,
    stepperName: 'Analytics & Publication',
    image: '/images/phases/phase-4.jpg',
    cardDesc:
      'Final analysis and multi-journal publication that carries the findings into Department of War and VA policy.',
    costPerParticipant: null,
    participantTarget: null,
    specs: [
      { label: 'Duration', value: '6 months' },
      { label: 'Focus', value: 'Analysis & dissemination' },
      { label: 'Team', value: 'Core team + biostatistician' },
      { label: 'Publication', value: 'Multi-journal reserve' },
      { label: 'Total ask', value: '$1,036,195' },
    ],
    body: [
      'A study only changes the world if its findings reach the people with the power to act on them. Phase 4 carries the results out of the clinic and into policy. Over six months, the research team — joined by a dedicated biostatistician — analyzes the full body of data and publishes it across multiple peer-reviewed journals, then brings it directly to military medical leadership, the Department of War (formerly the Department of Defense), and the Department of Veterans Affairs (VA) through presentation and briefing.',
      'This is where the return on every earlier phase is realized. The purpose of the study was never simply to run a trial, but to generate evidence strong enough to reshape how an entire medical system understands and treats this injury. Phase 4 is the deliberate, funded effort to make that happen.',
    ],
    deliversHeading: 'What it delivers',
    delivers:
      'The definitive published record of the trial across multiple high-tier journals, plus direct dissemination to the Department of War, the VA, and military medical leadership — the phase that converts findings into policy influence.',
    covers:
      'The analytical team and the dedicated biostatistician who bring rigor to the final findings, the reserve for publication across multiple respected journals, the data and analytics support required to complete the work, and the travel to present and disseminate the results where they can drive real change.',
  },
]

export function phaseBySlug(slug: string): Phase | undefined {
  return PHASES.find((p) => p.slug === slug)
}
