/**
 * Funding totals. Components never call Supabase directly — they use these
 * hooks. Backed by SECURITY DEFINER RPCs on mtbi-os that return only aggregate
 * numbers (never donor rows).
 */
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { SITE } from '@/content/site'
import { PHASES } from '@/content/phases'

export interface FundingTotals {
  goal: number
  raised: number
}

export interface PhaseTotal {
  phase_number: number
  goal: number
  raised: number
}

/** Static fallback used for SSR/prerender and when the DB is unreachable. */
export const FALLBACK_FUNDING: FundingTotals = {
  goal: SITE.fundingGoalUsd,
  raised: 0,
}

export const FALLBACK_PHASE_TOTALS: PhaseTotal[] = PHASES.map((p) => ({
  phase_number: p.number,
  goal: p.goal,
  raised: 0,
}))

async function fetchFundingTotals(): Promise<FundingTotals> {
  if (!supabase) return FALLBACK_FUNDING
  const { data, error } = await supabase.rpc('public_funding_totals')
  if (error || !data) return FALLBACK_FUNDING
  const row = (Array.isArray(data) ? data[0] : data) as Partial<FundingTotals> | null
  return {
    goal: Number(row?.goal ?? FALLBACK_FUNDING.goal),
    raised: Number(row?.raised ?? FALLBACK_FUNDING.raised),
  }
}

async function fetchPhaseTotals(): Promise<PhaseTotal[]> {
  if (!supabase) return FALLBACK_PHASE_TOTALS
  const { data, error } = await supabase.rpc('public_phase_totals')
  if (error || !Array.isArray(data) || data.length === 0) return FALLBACK_PHASE_TOTALS
  return (data as PhaseTotal[]).map((r) => ({
    phase_number: Number(r.phase_number),
    goal: Number(r.goal),
    raised: Number(r.raised),
  }))
}

export function useFundingTotals() {
  return useQuery({
    queryKey: ['funding-totals'],
    queryFn: fetchFundingTotals,
    initialData: FALLBACK_FUNDING,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })
}

export function usePhaseTotals() {
  return useQuery({
    queryKey: ['phase-totals'],
    queryFn: fetchPhaseTotals,
    initialData: FALLBACK_PHASE_TOTALS,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })
}

/** Look up one phase's totals from the array, with a safe fallback. */
export function phaseTotal(totals: PhaseTotal[], phaseNumber: number): FundingTotals {
  const found = totals.find((t) => t.phase_number === phaseNumber)
  const fb = FALLBACK_PHASE_TOTALS.find((t) => t.phase_number === phaseNumber)
  return {
    goal: found?.goal ?? fb?.goal ?? 0,
    raised: found?.raised ?? 0,
  }
}
