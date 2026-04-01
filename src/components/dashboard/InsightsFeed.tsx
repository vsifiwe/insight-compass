import { useState } from "react";
import { Lightbulb, TrendingUp, Construction, AlertTriangle, Calendar, User, MapPin, CheckCircle2, ExternalLink, Database } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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

interface ResolvedCase {
  id: string;
  district: string;
  date: string;
  issue: string;
  resolution: string;
  outcome: string;
  resolvedBy: string;
}

interface Reference {
  title: string;
  source: "Mbaza" | "Igihe" | "New Times" | "KigaliToday" | "NISR";
  url: string;
}

interface Insight {
  icon: typeof TrendingUp;
  type: string;
  title: string;
  summary: string;
  body: string;
  action: string;
  time: string;
  categoryTags: string[];
  institutionTags: string[];
  methodology: string;
  complaints: Complaint[];
  resolvedCases: ResolvedCase[];
  references: Reference[];
}

const sourceColors: Record<string, { bg: string; text: string }> = {
  Mbaza: { bg: "bg-primary/10", text: "text-primary" },
  Igihe: { bg: "bg-orange-100", text: "text-orange-700" },
  "New Times": { bg: "bg-green-100", text: "text-green-700" },
  KigaliToday: { bg: "bg-teal-100", text: "text-teal-700" },
  NISR: { bg: "bg-purple-100", text: "text-purple-700" },
};

const insights: Insight[] = [
  {
    icon: TrendingUp,
    type: "Trend",
    title: "Surge in Mutuelle de Santé complaints linked to awareness gap",
    summary: "329 complaints about price increases — most citizens are unaware of the income-based category tiers, suggesting an informational rather than a policy issue.",
    body: "Citizens are complaining about the recent increase in Mutuelle de Santé subscription prices. Analysis of complaint text reveals that a significant portion of complainants are unaware of the income-based categories and the expanded benefits accompanying the changes, suggesting the issue is informational rather than policy-driven.",
    action: "A targeted awareness campaign and educational drive explaining the tiered pricing structure and benefits would likely reduce complaint volume significantly.",
    time: "3 hours ago",
    categoryTags: ["Health Insurance", "Citizen Awareness"],
    institutionTags: ["MINALOC", "RSSB"],
    methodology: "329 complaints tagged under 'Mutuelle de Santé' were reviewed over the past 6 weeks. In 71% of them, citizens described the price as 'unfair' or 'too expensive' without mentioning the tiered category system — pointing to an awareness gap rather than a policy problem. NISR income data shows many complainants qualify for reduced-rate categories they don't know about. News coverage was largely in English, which may have limited reach in rural areas.",
    complaints: [
      { id: "CMP-5102", citizen: "A. Mukamana", district: "Nyarugenge, Gitega", date: "Mar 28, 2026", summary: "Mutuelle de Santé price has tripled. I cannot afford to renew my family's coverage this year." },
      { id: "CMP-5071", citizen: "C. Uwimana", district: "Huye, Tumba", date: "Mar 26, 2026", summary: "The health insurance is now too expensive. We are farmers and cannot pay the same as people in the city." },
      { id: "CMP-5048", citizen: "P. Niyonzima", district: "Musanze, Muhoza", date: "Mar 25, 2026", summary: "I don't understand the new categories. Nobody at the sector office could explain them clearly." },
    ],
    resolvedCases: [
      { id: "RSV-1204", district: "Kigali City-Wide", date: "Jan 2025", issue: "Spike in Ubudehe category complaints after reclassification exercise", resolution: "MINALOC and sector offices ran community sensitisation meetings in all 30 districts; translated materials in Kinyarwanda distributed via local leaders", outcome: "Complaint volume dropped 64% within 8 weeks; citizen understanding scores improved in follow-up survey", resolvedBy: "MINALOC + Local Administrative Entities Development Agency" },
    ],
    references: [
      { title: "Mbaza complaint database — 329 complaints filtered by 'Mutuelle de Santé' keyword (Jan–Mar 2026)", source: "Mbaza", url: "https://mbaza.gov.rw/complaints?tag=mutuelle&period=90d" },
      { title: "RSSB explains new Mutuelle de Santé contribution categories and benefits", source: "New Times", url: "https://newtimes.co.rw/article/mutuelle-sante-categories-2026" },
      { title: "NISR Household Living Conditions Survey 2024 — income distribution by district", source: "NISR", url: "https://statistics.gov.rw/publication/eicv-2024" },
    ],
  },
  {
    icon: Construction,
    type: "Root Cause",
    title: "Church closures stalled by inspector staffing shortage",
    summary: "147 complaints from religious institutions that have completed required upgrades — the bottleneck is a shortage of inspectors available for physical site visits.",
    body: "Citizens whose places of worship have completed government-mandated structural and safety upgrades are filing complaints because no inspectors have visited to verify compliance and authorise reopening. The root cause is not citizen non-compliance — it is a shortage of staff available for physical on-site inspections.",
    action: "Increasing the number of available inspection officers or introducing a district-level scheduling system would reduce the backlog and the resulting complaints.",
    time: "1 day ago",
    categoryTags: ["Church Closures", "Inspections", "Staff Shortage"],
    institutionTags: ["RHA", "Local Government"],
    methodology: "147 complaints from religious institution representatives were reviewed, all confirming that required upgrades had been completed. Inspection scheduling records show an average wait of 74 days between submitting a completion report and receiving an inspection date — well above the 14-day standard. Rwanda Housing Authority staff data confirms only 3 inspectors are assigned across all 30 districts for this programme. The government has already extended its original inspection timeline once, signalling awareness of the capacity gap.",
    complaints: [
      { id: "CMP-4944", citizen: "Pastor J. Nsengiyumva", district: "Gasabo, Kimironko", date: "Mar 20, 2026", summary: "We completed all required renovations in December but have received no inspection date after 4 months of waiting." },
      { id: "CMP-4921", citizen: "Rev. M. Uwitonze", district: "Kicukiro, Niboye", date: "Mar 18, 2026", summary: "The congregation has spent over 3 million francs on upgrades. We are ready but cannot reopen without the inspection." },
      { id: "CMP-4898", citizen: "Bishop A. Bizimana", district: "Nyarugenge, Nyamirambo", date: "Mar 16, 2026", summary: "We submitted our completion documents in January. Still no response or inspection scheduled. Our community is suffering." },
    ],
    resolvedCases: [
      { id: "RSV-1098", district: "Kigali City", date: "Jun 2025", issue: "Backlog of school safety inspection certificates delaying reopening after holiday", resolution: "Ministry of Education deployed 8 temporary inspectors for a 4-week blitz, clearing 94 pending inspections", outcome: "All backlogged schools cleared within 5 weeks; complaint volume dropped to zero in that category", resolvedBy: "Ministry of Education + REB" },
    ],
    references: [
      { title: "Mbaza complaint database — 147 complaints from religious institutions (Oct 2025–Mar 2026)", source: "Mbaza", url: "https://mbaza.gov.rw/complaints?category=church-inspection&period=180d" },
      { title: "Churches waiting months for government inspection visits after upgrades", source: "KigaliToday", url: "https://kigalitoday.com/church-inspection-backlog-2026" },
      { title: "Government extends deadline for places of worship compliance inspection programme", source: "New Times", url: "https://newtimes.co.rw/article/church-compliance-extension-2026" },
    ],
  },
  {
    icon: AlertTriangle,
    type: "Anomaly",
    title: "Good Governance Officers marking complaints resolved without documentation",
    summary: "22% of resolved complaints have no description, no attachment, and no citizen notification — creating an accountability gap with no verifiable record of action taken.",
    body: "A pattern has been detected where complaints are marked as 'Resolved' in the Mbaza system but lack supporting documentation — no attachments, no description of the action taken, and no communication logged to the citizen. This creates a critical accountability gap: there is no verifiable record of what was done, by whom, or when.",
    action: "Enforce a mandatory resolution documentation policy: all resolved complaints must include a written description of the action taken, at least one supporting attachment, and a logged citizen notification before the status can be set to Resolved.",
    time: "6 hours ago",
    categoryTags: ["Accountability", "Resolution Quality", "Compliance"],
    institutionTags: ["Good Governance Officers", "Mbaza"],
    methodology: "An audit of all 1,847 complaints marked 'Resolved' between January and March 2026 checked for three documentation fields: a written description, at least one attachment, and a citizen notification. 412 complaints (22%) had all three fields empty — status was changed with no supporting evidence. A further 38% had only partial documentation. The pattern is concentrated in 7 specific district offices, suggesting it is a localised practice rather than a system-wide gap.",
    complaints: [
      { id: "CMP-4833", citizen: "D. Nkurunziza", district: "Gasabo, Kacyiru", date: "Mar 22, 2026", summary: "My complaint was marked resolved but I never received any communication. The issue has not been fixed." },
      { id: "CMP-4809", citizen: "L. Ingabire", district: "Nyarugenge, Gitega", date: "Mar 21, 2026", summary: "The system says my complaint is resolved. Nobody contacted me. The road is still broken." },
      { id: "CMP-4784", citizen: "G. Uwase", district: "Kicukiro, Gatenga", date: "Mar 19, 2026", summary: "I was not informed about any action taken. I only found out it was closed when I logged in to check." },
    ],
    resolvedCases: [],
    references: [
      { title: "Mbaza internal audit — 412 resolved complaints with empty documentation fields (Jan–Mar 2026)", source: "Mbaza", url: "https://mbaza.gov.rw/admin/audit/resolution-quality?period=Q1-2026" },
      { title: "Ubuyobozi buzuzuye bugomba kugaragara mu mikorere y'abayobozi ba leta", source: "Igihe", url: "https://igihe.com/ubukungu/accountability-local-government-2026" },
      { title: "Complaint resolution quality standards — Mbaza platform guidelines (2025)", source: "Mbaza", url: "https://mbaza.gov.rw/docs/resolution-standards-2025" },
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
              <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{ins.summary}</p>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {ins.categoryTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5">
                    {tag}
                  </Badge>
                ))}
                {ins.institutionTags.map((tag) => (
                  <Badge key={tag} className="text-[10px] px-2 py-0 h-5 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                    {tag}
                  </Badge>
                ))}
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
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {selected.categoryTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0 h-5">
                      {tag}
                    </Badge>
                  ))}
                  {selected.institutionTags.map((tag) => (
                    <Badge key={tag} className="text-[10px] px-2 py-0 h-5 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </DialogHeader>

              {/* Recommendation */}
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 flex items-start gap-2">
                <selected.icon className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm font-medium text-foreground">{selected.action}</p>
              </div>

              {/* How the insight was generated */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <div className="p-4 rounded-lg border border-border/60 bg-muted/10">
                  <h4 className="text-sm font-semibold text-foreground mb-2">How this insight was generated</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{selected.methodology}</p>
                </div>
              </div>

              {/* Source Complaints */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <h4 className="text-sm font-semibold text-foreground mb-4">
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

              {/* Previously Resolved Similar Cases */}
              {selected.resolvedCases.length > 0 && (
                <div className="mt-8 pt-6 border-t border-border/40">
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle2 className="h-4 w-4 text-positive" />
                    <h4 className="text-sm font-semibold text-foreground">
                      Previously Resolved Similar Cases ({selected.resolvedCases.length})
                    </h4>
                  </div>
                  <div className="space-y-3">
                    {selected.resolvedCases.map((rc) => (
                      <div key={rc.id} className="p-3 rounded-lg border border-positive/20 bg-positive/5">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-mono font-semibold text-positive">{rc.id}</span>
                          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {rc.district}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {rc.date}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-foreground mb-1">{rc.issue}</p>
                        <div className="space-y-1.5 mt-2">
                          <div className="flex items-start gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 shrink-0 w-16">Action</span>
                            <p className="text-xs text-foreground/80 leading-relaxed">{rc.resolution}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 shrink-0 w-16">Result</span>
                            <p className="text-xs text-positive leading-relaxed font-medium">{rc.outcome}</p>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 shrink-0 w-16">Led by</span>
                            <p className="text-xs text-foreground/70 leading-relaxed">{rc.resolvedBy}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sources & References */}
              <div className="mt-8 pt-6 border-t border-border/40">
                <div className="flex items-center gap-2 mb-4">
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
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InsightsFeed;
