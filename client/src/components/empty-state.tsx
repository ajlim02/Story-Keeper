import { SearchX, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  description?: string;
  onResetFilters?: () => void;
}

export function EmptyState({
  title = "조건에 맞는 모델이 없습니다",
  description = "필터 조건을 조정해 보세요",
  onResetFilters,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <SearchX className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold" data-testid="text-empty-title">
        {title}
      </h3>
      <p className="mb-6 max-w-sm text-sm text-muted-foreground" data-testid="text-empty-description">
        {description}
      </p>
      {onResetFilters && (
        <Button variant="outline" onClick={onResetFilters} className="gap-2" data-testid="button-reset-filters">
          <SlidersHorizontal className="h-4 w-4" />
          필터 초기화
        </Button>
      )}
    </div>
  );
}
