import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardFooter } from "@/components/dashboard-footer";
import { ControlBar } from "@/components/control-bar";
import { StatsSummary, StatsSummarySkeleton } from "@/components/stats-summary";
import { ModelCard, ModelCardSkeleton } from "@/components/model-card";
import { EmptyState } from "@/components/empty-state";
import type { Nation, RadarData, FilterOptions, AvailableMonths } from "@shared/schema";

export default function Dashboard() {
  const [month, setMonth] = useState<string>("");
  const [nation, setNation] = useState<Nation>("domestic");
  const [filters, setFilters] = useState<FilterOptions>({
    minSales: 0,
    includeNewEntries: true,
  });

  const { data: availableMonths = [], isLoading: isLoadingMonths } = useQuery<AvailableMonths>({
    queryKey: ["/api/months"],
  });

  const effectiveMonth = month || availableMonths[0] || "";

  const { data: radarData, isLoading: isLoadingData } = useQuery<RadarData>({
    queryKey: ["/api/radar", effectiveMonth, nation],
    queryFn: async () => {
      const res = await fetch(`/api/radar?month=${effectiveMonth}&nation=${nation}`);
      if (!res.ok) throw new Error("Failed to fetch radar data");
      return res.json();
    },
    enabled: !!effectiveMonth,
  });

  const filteredModels = useMemo(() => {
    if (!radarData?.models) return [];

    return radarData.models.filter((model) => {
      if (model.sales < filters.minSales) return false;
      if (!filters.includeNewEntries && model.prevSales === 0) return false;
      return true;
    });
  }, [radarData?.models, filters]);

  const maxSales = useMemo(() => {
    if (!radarData?.models) return 1000;
    return Math.max(...radarData.models.map((m) => m.sales), 1000);
  }, [radarData?.models]);

  const handleResetFilters = () => {
    setFilters({ minSales: 0, includeNewEntries: true });
  };

  const isLoading = isLoadingMonths || isLoadingData;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <ControlBar
        month={effectiveMonth}
        onMonthChange={setMonth}
        nation={nation}
        onNationChange={setNation}
        filters={filters}
        onFiltersChange={setFilters}
        availableMonths={availableMonths}
        maxSales={maxSales}
        isLoading={isLoading}
      />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="space-y-8">
          <section>
            {isLoading ? (
              <StatsSummarySkeleton />
            ) : (
              <StatsSummary
                totalModels={radarData?.totalModels || 0}
                avgGrowth={radarData?.avgGrowth || 0}
                topGainer={radarData?.topGainer || "-"}
                updatedAt={radarData?.updatedAt || ""}
              />
            )}
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold" data-testid="text-section-title">
                급상승 모델 Top {filteredModels.length > 0 ? Math.min(filteredModels.length, 20) : 20}
              </h2>
              {!isLoading && filteredModels.length > 0 && (
                <p className="text-sm text-muted-foreground" data-testid="text-result-count">
                  총 {filteredModels.length}개 모델
                </p>
              )}
            </div>

            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 9 }).map((_, i) => (
                  <ModelCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredModels.length === 0 ? (
              <EmptyState onResetFilters={handleResetFilters} />
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredModels.slice(0, 20).map((model) => (
                  <ModelCard key={`${model.rank}-${model.modelName}`} model={model} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
