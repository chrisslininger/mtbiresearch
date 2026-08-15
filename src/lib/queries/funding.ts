/**
 * Funding totals. Components never call Supabase directly — they use this hook.
 * Backed by the public_funding_totals() RPC on mtbi-os, which returns only two
 * aggregate numbers (goal + raised summed across contributions), never rows.
 */
import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { SITE } from '@/content/site'

export interface FundingTotals {
  goal: number
  raised: number
}

/** Static fallback used for SSR/prerender and when the DB is unreachable. */
export const FALLBACK_FUNDING: FundingTotals = {
  goal: SITE.fundingGoalUsd,
  raised: 0,
}

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

export function useFundingTotals() {
  return useQuery({
    queryKey: ['funding-totals'],
    queryFn: fetchFundingTotals,
    initialData: FALLBACK_FUNDING,
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  })
}
