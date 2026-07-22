'use client'
import React, { useEffect, useRef } from 'react'
import PrimaryBtn from '../ui/PrimaryBtn'
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

function fibSphere(n: number, r: number) {
  const phi = (1 + Math.sqrt(5)) / 2
  return Array.from({ length: n }, (_, i) => {
    const theta = Math.acos(1 - (2 * (i + 0.5)) / n)
    const psi = (2 * Math.PI * i) / phi
    return {
      x: r * Math.sin(theta) * Math.cos(psi),
      y: r * Math.sin(theta) * Math.sin(psi),
      z: r * Math.cos(theta),
    }
  })
}


export default function NewSignatureInteraction() {
      const canvasRef = useRef<HTMLCanvasElement>(null)

  // Precompute sphere points once
  const spherePoints = fibSphere(180, 1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let angle = 0
    let raf: number

    function draw() {
      const W = canvas!.width
      const H = canvas!.height
      ctx!.clearRect(0, 0, W, H)

      const cx = W / 2
      const cy = H / 2
      const R = Math.min(W, H) * 0.36
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)

      // Project and sort by z
      const projected = spherePoints.map((p:any) => {
        // Rotate around Y axis
        const rx = p.x * cos + p.z * sin
        const rz = -p.x * sin + p.z * cos
        const ry = p.y

        // Simple perspective
        const fov = 2.2
        const scale = fov / (fov + rz)
        return {
          sx: cx + rx * R * scale,
          sy: cy + ry * R * scale,
          z: rz,
          scale,
        }
      })

      // Sort back to front
      projected.sort((a:any, b:any) => a.z - b.z)

      // Draw connections between nearby points
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i]
          const b = projected[j]
          const dx = a.sx - b.sx
          const dy = a.sy - b.sy
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < R * 0.28) {
            const avgZ = (a.z + b.z) / 2
            const opacity = (((avgZ + 1) / 2) * 0.18 + 0.02) * (1 - dist / (R * 0.28))
            ctx!.beginPath()
            ctx!.moveTo(a.sx, a.sy)
            ctx!.lineTo(b.sx, b.sy)
            ctx!.strokeStyle = `rgba(91,140,255,${opacity.toFixed(3)})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      // Draw points
      for (const p of projected) {
        const brightness = (p.z + 1) / 2
        const r = (1.5 + brightness * 1.8) * p.scale
        const alpha = 0.3 + brightness * 0.7

        if (brightness > 0.6) {
          // Glow for front points
          const grd = ctx!.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 4)
          grd.addColorStop(0, `rgba(91,140,255,${(alpha * 0.35).toFixed(3)})`)
          grd.addColorStop(1, 'rgba(91,140,255,0)')
          ctx!.beginPath()
          ctx!.arc(p.sx, p.sy, r * 4, 0, Math.PI * 2)
          ctx!.fillStyle = grd
          ctx!.fill()
        }

        ctx!.beginPath()
        ctx!.arc(p.sx, p.sy, r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${brightness > 0.7 ? '180,210,255' : '91,140,255'},${alpha.toFixed(3)})`
        ctx!.fill()
      }

      angle += 0.003
      raf = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div>
      <section
      style={{
        position: 'relative',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        padding: '80px 40px',
      }}
    >
      {/* Dark radial ground */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 50% 50%, rgba(91,140,255,0.08) 0%, transparent 65%),
            radial-gradient(ellipse 100% 100% at 50% 50%, #0D0D10 0%, ${C.bg} 100%)
          `,
        }}
      />

      {/* Sphere canvas */}
      <canvas
        ref={canvasRef}
        width={700}
        height={700}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.85,
        }}
      />

      {/* Copy overlay */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
        <p style={{ fontSize: 11, color: C.a, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.14em', marginBottom: 20 }}>
          INTELLIGENCE ENGINE
        </p>
        <h2
          style={{
            fontSize: 'clamp(44px, 5.5vw, 68px)',
            fontWeight: 640,
            letterSpacing: '-0.04em',
            color: C.t1,
            margin: '0 0 20px',
            lineHeight: 1.06,
            textShadow: '0 0 40px rgba(10,10,11,0.9)',
          }}
        >
          Intelligence at scale.
        </h2>
        <p
          style={{
            fontSize: 17,
            color: C.t2,
            maxWidth: 420,
            lineHeight: 1.65,
            margin: '0 auto 40px',
            letterSpacing: '-0.01em',
            textShadow: '0 0 20px rgba(10,10,11,0.8)',
          }}
        >
          Every signal. Every source. Converging into a single, always-on intelligence layer for your enterprise.
        </p>
        <div style={{ pointerEvents: 'all' }}>
          <PrimaryBtn>
            Explore the platform
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </PrimaryBtn>
        </div>
      </div>
    </section>
    </div>
  )
}
