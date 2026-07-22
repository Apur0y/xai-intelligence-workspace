'use client'
import React, { useState } from 'react'
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
export default function GhostBtn({ children }: { children: React.ReactNode }) {
   const [hover, setHover] = useState(false)
   return (
    <div>
       <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '10px 22px',
        background: hover ? 'rgba(255,255,255,0.04)' : 'transparent',
        color: hover ? C.t1 : C.t2,
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: '-0.01em',
        border: `1px solid ${hover ? C.bMid : C.b}`,
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'all 0.15s ease',
      }}
    >
      {children}
    </button>
    </div>
  )
}
