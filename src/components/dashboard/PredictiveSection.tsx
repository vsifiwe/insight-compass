import { AlertTriangle, ArrowRight } from "lucide-react";

const predictions = [
  {
    area: "District 7 — Westfield",
    prediction: "Complaints expected to rise 40% in the next 30 days",
    reason: "Heavy rainfall forecast + aging drainage infrastructure",
    confidence: 87,
    risk: "critical" as const,
  },
  {
    area: "District 3 — Riverside",
    prediction: "Water supply complaints likely to double by April",
    reason: "Seasonal demand surge + pipeline maintenance delays",
    confidence: 79,
    risk: "high" as const,
  },
  {
    area: "District 11 — North End",
    prediction: "Road complaints may increase 25% within 2 weeks",
    reason: "Post-monsoon pothole formation pattern detected",
    confidence: 72,
    risk: "moderate" as const,
  },
];

const riskBorder = {
  critical: "border-l-danger",
  high: "border-l-warning",
  moderate: "border-l-insight",
};

const PredictiveSection = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <div className="flex items-center gap-2 mb-1">
        <AlertTriangle className="h-4 w-4 text-warning" />
        <h3 className="text-lg font-serif text-foreground">Predictive Alerts</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Areas likely to see complaint surges</p>
      <div className="space-y-4">
        {predictions.map((p) => (
          <div key={p.area} className={`border-l-[3px] ${riskBorder[p.risk]} rounded-r-lg bg-muted/30 p-4`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{p.area}</p>
                <p className="text-sm text-foreground/80 mt-1">{p.prediction}</p>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <ArrowRight className="h-3 w-3" /> {p.reason}
                </p>
              </div>
              <div className="text-right shrink-0 ml-4">
                <span className="text-2xl font-bold text-foreground">{p.confidence}%</span>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">confidence</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PredictiveSection;
