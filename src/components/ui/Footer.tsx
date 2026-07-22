"use client";

import { Zap, ExternalLink, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">Xai</span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed">
              Intelligence workspace for modern teams. Transform data into decisions.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Integrations", "Pricing", "Changelog"],
            },
            {
              title: "Resources",
              links: ["Documentation", "API Reference", "Guides", "Blog"],
            },
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Security"],
            },
          ].map((group) => (
            <div key={group.title}>
              <p className="text-sm font-semibold text-foreground mb-3">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-text-muted hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
          <p className="text-xs text-text-muted">
            &copy; 2026 Xai. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-text-muted hover:text-foreground transition-colors">
              <Globe size={16} />
            </a>
            <a href="#" className="text-text-muted hover:text-foreground transition-colors">
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
