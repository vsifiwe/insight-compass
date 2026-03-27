import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jul", complaints: 1820, resolved: 1650 },
  { month: "Aug", complaints: 2100, resolved: 1800 },
  { month: "Sep", complaints: 1950, resolved: 1900 },
  { month: "Oct", complaints: 2400, resolved: 2000 },
  { month: "Nov", complaints: 2250, resolved: 2100 },
  { month: "Dec", complaints: 1900, resolved: 1750 },
  { month: "Jan", complaints: 2600, resolved: 2200 },
  { month: "Feb", complaints: 2800, resolved: 2350 },
  { month: "Mar", complaints: 3100, resolved: 2500 },
];

const ComplaintTrends = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-lg font-serif text-foreground">Complaint Trends</h3>
        <span className="text-xs text-muted-foreground">Last 9 months</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Filed vs resolved complaints over time</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="complaintsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(220, 45%, 20%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(220, 45%, 20%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="resolvedGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(160, 50%, 40%)" stopOpacity={0.15} />
                <stop offset="95%" stopColor="hsl(160, 50%, 40%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 15%, 90%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Area type="monotone" dataKey="complaints" stroke="hsl(220, 45%, 20%)" strokeWidth={2} fill="url(#complaintsGrad)" name="Filed" />
            <Area type="monotone" dataKey="resolved" stroke="hsl(160, 50%, 40%)" strokeWidth={2} fill="url(#resolvedGrad)" name="Resolved" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-primary" /> Filed
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-positive" /> Resolved
        </div>
      </div>
    </div>
  );
};

export default ComplaintTrends;
