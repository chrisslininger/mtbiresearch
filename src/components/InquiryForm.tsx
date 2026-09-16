import { useState, type FormEvent } from 'react'
import { submitInquiry, type InquiryKind } from '@/lib/queries/inquiries'
import { SITE } from '@/content/site'

interface Field {
  name: 'name' | 'email' | 'organization' | 'phone' | 'message'
  label: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  required?: boolean
}

const BASE: Field[] = [
  { name: 'name', label: 'Full Name', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
]

type Status = 'idle' | 'sending' | 'done' | 'error'

export function InquiryForm({
  kind,
  fields = [],
  submitLabel = 'Submit',
  successMessage = 'Thank you. Your message has been received and someone from the research team will be in touch.',
}: {
  kind: InquiryKind
  fields?: Field[]
  submitLabel?: string
  successMessage?: string
}) {
  const all = [...BASE, ...fields]
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    // Honeypot: real visitors never see or fill this field.
    if (fd.get('website')) {
      setStatus('done')
      form.reset()
      return
    }
    setStatus('sending')
    const ok = await submitInquiry({
      kind,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      organization: fd.get('organization') ? String(fd.get('organization')) : undefined,
      phone: fd.get('phone') ? String(fd.get('phone')) : undefined,
      message: fd.get('message') ? String(fd.get('message')) : undefined,
    })
    if (ok) {
      setStatus('done')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="form-card" role="status">
        <p className="form-success">{successMessage}</p>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={onSubmit} noValidate={false}>
      {all.map((f) => (
        <div className="form-row" key={f.name}>
          <label htmlFor={`f-${f.name}`}>
            {f.label}
            {f.required ? ' *' : ''}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              id={`f-${f.name}`}
              name={f.name}
              required={f.required}
              aria-required={f.required || undefined}
            />
          ) : (
            <input
              id={`f-${f.name}`}
              name={f.name}
              type={f.type ?? 'text'}
              required={f.required}
              aria-required={f.required || undefined}
              autoComplete={f.name === 'email' ? 'email' : f.name === 'phone' ? 'tel' : f.name === 'name' ? 'name' : 'organization'}
            />
          )}
        </div>
      ))}
      {/* Honeypot — hidden from people, tempting to bots. */}
      <div className="hp" aria-hidden="true">
        <label htmlFor={`f-website-${kind}`}>Website</label>
        <input id={`f-website-${kind}`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {status === 'error' && (
        <p className="form-error" role="alert">
          Something went wrong and your message wasn’t sent. Please try again, or email us
          directly at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
      <p className="form-note">* Required. We’ll only use your details to respond to this inquiry.</p>
    </form>
  )
}
