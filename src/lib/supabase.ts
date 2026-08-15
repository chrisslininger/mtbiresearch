/**
 * Typed Supabase client for the PUBLIC mtbi-os project.
 *
 * The browser only ever holds the publishable key. Every table has RLS; the
 * public site reads only what an explicit SECURITY DEFINER RPC exposes
 * (aggregate funding totals — never donor rows). The client degrades
 * gracefully: if credentials are ever missing, queries fail soft and the
 * static fallback content stays on screen. A config mistake can never take the
 * marketing site down.
 */
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL ?? 'https://hwemawdopovlvuhjkjke.supabase.co'
const key =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  'sb_publishable_J9fcAlPCt_AeAtelrwGhmQ_O5BxHhnJ'

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null
