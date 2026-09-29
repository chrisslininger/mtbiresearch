import type { CSSProperties, ReactNode } from 'react'

/** Dark page banner used at the top of interior pages. */
export function PageBanner({
  eyebrow,
  title,
  tag,
  image,
  imageMobile,
  imagePosition,
  tall,
}: {
  eyebrow?: string
  title: string
  tag?: string
  image?: string
  /** Optional portrait crop swapped in under 720px so faces stay in frame. */
  imageMobile?: string
  /** background-position for the desktop image, e.g. "center 20%". */
  imagePosition?: string
  /** Taller banner for feature pages. */
  tall?: boolean
}) {
  const style = image
    ? ({
        '--banner-img': `url('${image}')`,
        '--banner-img-mobile': `url('${imageMobile ?? image}')`,
        '--banner-pos': imagePosition ?? 'center',
      } as CSSProperties)
    : undefined
  return (
    <section className={`page-banner${image ? ' has-bg' : ''}${tall ? ' page-banner-tall' : ''}`} style={style}>
      <div className="container">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="display">{title}</h1>
        {tag && <p className="tag">{tag}</p>}
      </div>
    </section>
  )
}

/** Centered eyebrow + display heading used above sections. Renders an h2. */
export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string
  title: string
}) {
  return (
    <div className="sh">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="display">{title}</h2>
    </div>
  )
}

/** A visible "Last updated" line — recency signal for AI answer engines. */
export function LastUpdated({ date }: { date: string }) {
  const formatted = new Date(date + 'T00:00:00Z').toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
  return <p className="updated">Last updated {formatted}</p>
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="narrow prose">{children}</div>
}
