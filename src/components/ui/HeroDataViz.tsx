import React from 'react'
const C = {
  bg: '#0A0A0B',
  surface: '#111214',
  card: '#16161A',
  cardUp: '#1C1C22',
  a: '#5B8CFF',
  aDim: 'rgba(91,140,255,0.1)',
  aGlow: 'rgba(91,140,255,0.22)',
  b: 'rgba(255,255,255,0.06)',
  bMid: 'rgba(255,255,255,0.10)',
  t1: '#EAEAEF',
  t2: '#77778A',
  t3: '#3A3A46',
  green: '#3ECF8E',
  greenDim: 'rgba(62,207,142,0.1)',
  amber: '#F59E0B',
  amberDim: 'rgba(245,158,11,0.1)',
  red: '#FF6B6B',
  redDim: 'rgba(255,107,107,0.1)',
}


const edges = [
  [0, 2], [0, 6], [0, 14], [1, 3], [1, 16], [2, 4], [2, 14], [3, 13],
  [3, 4], [4, 8], [5, 7], [5, 11], [6, 10], [7, 8], [7, 11], [7, 17],
  [8, 9], [9, 12], [9, 18], [10, 18], [12, 19], [13, 16], [15, 17],
]

const nodes = [
  { x: 44, y: 82, r: 3.5 }, { x: 118, y: 44, r: 2.5 }, { x: 86, y: 166, r: 2.8 },
  { x: 196, y: 93, r: 4.5 }, { x: 153, y: 198, r: 2.5 }, { x: 276, y: 70, r: 2 },
  { x: 30, y: 224, r: 3 }, { x: 308, y: 176, r: 2.5 }, { x: 258, y: 246, r: 3.5 },
  { x: 176, y: 276, r: 2 }, { x: 70, y: 296, r: 2.5 }, { x: 338, y: 116, r: 2 },
  { x: 138, y: 326, r: 3 }, { x: 226, y: 156, r: 2.8 }, { x: 60, y: 146, r: 2 },
  { x: 296, y: 296, r: 2 }, { x: 194, y: 36, r: 2.5 }, { x: 326, y: 236, r: 2.5 },
  { x: 106, y: 246, r: 2.5 }, { x: 246, y: 316, r: 2 },
]

const gridPanels = [
  { label: 'ARR', value: '$4.88M', up: true },
  { label: 'Win Rate', value: '34%', up: true },
  { label: 'Churn Risk', value: '3 accounts', up: false },
  { label: 'NPS', value: '71', up: true },
  { label: 'CAC', value: '$12.4K', up: null },
  { label: 'LTV Ratio', value: '4.2×', up: true },
  { label: 'Pipeline', value: '142 deals', up: true },
  { label: 'Avg ACV', value: '$88K', up: true },
  { label: 'Expansion', value: '+$1.2M', up: true },
  { label: 'Coverage', value: '3.8×', up: true },
  { label: 'Seats Used', value: '18 / 24', up: null },
  { label: 'Signals', value: '6 new', up: true },
]


export default function HeroDataViz() {
      const W = 900
  const H = 400
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: W,
        margin: '0 auto',
        background: C.card,
        borderRadius: 16,
        border: `1px solid ${C.b}`,
        overflow: 'hidden',
        boxShadow: `0 0 80px ${C.aGlow}, 0 40px 80px rgba(0,0,0,0.5)`,
      }}
    >
      {/* Ambient glow behind */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 60% 70% at 50% 50%, rgba(91,140,255,0.05) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <svg
        width="100%"
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: 'block' }}
      >
        <defs>
          <linearGradient id="fadeLeft" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.bg} stopOpacity="0" />
            <stop offset="100%" stopColor={C.bg} stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="fadeRight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={C.bg} stopOpacity="0.85" />
            <stop offset="100%" stopColor={C.bg} stopOpacity="0" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.a} stopOpacity="0.9" />
            <stop offset="100%" stopColor={C.a} stopOpacity="0.3" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Left: scattered raw data (0–380px) ── */}
        <g transform="translate(30, 28)">
          {/* Connection lines */}
          {edges.map(([i, j], idx) => {
            const ni = nodes[i], nj = nodes[j]
            if (!ni || !nj || ni.x > 340 || nj.x > 340) return null
            return (
              <line
                key={idx}
                x1={ni.x}
                y1={ni.y}
                x2={nj.x}
                y2={nj.y}
                stroke={C.a}
                strokeWidth="0.6"
                strokeOpacity="0.18"
              />
            )
          })}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <g key={i} filter={n.r > 3.5 ? 'url(#glow)' : undefined}>
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r + 4}
                fill={C.a}
                fillOpacity={n.r > 3.5 ? 0.07 : 0}
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill={n.r > 3.5 ? C.a : 'rgba(91,140,255,0.6)'}
                strokeWidth={n.r > 3.5 ? 1 : 0}
                stroke={C.a}
                strokeOpacity="0.5"
              />
            </g>
          ))}

          {/* Labels near prominent nodes */}
          <text x="210" y="90" fill={C.t2} fontSize="8" fontFamily="JetBrains Mono, monospace">
            user_events.parquet
          </text>
          <text x="168" y="215" fill={C.t2} fontSize="8" fontFamily="JetBrains Mono, monospace">
            crm_contacts.json
          </text>
          <text x="28" y="242" fill={C.t2} fontSize="8" fontFamily="JetBrains Mono, monospace">
            erp_ledger.csv
          </text>
          <text x="88" y="318" fill={C.t2} fontSize="8" fontFamily="JetBrains Mono, monospace">
            signals_api
          </text>
        </g>

        {/* Section label: Before */}
        <text x="24" y="24" fill={C.t3} fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="0.1em">
          RAW DATA
        </text>

        {/* Fade mask over scatter */}
        <rect x="300" y="0" width="120" height={H} fill="url(#fadeLeft)" />

        {/* ── Center divider ── */}
        <line
          x1={W / 2}
          y1="32"
          x2={W / 2}
          y2={H - 32}
          stroke="url(#accentGrad)"
          strokeWidth="0.8"
          strokeOpacity="0.4"
        />

        {/* ── Right: organized grid panels (520–880px) ── */}
        {/* Fade in from left */}
        <rect x="480" y="0" width="120" height={H} fill="url(#fadeRight)" />

        {/* Section label: After */}
        <text
          x={W - 24}
          y="24"
          fill={C.a}
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.1em"
          textAnchor="end"
        >
          INTELLIGENCE LAYER
        </text>

        {/* 4×3 grid of data panels, starting at x=520 */}
        {gridPanels.map((panel, i) => {
          const col = i % 3
          const row = Math.floor(i / 3)
          const px = 520 + col * 122
          const py = 40 + row * 82
          const isHighlighted = i === 0 || i === 1

          return (
            <g key={i}>
              <rect
                x={px}
                y={py}
                width={108}
                height={66}
                rx="6"
                fill={C.cardUp}
                stroke={isHighlighted ? C.a : C.b}
                strokeWidth={isHighlighted ? '0.8' : '0.6'}
                strokeOpacity={isHighlighted ? 0.5 : 1}
              />
              {isHighlighted && (
                <rect
                  x={px}
                  y={py}
                  width={108}
                  height={66}
                  rx="6"
                  fill={C.a}
                  fillOpacity="0.03"
                />
              )}

              {/* Value bar */}
              <rect
                x={px + 10}
                y={py + 40}
                width={panel.up ? 64 : 48}
                height="3"
                rx="1.5"
                fill={panel.up === true ? C.green : panel.up === false ? C.red : C.a}
                fillOpacity="0.7"
              />
              <rect
                x={px + 10}
                y={py + 40}
                width={88}
                height="3"
                rx="1.5"
                fill="rgba(255,255,255,0.05)"
              />

              <text
                x={px + 10}
                y={py + 18}
                fill={C.t3}
                fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.08em"
              >
                {panel.label.toUpperCase()}
              </text>
              <text
                x={px + 10}
                y={py + 34}
                fill={isHighlighted ? C.t1 : C.t2}
                fontSize="13"
                fontWeight={isHighlighted ? '600' : '400'}
                fontFamily="Inter, sans-serif"
                letterSpacing="-0.02em"
              >
                {panel.value}
              </text>

              {/* Trend arrow */}
              {panel.up !== null && (
                <text
                  x={px + 90}
                  y={py + 18}
                  fill={panel.up ? C.green : C.red}
                  fontSize="9"
                  textAnchor="end"
                >
                  {panel.up ? '↑' : '↓'}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* Bottom label */}
      <div
        style={{
          padding: '12px 24px',
          borderTop: `1px solid ${C.b}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: C.t3,
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '0.05em',
          }}
        >
          xai-intelligence-engine · v3.2.1 · 12 sources connected
        </span>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: C.green,
            fontFamily: 'JetBrains Mono, monospace',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: C.green,
              display: 'inline-block',
              boxShadow: `0 0 6px ${C.green}`,
            }}
          />
          Processing · 142ms avg latency
        </span>
      </div>
    </div>
  )
}
