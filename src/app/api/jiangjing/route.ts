import { NextResponse } from "next/server";
import { createHash } from "crypto";

// 纯 JS MD5 实现（用于非 Node.js 环境）
function jsMd5(message: string): string {
  const s11 = 7, s12 = 12, s13 = 17, s14 = 22;
  const s21 = 5, s22 = 9, s23 = 14, s24 = 20;
  const s31 = 4, s32 = 11, s33 = 16, s34 = 23;
  const s41 = 6, s42 = 10, s43 = 15, s44 = 21;

  function rotateLeft(lValue: number, iShiftBits: number): number {
    return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
  }

  function addUnsigned(lX: number, lY: number): number {
    const lX4 = (lX & 0xffff) + (lY & 0xffff);
    const lX8 = (lX >> 16) + (lY >> 16) + (lX4 >> 16);
    return (lX8 << 16) | (lX4 & 0xffff);
  }

  function f(x: number, y: number, z: number): number { return (x & y) | (~x & z); }
  function g(x: number, y: number, z: number): number { return (x & z) | (y & ~z); }
  function h(x: number, y: number, z: number): number { return x ^ y ^ z; }
  function i(x: number, y: number, z: number): number { return y ^ (x | ~z); }

  function ff(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(f(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function gg(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(g(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function hh(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(h(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function ii(a: number, b: number, c: number, d: number, x: number, s: number, ac: number): number {
    a = addUnsigned(a, addUnsigned(addUnsigned(i(b, c, d), x), ac));
    return addUnsigned(rotateLeft(a, s), b);
  }

  function convertToWordArray(str: string): number[] {
    let lWordCount: number;
    const lMessageLength = str.length;
    const lNumberOfWords_temp1 = lMessageLength + 8;
    const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
    const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
    const lWordArray: number[] = Array(lNumberOfWords).fill(0);
    let lBytePosition = 0;
    let lByteCount = 0;
    while (lByteCount < lMessageLength) {
      lWordCount = (lByteCount - (lByteCount % 4)) / 4;
      lBytePosition = (lByteCount % 4) * 8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition);
      lByteCount++;
    }
    lWordCount = (lByteCount - (lByteCount % 4)) / 4;
    lBytePosition = (lByteCount % 4) * 8;
    lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
    lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
    lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
    return lWordArray;
  }

  function wordToHex(lValue: number): string {
    let wordToHexValue = "", wordToHexValue_temp = "", lByte: number, lCount = 0;
    for (lCount = 0; lCount <= 3; lCount++) {
      lByte = (lValue >>> (lCount * 8)) & 255;
      wordToHexValue_temp = "0" + lByte.toString(16);
      wordToHexValue = wordToHexValue + wordToHexValue_temp.substring(wordToHexValue_temp.length - 2);
    }
    return wordToHexValue;
  }

  let x = convertToWordArray(message);
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let k = 0; k < x.length; k += 16) {
    const AA = a;
    const BB = b;
    const CC = c;
    const DD = d;
    a = ff(a, b, c, d, x[k + 0], s11, 3614090360);
    d = ff(d, a, b, c, x[k + 1], s12, 3905402710);
    c = ff(c, d, a, b, x[k + 2], s13, 606105819);
    b = ff(b, c, d, a, x[k + 3], s14, 3250441966);
    a = ff(a, b, c, d, x[k + 4], s11, 4118548399);
    d = ff(d, a, b, c, x[k + 5], s12, 1200080426);
    c = ff(c, d, a, b, x[k + 6], s13, 2821735955);
    b = ff(b, c, d, a, x[k + 7], s14, 4243563512);
    a = ff(a, b, c, d, x[k + 8], s11, 1770035416);
    d = ff(d, a, b, c, x[k + 9], s12, 2336552879);
    c = ff(c, d, a, b, x[k + 10], s13, 4294925233);
    b = ff(b, c, d, a, x[k + 11], s14, 2304563134);
    a = ff(a, b, c, d, x[k + 12], s11, 1804603682);
    d = ff(d, a, b, c, x[k + 13], s12, 4254626195);
    c = ff(c, d, a, b, x[k + 14], s13, 2792965006);
    b = ff(b, c, d, a, x[k + 15], s14, 1236535329);
    a = gg(a, b, c, d, x[k + 1], s21, 4129170786);
    d = gg(d, a, b, c, x[k + 6], s22, 3225465994);
    c = gg(c, d, a, b, x[k + 11], s23, 643717713);
    b = gg(b, c, d, a, x[k + 0], s24, 3921069994);
    a = gg(a, b, c, d, x[k + 5], s21, 3593408605);
    d = gg(d, a, b, c, x[k + 10], s22, 38016083);
    c = gg(c, d, a, b, x[k + 15], s23, 3634488961);
    b = gg(b, c, d, a, x[k + 4], s24, 3889429448);
    a = gg(a, b, c, d, x[k + 9], s21, 568446438);
    d = gg(d, a, b, c, x[k + 14], s22, 3275163606);
    c = gg(c, d, a, b, x[k + 3], s23, 4107603335);
    b = gg(b, c, d, a, x[k + 8], s24, 1163531501);
    a = gg(a, b, c, d, x[k + 13], s21, 2850285829);
    d = gg(d, a, b, c, x[k + 2], s22, 4243563512);
    c = gg(c, d, a, b, x[k + 7], s23, 1735328473);
    b = gg(b, c, d, a, x[k + 12], s24, 2368359562);
    a = hh(a, b, c, d, x[k + 5], s31, 4294588738);
    d = hh(d, a, b, c, x[k + 8], s32, 2272392833);
    c = hh(c, d, a, b, x[k + 11], s33, 1839030562);
    b = hh(b, c, d, a, x[k + 13], s34, 4259657740);
    a = hh(a, b, c, d, x[k + 2], s31, 2763975236);
    d = hh(d, a, b, c, x[k + 7], s32, 1272893353);
    c = hh(c, d, a, b, x[k + 14], s33, 4139469664);
    b = hh(b, c, d, a, x[k + 0], s34, 3200236656);
    a = hh(a, b, c, d, x[k + 9], s31, 681279174);
    d = hh(d, a, b, c, x[k + 1], s32, 3936430074);
    c = hh(c, d, a, b, x[k + 10], s33, 3572445317);
    b = hh(b, c, d, a, x[k + 12], s34, 76029189);
    a = hh(a, b, c, d, x[k + 3], s31, 3654602809);
    d = hh(d, a, b, c, x[k + 6], s32, 3873151461);
    c = hh(c, d, a, b, x[k + 15], s33, 530742520);
    b = hh(b, c, d, a, x[k + 4], s34, 3299628645);
    a = ii(a, b, c, d, x[k + 0], s41, 4096336452);
    d = ii(d, a, b, c, x[k + 7], s42, 1126891415);
    c = ii(c, d, a, b, x[k + 14], s43, 2878612391);
    b = ii(b, c, d, a, x[k + 5], s44, 4237533241);
    a = ii(a, b, c, d, x[k + 12], s41, 1700485571);
    d = ii(d, a, b, c, x[k + 9], s42, 2399980690);
    c = ii(c, d, a, b, x[k + 2], s43, 4293915773);
    b = ii(b, c, d, a, x[k + 15], s44, 2240044497);
    a = ii(a, b, c, d, x[k + 3], s41, 1873313359);
    d = ii(d, a, b, c, x[k + 10], s42, 4264355552);
    c = ii(c, d, a, b, x[k + 13], s43, 2794736355);
    b = ii(b, c, d, a, x[k + 8], s44, 1136836746);
    a = ii(a, b, c, d, x[k + 6], s41, 183896031);
    d = ii(d, a, b, c, x[k + 11], s42, 2538100309);
    c = ii(c, d, a, b, x[k + 0], s43, 2773846685);
    b = ii(b, c, d, a, x[k + 7], s44, 1295117522);
    a = addUnsigned(a, AA);
    b = addUnsigned(b, BB);
    c = addUnsigned(c, CC);
    d = addUnsigned(d, DD);
  }

  return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// 统一的 MD5 函数
function md5(message: string): string {
  // 在 Node.js 环境使用 crypto，否则使用纯 JS 实现
  if (typeof createHash === "function") {
    try {
      return createHash("md5").update(message).digest("hex");
    } catch {
      // fallback to JS implementation
    }
  }
  return jsMd5(message);
}

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
    const response = await fetch(url, { ...options, signal: controller.signal });
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

    const userno = "1928154";
    const userdq = "1928154";
    const usernamedq = "蒋静";
    const area_guid = "9773336a80fa42b8933543bf514c8d82";
    const isuser = "0";
    const sybcode = "FQ01";
    const cookies = `outusertime=${encodeURIComponent(date)}; outxai=1`;

    const createMd5 = (type: string) =>
      md5(userno + userdq + "" + date + type + area_guid + sybcode + isuser);

    const apiUrl = "http://c-cms.eifini.com:9923/index.aspx/GetInfo";
    console.log('[API] External API URL:', apiUrl);

    // 调试：打印 MD5
    const md5Str = userno + userdq + "" + date + "A007" + area_guid + sybcode + isuser;
    console.log('[DEBUG] MD5 input:', md5Str);
    console.log('[DEBUG] MD5 output:', createMd5("A007"));

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
    console.log('[DEBUG] dataA007.d:', dataA007.d);
    console.log('[DEBUG] dataA008.d:', dataA008.d);

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
