import { useMemo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { getMarketTone } from '../../utils/scoring'

export function WorldMap({
  markets,
  onSelectMarket,
  selectedMarket,
  accessibleMarkets = [],
}) {
  const marketsByMapId = useMemo(
    () => new Map(markets.map((market) => [market.mapId, market])),
    [markets],
  )
  const geographyUrl = `${import.meta.env.BASE_URL}world-atlas.json`

  return (
    <div className="atlas-panel overflow-hidden p-4 sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="atlas-eyebrow">Interactive map</p>
          <h3 className="atlas-title mt-2 text-2xl font-semibold text-[#0d1b24]">
            Scan markets visually, then open a structured summary.
          </h3>
        </div>
        <p className="max-w-md text-sm leading-7 text-[#35505f]">
          Countries with enriched public profiles are colour-coded by status. The rest
          remain visible as research-pending placeholders.
        </p>
      </div>

      <div className="rounded-[24px] bg-[#0f2d3e] p-2 sm:p-4">
        <ComposableMap
          projectionConfig={{ scale: 150 }}
          className="h-auto w-full"
          aria-label="World map of DCB Atlas markets"
        >
          <Geographies geography={geographyUrl}>
            {({ geographies }) =>
              geographies.map((geography) => {
                const market = marketsByMapId.get(geography.id)
                const isSelected = selectedMarket?.code === market?.code
                const fill = market ? getMarketTone(market) : '#89939a'

                return (
                  <Geography
                    key={geography.rsmKey}
                    geography={geography}
                    tabIndex={0}
                    role="button"
                    aria-label={`Open market summary for ${market?.country ?? geography.properties.name}`}
                    onClick={() => market && onSelectMarket(market)}
                    onKeyDown={(event) => {
                      if (!market) return
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        onSelectMarket(market)
                      }
                    }}
                    style={{
                      default: {
                        fill,
                        stroke: '#f5ecdc',
                        strokeWidth: isSelected ? 1.2 : 0.5,
                        outline: 'none',
                      },
                      hover: {
                        fill: market ? '#d4b16d' : '#adb8bf',
                        stroke: '#fff8ed',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                      pressed: {
                        fill: '#d4b16d',
                        stroke: '#fff8ed',
                        strokeWidth: 1,
                        outline: 'none',
                      },
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <div className="mt-5 rounded-[24px] bg-white/70 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6a72]">
          Accessible market picker
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {accessibleMarkets.map((market) => (
            <button
              key={market.code}
              type="button"
              onClick={() => onSelectMarket(market)}
              className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                selectedMarket?.code === market.code
                  ? 'bg-[#12354a] text-white'
                  : 'bg-[#ebe0cb] text-[#12354a] hover:bg-[#dfd0b1]'
              }`}
            >
              {market.country}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
