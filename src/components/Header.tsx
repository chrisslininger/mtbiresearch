import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV } from '@/content/site'

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container bar">
        <Link className="brand" to="/" aria-label="mTBI Research — home">
          <img
            className="brand-logo"
            src="/images/brand/mtbi-logo.png"
            alt="mTBI Research"
            width={200}
            height={42}
          />
        </Link>

        <nav className="nav" aria-label="Primary">
          {NAV.map((item) =>
            item.children ? (
              <div className="nav-item" key={item.label}>
                <span className="nav-link">
                  {item.label} <span className="nav-caret" aria-hidden="true">▾</span>
                </span>
                <div className="dropdown">
                  {item.children.map((c) => (
                    <Link key={c.href} to={c.href}>
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <div className="nav-item" key={item.label}>
                <Link className="nav-link" to={item.href ?? '/'}>
                  {item.label}
                </Link>
              </div>
            ),
          )}
        </nav>

        <Link className="header-mail" to="/contact" aria-label="Contact us">
          ✉
        </Link>
        <button
          className="mobile-toggle"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <div className="mobile-panel">
          <div className="container">
            {NAV.map((item) => (
              <div className="mob-group" key={item.label}>
                {item.children ? (
                  <>
                    <div className="mob-head">{item.label}</div>
                    {item.children.map((c) => (
                      <Link
                        key={c.href}
                        className="mob-link sub"
                        to={c.href}
                        onClick={() => setOpen(false)}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    className="mob-link"
                    to={item.href ?? '/'}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
