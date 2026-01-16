import { ArrowUpRight, ArrowDownRight, Minus, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RadarModel } from "@shared/schema";
import { cn } from "@/lib/utils";

interface ModelCardProps {
  model: RadarModel;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("ko-KR").format(num);
}

function formatPercent(num: number): string {
  const sign = num > 0 ? "+" : "";
  return `${sign}${num.toFixed(1)}%`;
}

function getRankBadgeStyle(rank: number): string {
  if (rank === 1) return "bg-amber-500 text-white border-amber-400";
  if (rank === 2) return "bg-slate-400 text-white border-slate-300";
  if (rank === 3) return "bg-amber-700 text-white border-amber-600";
  return "bg-muted text-muted-foreground";
}

export function ModelCard({ model }: ModelCardProps) {
  const isPositive = model.momAbs > 0;
  const isNegative = model.momAbs < 0;
  const isNew = model.prevSales === 0 && model.sales > 0;

  return (
    <Card
      className="group relative overflow-visible p-6"
      data-testid={`card-model-${model.rank}`}
    >
      <div
        className={cn(
          "absolute -left-3 -top-3 flex h-8 w-8 items-center justify-center rounded-full border text-sm font-bold shadow-sm",
          getRankBadgeStyle(model.rank)
        )}
        data-testid={`badge-rank-${model.rank}`}
      >
        {model.rank}
      </div>

      <div className="space-y-4">
        <div className="pt-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3
                className="truncate text-lg font-bold"
                data-testid={`text-model-name-${model.rank}`}
              >
                {model.modelName}
              </h3>
              <p className="text-sm text-muted-foreground">{model.manufacturer}</p>
            </div>
            {isNew && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                NEW
              </Badge>
            )}
          </div>
        </div>

        <div>
          <p className="text-2xl font-bold" data-testid={`text-sales-${model.rank}`}>
            {formatNumber(model.sales)}
            <span className="ml-1 text-sm font-normal text-muted-foreground">대</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className={cn(
              "gap-1",
              isPositive && "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
              isNegative && "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
            )}
            data-testid={`badge-change-abs-${model.rank}`}
          >
            {isPositive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : isNegative ? (
              <ArrowDownRight className="h-3 w-3" />
            ) : (
              <Minus className="h-3 w-3" />
            )}
            {model.momAbs > 0 ? "+" : ""}
            {formatNumber(model.momAbs)}대
          </Badge>

          <Badge
            variant="outline"
            className={cn(
              "gap-1",
              isPositive && "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
              isNegative && "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
            )}
            data-testid={`badge-change-pct-${model.rank}`}
          >
            {formatPercent(model.momPct)}
          </Badge>

          {model.rankChange !== 0 && (
            <Badge
              variant="outline"
              className={cn(
                "gap-1",
                model.rankChange > 0 && "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400",
                model.rankChange < 0 && "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-400"
              )}
              data-testid={`badge-rank-change-${model.rank}`}
            >
              랭크 {model.rankChange > 0 ? "↑" : "↓"}
              {Math.abs(model.rankChange)}
            </Badge>
          )}
        </div>

        <div className="pt-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 px-2 text-xs text-muted-foreground"
            asChild
            data-testid={`link-danawa-${model.rank}`}
          >
            <a href={model.danawaUrl} target="_blank" rel="noopener noreferrer">
              다나와 원문 보기
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}

export function ModelCardSkeleton() {
  return (
    <Card className="relative p-6">
      <div className="absolute -left-3 -top-3 h-8 w-8 animate-pulse rounded-full bg-muted" />
      <div className="space-y-4 pt-1">
        <div>
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="mt-2 h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-8 w-24 animate-pulse rounded bg-muted" />
        <div className="flex gap-2">
          <div className="h-6 w-20 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-8 w-28 animate-pulse rounded bg-muted" />
      </div>
    </Card>
  );
}
