import { useState } from "react";
import { AlertTriangle, ArrowRight, CloudRain, Wrench, TrendingUp, Droplets, Calendar, ThermometerSun } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid } from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Factor {
  name: string;
  contribution: number;
  icon: typeof CloudRain;
  detail: string;
}

interface TrendPoint {
  month: string;
  actual?: number;
  predicted?: number;
}

interface Prediction {
  area: string;
  prediction: string;
  reason: string;
  confidence: number;
  risk: "critical" | "high" | "moderate";
  factors: Factor[];
  trendData: TrendPoint[];
  summary: string;
}

const predictions: Prediction[] = [
  {
    area: "Gasabo — Kimironko",
    prediction: "Complaints expected to rise 40% in the next 30 days",
    reason: "Heavy rainfall forecast + aging drainage infrastructure",
    confidence: 87,
    risk: "critical",
    summary: "The model detects a strong correlation between rainfall intensity and drainage complaints in Kimironko. With forecasted above-average rainfall in April and infrastructure averaging 28 years old, a significant surge is expected.",
    factors: [
      { name: "Rainfall Forecast", contribution: 42, icon: CloudRain, detail: "April forecast: 45% above seasonal average" },
      { name: "Infrastructure Age", contribution: 30, icon: Wrench, detail: "Avg drainage pipe age: 28 years (replacement threshold: 20)" },
      { name: "Historical Pattern", contribution: 18, icon: TrendingUp, detail: "Same period last year saw 35% spike" },
      { name: "Population Density", contribution: 10, icon: Droplets, detail: "12% population increase in sector since 2024" },
    ],
    trendData: [
      { month: "Oct", actual: 120 },
      { month: "Nov", actual: 145 },
      { month: "Dec", actual: 168 },
      { month: "Jan", actual: 190 },
      { month: "Feb", actual: 210 },
      { month: "Mar", actual: 248 },
      { month: "Apr", predicted: 347 },
      { month: "May", predicted: 310 },
    ],
  },
  {
    area: "Nyarugenge — Nyamirambo",
    prediction: "Water supply complaints likely to double by April",
    reason: "Seasonal demand surge + pipeline maintenance delays",
    confidence: 79,
    risk: "high",
    summary: "Dry season demand typically increases 60% in Nyamirambo. Combined with delayed pipeline maintenance in Biryogo cell, the model predicts supply disruptions will generate significant complaints.",
    factors: [
      { name: "Seasonal Demand", contribution: 38, icon: ThermometerSun, detail: "Dry season increases water demand by 60%" },
      { name: "Maintenance Delays", contribution: 32, icon: Wrench, detail: "3 scheduled repairs postponed from Q1" },
      { name: "Leak Rate", contribution: 20, icon: Droplets, detail: "Current leak rate 3x city average in old pipes" },
      { name: "Historical Pattern", contribution: 10, icon: Calendar, detail: "April 2025 saw 2.1x spike in same area" },
    ],
    trendData: [
      { month: "Oct", actual: 85 },
      { month: "Nov", actual: 92 },
      { month: "Dec", actual: 105 },
      { month: "Jan", actual: 130 },
      { month: "Feb", actual: 158 },
      { month: "Mar", actual: 198 },
      { month: "Apr", predicted: 380 },
      { month: "May", predicted: 340 },
    ],
  },
  {
    area: "Kicukiro — Gatenga",
    prediction: "Road complaints may increase 25% within 2 weeks",
    reason: "Post-rainy season pothole formation pattern detected",
    confidence: 72,
    risk: "moderate",
    summary: "Road surface deterioration follows a predictable pattern after heavy rains. Gatenga's roads, last resurfaced in 2022, are showing accelerated wear consistent with pre-pothole conditions.",
    factors: [
      { name: "Road Surface Age", contribution: 35, icon: Wrench, detail: "Last resurfaced: 2022, expected life: 4 years" },
      { name: "Recent Rainfall", contribution: 30, icon: CloudRain, detail: "March rainfall weakened road substrate" },
      { name: "Traffic Volume", contribution: 20, icon: TrendingUp, detail: "Heavy vehicle traffic up 15% on KK 15 Rd" },
      { name: "Historical Pattern", contribution: 15, icon: Calendar, detail: "Post-rain complaints spike within 2-3 weeks" },
    ],
    trendData: [
      { month: "Oct", actual: 95 },
      { month: "Nov", actual: 88 },
      { month: "Dec", actual: 102 },
      { month: "Jan", actual: 110 },
      { month: "Feb", actual: 125 },
      { month: "Mar", actual: 140 },
      { month: "Apr", predicted: 175 },
      { month: "May", predicted: 160 },
    ],
  },
];

const riskBorder = {
  critical: "border-l-danger",
  high: "border-l-warning",
  moderate: "border-l-insight",
};

const riskColors = {
  critical: "hsl(0, 72%, 51%)",
  high: "hsl(38, 85%, 55%)",
  moderate: "hsl(210, 60%, 50%)",
};

const factorColors = [
  "hsl(210, 60%, 50%)",
  "hsl(220, 45%, 30%)",
  "hsl(38, 85%, 55%)",
  "hsl(160, 50%, 40%)",
];

const PredictiveSection = () => {
  const [selected, setSelected] = useState<Prediction | null>(null);

  return (
    <>
      <div className="rounded-xl bg-card border border-border/60 p-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="text-lg font-serif text-foreground">Predictive Alerts</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">Areas likely to see complaint surges</p>
        <div className="space-y-4">
          {predictions.map((p) => (
            <div
              key={p.area}
              onClick={() => setSelected(p)}
              className={`border-l-[3px] ${riskBorder[p.risk]} rounded-r-lg bg-muted/30 p-4 cursor-pointer hover:bg-muted/50 transition-colors`}
            >
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

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4" style={{ color: riskColors[selected.risk] }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${riskColors[selected.risk]}15`,
                      color: riskColors[selected.risk],
                    }}
                  >
                    {selected.risk} risk
                  </span>
                  <span className="text-sm font-bold text-foreground ml-auto">{selected.confidence}% confidence</span>
                </div>
                <DialogTitle className="font-serif text-xl">{selected.area}</DialogTitle>
                <DialogDescription>{selected.prediction}</DialogDescription>
              </DialogHeader>

              <div className="p-3 rounded-lg bg-muted/30 border border-border/60 text-sm text-foreground/80 leading-relaxed">
                {selected.summary}
              </div>

              {/* Trend Chart */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Complaint Trend & Forecast</h4>
                <div className="h-48 bg-muted/20 rounded-lg p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={selected.trendData} margin={{ top: 5, right: 10, bottom: 5, left: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0, 0%, 100%)",
                          border: "1px solid hsl(220, 15%, 90%)",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }}
                      />
                      <Line type="monotone" dataKey="actual" stroke="hsl(210, 60%, 50%)" strokeWidth={2} dot={{ r: 3 }} name="Actual" />
                      <Line type="monotone" dataKey="predicted" stroke={riskColors[selected.risk]} strokeWidth={2} strokeDasharray="6 3" dot={{ r: 3 }} name="Predicted" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Contributing Factors */}
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">Contributing Factors</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={selected.factors} layout="vertical" margin={{ top: 0, right: 10, bottom: 0, left: 0 }}>
                      <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(220, 10%, 50%)" }} axisLine={false} tickLine={false} domain={[0, 50]} tickFormatter={(v) => `${v}%`} />
                      <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: "hsl(220, 30%, 12%)" }} axisLine={false} tickLine={false} width={120} />
                      <Tooltip
                        contentStyle={{
                          background: "hsl(0, 0%, 100%)",
                          border: "1px solid hsl(220, 15%, 90%)",
                          borderRadius: "8px",
                          fontSize: "13px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Contribution"]}
                      />
                      <Bar dataKey="contribution" radius={[0, 4, 4, 0]} barSize={14}>
                        {selected.factors.map((_, i) => (
                          <Cell key={i} fill={factorColors[i]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-2 mt-4">
                  {selected.factors.map((f, i) => (
                    <div key={f.name} className="flex items-start gap-3 p-2.5 rounded-lg bg-muted/20">
                      <f.icon className="h-4 w-4 mt-0.5 shrink-0" style={{ color: factorColors[i] }} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{f.name} ({f.contribution}%)</p>
                        <p className="text-xs text-muted-foreground">{f.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PredictiveSection;
