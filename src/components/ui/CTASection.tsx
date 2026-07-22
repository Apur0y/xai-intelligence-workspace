"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/8 blur-[120px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-6">
          Ready to start?
        </p>
        <h2 className="text-4xl sm:text-6xl font-bold text-foreground mb-6 leading-tight">
          Turn your data into
          <br />
          <span className="gradient-text">your advantage</span>
        </h2>
        <p className="text-lg text-text-secondary mb-10 max-w-xl mx-auto leading-relaxed">
          Join hundreds of teams already using Xai to make faster, smarter
          decisions. Free to start. No credit card required.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="group relative px-8 py-4 rounded-xl bg-accent text-white font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_var(--accent-glow)] flex items-center gap-2">
            <span className="relative z-10">Get Started Free</span>
            <ArrowRight
              size={18}
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
          <button className="px-8 py-4 rounded-xl border border-border text-text-secondary font-medium text-base hover:border-accent/40 hover:text-foreground transition-all duration-300">
            Schedule a Demo
          </button>
        </div>

        <p className="text-xs text-text-muted mt-8">
          Trusted by teams at leading companies worldwide
        </p>
      </motion.div>
    </section>
  );
}
