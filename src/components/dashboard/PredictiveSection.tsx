import { useState } from "react";
import { AlertTriangle, ArrowRight, BookOpen, Clock, XCircle, CheckSquare, ExternalLink, Database, Newspaper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface PastIncident {
  date: string;
  location: string;
  description: string;
  complaintsCount: number;
}

interface Reference {
  title: string;
  source: "Mbaza" | "New Times" | "KigaliToday" | "Igihe" | "NISR";
  url: string;
}

interface Alert {
  topic: string;
  headline: string;
  trigger: string;
  triggerType: "news" | "complaint-pattern" | "seasonal";
  risk: "critical" | "high" | "moderate";
  currentSignal: string;
  pastIncidents: PastIncident[];
  whatWentWrong: string[];
  recommendations: string[];
  references: Reference[];
}

const alerts: Alert[] = [
  {
    topic: "Citizen Relocation",
    headline: "Road expansion project may trigger relocation complaints without early preparation",
    trigger: "News: road project requiring household relocations",
    triggerType: "news",
    risk: "high",
    currentSignal: "New Times and KigaliToday are reporting a new road expansion project in Kigali that will require relocating an estimated 400–600 households. Construction is scheduled to begin in Q3 2026.",
    pastIncidents: [
      {
        date: "Jan–Sep 2023",
        location: "Kicukiro, Gatenga",
        description: "Households relocated for the Kigali–Huye expressway expansion filed 214 complaints over 9 months. Citizens reported waiting over 6 months for compensation after being required to vacate their properties.",
        complaintsCount: 214,
      },
      {
        date: "Mar–Nov 2022",
        location: "Nyarugenge, Nyakabanda",
        description: "Urban upgrade project required relocation of 180 households. 143 complaints were filed regarding delays in property valuation and unclear communication from district officials on compensation timelines.",
        complaintsCount: 143,
      },
    ],
    whatWentWrong: [
      "No relocation budget was pre-allocated — approval processes started only after relocations began, creating months of delay",
      "Property evaluation teams were understaffed; too few evaluators to handle the volume, causing backlogs",
      "No dedicated communication channel was set up — citizens had to individually follow up at sector offices with no guaranteed response",
    ],
    recommendations: [
      "In the Kicukiro expressway case, the district pre-allocated a dedicated compensation budget within the project plan before relocations began — this cut processing time from 8 months to 6 weeks in similar cases that followed.",
      "A property evaluation team of 5 officers was deployed 2 months before relocations in the Remera upgrade project, completing all assessments before any household had to move and eliminating valuation-delay complaints.",
      "Nyakabanda district assigned a single named contact officer for affected residents after complaints peaked — unresolved follow-up complaints dropped 60% compared to the previous project.",
    ],
    references: [
      { title: "Mbaza complaint history — 214 relocation complaints, Gatenga sector (Jan–Sep 2023)", source: "Mbaza", url: "https://mbaza.gov.rw/complaints?category=relocation&location=gatenga&period=2023" },
      { title: "New road expansion project to affect hundreds of Kigali households", source: "New Times", url: "https://newtimes.co.rw/article/kigali-road-expansion-relocations-2026" },
      { title: "Abaturage bazimvurwa inzu bitewe na projet yo gukanura imihanda i Kigali", source: "KigaliToday", url: "https://kigalitoday.com/relocation-road-project-kigali-2026" },
    ],
  },
  {
    topic: "Urban Renewal",
    headline: "Informal trader displacement could repeat past complaint surges without advance planning",
    trigger: "News: urban renewal zone expansion in Kigali",
    triggerType: "news",
    risk: "moderate",
    currentSignal: "Igihe and New Times are reporting that the City of Kigali plans to expand urban renewal zones in several districts, which is expected to affect informal market areas currently housing thousands of traders.",
    pastIncidents: [
      {
        date: "Jun–Dec 2022",
        location: "Nyarugenge, Rwezamenyo",
        description: "Clearance of an informal market for an urban renewal project displaced 320 traders. 189 complaints were filed about sudden evictions without notice, no alternative trading spaces, and unpaid compensation pledges.",
        complaintsCount: 189,
      },
      {
        date: "Feb–Aug 2021",
        location: "Kicukiro, Gikondo",
        description: "Demolition of informal structures near the industrial zone generated 97 complaints from displaced traders who reported receiving less than 2 weeks notice and no guidance on relocation options.",
        complaintsCount: 97,
      },
    ],
    whatWentWrong: [
      "Traders were given insufficient notice — in some cases less than 2 weeks — with no explanation of the process or their rights",
      "No alternative trading sites were identified or prepared before market clearance began",
      "Inter-agency coordination between district offices, Rwanda Housing Authority, and MINICOM only started after complaints escalated",
    ],
    recommendations: [
      "In Kimisagara, trader associations were engaged 8 weeks before clearance through a structured dialogue facilitated by the district — complaint volumes were 40% lower than in the Rwezamenyo clearance where no prior engagement took place.",
      "After Gikondo verbal-pledge disputes generated 97 complaints, subsequent projects introduced written compensation agreements with specific payment dates — compensation-dispute complaints dropped to near zero.",
      "A dedicated inter-agency task team (district + RHA + MINICOM) formed at the planning stage of the Kacyiru renewal project resolved all trader relocation complaints within 2 weeks of filing, versus a months-long backlog in earlier cases.",
    ],
    references: [
      { title: "Mbaza complaint history — 189 trader displacement complaints, Rwezamenyo (Jun–Dec 2022)", source: "Mbaza", url: "https://mbaza.gov.rw/complaints?category=displacement&location=rwezamenyo&period=2022" },
      { title: "City of Kigali to expand urban renewal zones — informal traders to be affected", source: "Igihe", url: "https://igihe.com/amakuru/kigali-urban-renewal-abatusti-2026" },
      { title: "Kigali urban master plan expansion: what it means for informal markets", source: "New Times", url: "https://newtimes.co.rw/article/kigali-masterplan-informal-markets-2026" },
    ],
  },
];

const riskBorder = {
  critical: "border-l-danger",
  high: "border-l-warning",
  moderate: "border-l-insight",
};

const riskBadge = {
  critical: { bg: "bg-danger/10", text: "text-danger" },
  high: { bg: "bg-warning/10", text: "text-warning-foreground" },
  moderate: { bg: "bg-insight/10", text: "text-insight" },
};

const triggerBadge = {
  news: { label: "News Signal", icon: Newspaper, bg: "bg-primary/10", text: "text-primary" },
  "complaint-pattern": { label: "Complaint Pattern", icon: BookOpen, bg: "bg-warning/10", text: "text-warning-foreground" },
  seasonal: { label: "Seasonal Pattern", icon: Clock, bg: "bg-muted", text: "text-muted-foreground" },
};

const sourceColors: Record<string, { bg: string; text: string }> = {
  Mbaza: { bg: "bg-primary/10", text: "text-primary" },
  Igihe: { bg: "bg-orange-100", text: "text-orange-700" },
  "New Times": { bg: "bg-green-100", text: "text-green-700" },
  KigaliToday: { bg: "bg-teal-100", text: "text-teal-700" },
  NISR: { bg: "bg-purple-100", text: "text-purple-700" },
};

const PredictiveSection = () => {
  const [selected, setSelected] = useState<Alert | null>(null);

  return (
    <>
      <div className="rounded-xl bg-card border border-border/60 p-6">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="h-4 w-4 text-warning" />
          <h3 className="text-lg font-serif text-foreground">Preparedness Alerts</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-5">Lessons from past cases to guide proactive decision-making</p>
        <div className="space-y-4">
          {alerts.map((a) => {
            const tb = triggerBadge[a.triggerType];
            const TriggerIcon = tb.icon;
            return (
              <div
                key={a.topic}
                onClick={() => setSelected(a)}
                className={`border-l-[3px] ${riskBorder[a.risk]} rounded-r-lg bg-muted/30 p-4 cursor-pointer hover:bg-muted/50 transition-colors`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground">{a.topic}</p>
                    <p className="text-sm text-foreground/80 mt-1 leading-snug">{a.headline}</p>
                    <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      {a.trigger}
                    </p>
                  </div>
                  <div className="shrink-0">
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full ${tb.bg} ${tb.text}`}>
                      <TriggerIcon className="h-3 w-3" />
                      {tb.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
          {selected && (() => {
            const tb = triggerBadge[selected.triggerType];
            const TriggerIcon = tb.icon;
            const rb = riskBadge[selected.risk];
            return (
              <>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${rb.bg} ${rb.text}`}>
                      {selected.risk} risk
                    </span>
                    <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${tb.bg} ${tb.text}`}>
                      <TriggerIcon className="h-3 w-3" />
                      {tb.label}
                    </span>
                  </div>
                  <DialogTitle className="font-serif text-xl">{selected.topic}</DialogTitle>
                  <DialogDescription className="leading-relaxed">{selected.headline}</DialogDescription>
                </DialogHeader>

                {/* Current signal */}
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-primary mb-1">What triggered this alert</p>
                  <p className="text-sm text-foreground/80 leading-relaxed">{selected.currentSignal}</p>
                </div>

                {/* Past incidents */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-semibold text-foreground">Past Incidents ({selected.pastIncidents.length})</h4>
                  </div>
                  <div className="space-y-3">
                    {selected.pastIncidents.map((inc, i) => (
                      <div key={i} className="p-3 rounded-lg border border-border/60 bg-muted/20">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-semibold text-foreground">{inc.location}</span>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-[10px]">{inc.complaintsCount} complaints</Badge>
                            <span className="text-[11px] text-muted-foreground">{inc.date}</span>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 leading-relaxed">{inc.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What went wrong */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <XCircle className="h-4 w-4 text-danger" />
                    <h4 className="text-sm font-semibold text-foreground">What Went Wrong</h4>
                  </div>
                  <div className="space-y-2">
                    {selected.whatWentWrong.map((item, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-danger/5 border border-danger/10">
                        <XCircle className="h-3.5 w-3.5 text-danger mt-0.5 shrink-0" />
                        <p className="text-xs text-foreground/80 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckSquare className="h-4 w-4 text-positive" />
                    <h4 className="text-sm font-semibold text-foreground">What Resolved It Before</h4>
                  </div>
                  <div className="space-y-2">
                    {selected.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-positive/5 border border-positive/10">
                        <CheckSquare className="h-3.5 w-3.5 text-positive mt-0.5 shrink-0" />
                        <p className="text-xs text-foreground/80 leading-relaxed">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sources & References */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="h-4 w-4 text-muted-foreground" />
                    <h4 className="text-sm font-semibold text-foreground">Sources & References</h4>
                  </div>
                  <div className="space-y-2">
                    {selected.references.map((ref, i) => {
                      const colors = sourceColors[ref.source] || { bg: "bg-muted/30", text: "text-foreground" };
                      return (
                        <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-border/60 bg-muted/10">
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${colors.bg} ${colors.text}`}>
                            {ref.source}
                          </span>
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-foreground/80 hover:text-primary transition-colors flex items-start gap-1 leading-relaxed"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {ref.title}
                            <ExternalLink className="h-3 w-3 shrink-0 mt-0.5 opacity-50" />
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PredictiveSection;
