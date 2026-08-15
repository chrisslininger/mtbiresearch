/**
 * Lead capture. Best-effort insert into the public inquiry table on mtbi-os.
 * Fails soft: if the insert is blocked or the DB is unreachable, the UI still
 * thanks the visitor — a config issue can never make the form appear broken.
 */
import { supabase } from '@/lib/supabase'

export type InquiryKind =
  | 'financial-contribution'
  | 'organizational-support'
  | 'research-partnership'
  | 'refer-participant'
  | 'contact'

export interface InquiryInput {
  kind: InquiryKind
  name: string
  email: string
  organization?: string
  phone?: string
  message?: string
}

export async function submitInquiry(input: InquiryInput): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('web_inquiries').insert({
      kind: input.kind,
      name: input.name,
      email: input.email,
      organization: input.organization ?? null,
      phone: input.phone ?? null,
      message: input.message ?? null,
    })
    return !error
  } catch {
    return false
  }
}
