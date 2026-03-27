import { Shield, Bell, Search } from "lucide-react";
import ExecutiveOverview from "@/components/dashboard/ExecutiveOverview";
import ComplaintTrends from "@/components/dashboard/ComplaintTrends";
import GeographicHotspots from "@/components/dashboard/GeographicHotspots";
import PredictiveSection from "@/components/dashboard/PredictiveSection";
import InsightsFeed from "@/components/dashboard/InsightsFeed";
import RootCauses from "@/components/dashboard/RootCauses";
import InterventionImpact from "@/components/dashboard/InterventionImpact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/60 bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Shield className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-serif text-foreground leading-tight">Decision Intelligence</h1>
              <p className="text-[11px] text-muted-foreground tracking-wide">Citizen Complaint Analytics Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors">
              <Search className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="relative h-9 w-9 rounded-lg bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-danger border-2 border-card" />
            </button>
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <ExecutiveOverview />

        {/* Intelligence Feed - Full Width */}
        <InsightsFeed />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ComplaintTrends />
          <GeographicHotspots />
        </div>

        {/* Predictive + Root Causes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PredictiveSection />
          <RootCauses />
        </div>

        {/* Intervention Impact */}
        <InterventionImpact />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Last updated: March 27, 2026 · 09:42 AM</p>
          <p className="text-xs text-muted-foreground">Data sources: Municipal CRM, Weather API, Infrastructure DB</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
