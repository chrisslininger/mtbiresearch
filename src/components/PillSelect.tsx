import type { Option } from '@/content/intake'

/**
 * Selectable word-pills: outlined until selected, then filled in brand bronze.
 * Renders real checkboxes/radios underneath so the form data, keyboard
 * navigation, and screen readers all work with zero JavaScript assumptions.
 */
export function PillSelect({
  name,
  options,
  value,
  onChange,
  multiple = true,
  legend,
  hint,
  required,
}: {
  name: string
  options: Option[]
  value: string[]
  onChange: (next: string[]) => void
  multiple?: boolean
  legend: string
  hint?: string
  required?: boolean
}) {
  function toggle(v: string) {
    if (multiple) {
      onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v])
    } else {
      onChange([v])
    }
  }
  return (
    <fieldset className="pills-field">
      <legend>
        {legend}
        {required ? ' *' : ''}
      </legend>
      {hint && <p className="pills-hint">{hint}</p>}
      <div className="pills" role={multiple ? undefined : 'radiogroup'}>
        {options.map((o) => {
          const on = value.includes(o.value)
          const id = `${name}-${o.value}`
          return (
            <label key={o.value} className={`pill${on ? ' on' : ''}`} htmlFor={id}>
              <input
                id={id}
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={o.value}
                checked={on}
                onChange={() => toggle(o.value)}
              />
              <span className="pill-label">{o.label}</span>
              {o.hint && <span className="pill-hint">{o.hint}</span>}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

/** Yes / No as two pills. Value is boolean | null (unanswered). */
export function YesNo({
  name,
  legend,
  value,
  onChange,
  required,
  hint,
}: {
  name: string
  legend: string
  value: boolean | null
  onChange: (v: boolean) => void
  required?: boolean
  hint?: string
}) {
  return (
    <PillSelect
      name={name}
      legend={legend}
      hint={hint}
      required={required}
      multiple={false}
      options={[
        { value: 'yes', label: 'Yes' },
        { value: 'no', label: 'No' },
      ]}
      value={value === null ? [] : [value ? 'yes' : 'no']}
      onChange={(v) => onChange(v[0] === 'yes')}
    />
  )
}
