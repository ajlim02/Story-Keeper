import { Car, TrendingUp, Trophy, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsSummaryProps {
  totalModels: number;
  avgGrowth: number;
  topGainer: string;
  updatedAt: string;
  isLoading?: boolean;
}

interface StatCardProps {
  icon: typeof Car;
  label: string;
  value: string | number;
  isLoading?: boolean;
}

function StatCard({ icon: Icon, label, value, isLoading }: StatCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          {isLoading ? (
            <Skeleton className="mt-1 h-5 w-20" />
          ) : (
            <p className="truncate text-base font-bold" data-testid={`text-stat-${label.replace(/\s+/g, '-')}`}>
              {value}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}

export function StatsSummary({
  totalModels,
  avgGrowth,
  topGainer,
  updatedAt,
  isLoading,
}: StatsSummaryProps) {
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <StatCard
        icon={Car}
        label="분석 모델"
        value={`${totalModels}개`}
        isLoading={isLoading}
      />
      <StatCard
        icon={TrendingUp}
        label="평균 증가율"
        value={`${avgGrowth > 0 ? "+" : ""}${avgGrowth.toFixed(1)}%`}
        isLoading={isLoading}
      />
      <StatCard
        icon={Trophy}
        label="최대 상승"
        value={topGainer || "-"}
        isLoading={isLoading}
      />
      <StatCard
        icon={Calendar}
        label="데이터 기준"
        value={formatDate(updatedAt)}
        isLoading={isLoading}
      />
    </div>
  );
}

export function StatsSummarySkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="mt-2 h-5 w-20" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
