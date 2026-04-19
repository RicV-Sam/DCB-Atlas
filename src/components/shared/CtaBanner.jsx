import { Link } from 'react-router-dom'

const renderAction = (label, href, to, className) => {
  if (!label) return null
  if (to) {
    return (
      <Link className={className} to={to}>
        {label}
      </Link>
    )
  }

  return (
    <a className={className} href={href}>
      {label}
    </a>
  )
}

export function CtaBanner({
  eyebrow = 'Advisory CTA',
  title,
  description,
  primaryLabel = 'Request Market Briefing',
  primaryHref = 'mailto:briefings@dcbatlas.com?subject=Request%20Market%20Briefing',
  primaryTo,
  secondaryLabel = 'Browse Markets',
  secondaryHref,
  secondaryTo = '/markets',
}) {
  return (
    <div className="atlas-panel overflow-hidden">
      <div className="grid gap-6 bg-[#12354a] px-6 py-8 text-[#f4ecde] sm:px-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
        <div>
          <p className="atlas-eyebrow text-[#d9bc86]">{eyebrow}</p>
          <h3 className="atlas-title mt-2 text-3xl font-semibold">{title}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#e7dbc5] sm:text-base">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {renderAction(
            primaryLabel,
            primaryHref,
            primaryTo,
            'atlas-button-primary bg-[#f4ecde] text-[#12354a] hover:bg-white',
          )}
          {renderAction(
            secondaryLabel,
            secondaryHref,
            secondaryTo,
            'atlas-button-secondary border-white/20 bg-white/8 text-white hover:bg-white/12',
          )}
        </div>
      </div>
    </div>
  )
}
