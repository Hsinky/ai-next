import { NextResponse } from "next/server";
import { createHash } from "crypto";

interface DataList {
  code: number;
  A007?: { AMOUNT: string };
  A008?: { POS_AMOUNT: string; WSC_AMOUNT: string };
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
  A016?: Array<{ T0: string; T1: string }>;
  other?: number;
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

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeout = 8000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    console.log(`[Fetch] Starting request to: ${url}`);
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    console.log(`[Fetch] Response status: ${response.status} ${response.statusText}`);
    return response;
  } catch (error) {
    clearTimeout(id);
    console.error(`[Fetch Error] URL: ${url}`, error);
    throw error;
  }
}

export async function GET(request: Request) {
  const startTime = Date.now();
  console.log('[API] Request started at:', new Date().toISOString());

  try {
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const date = dateParam || getTodayDateRange();
    console.log('[API] Date parameter:', date);

    // 硬编码参数
    const userno = "1928154";
    const userdq = "1928154";
    const usernamedq = "蒋静";
    const area_guid = "9773336a80fa42b8933543bf514c8d82";
    const isuser = "0";
    const sybcode = "FQ01";
    const cookies = `outusertime=${encodeURIComponent(date)}; outxai=1`;

    const createMd5 = (type: string) =>
      createHash("md5").update(userno + userdq + "" + date + type + area_guid + sybcode + isuser).digest("hex");

    const apiUrl = "http://c-cms.eifini.com:9923/index.aspx/GetInfo";
    console.log('[API] External API URL:', apiUrl);

    // 并行请求所有数据
    console.log('[API] Starting parallel requests...');
    const requestTime = Date.now();

    const [responseA007, responseA008, responseA019, responseA016] = await Promise.all([
      fetchWithTimeout(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A007", area_guid, sybcode, isuser, md5: createMd5("A007") }),
      }).catch(e => { console.error('[A007] Failed:', e); throw e; }),
      fetchWithTimeout(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A008", area_guid, sybcode, isuser, md5: createMd5("A008") }),
      }).catch(e => { console.error('[A008] Failed:', e); throw e; }),
      fetchWithTimeout(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A019", area_guid, sybcode, isuser, md5: createMd5("A019") }),
      }).catch(e => { console.error('[A019] Failed:', e); throw e; }),
      fetchWithTimeout(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8", "Cookie": cookies },
        body: JSON.stringify({ userno, userdq, useryz: "", usernamedq, channelid: "", date, type: "A016", area_guid, sybcode, isuser, md5: createMd5("A016") }),
      }).catch(e => { console.error('[A016] Failed:', e); throw e; }),
    ]);

    console.log(`[API] All requests completed in ${Date.now() - requestTime}ms`);

    // 检查响应
    if (!responseA007.ok || !responseA008.ok || !responseA019.ok || !responseA016.ok) {
      console.error('[API] Some responses failed:', {
        A007: responseA007.status,
        A008: responseA008.status,
        A019: responseA019.status,
        A016: responseA016.status,
      });
      return NextResponse.json(
        { error: "Failed to fetch data from external service", details: { A007: responseA007.status, A008: responseA008.status, A019: responseA019.status, A016: responseA016.status } },
        { status: 500 }
      );
    }

    const [dataA007, dataA008, dataA019, dataA016] = await Promise.all([
      responseA007.json(),
      responseA008.json(),
      responseA019.json(),
      responseA016.json(),
    ]);

    console.log('[API] Parsing responses...');

    const listA007: DataList = JSON.parse(dataA007.d);
    const listA008: DataList = JSON.parse(dataA008.d);
    const listA019: DataList = JSON.parse(dataA019.d);
    const listA016: DataList = JSON.parse(dataA016.d);

    const targetAmount = listA007.A007?.AMOUNT || "0";
    const posAmount = listA008.A008?.POS_AMOUNT || "0";
    const wscAmount = listA008.A008?.WSC_AMOUNT || "0";

    const completionRate = calculateCompletionRate(posAmount, wscAmount, targetAmount);

    const categorySales = listA019.A019_4 || [];
    const seasonSales = listA019.A019_2 || [];

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

    console.log(`[API] Request completed in ${Date.now() - startTime}ms`);

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
    const duration = Date.now() - startTime;
    console.error(`[API] Error after ${duration}ms:`, error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        debug: {
          duration: `${duration}ms`,
          timestamp: new Date().toISOString(),
          name: error instanceof Error ? error.name : String(error),
        },
      },
      { status: 500 }
    );
  }
}
