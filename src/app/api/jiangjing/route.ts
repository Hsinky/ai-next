import { NextResponse } from "next/server";
import { createHash } from "crypto";

interface DataList {
  code: number;
  A007?: {
    AMOUNT: string;
  };
  A008?: {
    POS_AMOUNT: string;
    WSC_AMOUNT: string;
  };
  A019?: Array<any>;
  A019_4?: Array<{
    PRODCATEGORY: string;
    QUANTITY: string;
    DISAMOUNT: string;
    SYEZB: string;
    ZKL: string;
  }>;
  A019_2?: Array<{
    QUARTER: string;
    QUANTITY: string;
    DISAMOUNT: string;
    SYEZB: string;
    ZKL: string;
  }>;
  A016?: Array<{
    T0: string;
    T1: string;
  }>;
  other?: number;
}

// 计算完成率
function calculateCompletionRate(
  posAmount: string,
  wscAmount: string,
  targetAmount: string
): string {
  const totalSales = parseFloat(posAmount || "0") + parseFloat(wscAmount || "0");
  const target = parseFloat(targetAmount || "0");
  if (target === 0) return "0.0%";
  return ((totalSales / target) * 100).toFixed(1) + "%";
}

// 获取当天日期范围
function getTodayDateRange(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return `${dateStr} ~ ${dateStr}`;
}

// 带超时的 fetch
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const date = dateParam || getTodayDateRange();

    // 硬编码参数（避免每次都抓取页面）
    const userno = "1928154";
    const userdq = "1928154";
    const usernamedq = "蒋静";
    const area_guid = "9773336a80fa42b8933543bf514c8d82";
    const isuser = "0";
    const sybcode = "FQ01";
    const cookies = `outusertime=${encodeURIComponent(date)}; outxai=1`;

    // 构建 MD5
    const createMd5 = (type: string) =>
      createHash("md5").update(userno + userdq + "" + date + type + area_guid + sybcode + isuser).digest("hex");

    // 并行请求所有数据
    const [responseA007, responseA008, responseA019, responseA016] = await Promise.all([
      fetchWithTimeout("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A007", area_guid, sybcode, isuser, md5: createMd5("A007") }),
      }),
      fetchWithTimeout("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A008", area_guid, sybcode, isuser, md5: createMd5("A008") }),
      }),
      fetchWithTimeout("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A019", area_guid, sybcode, isuser, md5: createMd5("A019") }),
      }),
      fetchWithTimeout("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A016", area_guid, sybcode, isuser, md5: createMd5("A016") }),
      }),
    ]);

    // 检查响应
    if (!responseA007.ok || !responseA008.ok || !responseA019.ok || !responseA016.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from external service" },
        { status: 500 }
      );
    }

    const [dataA007, dataA008, dataA019, dataA016] = await Promise.all([
      responseA007.json(),
      responseA008.json(),
      responseA019.json(),
      responseA016.json(),
    ]);

    const listA007: DataList = JSON.parse(dataA007.d);
    const listA008: DataList = JSON.parse(dataA008.d);
    const listA019: DataList = JSON.parse(dataA019.d);
    const listA016: DataList = JSON.parse(dataA016.d);

    const targetAmount = listA007.A007?.AMOUNT || "0";
    const posAmount = listA008.A008?.POS_AMOUNT || "0";
    const wscAmount = listA008.A008?.WSC_AMOUNT || "0";

    const completionRate = calculateCompletionRate(posAmount, wscAmount, targetAmount);

    // 品类销售数据
    const categorySales = listA019.A019_4 || [];
    // 季节销售数据
    const seasonSales = listA019.A019_2 || [];

    // 计算 ES 占比
    let esRatio = 0;
    const a016Data = listA016.A016 as Array<Record<string, string>> | undefined;

    if (a016Data && a016Data.length >= 4) {
      const headerRow = a016Data[0];
      let targetCol = "T4";

      for (const [key, value] of Object.entries(headerRow)) {
        if (value === "S/E") {
          targetCol = key;
          break;
        }
      }

      const compareValue = parseFloat(a016Data[2][targetCol]) || 0;
      const eValue = parseFloat(a016Data[3][targetCol]) || 0;

      if (compareValue > 0) {
        esRatio = (eValue / compareValue) * 100;
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        completionRate,
        targetAmount,
        totalSales: (parseFloat(posAmount) + parseFloat(wscAmount)).toFixed(1),
        esRatio: esRatio.toFixed(0),
        categorySales,
        seasonSales,
        fetchedAt: new Date().toISOString(),
      },
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
