import { NextResponse } from "next/server";
import { createHash } from "crypto";

export const runtime = 'nodejs';
export const maxDuration = 60;

function md5(message: string): string {
  return createHash("md5").update(message).digest("hex");
}

interface CategoryItem {
  PRODCATEGORY: string;
  QUANTITY: string;
  DISAMOUNT: string;
  SYEZB: string;
  ZKL: string;
}

interface SeasonItem {
  QUARTER: string;
  QUANTITY: string;
  DISAMOUNT: string;
  SYEZB: string;
  ZKL: string;
}

interface A019Data {
  A019_4?: CategoryItem[];
  A019_2?: SeasonItem[];
}

interface DataList {
  code: number;
  A007?: { AMOUNT: string };
  A008?: { POS_AMOUNT: string; WSC_AMOUNT: string };
  A019?: A019Data;
  A019_4?: CategoryItem[];
  A019_2?: SeasonItem[];
  A016?: Array<Record<string, string>>;
  other?: number;
  // 备用字段：某些响应直接返回这些字段
  AMOUNT?: string;
  POS_AMOUNT?: string;
  WSC_AMOUNT?: string;
}

function calculateCompletionRate(posAmount: string, wscAmount: string, targetAmount: string): string {
  const totalSales = parseFloat(posAmount || "0") + parseFloat(wscAmount || "0");
  const target = parseFloat(targetAmount || "0");
  if (target === 0) return "0.0%";
  return ((totalSales / target) * 100).toFixed(1) + "%";
}

function getTodayDateRange(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return `${dateStr} ~ ${dateStr}`;
}

// 动态获取 area_guid
async function getAreaGUID(): Promise<string> {
  try {
    const response = await fetch("http://c-cms.eifini.com:9923/index.aspx?eid=52846&sybcode=FQ01");
    const body = await response.text();
    const match = body.match(/area_guid\s*=\s*"([^"]+)"/);
    if (match && match[1]) {
      return match[1];
    }
  } catch (error) {
    console.error('[API] Failed to fetch area_guid:', error);
  }
  return process.env.AREA_GUID || "4fe1414d75434e67bb1a7d188a1ada48";
}

// 转换代理响应格式
function transformProxyResponse(data: any): NextResponse {
  // 代理返回的格式: { A007: { d: "..." }, A008: { d: "..." }, ... }
  // 需要解析 JSON 字符串
  const parseA007 = typeof data.A007 === 'string' ? JSON.parse(data.A007) : data.A007;
  const parseA008 = typeof data.A008 === 'string' ? JSON.parse(data.A008) : data.A008;
  const parseA019 = typeof data.A019 === 'string' ? JSON.parse(data.A019) : data.A019;
  const parseA016 = typeof data.A016 === 'string' ? JSON.parse(data.A016) : data.A016;

  const listA007: DataList = typeof parseA007 === 'string' ? JSON.parse(parseA007) : parseA007;
  const listA008: DataList = typeof parseA008 === 'string' ? JSON.parse(parseA008) : parseA008;
  const listA019: DataList = typeof parseA019 === 'string' ? JSON.parse(parseA019) : parseA019;
  const listA016: DataList = typeof parseA016 === 'string' ? JSON.parse(parseA016) : parseA016;

  const targetAmount = listA007?.A007?.AMOUNT || listA007?.AMOUNT || "0";
  const posAmount = listA008?.A008?.POS_AMOUNT || listA008?.POS_AMOUNT || "0";
  const wscAmount = listA008?.A008?.WSC_AMOUNT || listA008?.WSC_AMOUNT || "0";

  const completionRate = calculateCompletionRate(posAmount, wscAmount, targetAmount);

  let categorySales: CategoryItem[] = [];
  if (listA019?.A019_4 && listA019.A019_4.length > 0) {
    categorySales = listA019.A019_4;
  } else if (listA019?.A019?.A019_4 && listA019.A019.A019_4.length > 0) {
    categorySales = listA019.A019.A019_4;
  }

  let seasonSales: SeasonItem[] = [];
  if (listA019?.A019_2 && listA019.A019_2.length > 0) {
    seasonSales = listA019.A019_2;
  } else if (listA019?.A019?.A019_2 && listA019.A019.A019_2.length > 0) {
    seasonSales = listA019.A019.A019_2;
  }

  let esRatio = 0;
  const a016Data = listA016?.A016 as Array<Record<string, string>> | undefined;
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
  });
}

export async function GET(request: Request) {
  const startTime = Date.now();
  const url = new URL(request.url);
  const dateParam = url.searchParams.get("date");
  const date = dateParam || getTodayDateRange();

  console.log('[API] Request started at:', new Date().toISOString());
  console.log('[API] Date parameter:', date);

  // 检查是否使用代理
  const proxyUrl = process.env.PROXY_URL;
  const useProxy = process.env.USE_PROXY === "true" || !!proxyUrl;

  if (useProxy && proxyUrl) {
    try {
      console.log('[API] Using proxy:', proxyUrl);
      const response = await fetch(proxyUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date }),
      });
      const data = await response.json();
      return transformProxyResponse(data);
    } catch (error) {
      console.error('[API] Proxy error:', error);
      return NextResponse.json(
        { error: "Proxy request failed", message: error instanceof Error ? error.message : "Unknown error" },
        { status: 500 }
      );
    }
  }

  // 直接调用外部 API（本地开发）
  const area_guid = await getAreaGUID();
  const singleDate = date.includes(" ~ ") ? date.split(" ~ ")[0] : date;
  const cookies = `outusertime=${encodeURIComponent(date)}; outxai=1`;

  const userno = "1928154";
  const userdq = "1928154";
  const usernamedq = "蒋静";
  const sybcode = "FQ01";
  const isuser = "0";

  const createMd5 = (type: string) =>
    md5(userno + userdq + "" + singleDate + type + area_guid + sybcode + isuser);

  const apiUrl = "http://c-cms.eifini.com:9923/index.aspx/GetInfo";

  try {
    const md5A007 = createMd5("A007");
    const md5A008 = createMd5("A008");
    const md5A019 = createMd5("A019");
    const md5A016 = createMd5("A016");

    const [responseA007, responseA008, responseA019, responseA016] = await Promise.all([
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date: singleDate, type: "A007", area_guid, sybcode, isuser, md5: md5A007 }),
      }),
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date: singleDate, type: "A008", area_guid, sybcode, isuser, md5: md5A008 }),
      }),
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date: singleDate, type: "A019", area_guid, sybcode, isuser, md5: md5A019 }),
      }),
      fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date: singleDate, type: "A016", area_guid, sybcode, isuser, md5: md5A016 }),
      }),
    ]);

    const [dataA007, dataA008, dataA019, dataA016] = await Promise.all([
      responseA007.json(),
      responseA008.json(),
      responseA019.json(),
      responseA016.json(),
    ]);

    return transformProxyResponse({
      A007: dataA007.d,
      A008: dataA008.d,
      A019: dataA019.d,
      A016: dataA016.d,
    });
  } catch (error) {
    console.error('[API] Error:', error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
