"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Database,
  Settings,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  ArrowUpRight,
} from "lucide-react";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: BarChart3, label: "Analytics", active: false },
  { icon: Database, label: "Data Sources", active: false },
  { icon: Zap, label: "Automations", active: false },
  { icon: Bell, label: "Alerts", active: false },
  { icon: Settings, label: "Settings", active: false },
];

const tabs = ["Overview", "Revenue", "Users", "Performance"];

const metrics = [
  {
    label: "Total Insights",
    value: "12,847",
    change: "+23.5%",
    trend: "up" as const,
    sparkline: [40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 85, 90],
  },
  {
    label: "Data Sources",
    value: "34",
    change: "+4 this week",
    trend: "up" as const,
    sparkline: [20, 22, 25, 24, 28, 30, 29, 32, 31, 33, 34, 34],
  },
  {
    label: "Accuracy Score",
    value: "97.3%",
    change: "+1.2%",
    trend: "up" as const,
    sparkline: [90, 91, 92, 91, 93, 94, 93, 95, 96, 95, 97, 97],
  },
  {
    label: "Processing Time",
    value: "1.2s",
    change: "-0.3s",
    trend: "down" as const,
    sparkline: [30, 28, 25, 22, 20, 18, 16, 15, 14, 13, 12, 12],
  },
];

const tableData = [
  { name: "Revenue Analysis Q4", type: "Report", status: "Complete", confidence: 98, updated: "2 min ago" },
  { name: "User Behavior Patterns", type: "Insight", status: "Processing", confidence: 94, updated: "5 min ago" },
  { name: "Market Trend Detection", type: "Alert", status: "Complete", confidence: 96, updated: "12 min ago" },
  { name: "Anomaly in Dataset #847", type: "Anomaly", status: "Flagged", confidence: 87, updated: "18 min ago" },
  { name: "Customer Segmentation v3", type: "Model", status: "Complete", confidence: 99, updated: "1 hr ago" },
];

const chartBars = [65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88, 92];

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const points = data
    .map(
      (v, i) =>
        `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`
    )
    .join(" ");

  return (
    <svg width={width} height={height} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BarChart({ data }: { data: number[] }) {
  const max = Math.max(...data);

  return (
    <div className="flex items-end gap-1.5 h-40">
      {data.map((value, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm bg-gradient-to-t from-accent/80 to-accent"
          initial={{ height: 0 }}
          whileInView={{ height: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-surface via-background to-background" />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-16"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-4">
          Your command center
        </p>
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Intelligence <span className="gradient-text">Dashboard</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-xl mx-auto">
          Every metric, every insight, every pattern — unified in one view.
        </p>
      </motion.div>

      {/* Dashboard mock */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-6xl mx-auto"
      >
        <div className="rounded-2xl border border-border bg-surface/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40">
          {/* Dashboard top bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-border bg-surface-elevated/50">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface border border-border text-xs text-text-muted">
                <Search size={12} />
                <span>Search insights...</span>
                <span className="ml-6 px-1.5 py-0.5 rounded border border-border text-[10px]">
                  /
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-1.5 rounded-md hover:bg-surface-elevated transition-colors">
                <Bell size={16} className="text-text-muted" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full bg-accent" />
              </button>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-purple-500" />
            </div>
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-56 border-r border-border p-3 gap-1">
              <div className="px-3 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center">
                    <Zap size={14} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    Xai
                  </span>
                </div>
              </div>
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                      item.active
                        ? "bg-accent/10 text-accent"
                        : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
                    }`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
              {/* Tabs */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 p-1 rounded-lg bg-surface-elevated border border-border">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors duration-200 ${
                        activeTab === tab
                          ? "text-foreground"
                          : "text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      {activeTab === tab && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-surface border border-border rounded-md"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab}</span>
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-text-muted border border-border rounded-lg hover:border-accent/30 transition-colors">
                  Last 30 days
                  <ChevronDown size={14} />
                </button>
              </div>

              {/* Metrics cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {metrics.map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-4 rounded-xl border border-border bg-surface-elevated/50 hover:border-accent/20 transition-all duration-300 group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-text-muted">{metric.label}</p>
                      <MiniSparkline
                        data={metric.sparkline}
                        color={metric.trend === "up" ? "#06d6a0" : "#4f7cff"}
                      />
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-bold text-foreground">
                        {metric.value}
                      </p>
                      <span
                        className={`flex items-center gap-1 text-xs font-medium ${
                          metric.trend === "up" ? "text-cyan" : "text-accent"
                        }`}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp size={12} />
                        ) : (
                          <TrendingDown size={12} />
                        )}
                        {metric.change}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Chart + table row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Chart */}
                <div className="lg:col-span-1 p-5 rounded-xl border border-border bg-surface-elevated/50">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm font-medium text-foreground">
                      Insight Volume
                    </p>
                    <Activity size={14} className="text-accent" />
                  </div>
                  <BarChart data={chartBars} />
                  <div className="flex justify-between mt-3 text-[10px] text-text-muted">
                    <span>Jan</span>
                    <span>Jun</span>
                    <span>Dec</span>
                  </div>
                </div>

                {/* Table */}
                <div className="lg:col-span-2 rounded-xl border border-border bg-surface-elevated/50 overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <p className="text-sm font-medium text-foreground">
                      Recent Activity
                    </p>
                    <button className="flex items-center gap-1 text-xs text-accent hover:underline">
                      View all <ArrowUpRight size={10} />
                    </button>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-text-muted text-xs">
                          <th className="text-left px-4 py-3 font-medium">
                            Name
                          </th>
                          <th className="text-left px-4 py-3 font-medium">
                            Type
                          </th>
                          <th className="text-left px-4 py-3 font-medium">
                            Status
                          </th>
                          <th className="text-left px-4 py-3 font-medium">
                            Confidence
                          </th>
                          <th className="text-left px-4 py-3 font-medium">
                            Updated
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((row, i) => (
                          <tr
                            key={i}
                            className="border-t border-border/50 hover:bg-surface-elevated/80 transition-colors"
                          >
                            <td className="px-4 py-3 text-foreground font-medium">
                              {row.name}
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 rounded text-xs bg-surface border border-border text-text-secondary">
                                {row.type}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`inline-flex items-center gap-1.5 text-xs font-medium ${
                                  row.status === "Complete"
                                    ? "text-cyan"
                                    : row.status === "Processing"
                                    ? "text-accent"
                                    : "text-orange"
                                }`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    row.status === "Complete"
                                      ? "bg-cyan"
                                      : row.status === "Processing"
                                      ? "bg-accent animate-pulse"
                                      : "bg-orange"
                                  }`}
                                />
                                {row.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 rounded-full bg-surface overflow-hidden">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-accent to-cyan"
                                    style={{ width: `${row.confidence}%` }}
                                  />
                                </div>
                                <span className="text-xs text-text-secondary">
                                  {row.confidence}%
                                </span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-text-muted text-xs">
                              {row.updated}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
