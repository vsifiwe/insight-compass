import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

const data = [
  { cause: "Rainfall", impact: 38 },
  { cause: "Aging Infra", impact: 28 },
  { cause: "Staff Shortage", impact: 15 },
  { cause: "Demand Surge", impact: 12 },
  { cause: "Policy Gap", impact: 7 },
];

const colors = [
  "hsl(210, 60%, 50%)",
  "hsl(220, 45%, 30%)",
  "hsl(38, 85%, 55%)",
  "hsl(160, 50%, 40%)",
  "hsl(220, 15%, 65%)",
];

const RootCauses = () => {
  return (
    <div className="rounded-xl bg-card border border-border/60 p-6">
      <h3 className="text-lg font-serif text-foreground mb-1">Root Cause Analysis</h3>
      <p className="text-sm text-muted-foreground mb-5">Primary factors driving complaints (% contribution)</p>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
            <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} domain={[0, 45]} />
            <YAxis type="category" dataKey="cause" tick={{ fontSize: 12, fill: "hsl(220, 30%, 12%)" }} axisLine={false} tickLine={false} width={90} />
            <Tooltip
              contentStyle={{
                background: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 15%, 90%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
              formatter={(value: number) => [`${value}%`, "Impact"]}
            />
            <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={16}>
              {data.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RootCauses;
