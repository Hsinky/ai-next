import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import { createHash } from "crypto";

interface GetInfoResponse {
  d: string;
}

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
    T1: string;  // 格式: "S/E"
  }>;
  other?: number;
}

// 计算完成率 = (总业绩 / 业绩目标) * 100
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

// 获取当天日期范围格式 "2026-05-06 ~ 2026-05-06"
function getTodayDateRange(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;
  return `${dateStr} ~ ${dateStr}`;
}

export async function GET(request: Request) {
  try {
    // 从查询参数获取日期，如果没有则使用当天
    const url = new URL(request.url);
    const dateParam = url.searchParams.get("date");
    const date = dateParam || getTodayDateRange();

    // 先获取页面，提取需要的参数
    const pageResponse = await fetch(
      "http://c-cms.eifini.com:9923/index.aspx?eid=52846&sybcode=FQ01",
      { cache: "no-store" }
    );

    if (!pageResponse.ok) {
      return NextResponse.json(
        { error: "Failed to fetch page", status: pageResponse.status },
        { status: 500 }
      );
    }

    const html = await pageResponse.text();
    const $ = cheerio.load(html);

    // 从页面提取参数
    const userno = $('script:contains("var userno")').text()?.match(/var userno = "([^"]+)"/)?.[1] || "";
    const userdq = $('script:contains("var userdq")').text()?.match(/var userdq = "([^"]+)"/)?.[1] || "";
    const usernamedq = $('script:contains("var usernamedq")').text()?.match(/var usernamedq = "([^"]+)"/)?.[1] || "";
    const area_guid = $('script:contains("area_guid")').text()?.match(/area_guid = "([^"]+)"/)?.[1] || "";
    const isuser = $('script:contains("var isuser")').text()?.match(/var isuser ="([^"]+)"/)?.[1] || "0";

    const sybcode = "FQ01";

    // 构建 Cookie
    const cookies = `outusertime=${encodeURIComponent(date)}; outxai=1`;

    // 获取 A007 数据（业绩目标）
    const md5A007 = createHash("md5")
      .update(userno + userdq + "" + date + "A007" + area_guid + sybcode + isuser)
      .digest("hex");

    const responseA007 = await fetch("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": cookies,
      },
      body: JSON.stringify({
        userno,
        userdq,
        useryz: "",
        usernamedq,
        channelid: "",
        date,
        type: "A007",
        area_guid,
        sybcode,
        isuser,
        md5: md5A007,
      }),
      cache: "no-store",
    });

    // 获取 A008 数据（总业绩）
    const md5A008 = createHash("md5")
      .update(userno + userdq + "" + date + "A008" + area_guid + sybcode + isuser)
      .digest("hex");

    const responseA008 = await fetch("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": cookies,
      },
      body: JSON.stringify({
        userno,
        userdq,
        useryz: "",
        usernamedq,
        channelid: "",
        date,
        type: "A008",
        area_guid,
        sybcode,
        isuser,
        md5: md5A008,
      }),
      cache: "no-store",
    });

    // 获取 A019 数据（包含品类销售 A019_4、季节销售 A019_2）
    const md5A019 = createHash("md5")
      .update(userno + userdq + "" + date + "A019" + area_guid + sybcode + isuser)
      .digest("hex");

    const responseA019 = await fetch("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": cookies,
      },
      body: JSON.stringify({
        userno,
        userdq,
        useryz: "",
        usernamedq,
        channelid: "",
        date,
        type: "A019",
        area_guid,
        sybcode,
        isuser,
        md5: md5A019,
      }),
      cache: "no-store",
    });

    // 获取 A016 数据（ES 占比）
    const md5A016 = createHash("md5")
      .update(userno + userdq + "" + date + "A016" + area_guid + sybcode + isuser)
      .digest("hex");

    const responseA016 = await fetch("http://c-cms.eifini.com:9923/index.aspx/GetInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cookie": cookies,
      },
      body: JSON.stringify({
        userno,
        userdq,
        useryz: "",
        usernamedq,
        channelid: "",
        date,
        type: "A016",
        area_guid,
        sybcode,
        isuser,
        md5: md5A016,
      }),
      cache: "no-store",
    });

    if (!responseA007.ok || !responseA008.ok || !responseA019.ok || !responseA016.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data from API" },
        { status: 500 }
      );
    }

    const dataA007: GetInfoResponse = await responseA007.json();
    const dataA008: GetInfoResponse = await responseA008.json();
    const dataA019: GetInfoResponse = await responseA019.json();
    const dataA016: GetInfoResponse = await responseA016.json();

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

    // 计算 ES 占比（E店均业绩 / 对比店均业绩）
    // A016 数据结构：
    // 第1行: 表头 "T0":"同商场品牌", "T1":"PM/E", "T2":"MM/E", "T3":"AM/E", "T4":"S/E"
    // 第3行: 对比店均业绩
    // 第4行: E店均业绩
    let esRatio = 0;
    const a016Data = listA016.A016 as Array<Record<string, string>> | undefined;

    if (a016Data && a016Data.length >= 4) {
      // 找到表头中 "S/E" 所在的列索引
      const headerRow = a016Data[0];
      let targetCol = "T4"; // 默认是 T4 (S/E)

      for (const [key, value] of Object.entries(headerRow)) {
        if (value === "S/E") {
          targetCol = key;
          break;
        }
      }

      // 第3行（索引2）是对比店均业绩，第4行（索引3）是 E 店均业绩
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
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
