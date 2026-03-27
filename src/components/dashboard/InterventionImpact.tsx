import { ArrowDown, ArrowUp } from "lucide-react";

const interventions = [
  {
    action: "Emergency Pothole Repair — District 11",
    before: 312,
    after: 165,
    metric: "complaints/month",
    date: "Feb 2025",
  },
  {
    action: "New Water Tanker Route — Riverside",
    before: 198,
    after: 87,
    metric: "complaints/month",
    date: "Jan 2025",
  },
  {
    action: "Drainage Cleaning Drive — Westfield",
    before: 445,
    after: 380,
    metric: "complaints/month",
    date: "Dec 2024",
  },
];

const InterventionImpact = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <h3 className="text-lg font-serif text-foreground mb-1">Intervention Impact</h3>
      <p className="text-sm text-muted-foreground mb-5">Before vs after key actions</p>
      <div className="space-y-4">
        {interventions.map((inv) => {
          const reduction = Math.round(((inv.before - inv.after) / inv.before) * 100);
          const improved = inv.after < inv.before;
          return (
            <div key={inv.action} className="rounded-lg bg-muted/30 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-foreground">{inv.action}</p>
                <span className="text-xs text-muted-foreground">{inv.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-end gap-3">
                    <div className="text-center">
                      <p className="text-xl font-bold text-muted-foreground">{inv.before}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">Before</p>
                    </div>
                    <div className="pb-2">
                      <ArrowDown className="h-4 w-4 text-positive" />
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-foreground">{inv.after}</p>
                      <p className="text-[10px] uppercase tracking-wide text-muted-foreground">After</p>
                    </div>
                  </div>
                </div>
                <div className={`text-right ${improved ? "text-positive" : "text-danger"}`}>
                  <div className="flex items-center gap-1">
                    {improved ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                    <span className="text-2xl font-bold">{reduction}%</span>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{inv.metric}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterventionImpact;
