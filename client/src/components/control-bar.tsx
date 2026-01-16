import { Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FilterSheet } from "./filter-sheet";
import type { Nation, FilterOptions } from "@shared/schema";

interface ControlBarProps {
  month: string;
  onMonthChange: (month: string) => void;
  nation: Nation;
  onNationChange: (nation: Nation) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  availableMonths: string[];
  maxSales: number;
  isLoading?: boolean;
}

function formatMonthLabel(month: string): string {
  const [year, m] = month.split("-");
  return `${year}년 ${parseInt(m)}월`;
}

export function ControlBar({
  month,
  onMonthChange,
  nation,
  onNationChange,
  filters,
  onFiltersChange,
  availableMonths,
  maxSales,
  isLoading,
}: ControlBarProps) {
  return (
    <div className="sticky top-16 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-testid="control-bar">
      <div className="mx-auto max-w-7xl px-4 py-4 md:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Select value={month} onValueChange={onMonthChange} disabled={isLoading}>
              <SelectTrigger
                className="w-[180px] gap-2"
                data-testid="select-month"
              >
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="월 선택" />
              </SelectTrigger>
              <SelectContent>
                {availableMonths.map((m) => (
                  <SelectItem key={m} value={m} data-testid={`option-month-${m}`}>
                    {formatMonthLabel(m)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Tabs
              value={nation}
              onValueChange={(value) => onNationChange(value as Nation)}
            >
              <TabsList data-testid="tabs-nation">
                <TabsTrigger value="domestic" data-testid="tab-domestic">
                  국산
                </TabsTrigger>
                <TabsTrigger value="export" data-testid="tab-export">
                  수입
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <FilterSheet
            filters={filters}
            onFiltersChange={onFiltersChange}
            maxSales={maxSales}
          />
        </div>
      </div>
    </div>
  );
}
