"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Database, Brain, Lightbulb } from "lucide-react";

const stages = [
  {
    id: 1,
    icon: Database,
    title: "Ingest Data",
    subtitle: "Connect everything",
    description:
      "Pull data from any source — APIs, databases, files, streams. Xai normalizes and structures it automatically, no matter the format.",
    features: ["200+ connectors", "Real-time streaming", "Auto-schema detection"],
    color: "from-blue-500 to-cyan-400",
    accent: "#4f7cff",
  },
  {
    id: 2,
    icon: Brain,
    title: "Analyze with AI",
    subtitle: "Understand deeply",
    description:
      "Multi-modal AI models process your data, find patterns, detect anomalies, and build contextual understanding across every dimension.",
    features: ["Pattern recognition", "Anomaly detection", "Context mapping"],
    color: "from-purple-500 to-pink-400",
    accent: "#8b5cf6",
  },
  {
    id: 3,
    icon: Lightbulb,
    title: "Generate Insight",
    subtitle: "Act with confidence",
    description:
      "Actionable intelligence delivered as clear narratives, interactive dashboards, and automated recommendations — ready for decisions.",
    features: ["Smart summaries", "Predictive alerts", "Auto-reports"],
    color: "from-amber-500 to-orange-400",
    accent: "#f59e0b",
  },
];

function StageCard({
  stage,
}: {
  stage: (typeof stages)[number];
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const Icon = stage.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ opacity, x }}
      className="relative"
    >
      <div className="group relative flex flex-col lg:flex-row gap-8 lg:gap-12 items-start p-8 rounded-2xl border border-border bg-surface/50 backdrop-blur-sm hover:border-accent/20 transition-all duration-500">
        {/* Stage number + icon */}
        <div className="flex-shrink-0">
          <div
            className="relative w-16 h-16 rounded-xl flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${stage.accent}20, ${stage.accent}05)`,
              border: `1px solid ${stage.accent}30`,
            }}
          >
            <Icon
              size={28}
              style={{ color: stage.accent }}
              strokeWidth={1.5}
            />
            <div
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: stage.accent }}
            >
              {stage.id}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: stage.accent }}>
            {stage.subtitle}
          </p>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {stage.title}
          </h3>
          <p className="text-text-secondary leading-relaxed mb-6 max-w-lg">
            {stage.description}
          </p>
          <div className="flex flex-wrap gap-3">
            {stage.features.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-surface-elevated text-text-secondary"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Animated line decoration */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-32 h-px">
          <motion.div
            className="h-full"
            style={{
              background: `linear-gradient(to right, ${stage.accent}40, transparent)`,
              scaleX: useTransform(scrollYProgress, [0.3, 0.7], [0, 1]),
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function InsightFlow() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-surface" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
            How it works
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Three stages.{" "}
            <span className="gradient-text">Zero friction.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-xl mx-auto">
            From raw data to boardroom-ready insights in minutes, not months.
          </p>
        </motion.div>

        {/* Connecting line */}
        <div className="absolute left-[31px] top-[320px] bottom-[200px] w-px bg-border hidden lg:block">
          <motion.div
            className="w-full bg-gradient-to-b from-accent via-purple-500 to-orange-400"
            style={{ height: lineHeight }}
          />
        </div>

        {/* Stage cards */}
        <div className="space-y-8">
          {stages.map((stage) => (
            <StageCard key={stage.id} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
