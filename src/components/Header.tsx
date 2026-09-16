import { useEffect, useState, type KeyboardEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { NAV } from '@/content/site'

function slug(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [menu, setMenu] = useState<string | null>(null)
  const { pathname } = useLocation()

  // Close everything on route change.
  useEffect(() => {
    setOpen(false)
    setMenu(null)
  }, [pathname])

  function onMenuKey(e: KeyboardEvent<HTMLElement>) {
    if (e.key === 'Escape') {
      setMenu(null)
      setOpen(false)
    }
  }

  return (
    <header className="site-header" onKeyDown={onMenuKey}>
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
          {NAV.map((item) => {
            if (item.children) {
              const id = `menu-${slug(item.label)}`
              const isOpen = menu === item.label
              return (
                <div
                  className={`nav-item${isOpen ? ' open' : ''}`}
                  key={item.label}
                  onBlur={(e) => {
                    // Close when focus leaves this menu entirely.
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMenu(null)
                  }}
                >
                  <button
                    type="button"
                    className="nav-link"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setMenu(isOpen ? null : item.label)}
                  >
                    {item.label}{' '}
                    <span className="nav-caret" aria-hidden="true">
                      ▾
                    </span>
                  </button>
                  <div className="dropdown" id={id} role="menu" aria-label={item.label}>
                    {item.children.map((c) => (
                      <Link key={c.href} to={c.href} role="menuitem">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }
            return (
              <div className="nav-item" key={item.label}>
                <Link className="nav-link" to={item.href ?? '/'}>
                  {item.label}
                </Link>
              </div>
            )
          })}
        </nav>

        <Link className="header-mail" to="/contact" aria-label="Contact us">
          <span aria-hidden="true">✉</span>
        </Link>
        <button
          type="button"
          className="mobile-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="mobile-panel" id="mobile-menu">
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
