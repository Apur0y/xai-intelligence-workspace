import React from "react";
import PrimaryBtn from "../ui/PrimaryBtn";
import GhostBtn from "../ui/GhostBtn";
import HeroDataViz from "../ui/HeroDataViz";
import DataParticlesScene from "../three/DataParticles";

export default function NewheroSection() {
  return (
    <div>
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "120px 40px 80px",
          overflow: "hidden",
        }}
    
      >
        {/* Radial gradient bg */}
        {/* <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(ellipse 70% 60% at 50% 20%, rgba(91,140,255,0.09) 0%, transparent 65%)`,
            pointerEvents: "none",
          }}
        /> */}
         <DataParticlesScene />

        {/* Top badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "5px 14px",
            background: "rgba(91,140,255,0.1)",
            border: `1px solid rgba(91,140,255,0.2)`,
            borderRadius: 999,
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#5B8CFF",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 12,
              color: "#5B8CFF",
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: "0.04em",
            }}
          >
            Now in general availability — v3.2
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(48px, 6vw, 72px)",
            fontWeight: 640,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            textAlign: "center",
            maxWidth: 780,
            margin: "0 0 20px",
            color: "#EAEAEF",
          }}
              className="z-10"
        >
          From raw data to{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${"#EAEAEF"} 0%, ${"#5B8CFF"} 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            actionable intelligence.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 18,
            color: "#77778A",
            textAlign: "center",
            maxWidth: 560,
            lineHeight: 1.65,
            margin: "0 0 40px",
            letterSpacing: "-0.01em",
            fontWeight: 390,
          }}
              className="z-10"
        >
          Xai unifies your organization's scattered data sources into a single
          intelligence layer — delivering decision-ready insights to the teams
          that need them.
        </p>

        {/* CTAs */}
        <div     className="z-10" style={{ display: "flex", gap: 12, marginBottom: 80 }}>
          <PrimaryBtn>
            Start free trial
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7h8M8 4l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </PrimaryBtn>
          <GhostBtn>
            See how it works
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle
                cx="7"
                cy="7"
                r="5.5"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M5.5 5.5L8.5 7l-3 1.5V5.5z" fill="currentColor" />
            </svg>
          </GhostBtn>
        </div>

        {/* Data viz */}
        <div style={{ width: "100%", maxWidth: 940, position: "relative" }}>
          <HeroDataViz />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 80,
              background: `linear-gradient(to top, '#0A0A0B', transparent)`,
              pointerEvents: "none",
            }}
          />
        </div>
      </section>
    </div>
  );
}
