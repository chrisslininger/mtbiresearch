/**
 * Event attendance requests. Best-effort insert into the event_requests table
 * on mtbi-os. Fails soft: if the insert is blocked or the DB is unreachable,
 * the UI still confirms receipt — a config issue can never make the form appear
 * broken. Requests are invitation-vetted by the research team, never public.
 */
import { supabase } from '@/lib/supabase'

export interface EventRequestInput {
  eventSlug: string
  eventTitle: string
  name: string
  email: string
  phone?: string
  organization?: string
  /** How the requester is connected to the speakers or the topic. */
  connection?: string
}

export async function submitEventRequest(input: EventRequestInput): Promise<boolean> {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('event_requests').insert({
      event_slug: input.eventSlug,
      event_title: input.eventTitle,
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      organization: input.organization ?? null,
      connection: input.connection ?? null,
    })
    return !error
  } catch {
    return false
  }
}
