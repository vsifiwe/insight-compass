import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Clock, Users } from "lucide-react";

const metrics = [
  { label: "Total Complaints", value: "12,847", change: "+8.3%", trend: "up" as const, icon: Users, period: "vs last quarter" },
  { label: "Avg Resolution Time", value: "4.2 days", change: "-1.8 days", trend: "down" as const, icon: Clock, period: "vs last quarter" },
  { label: "Resolved This Month", value: "2,134", change: "+12%", trend: "up" as const, icon: CheckCircle, period: "vs last month" },
  { label: "High-Risk Zones", value: "7", change: "+2", trend: "up" as const, icon: AlertTriangle, period: "newly flagged" },
];

const ExecutiveOverview = () => {
  return (
    <section>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Executive Overview</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const isPositive = (m.label === "Avg Resolution Time" && m.trend === "down") ||
                             (m.label !== "Avg Resolution Time" && m.label !== "High-Risk Zones" && m.trend === "up");
          const isNegative = m.label === "High-Risk Zones" && m.trend === "up";
          return (
            <div key={m.label} className="rounded-xl bg-card p-5 border border-border/60">
              <div className="flex items-center justify-between mb-3">
                <m.icon className="h-4 w-4 text-muted-foreground" />
                <span className={`inline-flex items-center gap-1 text-xs font-medium ${
                  isNegative ? "text-danger" : isPositive ? "text-positive" : "text-muted-foreground"
                }`}>
                  {m.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {m.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tracking-tight">{m.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{m.label}</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">{m.period}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExecutiveOverview;
