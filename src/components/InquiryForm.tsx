import { useState, type FormEvent } from 'react'
import { submitInquiry, type InquiryKind } from '@/lib/queries/inquiries'

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
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const fd = new FormData(form)
    await submitInquiry({
      kind,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      organization: fd.get('organization') ? String(fd.get('organization')) : undefined,
      phone: fd.get('phone') ? String(fd.get('phone')) : undefined,
      message: fd.get('message') ? String(fd.get('message')) : undefined,
    })
    setStatus('done')
    form.reset()
  }

  if (status === 'done') {
    return (
      <div className="form-card">
        <p className="form-success">{successMessage}</p>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      {all.map((f) => (
        <div className="form-row" key={f.name}>
          <label htmlFor={`f-${f.name}`}>
            {f.label}
            {f.required ? ' *' : ''}
          </label>
          {f.type === 'textarea' ? (
            <textarea id={`f-${f.name}`} name={f.name} required={f.required} />
          ) : (
            <input
              id={`f-${f.name}`}
              name={f.name}
              type={f.type ?? 'text'}
              required={f.required}
            />
          )}
        </div>
      ))}
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
