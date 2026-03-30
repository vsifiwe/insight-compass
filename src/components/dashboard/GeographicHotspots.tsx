const zones = [
  { name: "Gasabo — Kimironko", complaints: 847, severity: "critical" as const, change: "+32%" },
  { name: "Nyarugenge — Nyamirambo", complaints: 612, severity: "high" as const, change: "+18%" },
  { name: "Kicukiro — Gatenga", complaints: 534, severity: "high" as const, change: "+24%" },
  { name: "Musanze — Muhoza", complaints: 423, severity: "moderate" as const, change: "+5%" },
  { name: "Rubavu — Gisenyi", complaints: 389, severity: "moderate" as const, change: "-3%" },
  { name: "Huye — Tumba", complaints: 267, severity: "low" as const, change: "-12%" },
];

const severityStyles = {
  critical: "bg-danger/10 text-danger border-danger/20",
  high: "bg-warning/10 text-warning-foreground border-warning/20",
  moderate: "bg-insight/10 text-insight border-insight/20",
  low: "bg-positive/10 text-positive border-positive/20",
};

const barWidths = {
  critical: "w-full",
  high: "w-3/4",
  moderate: "w-1/2",
  low: "w-1/3",
};

const barColors = {
  critical: "bg-danger/60",
  high: "bg-warning/60",
  moderate: "bg-insight/40",
  low: "bg-positive/40",
};

const GeographicHotspots = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-serif text-foreground">Geographic Hotspots</h3>
        <span className="text-xs text-muted-foreground">By district</span>
      </div>
      <p className="text-sm text-muted-foreground mb-5">Complaint concentration by area</p>
      <div className="space-y-3">
        {zones.map((z) => (
          <div key={z.name} className="group">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-foreground">{z.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{z.complaints}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${severityStyles[z.severity]}`}>
                  {z.severity}
                </span>
              </div>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div className={`h-full rounded-full transition-all ${barWidths[z.severity]} ${barColors[z.severity]}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeographicHotspots;
