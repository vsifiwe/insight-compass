import { Lightbulb, TrendingUp, Droplets, Construction, Zap } from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    type: "Trend",
    title: "Drainage complaints up 32% in Westfield",
    body: "Complaints about waterlogging in District 7 have risen sharply since October. This correlates with 45% above-average rainfall and aging infrastructure (avg pipe age: 28 years).",
    action: "Recommend prioritizing drainage maintenance in Westfield before monsoon season.",
    time: "2 hours ago",
  },
  {
    icon: Droplets,
    type: "Root Cause",
    title: "Water supply issues linked to pipeline age",
    body: "65% of water complaints in Riverside originate from blocks with pipelines over 20 years old. Leak rate is 3x higher than city average.",
    action: "Consider phased pipeline replacement program in Blocks C and D.",
    time: "5 hours ago",
  },
  {
    icon: Construction,
    type: "Impact",
    title: "Road repair intervention reduced complaints by 47%",
    body: "Following emergency pothole repairs in District 11 last month, road-related complaints dropped from 312 to 165. Citizen satisfaction scores improved by 23 points.",
    action: "Extend similar rapid-response approach to Districts 4 and 8.",
    time: "1 day ago",
  },
  {
    icon: Zap,
    type: "Anomaly",
    title: "Unusual spike in power outage reports — Central",
    body: "District 5 saw 89 power-related complaints in 48 hours, 4x the weekly average. No scheduled maintenance was planned. Pattern suggests grid overload.",
    action: "Escalate to power utility for immediate grid assessment.",
    time: "3 hours ago",
  },
];

const typeBadge: Record<string, string> = {
  Trend: "bg-primary/10 text-primary",
  "Root Cause": "bg-warning/10 text-warning-foreground",
  Impact: "bg-positive/10 text-positive",
  Anomaly: "bg-danger/10 text-danger",
};

const InsightsFeed = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb className="h-4 w-4 text-accent" />
        <h3 className="text-lg font-serif text-foreground">Intelligence Feed</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Key insights requiring attention</p>
      <div className="space-y-5">
        {insights.map((ins, i) => (
          <div key={i} className="relative pl-5 border-l-2 border-border/60 hover:border-primary/40 transition-colors">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeBadge[ins.type]}`}>
                {ins.type}
              </span>
              <span className="text-[10px] text-muted-foreground">{ins.time}</span>
            </div>
            <p className="text-sm font-semibold text-foreground">{ins.title}</p>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ins.body}</p>
            <div className="mt-2 flex items-start gap-1.5">
              <ins.icon className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              <p className="text-xs font-medium text-foreground/80">{ins.action}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsFeed;
