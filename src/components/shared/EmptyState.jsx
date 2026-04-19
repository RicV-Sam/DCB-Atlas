export function EmptyState({ title, description }) {
  return (
    <div className="atlas-panel border-dashed px-6 py-8 text-center">
      <p className="atlas-eyebrow">Research pending</p>
      <h3 className="atlas-title mt-3 text-2xl font-semibold text-[#0d1b24]">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#35505f]">
        {description}
      </p>
    </div>
  )
}
