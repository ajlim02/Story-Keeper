import type { Handler } from "@netlify/functions";

type Nation = "domestic" | "export";

interface RadarModel {
  rank: number;
  prevRank: number | null;
  modelName: string;
  manufacturer: string;
  sales: number;
  prevSales: number;
  momAbs: number;
  momPct: number;
  rankChange: number;
  score: number;
  danawaUrl: string;
}

function generateDanawaUrl(nation: Nation, month: string): string {
  return `https://auto.danawa.com/auto/?Month=${month}-00&Nation=${nation === "domestic" ? "domestic" : "export"}&Tab=Model&Work=record`;
}

function calculateScore(
  momAbs: number,
  momPct: number,
  rankChange: number,
  allModels: Array<{ momAbs: number; momPct: number; rankChange: number }>
): number {
  const mean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const stdDev = (arr: number[]) => {
    const m = mean(arr);
    return Math.sqrt(arr.reduce((a, b) => a + (b - m) ** 2, 0) / arr.length) || 1;
  };

  const z = (val: number, arr: number[]) => (val - mean(arr)) / stdDev(arr);

  const absArr = allModels.map((m) => m.momAbs);
  const pctArr = allModels.map((m) => Math.min(m.momPct, 500));
  const rankArr = allModels.map((m) => m.rankChange);

  return (
    0.55 * z(momAbs, absArr) +
    0.35 * z(Math.min(momPct, 500), pctArr) +
    0.1 * z(rankChange, rankArr)
  );
}

const domesticModels2025_12: Omit<RadarModel, "score" | "danawaUrl">[] = [
  { rank: 1, prevRank: 3, modelName: "그랜저", manufacturer: "현대", sales: 12543, prevSales: 9876, momAbs: 2667, momPct: 27.0, rankChange: 2 },
  { rank: 2, prevRank: 1, modelName: "쏘나타", manufacturer: "현대", sales: 11234, prevSales: 10234, momAbs: 1000, momPct: 9.8, rankChange: -1 },
  { rank: 3, prevRank: 8, modelName: "아반떼", manufacturer: "현대", sales: 10876, prevSales: 7654, momAbs: 3222, momPct: 42.1, rankChange: 5 },
  { rank: 4, prevRank: 2, modelName: "카니발", manufacturer: "기아", sales: 9876, prevSales: 9543, momAbs: 333, momPct: 3.5, rankChange: -2 },
  { rank: 5, prevRank: 12, modelName: "K5", manufacturer: "기아", sales: 8765, prevSales: 5432, momAbs: 3333, momPct: 61.4, rankChange: 7 },
  { rank: 6, prevRank: 4, modelName: "투싼", manufacturer: "현대", sales: 8234, prevSales: 8123, momAbs: 111, momPct: 1.4, rankChange: -2 },
  { rank: 7, prevRank: 5, modelName: "쏘렌토", manufacturer: "기아", sales: 7654, prevSales: 7987, momAbs: -333, momPct: -4.2, rankChange: -2 },
  { rank: 8, prevRank: 15, modelName: "레이", manufacturer: "기아", sales: 7123, prevSales: 4321, momAbs: 2802, momPct: 64.8, rankChange: 7 },
  { rank: 9, prevRank: 6, modelName: "싼타페", manufacturer: "현대", sales: 6987, prevSales: 7543, momAbs: -556, momPct: -7.4, rankChange: -3 },
  { rank: 10, prevRank: 7, modelName: "스포티지", manufacturer: "기아", sales: 6543, prevSales: 7234, momAbs: -691, momPct: -9.6, rankChange: -3 },
  { rank: 11, prevRank: 18, modelName: "캐스퍼", manufacturer: "현대", sales: 6234, prevSales: 3456, momAbs: 2778, momPct: 80.4, rankChange: 7 },
  { rank: 12, prevRank: 9, modelName: "코나", manufacturer: "현대", sales: 5876, prevSales: 6234, momAbs: -358, momPct: -5.7, rankChange: -3 },
  { rank: 13, prevRank: 10, modelName: "팰리세이드", manufacturer: "현대", sales: 5432, prevSales: 5987, momAbs: -555, momPct: -9.3, rankChange: -3 },
  { rank: 14, prevRank: 11, modelName: "셀토스", manufacturer: "기아", sales: 5123, prevSales: 5543, momAbs: -420, momPct: -7.6, rankChange: -3 },
  { rank: 15, prevRank: null, modelName: "EV9", manufacturer: "기아", sales: 4987, prevSales: 0, momAbs: 4987, momPct: 999.0, rankChange: 0 },
  { rank: 16, prevRank: 13, modelName: "K8", manufacturer: "기아", sales: 4765, prevSales: 5123, momAbs: -358, momPct: -7.0, rankChange: -3 },
  { rank: 17, prevRank: 14, modelName: "아이오닉6", manufacturer: "현대", sales: 4321, prevSales: 4876, momAbs: -555, momPct: -11.4, rankChange: -3 },
  { rank: 18, prevRank: 16, modelName: "GV80", manufacturer: "제네시스", sales: 3987, prevSales: 4234, momAbs: -247, momPct: -5.8, rankChange: -2 },
  { rank: 19, prevRank: 17, modelName: "G80", manufacturer: "제네시스", sales: 3654, prevSales: 3876, momAbs: -222, momPct: -5.7, rankChange: -2 },
  { rank: 20, prevRank: 25, modelName: "모닝", manufacturer: "기아", sales: 3456, prevSales: 2345, momAbs: 1111, momPct: 47.4, rankChange: 5 },
];

const exportModels2025_12: Omit<RadarModel, "score" | "danawaUrl">[] = [
  { rank: 1, prevRank: 2, modelName: "E-클래스", manufacturer: "벤츠", sales: 4321, prevSales: 3876, momAbs: 445, momPct: 11.5, rankChange: 1 },
  { rank: 2, prevRank: 1, modelName: "5시리즈", manufacturer: "BMW", sales: 4123, prevSales: 4234, momAbs: -111, momPct: -2.6, rankChange: -1 },
  { rank: 3, prevRank: 8, modelName: "Model Y", manufacturer: "테슬라", sales: 3987, prevSales: 2543, momAbs: 1444, momPct: 56.8, rankChange: 5 },
  { rank: 4, prevRank: 3, modelName: "GLC", manufacturer: "벤츠", sales: 3654, prevSales: 3543, momAbs: 111, momPct: 3.1, rankChange: -1 },
  { rank: 5, prevRank: 4, modelName: "X3", manufacturer: "BMW", sales: 3432, prevSales: 3321, momAbs: 111, momPct: 3.3, rankChange: -1 },
  { rank: 6, prevRank: 12, modelName: "A6", manufacturer: "아우디", sales: 3210, prevSales: 2123, momAbs: 1087, momPct: 51.2, rankChange: 6 },
  { rank: 7, prevRank: 5, modelName: "3시리즈", manufacturer: "BMW", sales: 2987, prevSales: 3098, momAbs: -111, momPct: -3.6, rankChange: -2 },
  { rank: 8, prevRank: 6, modelName: "C-클래스", manufacturer: "벤츠", sales: 2765, prevSales: 2876, momAbs: -111, momPct: -3.9, rankChange: -2 },
  { rank: 9, prevRank: 15, modelName: "Q5", manufacturer: "아우디", sales: 2543, prevSales: 1654, momAbs: 889, momPct: 53.7, rankChange: 6 },
  { rank: 10, prevRank: 7, modelName: "X5", manufacturer: "BMW", sales: 2321, prevSales: 2654, momAbs: -333, momPct: -12.5, rankChange: -3 },
  { rank: 11, prevRank: 9, modelName: "Model 3", manufacturer: "테슬라", sales: 2198, prevSales: 2432, momAbs: -234, momPct: -9.6, rankChange: -2 },
  { rank: 12, prevRank: 10, modelName: "GLE", manufacturer: "벤츠", sales: 1987, prevSales: 2321, momAbs: -334, momPct: -14.4, rankChange: -2 },
  { rank: 13, prevRank: 11, modelName: "S-클래스", manufacturer: "벤츠", sales: 1765, prevSales: 2198, momAbs: -433, momPct: -19.7, rankChange: -2 },
  { rank: 14, prevRank: null, modelName: "iX", manufacturer: "BMW", sales: 1654, prevSales: 0, momAbs: 1654, momPct: 999.0, rankChange: 0 },
  { rank: 15, prevRank: 13, modelName: "A4", manufacturer: "아우디", sales: 1543, prevSales: 1876, momAbs: -333, momPct: -17.7, rankChange: -2 },
  { rank: 16, prevRank: 14, modelName: "7시리즈", manufacturer: "BMW", sales: 1432, prevSales: 1765, momAbs: -333, momPct: -18.9, rankChange: -2 },
  { rank: 17, prevRank: 20, modelName: "포르쉐 카이엔", manufacturer: "포르쉐", sales: 1321, prevSales: 876, momAbs: 445, momPct: 50.8, rankChange: 3 },
  { rank: 18, prevRank: 16, modelName: "레인지로버", manufacturer: "랜드로버", sales: 1210, prevSales: 1543, momAbs: -333, momPct: -21.6, rankChange: -2 },
  { rank: 19, prevRank: 17, modelName: "디스커버리", manufacturer: "랜드로버", sales: 1098, prevSales: 1432, momAbs: -334, momPct: -23.3, rankChange: -2 },
  { rank: 20, prevRank: 18, modelName: "볼보 XC90", manufacturer: "볼보", sales: 987, prevSales: 1321, momAbs: -334, momPct: -25.3, rankChange: -2 },
];

const domesticModels2025_11: Omit<RadarModel, "score" | "danawaUrl">[] = [
  { rank: 1, prevRank: 2, modelName: "쏘나타", manufacturer: "현대", sales: 10234, prevSales: 9543, momAbs: 691, momPct: 7.2, rankChange: 1 },
  { rank: 2, prevRank: 1, modelName: "카니발", manufacturer: "기아", sales: 9543, prevSales: 9876, momAbs: -333, momPct: -3.4, rankChange: -1 },
  { rank: 3, prevRank: 4, modelName: "그랜저", manufacturer: "현대", sales: 9876, prevSales: 8765, momAbs: 1111, momPct: 12.7, rankChange: 1 },
  { rank: 4, prevRank: 3, modelName: "투싼", manufacturer: "현대", sales: 8123, prevSales: 8543, momAbs: -420, momPct: -4.9, rankChange: -1 },
  { rank: 5, prevRank: 6, modelName: "쏘렌토", manufacturer: "기아", sales: 7987, prevSales: 7234, momAbs: 753, momPct: 10.4, rankChange: 1 },
  { rank: 6, prevRank: 5, modelName: "싼타페", manufacturer: "현대", sales: 7543, prevSales: 7654, momAbs: -111, momPct: -1.5, rankChange: -1 },
  { rank: 7, prevRank: 8, modelName: "스포티지", manufacturer: "기아", sales: 7234, prevSales: 6543, momAbs: 691, momPct: 10.6, rankChange: 1 },
  { rank: 8, prevRank: 7, modelName: "아반떼", manufacturer: "현대", sales: 7654, prevSales: 7123, momAbs: 531, momPct: 7.5, rankChange: -1 },
  { rank: 9, prevRank: 10, modelName: "코나", manufacturer: "현대", sales: 6234, prevSales: 5654, momAbs: 580, momPct: 10.3, rankChange: 1 },
  { rank: 10, prevRank: 9, modelName: "팰리세이드", manufacturer: "현대", sales: 5987, prevSales: 6098, momAbs: -111, momPct: -1.8, rankChange: -1 },
  { rank: 11, prevRank: 12, modelName: "셀토스", manufacturer: "기아", sales: 5543, prevSales: 4987, momAbs: 556, momPct: 11.1, rankChange: 1 },
  { rank: 12, prevRank: 11, modelName: "K5", manufacturer: "기아", sales: 5432, prevSales: 5321, momAbs: 111, momPct: 2.1, rankChange: -1 },
  { rank: 13, prevRank: 14, modelName: "K8", manufacturer: "기아", sales: 5123, prevSales: 4654, momAbs: 469, momPct: 10.1, rankChange: 1 },
  { rank: 14, prevRank: 13, modelName: "아이오닉6", manufacturer: "현대", sales: 4876, prevSales: 4987, momAbs: -111, momPct: -2.2, rankChange: -1 },
  { rank: 15, prevRank: 16, modelName: "레이", manufacturer: "기아", sales: 4321, prevSales: 3876, momAbs: 445, momPct: 11.5, rankChange: 1 },
  { rank: 16, prevRank: 15, modelName: "GV80", manufacturer: "제네시스", sales: 4234, prevSales: 4321, momAbs: -87, momPct: -2.0, rankChange: -1 },
  { rank: 17, prevRank: 18, modelName: "G80", manufacturer: "제네시스", sales: 3876, prevSales: 3432, momAbs: 444, momPct: 12.9, rankChange: 1 },
  { rank: 18, prevRank: 17, modelName: "캐스퍼", manufacturer: "현대", sales: 3456, prevSales: 3654, momAbs: -198, momPct: -5.4, rankChange: -1 },
  { rank: 19, prevRank: 20, modelName: "니로", manufacturer: "기아", sales: 2987, prevSales: 2543, momAbs: 444, momPct: 17.5, rankChange: 1 },
  { rank: 20, prevRank: 19, modelName: "스팅어", manufacturer: "기아", sales: 2765, prevSales: 2876, momAbs: -111, momPct: -3.9, rankChange: -1 },
];

const exportModels2025_11: Omit<RadarModel, "score" | "danawaUrl">[] = [
  { rank: 1, prevRank: 1, modelName: "5시리즈", manufacturer: "BMW", sales: 4234, prevSales: 4098, momAbs: 136, momPct: 3.3, rankChange: 0 },
  { rank: 2, prevRank: 3, modelName: "E-클래스", manufacturer: "벤츠", sales: 3876, prevSales: 3543, momAbs: 333, momPct: 9.4, rankChange: 1 },
  { rank: 3, prevRank: 2, modelName: "GLC", manufacturer: "벤츠", sales: 3543, prevSales: 3654, momAbs: -111, momPct: -3.0, rankChange: -1 },
  { rank: 4, prevRank: 4, modelName: "X3", manufacturer: "BMW", sales: 3321, prevSales: 3210, momAbs: 111, momPct: 3.5, rankChange: 0 },
  { rank: 5, prevRank: 6, modelName: "3시리즈", manufacturer: "BMW", sales: 3098, prevSales: 2876, momAbs: 222, momPct: 7.7, rankChange: 1 },
  { rank: 6, prevRank: 5, modelName: "C-클래스", manufacturer: "벤츠", sales: 2876, prevSales: 2987, momAbs: -111, momPct: -3.7, rankChange: -1 },
  { rank: 7, prevRank: 8, modelName: "X5", manufacturer: "BMW", sales: 2654, prevSales: 2432, momAbs: 222, momPct: 9.1, rankChange: 1 },
  { rank: 8, prevRank: 7, modelName: "Model Y", manufacturer: "테슬라", sales: 2543, prevSales: 2654, momAbs: -111, momPct: -4.2, rankChange: -1 },
  { rank: 9, prevRank: 10, modelName: "Model 3", manufacturer: "테슬라", sales: 2432, prevSales: 2210, momAbs: 222, momPct: 10.0, rankChange: 1 },
  { rank: 10, prevRank: 9, modelName: "GLE", manufacturer: "벤츠", sales: 2321, prevSales: 2321, momAbs: 0, momPct: 0.0, rankChange: -1 },
  { rank: 11, prevRank: 12, modelName: "S-클래스", manufacturer: "벤츠", sales: 2198, prevSales: 1987, momAbs: 211, momPct: 10.6, rankChange: 1 },
  { rank: 12, prevRank: 11, modelName: "A6", manufacturer: "아우디", sales: 2123, prevSales: 2098, momAbs: 25, momPct: 1.2, rankChange: -1 },
  { rank: 13, prevRank: 14, modelName: "A4", manufacturer: "아우디", sales: 1876, prevSales: 1654, momAbs: 222, momPct: 13.4, rankChange: 1 },
  { rank: 14, prevRank: 13, modelName: "7시리즈", manufacturer: "BMW", sales: 1765, prevSales: 1765, momAbs: 0, momPct: 0.0, rankChange: -1 },
  { rank: 15, prevRank: 16, modelName: "Q5", manufacturer: "아우디", sales: 1654, prevSales: 1432, momAbs: 222, momPct: 15.5, rankChange: 1 },
  { rank: 16, prevRank: 15, modelName: "레인지로버", manufacturer: "랜드로버", sales: 1543, prevSales: 1543, momAbs: 0, momPct: 0.0, rankChange: -1 },
  { rank: 17, prevRank: 18, modelName: "디스커버리", manufacturer: "랜드로버", sales: 1432, prevSales: 1210, momAbs: 222, momPct: 18.3, rankChange: 1 },
  { rank: 18, prevRank: 17, modelName: "볼보 XC90", manufacturer: "볼보", sales: 1321, prevSales: 1321, momAbs: 0, momPct: 0.0, rankChange: -1 },
  { rank: 19, prevRank: 20, modelName: "미니 쿠퍼", manufacturer: "미니", sales: 1098, prevSales: 876, momAbs: 222, momPct: 25.3, rankChange: 1 },
  { rank: 20, prevRank: 19, modelName: "포르쉐 카이엔", manufacturer: "포르쉐", sales: 876, prevSales: 987, momAbs: -111, momPct: -11.2, rankChange: -1 },
];

const dataStore: Record<string, Record<Nation, Omit<RadarModel, "score" | "danawaUrl">[]>> = {
  "2025-12": { domestic: domesticModels2025_12, export: exportModels2025_12 },
  "2025-11": { domestic: domesticModels2025_11, export: exportModels2025_11 },
};

function processModelsWithScore(
  models: Omit<RadarModel, "score" | "danawaUrl">[],
  nation: Nation,
  month: string
): RadarModel[] {
  const risingModels = models.filter((m) => m.momAbs > 0);

  const processedModels = models.map((model) => {
    const score =
      risingModels.length > 0
        ? calculateScore(model.momAbs, model.momPct, model.rankChange, risingModels)
        : 0;

    return {
      ...model,
      score,
      danawaUrl: generateDanawaUrl(nation, month),
    };
  });

  return processedModels.sort((a, b) => b.score - a.score);
}

export const handler: Handler = async (event) => {
  const month = event.queryStringParameters?.month;
  const nation = event.queryStringParameters?.nation as Nation | undefined;

  if (!month) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Month parameter is required" }),
    };
  }

  if (!nation || (nation !== "domestic" && nation !== "export")) {
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Invalid nation parameter. Use 'domestic' or 'export'" }),
    };
  }

  const monthData = dataStore[month];
  if (!monthData) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "No data found for the specified month" }),
    };
  }

  const rawModels = monthData[nation];
  if (!rawModels) {
    return {
      statusCode: 404,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "No data found for the specified nation" }),
    };
  }

  const models = processModelsWithScore(rawModels, nation, month);

  const risingModels = models.filter((m) => m.momAbs > 0);
  const avgGrowth =
    risingModels.length > 0
      ? risingModels.reduce((sum, m) => sum + m.momPct, 0) / risingModels.length
      : 0;

  const topGainer = models.length > 0 ? models[0].modelName : "-";

  const radarData = {
    month,
    nation,
    models,
    totalModels: models.length,
    avgGrowth,
    topGainer,
    updatedAt: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(radarData),
  };
};
