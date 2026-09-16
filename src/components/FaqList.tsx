export interface Faq {
  q: string
  a: string
}

/**
 * Visible FAQ block. Drive this AND the page's faqNode() schema from the same
 * array so the structured data always matches what visitors can read.
 */
export function FaqList({
  items,
  eyebrow = 'Common Questions',
  title = 'Questions & Answers',
}: {
  items: Faq[]
  eyebrow?: string
  title?: string
}) {
  if (items.length === 0) return null
  return (
    <section className="section-light section">
      <div className="container">
        <div className="sh">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display">{title}</h2>
        </div>
        <dl className="faq narrow">
          {items.map((f) => (
            <div className="faq-item" key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
