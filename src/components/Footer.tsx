import { Link } from 'react-router-dom'
import { SITE, FOOTER } from '@/content/site'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src="/images/brand/mtbi-logo.png"
            alt="mTBI Research"
            width={280}
            height={58}
          />
        </div>
        <div className="footer-cols">
          {FOOTER.columns.map((col) => (
            <div className="footer-col" key={col.heading}>
              <h4>{col.heading}</h4>
              {col.links.map((l) => (
                <Link key={l.href} to={l.href}>
                  {l.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>{SITE.address.org}</p>
            <p>{SITE.address.street}</p>
            <p>
              {SITE.address.locality}, {SITE.address.region} {SITE.address.postalCode}
            </p>
            <p style={{ marginTop: '14px' }}>
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </p>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p style={{ marginTop: '14px' }}>
              <Link to="/contact">Send a message →</Link>
            </p>
          </div>
        </div>
        <div className="footer-legal">
          {FOOTER.legal.map((l) => (
            <Link key={l.href} to={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="footer-copy">
          © 2026 {SITE.legalName}. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}
