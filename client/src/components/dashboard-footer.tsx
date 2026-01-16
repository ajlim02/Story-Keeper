import { ExternalLink } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="border-t bg-muted/30" data-testid="footer">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        <div className="flex flex-col items-center gap-4 text-center text-sm text-muted-foreground">
          <p data-testid="text-footer-attribution">
            KAMA/KAIDA 공식 자료 기반{" "}
            <a
              href="https://auto.danawa.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
              data-testid="link-danawa-main"
            >
              다나와 자동차
              <ExternalLink className="h-3 w-3" />
            </a>
            {" "}데이터를 활용합니다
          </p>
          <p className="text-xs">
            국산: 매월 1일 업데이트 (트림 상세 25일) · 수입: 매월 15일경 업데이트
          </p>
          <p className="text-xs opacity-70">
            본 서비스는 파생 지표 분석 목적이며, 원본 데이터는 다나와 원문 링크를 통해 확인하세요
          </p>
        </div>
      </div>
    </footer>
  );
}
