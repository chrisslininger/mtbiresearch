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

export type PhaseStatus = 'active' | 'funding' | 'upcoming' | 'complete'

export interface ParticipantContent {
  /** Banner title override, e.g. "mTBI Pilot Program". */
  bannerTitle: string
  bannerTag: string
  bannerImage?: string
  bannerImageMobile?: string
  bannerImagePosition?: string
  /** Section heading + opening statement. */
  eyebrow: string
  headline: string
  intro: string
  /** Key facts strip at the top (participants first). */
  keyFacts: Array<{ value: string; label: string }>
  /** Evidence stats with a sources line. */
  stats: Array<{ value: string; label: string }>
  statsSources: string
  /** Three short columns. */
  pillars: Array<{ title: string; body: string }>
  /** Who can apply. */
  eligibilityHeading: string
  eligibility: string[]
  /** Conducted-by / oversight statement. */
  conductedBy: string
  /** Funding section (bottom). */
  fundingHeadline: string
  fundingIntro: string
  whereDollarsGo: Array<{ title: string; detail: string }>
  overheadNote: string
  /** Principal investigator card. */
  investigator: { name: string; title: string; bio: string }
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
  /** The phase we are currently fundraising for (drives the stepper + cards). */
  current: boolean
  /**
   * Operational status. 'active' = research underway and participants being
   * onboarded (may still be fundraising); 'funding' = fundraising, not yet
   * started; 'upcoming' = future; 'complete' = finished.
   */
  status: PhaseStatus
  /** IRB / oversight line shown on the phase page and wherever participants are onboarded. */
  oversight?: string
  /** "What happens during this phase" — shown on the phase page as a numbered walk-through. */
  timeline?: Array<{ title: string; detail: string }>
  /**
   * Participant-facing page content (the one-pager language). When present,
   * the phase page is laid out for participants first: who this is for, what
   * the injury is, what happens, who can apply — with funding moved to the end.
   */
  participant?: ParticipantContent
  /** Short name for the milestone stepper. */
  stepperName: string
  /** Card thumbnail image. */
  image: string
  /** Optional 1200×630 social card; falls back to `image`. */
  ogImage?: string
  /** Short description for the card. */
  cardDesc: string
  /** Direct-care cost to carry one participant through this phase (provisional). */
  costPerParticipant: number | null
  /** Target number of participants this phase treats. */
  participantTarget: number | null
  /** Value of care/facilities donated in kind toward this phase (shown as its own bar segment). */
  inKindUsd?: number
  /** Participants already covered by in-kind contributions. */
  inKindParticipants?: number
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
    status: 'active',
    oversight:
      'Phase 1 is conducted under the oversight of the Institutional Review Board (IRB) of Sherman College of Chiropractic.',
    timeline: [
      {
        title: 'Application and screening',
        detail:
          'Veterans living with persistent post-mTBI symptoms apply online. The research team reviews every application personally; veterans who served in Special Operations are prioritized for the first cohort.',
      },
      {
        title: 'Initial consultation and evaluation',
        detail:
          'Selected applicants complete an initial consultation and evaluation at Cerebral Chiropractic Center in St. Petersburg (about one and a half hours) to confirm they are a candidate for care.',
      },
      {
        title: 'Baseline assessments and imaging',
        detail:
          'Before care begins, each participant completes validated symptom scales, neurological and cognitive testing, balance and sensory-motor evaluation, and in-clinic X-ray imaging of the craniocervical junction.',
      },
      {
        title: 'Eight weeks of craniocervical care',
        detail:
          'Participants are seen two to three times per week for eight weeks, receiving precise, image-guided upper cervical care using the Advanced Orthogonal (C1000) method — no drugs, no surgery.',
      },
      {
        title: 'Final assessments and imaging',
        detail:
          'At the end of the care period, every baseline measure is repeated — the same scales, testing, and imaging — so each participant’s change is measured against their own starting point.',
      },
      {
        title: 'Analysis and publication',
        detail:
          'The before-and-after data across all fifty participants is analyzed and published as the pilot evidence that justifies the full randomized trial.',
      },
    ],
    participant: {
      bannerTitle: 'mTBI Pilot Program',
      bannerTag: 'Mild traumatic brain injury · Phase 1 of the mTBI Research Study',
      bannerImage: '/images/phases/phase-1-banner.jpg',
      bannerImageMobile: '/images/phases/phase-1-banner-mobile.jpg',
      bannerImagePosition: 'center 28%',
      eyebrow: 'Phase 1 · The mTBI Research Study',
      headline: 'Revealing the Unseen Injury',
      intro:
        'For decades, a service member with a brain injury has been examined in one place: the brain. But every force that reaches the brain — the blast, the fall, the whiplash, the hard impact — passes first through the neck. And at the very top of the neck, where the skull meets the spine, sits a small and delicate structure called the craniocervical junction. It absorbs the same violence the brain does, with a fraction of the protection, and it is almost never examined. We believe that for many who never recovered, the injury was there all along. No one was looking. This study is the first to look — and you can be part of it.',
      keyFacts: [
        { value: '50', label: 'Veterans in the pilot' },
        { value: '8 weeks', label: 'Of care · 2–3 visits per week' },
        { value: '$0', label: 'Cost to you · no compensation' },
        { value: 'St. Pete', label: 'Cerebral Chiropractic Center, FL' },
      ],
      stats: [
        { value: '479K', label: 'service members diagnosed with TBI since 2000 — over 80% mild' },
        { value: '17.6/day', label: 'veterans lost to suicide — twice the civilian rate' },
        { value: '~2×', label: 'suicide risk for veterans with a TBI history' },
        { value: '90%', label: 'of patients with lasting symptoms show neck involvement' },
      ],
      statsSources:
        'Sources: DHA TBI Center of Excellence; VA Suicide Prevention Annual Report (2024); Cheever et al., Sports Med (2021).',
      pillars: [
        {
          title: 'Told it was permanent',
          body:
            'Many who served come home with headaches, fog, dizziness, and nights that never bring rest, from an injury no scan can find. They are told the damage is permanent, or that it lives only in their minds. They cycle through medications, therapies, and specialists without relief. A review of more than 15,000 studies found no early treatment clearly tied to a better outcome. The current model manages symptoms. It has not offered these men and women a way back.',
        },
        {
          title: 'The root, not the symptom',
          body:
            'When the craniocervical junction is destabilized, it can choke the flow of blood to the brain, block the fluid that clears its waste, strain the brainstem, and hold the whole nervous system in a state of alarm. What follows is remarkably consistent: migraines, vertigo, trouble with the eyes, a mind that will not clear, and a fight-or-flight state so persistent it is often mistaken for PTSD. Quiet the symptoms and they return. Correct the source and recovery can last.',
        },
        {
          title: 'Why veterans first',
          body:
            'Those who served carry the heaviest exposure to blast, impact, and whiplash of anyone alive, and the highest cost of an answer that never comes. Fifty veterans — with those who served in Special Operations prioritized — will be the first to be examined, corrected, and measured. And because this same injury reaches the football field, the highway, and the workplace, what we learn for them opens a door for millions who never wore the uniform.',
        },
      ],
      eligibilityHeading: 'Who can apply',
      eligibility: [
        'Any veteran of the U.S. Armed Forces living with symptoms that have persisted after a mild traumatic brain injury — headaches, dizziness, brain fog, sleep disturbance, light or sound sensitivity, anxiety, and the like.',
        'Veterans who served in Special Operations are prioritized for the first cohort, because their exposure to blast and impact is the heaviest.',
        'You must be able to attend care at Cerebral Chiropractic Center in St. Petersburg, Florida, two to three times per week for eight weeks, plus an initial and a final evaluation.',
        'Care, evaluations, and imaging are provided at no cost. There is no compensation for taking part, and applying does not guarantee selection.',
      ],
      conductedBy:
        'Conducted through the Craniocervical Institute, a training and research organization for upper-cervical specialists who analyze, diagnose, and correct structural issues in the upper neck that affect the central nervous system and brain health. IRB oversight by Sherman College of Chiropractic.',
      fundingHeadline: 'Give a veteran the answer they never got',
      fundingIntro:
        'Behind every number on this page is a person who was told to accept a smaller life. This study exists to find out whether that was ever true, and to act on the answer. Phase 1 is a complete and defined mission: fifty veterans treated, every outcome measured, and one peer-reviewed publication. It can be underwritten in full or in part, honored in the published record, and stewarded under independent accounting. What you fund is not a report on a shelf. It is a genuine chance at recovery for those who gave the most, and a lasting change in how a grateful nation cares for them.',
      whereDollarsGo: [
        { title: 'Direct care for fifty veterans', detail: 'the full course of precise, image-guided craniocervical treatment, delivered to every participant' },
        { title: 'Clinical & neurological assessment', detail: 'consultations, examinations, and objective testing at every stage of each veteran’s care' },
        { title: 'Research data system', detail: 'the platform that captures each veteran’s outcomes and carries every future phase' },
        { title: 'Research leadership', detail: 'the investigators who direct the study and analyze what it finds' },
        { title: 'IRB ethics & regulatory oversight', detail: 'the human-subjects protections that safeguard every participant' },
        { title: 'Independent accounting & publication', detail: 'clean stewardship of every dollar, and open sharing of the results' },
      ],
      overheadNote:
        'Overhead is held deliberately low, and clinical facilities are contributed in kind, so the maximum possible share of every gift reaches the veterans and the science.',
      investigator: {
        name: 'Dr. Chris Slininger, DC, DCCJP',
        title: 'Principal Investigator · U.S. Army Veteran',
        bio:
          'Dr. Slininger knows this injury from both sides of the clinical picture. A U.S. Army veteran who sustained at least ten concussions and mild traumatic brain injuries across athletics and military service, he left the military with serious cognitive decline of his own and recovered through the very care this study investigates. He is a craniocervical specialist, founder of Cerebral, a specialist clinic in St. Petersburg, Florida, and Executive Director of the Craniocervical Institute, and has served on the Board of Directors of the International Chiropractic Association’s Council on Upper Cervical Care. He trains doctors nationally and speaks regularly on brain health, enhanced cognitive performance, and complex neurological conditions. He authored the study’s scientific rationale, designed the clinical protocol, and personally directs each participant’s course of care, the analysis, and the publication.',
      },
    },
    stepperName: 'CCJ Pilot Study',
    image: '/images/phases/phase-1.jpg',
    ogImage: '/images/brand/og-pilot-program.jpg',
    cardDesc:
      'Fifty participants, precise upper-cervical care, and the first published evidence that the craniocervical junction (CCJ) model works.',
    costPerParticipant: null,
    participantTarget: 50,
    inKindUsd: 40_000,
    inKindParticipants: 10,
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
      'Phase 1 is a standalone pilot, and its fifty participants are not counted toward the 400-participant randomized trial that follows. Phase 1 is now underway and onboarding participants: veterans living with persistent post-mTBI symptoms can apply, with veterans who served in Special Operations prioritized for the first cohort. It is conducted under the oversight of the Institutional Review Board (IRB) of Sherman College of Chiropractic.',
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
    status: 'upcoming',
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
      'Phase 2 widens enrollment beyond the pilot — veterans, special operators, and athletes — and its twenty participants become the first twenty of the 400-participant randomized trial completed in Phase 3.',
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
    status: 'upcoming',
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
    status: 'upcoming',
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

/** Short status label used on cards, the stepper, and phase banners. */
export function phaseStatusLabel(p: Phase): string {
  switch (p.status) {
    case 'active':
      return p.current ? 'Active · Onboarding' : 'Active'
    case 'funding':
      return 'Now Funding'
    case 'complete':
      return 'Complete'
    default:
      return 'Upcoming'
  }
}
