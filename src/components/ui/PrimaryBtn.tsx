'use client'
import React, { useState } from 'react'

export default function PrimaryBtn({ children, sm }: { children: React.ReactNode; sm?: boolean }) {
   const [hover, setHover] = useState(false)
    return (
    <div>
      <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: sm ? '7px 16px' : '10px 22px',
        background: hover ? '#7AA5FF' : '#5B8CFF',
        color: '#fff',
        fontSize: sm ? 13 : 14,
        fontWeight: 500,
        letterSpacing: '-0.01em',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        transition: 'background 0.15s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </button>
    </div>
  )
}
