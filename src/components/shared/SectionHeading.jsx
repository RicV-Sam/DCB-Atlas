export function SectionHeading({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? <p className="atlas-eyebrow">{eyebrow}</p> : null}
        <h2 className="atlas-title mt-2 text-3xl font-semibold text-[#0d1b24] sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-[#35505f] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action}
    </div>
  )
}
