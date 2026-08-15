import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from '@/components/Layout'
import { routes, metaForPath } from '@/routes'
import { applyHead } from '@/seo/meta'

/** Updates document head + moves focus to the document on client navigation. */
function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    applyHead(metaForPath(location.pathname))
    // Move focus to top so screen-reader focus isn't stranded on the clicked link.
    const main = document.getElementById('main')
    if (main) {
      main.setAttribute('tabindex', '-1')
      main.focus({ preventScroll: true })
    }
    window.scrollTo(0, 0)
  }, [location.pathname])
  return null
}

export function App() {
  return (
    <Layout>
      <RouteEffects />
      <Routes>
        {routes.map((r) => (
          <Route key={r.path} path={r.path} element={<r.Component />} />
        ))}
      </Routes>
    </Layout>
  )
}
