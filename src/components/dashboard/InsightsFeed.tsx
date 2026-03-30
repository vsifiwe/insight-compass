import { useState } from "react";
import { Lightbulb, TrendingUp, Droplets, Construction, Zap, MapPin, Calendar, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface Complaint {
  id: string;
  citizen: string;
  district: string;
  date: string;
  summary: string;
}

interface Insight {
  icon: typeof TrendingUp;
  type: string;
  title: string;
  body: string;
  action: string;
  time: string;
  complaints: Complaint[];
}

const insights: Insight[] = [
  {
    icon: TrendingUp,
    type: "Trend",
    title: "Drainage complaints up 32% in Westfield",
    body: "Complaints about waterlogging in District 7 have risen sharply since October. This correlates with 45% above-average rainfall and aging infrastructure (avg pipe age: 28 years).",
    action: "Recommend prioritizing drainage maintenance in Westfield before monsoon season.",
    time: "2 hours ago",
    complaints: [
      { id: "CMP-4821", citizen: "R. Sharma", district: "Westfield D7", date: "Mar 25, 2026", summary: "Severe waterlogging on Main Street after light rain, water entered ground-floor shops." },
      { id: "CMP-4798", citizen: "M. Patel", district: "Westfield D7", date: "Mar 24, 2026", summary: "Blocked storm drain near Park Avenue causing street flooding for 3 days." },
      { id: "CMP-4756", citizen: "S. Gupta", district: "Westfield D7", date: "Mar 22, 2026", summary: "Sewage overflow mixing with rainwater in residential Block C." },
      { id: "CMP-4730", citizen: "A. Khan", district: "Westfield D7", date: "Mar 21, 2026", summary: "Road completely submerged near school zone, children unable to commute safely." },
      { id: "CMP-4712", citizen: "P. Desai", district: "Westfield D7", date: "Mar 20, 2026", summary: "Repeated waterlogging at the same junction — third complaint this month." },
    ],
  },
  {
    icon: Droplets,
    type: "Root Cause",
    title: "Water supply issues linked to pipeline age",
    body: "65% of water complaints in Riverside originate from blocks with pipelines over 20 years old. Leak rate is 3x higher than city average.",
    action: "Consider phased pipeline replacement program in Blocks C and D.",
    time: "5 hours ago",
    complaints: [
      { id: "CMP-4690", citizen: "K. Reddy", district: "Riverside C", date: "Mar 24, 2026", summary: "No water supply for 18 hours, pipeline burst near sector entrance." },
      { id: "CMP-4665", citizen: "L. Fernandez", district: "Riverside D", date: "Mar 23, 2026", summary: "Low water pressure every morning, suspected leak in underground pipe." },
      { id: "CMP-4641", citizen: "V. Nair", district: "Riverside C", date: "Mar 22, 2026", summary: "Brown/rusty water coming from taps — possible corroded pipes." },
      { id: "CMP-4620", citizen: "D. Joshi", district: "Riverside D", date: "Mar 21, 2026", summary: "Water supply intermittent for the past week, no official notice given." },
    ],
  },
  {
    icon: Construction,
    type: "Impact",
    title: "Road repair intervention reduced complaints by 47%",
    body: "Following emergency pothole repairs in District 11 last month, road-related complaints dropped from 312 to 165. Citizen satisfaction scores improved by 23 points.",
    action: "Extend similar rapid-response approach to Districts 4 and 8.",
    time: "1 day ago",
    complaints: [
      { id: "CMP-4401", citizen: "H. Singh", district: "District 11", date: "Mar 15, 2026", summary: "Large pothole on NH bypass caused tire damage to my vehicle." },
      { id: "CMP-4389", citizen: "T. Iyer", district: "District 11", date: "Mar 14, 2026", summary: "Road surface completely broken near market area, dangerous for two-wheelers." },
      { id: "CMP-4350", citizen: "N. Verma", district: "District 11", date: "Mar 12, 2026", summary: "Potholes filled last week have reappeared — poor quality repair materials." },
    ],
  },
  {
    icon: Zap,
    type: "Anomaly",
    title: "Unusual spike in power outage reports — Central",
    body: "District 5 saw 89 power-related complaints in 48 hours, 4x the weekly average. No scheduled maintenance was planned. Pattern suggests grid overload.",
    action: "Escalate to power utility for immediate grid assessment.",
    time: "3 hours ago",
    complaints: [
      { id: "CMP-4810", citizen: "B. Mehta", district: "Central D5", date: "Mar 26, 2026", summary: "Power out for 6 hours, no update from electricity board. Third outage this week." },
      { id: "CMP-4805", citizen: "J. Das", district: "Central D5", date: "Mar 26, 2026", summary: "Transformer exploded near residential colony, entire block without power." },
      { id: "CMP-4799", citizen: "F. Ali", district: "Central D5", date: "Mar 25, 2026", summary: "Voltage fluctuation damaged my refrigerator and AC unit." },
      { id: "CMP-4788", citizen: "C. Rao", district: "Central D5", date: "Mar 25, 2026", summary: "Street lights not working for 4 days, safety concern for women and elderly." },
      { id: "CMP-4775", citizen: "E. Thomas", district: "Central D5", date: "Mar 25, 2026", summary: "Repeated power cuts during peak hours, seems like grid overload issue." },
      { id: "CMP-4760", citizen: "G. Kumar", district: "Central D5", date: "Mar 24, 2026", summary: "Unscheduled outage lasted 10 hours, no response from helpline." },
    ],
  },
];

const typeBadge: Record<string, string> = {
  Trend: "bg-primary/10 text-primary",
  "Root Cause": "bg-warning/10 text-warning-foreground",
  Impact: "bg-positive/10 text-positive",
  Anomaly: "bg-danger/10 text-danger",
};

const InsightsFeed = () => {
  const [selected, setSelected] = useState<Insight | null>(null);

  return (
    <>
      <div className="rounded-xl bg-card border border-border/60 p-6">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="h-4 w-4 text-accent" />
          <h3 className="text-lg font-serif text-foreground">Intelligence Feed</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">Key insights requiring attention</p>
        <div className="space-y-5">
          {insights.map((ins, i) => (
            <div
              key={i}
              onClick={() => setSelected(ins)}
              className="relative pl-5 border-l-2 border-border/60 hover:border-primary/40 transition-colors cursor-pointer hover:bg-muted/30 rounded-r-lg py-2 pr-3 -mr-3"
            >
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

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${typeBadge[selected.type]}`}>
                    {selected.type}
                  </span>
                </div>
                <DialogTitle className="font-serif text-xl">{selected.title}</DialogTitle>
                <DialogDescription className="leading-relaxed">{selected.body}</DialogDescription>
              </DialogHeader>

              <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-2">
                <selected.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-medium text-foreground">{selected.action}</p>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold text-foreground mb-3">
                  Source Complaints ({selected.complaints.length})
                </h4>
                <div className="space-y-3">
                  {selected.complaints.map((c) => (
                    <div key={c.id} className="p-3 rounded-lg border border-border/60 bg-muted/20">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-mono font-semibold text-primary">{c.id}</span>
                        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {c.date}
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed">{c.summary}</p>
                      <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {c.citizen}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {c.district}
                        </span>
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

export default InsightsFeed;
