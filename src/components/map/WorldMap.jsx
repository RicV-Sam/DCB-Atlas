import { useMemo, useState } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import {
  getMapLegend,
  getMapModeLabel,
  getMapTone,
  mapModes,
} from '../../utils/scoring'

export function WorldMap({
  markets,
  onSelectMarket,
  selectedMarket,
  accessibleMarkets = [],
}) {
  const [mapMode, setMapMode] = useState('status')
  const marketsByMapId = useMemo(
    () => new Map(markets.map((market) => [market.mapId, market])),
    [markets],
  )
  const geographyUrl = `${import.meta.env.BASE_URL}world-atlas.json`
  const legend = getMapLegend(mapMode)

  return (
    <div className="atlas-panel overflow-hidden p-4 sm:p-6">
      <div className="mb-5 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="atlas-eyebrow">Interactive map</p>
          <h3 className="atlas-title mt-2 text-2xl font-semibold text-[#0d1b24]">
            Switch between status, opportunity, risk, and DCB readiness.
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#35505f]">
            The map now works as a quick intelligence layer: use it to spot stronger
            launch candidates, risk-heavy markets, and countries that still need
            route validation.
          </p>
        </div>
        <div className="rounded-[24px] bg-white/70 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6a72]">
            Map mode
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {mapModes.map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setMapMode(mode)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  mapMode === mode
                    ? 'bg-[#12354a] text-white'
                    : 'bg-[#ebe0cb] text-[#12354a] hover:bg-[#dfd0b1]'
                }`}
                aria-pressed={mapMode === mode}
              >
                {getMapModeLabel(mode)}
              </button>
            ))}
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {legend.map((item) => (
              <div key={`${mapMode}-${item.label}`} className="flex items-center gap-2 text-sm text-[#35505f]">
                <span
                  className="h-3 w-3 rounded-full border border-white/50"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-[24px] bg-[#0f2d3e] p-2 sm:p-4">
        <ComposableMap
          projectionConfig={{ scale: 150 }}
          className="h-auto w-full"
          aria-label={`World map of DCB Atlas markets, coloured by ${getMapModeLabel(mapMode)}`}
        >
          <Geographies geography={geographyUrl}>
            {({ geographies }) =>
              geographies.map((geography) => {
                const market = marketsByMapId.get(geography.id)
                const isSelected = selectedMarket?.code === market?.code
                const fill = market ? getMapTone(market, mapMode) : '#89939a'

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
                        stroke: isSelected ? '#f3cf8b' : '#f5ecdc',
                        strokeWidth: isSelected ? 1.6 : 0.5,
                        outline: 'none',
                      },
                      hover: {
                        fill: '#d4b16d',
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
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5f6a72]">
              Accessible market picker
            </p>
            <p className="mt-1 text-sm leading-7 text-[#35505f]">
              Prioritised from higher-scoring, higher-opportunity, and recently updated
              public profiles rather than an alphabetical list.
            </p>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
            Mode: {getMapModeLabel(mapMode)}
          </p>
        </div>
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
