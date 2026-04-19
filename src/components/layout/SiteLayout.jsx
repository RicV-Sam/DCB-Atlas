import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Atlas', to: '/' },
  { label: 'Markets', to: '/markets' },
  { label: 'Methodology', to: '/methodology' },
  { label: 'About', to: '/about' },
]

export function SiteLayout() {
  return (
    <div className="atlas-shell">
      <header className="atlas-container py-6">
        <div className="atlas-panel flex flex-col gap-5 px-5 py-5 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
          <NavLink to="/" className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#12354a] text-sm font-bold uppercase tracking-[0.3em] text-[#f4ecde]">
              DA
            </div>
            <div>
              <p className="atlas-eyebrow">Market-entry intelligence</p>
              <h1 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
                DCB Atlas
              </h1>
            </div>
          </NavLink>

          <div className="flex flex-col gap-4 lg:items-end">
            <nav aria-label="Primary" className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition ${
                      isActive
                        ? 'bg-[#12354a] text-white'
                        : 'bg-white/60 text-[#12354a] hover:bg-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <a
              className="atlas-button-primary"
              href="mailto:briefings@dcbatlas.com?subject=Request%20Market%20Briefing"
            >
              Request Market Briefing
            </a>
          </div>
        </div>
      </header>

      <main className="pb-12">
        <Outlet />
      </main>

      <footer className="atlas-container pb-10">
        <div className="atlas-panel flex flex-col gap-4 px-5 py-6 text-sm text-[#35505f] sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="atlas-title text-lg text-[#0d1b24]">DCB Atlas</p>
            <p>
              Static DCB market reference for shortlist shaping, partner context, and
              launch planning.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <NavLink className="atlas-link" to="/markets">
              Browse markets
            </NavLink>
            <NavLink className="atlas-link" to="/methodology">
              Methodology
            </NavLink>
            <NavLink className="atlas-link" to="/about">
              Advisory briefings
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  )
}
