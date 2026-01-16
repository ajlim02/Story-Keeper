import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import type { FilterOptions } from "@shared/schema";

interface FilterSheetProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  maxSales: number;
}

export function FilterSheet({ filters, onFiltersChange, maxSales }: FilterSheetProps) {
  const handleMinSalesChange = (value: number[]) => {
    onFiltersChange({ ...filters, minSales: value[0] });
  };

  const handleIncludeNewEntriesChange = (checked: boolean) => {
    onFiltersChange({ ...filters, includeNewEntries: checked });
  };

  const handleReset = () => {
    onFiltersChange({ minSales: 0, includeNewEntries: true });
  };

  const hasActiveFilters = filters.minSales > 0 || !filters.includeNewEntries;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="default"
          className="gap-2"
          data-testid="button-filter-open"
        >
          <SlidersHorizontal className="h-4 w-4" />
          필터
          {hasActiveFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {(filters.minSales > 0 ? 1 : 0) + (!filters.includeNewEntries ? 1 : 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>필터 설정</SheetTitle>
          <SheetDescription>
            급상승 모델 목록을 필터링합니다
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="min-sales" className="text-sm font-medium">
                최소 판매량
              </Label>
              <span className="text-sm font-bold text-primary" data-testid="text-min-sales-value">
                {filters.minSales.toLocaleString()}대 이상
              </span>
            </div>
            <Slider
              id="min-sales"
              value={[filters.minSales]}
              onValueChange={handleMinSalesChange}
              max={Math.min(maxSales, 5000)}
              step={100}
              className="w-full"
              data-testid="slider-min-sales"
            />
            <p className="text-xs text-muted-foreground">
              판매량이 적은 모델을 제외하여 노이즈를 줄입니다
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="include-new" className="text-sm font-medium">
                  신규 진입 모델 포함
                </Label>
                <p className="text-xs text-muted-foreground">
                  전월 판매 실적이 없는 모델을 포함합니다
                </p>
              </div>
              <Switch
                id="include-new"
                checked={filters.includeNewEntries}
                onCheckedChange={handleIncludeNewEntriesChange}
                data-testid="switch-include-new"
              />
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full gap-2"
            data-testid="button-filter-reset"
          >
            <RotateCcw className="h-4 w-4" />
            필터 초기화
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
