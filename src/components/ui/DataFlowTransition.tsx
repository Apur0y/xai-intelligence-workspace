"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { value: "2.4M+", label: "Data points processed daily" },
  { value: "99.7%", label: "Accuracy across all models" },
  { value: "< 200ms", label: "Average insight generation" },
  { value: "340+", label: "Enterprise integrations" },
];

export default function DataFlowTransition() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const wordsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);
  const statItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split text word reveal
      const words = wordsRef.current.filter(Boolean);
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 20, filter: "blur(4px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );

      // Stats counter reveal
      const statItems = statItemsRef.current.filter(Boolean);
      gsap.fromTo(
        statItems,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: false,
            toggleActions: "play none none reverse",
          },
        }
      );

      // Horizontal line draw
      gsap.fromTo(
        ".flow-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const text =
    "Xai processes millions of data signals in real-time, transforming chaos into clarity. Every decision backed by evidence. Every insight actionable.";

  return (
    <section
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[300px] bg-accent/5 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[250px] bg-gradient-to-br from-purple-500/5 to-transparent blur-[80px] rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* GSAP word-reveal text */}
        <div ref={headingRef} className="mb-20">
          <h2
            ref={headingRef}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-snug max-w-4xl"
          >
            {text.split(" ").map((word, i) => (
              <span
                key={i}
                ref={(el) => { wordsRef.current[i] = el; }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Flow line */}
        <div className="flow-line h-px bg-gradient-to-r from-accent via-purple-500 to-cyan mb-16 origin-left" />

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => { statItemsRef.current[i] = el; }}
              className="text-center"
            >
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
