"use client";

import { useEffect, useState } from "react";

console.log("[jiangjing] 1. MODULE LOADED");

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

// 直接使用原始季节数据，不做累加
function filterRawSeasonData(seasonSales: SeasonItem[]): SeasonItem[] {
  return seasonSales.filter((s) => s && s.QUARTER);
}

interface CompletionData {
  completionRate: string;
  targetAmount: string;
  totalSales: string;
  esRatio: string;
  categorySales: CategoryItem[];
  seasonSales: SeasonItem[];
  fetchedAt: string;
  storeAnalysis: string;
}

// 获取当天日期 YYYY-MM-DD
function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 格式化日期为 2026/5/6 格式
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

// 生成报告文本
function generateReport(data: CompletionData, startDate: string): string {
  const date = formatDate(startDate);
  const target = parseFloat(data.targetAmount);
  const actual = parseFloat(data.totalSales);
  const esRatio = data.esRatio || "0";

  // 品类销售行 - 显示所有数据
  const categoryLines = data.categorySales
    .filter((c) => c && c.PRODCATEGORY)
    .map((c) => {
      const name = c.PRODCATEGORY!;
      return `${name}${c.QUANTITY || "0"}件  占比${c.SYEZB || "0"}%`;
    })
    .join("\n");

  // 季节销售行 - 直接使用原始数据
  const rawSeasons = filterRawSeasonData(data.seasonSales);
  const seasonLines = rawSeasons
    .map((s) => {
      const name = s.QUARTER.replace("装", "");
      return `${name}占比${s.SYEZB}%`;
    })
    .join(",\n");

  return `${date}
成都区/蒋静
今日目标：${Math.round(target)}
实际达成：${Math.round(actual)}
达成率：${data.completionRate}
ES占比：${esRatio}%

1️⃣神裤目标：
日目标_，销售件：_，差额：_
周目标_，累计：_，差额：_

2️⃣主推目标
日目标：_，销售：_，差额_
周目标：_件，累计：_，差额_

季节占比
${seasonLines || "春装占比_%，\n夏装占比_%\n常青款占比_%"}

品类销售占比：
${categoryLines || "毛衫_件  占比_%\n裤子_件  占比_%\n上衣_件  占比_%\n裙子_件  占比_%\n连衣裙_件 占比_%\n单服装_件，占比_%"}

会员回店数：8人/金额18643

1.区域完成${data.completionRate}
${data.storeAnalysis || ""}
2.今日会员回店8人，占比36%，客单2330，3000+产出3张，大悦城回头不理想
3.主推达成，卓锦/和悦有提升，头部深度不够
明日重点
1.区域五一销售复盘，周目标同频
2.跟进区域4个重点款式产出，新同事练货跟进
3.生日及临期券顾客邀约跟进，持续跟进大V资料完善，及店铺学习情况`;
}

export default function JiangjingPage() {
  console.log("[jiangjing] 2. COMPONENT RENDER");
  const [data, setData] = useState<CompletionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState(() => getTodayDate());
  const [endDate, setEndDate] = useState(() => getTodayDate());
  const [copied, setCopied] = useState(false);

  // 初始加载
  useEffect(() => {
    console.log("[jiangjing] 3. EFFECT RUN");
    const today = getTodayDate();
    const dateRange = `${today} ~ ${today}`;
    console.log("[jiangjing] start fetch:", dateRange);
    fetch(`/api/jiangjing?date=${encodeURIComponent(dateRange)}`, { cache: "no-store" })
      .then((res) => {
        console.log("[jiangjing] response status:", res.status);
        return res.json();
      })
      .then((result) => {
        console.log("[jiangjing] result:", result.success, result.error || "ok");
        if (result.success) {
          setData(result.data);
        } else {
          setError(result.error || "获取数据失败");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("[jiangjing] fetch error:", err);
        setError(err instanceof Error ? err.message : "网络错误");
        setLoading(false);
      });
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dateRange = `${startDate} ~ ${endDate}`;
      const response = await fetch(`/api/jiangjing?date=${encodeURIComponent(dateRange)}`, {
        cache: "no-store",
      });
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || "获取数据失败");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleTodayClick = async () => {
    const today = getTodayDate();
    setStartDate(today);
    setEndDate(today);
    // 设置日期后立即查询
    setLoading(true);
    setError(null);
    try {
      const dateRange = `${today} ~ ${today}`;
      const response = await fetch(`/api/jiangjing?date=${encodeURIComponent(dateRange)}`, {
        cache: "no-store",
      });
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.error || "获取数据失败");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "网络错误");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!data) return;
    const report = generateReport(data, startDate);
    await navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 max-w-[100vw] overflow-x-hidden">
      {/* 顶部固定栏 */}
      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">完成率看板</h1>
          <div className="flex items-center gap-2">
            {data && (
              <button
                onClick={handleCopy}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800"
                title="复制报告"
              >
                {copied ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="p-3 space-y-3 w-full box-border">
        {/* 日期选择器 */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          <div className="text-sm text-gray-500 mb-2">选择日期范围</div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="min-w-0">
              <label className="text-xs text-gray-600 block mb-1">开始日期</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm box-border"
              />
            </div>
            <div className="min-w-0">
              <label className="text-xs text-gray-600 block mb-1">结束日期</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm box-border"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleTodayClick}
              className="flex-1 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 active:bg-gray-300"
            >
              今天
            </button>
            <button
              onClick={fetchData}
              disabled={loading || !startDate || !endDate}
              className={`flex-1 py-2 text-sm rounded-lg font-medium transition-colors ${
                loading || !startDate || !endDate
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              }`}
            >
              {loading ? "查询中..." : "查询"}
            </button>
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            已选: {startDate} ~ {endDate}
          </div>
        </div>

        {loading && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-3 text-gray-500 text-sm">正在获取数据...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
            <div className="flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {data && !loading && (
          <>
            {/* 复制成功提示 */}
            {copied && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-2 rounded-xl text-center text-sm">
                已复制到剪贴板
              </div>
            )}

            {/* 完成率卡片 */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-blue-100 text-sm mb-2">完成率</div>
              <div className="text-5xl font-bold">
                {data.completionRate}
              </div>
            </div>

            {/* 数据详情 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center text-gray-500 text-xs mb-2">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  业绩目标
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {data.targetAmount}
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center text-gray-500 text-xs mb-2">
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  总业绩
                </div>
                <div className="text-xl font-bold text-gray-900">
                  {data.totalSales}
                </div>
              </div>
            </div>

            {/* 季节占比 */}
            {data.seasonSales && data.seasonSales.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">季节占比</div>
                <div className="grid grid-cols-3 gap-2">
                  {filterRawSeasonData(data.seasonSales).map((item, index) => (
                    <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                      <div className="text-xs text-gray-500">{item.QUARTER}</div>
                      <div className="text-lg font-bold text-gray-900">{item.SYEZB}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 品类销售占比 */}
            {data.categorySales && data.categorySales.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="text-sm font-medium text-gray-700 mb-3">品类销售占比</div>
                <div className="space-y-2">
                  {data.categorySales
                    .filter((c) => c && c.PRODCATEGORY)
                    .map((item, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-lg ${
                          index === data.categorySales.length - 1 ? "bg-blue-50 font-bold" : "bg-gray-50"
                        }`}
                      >
                        <span className="text-sm text-gray-700">{item.PRODCATEGORY}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500">{item.QUANTITY || 0}件</span>
                          <span className="text-sm font-bold text-blue-600">{item.SYEZB || 0}%</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* 报告内容 */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <span className="text-sm font-medium text-gray-700">报告内容</span>
                <button
                  onClick={handleCopy}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  {copied ? "已复制" : "复制"}
                </button>
              </div>
              <pre className="p-4 text-sm text-gray-800 whitespace-pre-wrap font-mono bg-gray-50">
                {generateReport(data, startDate)}
              </pre>
            </div>

            {/* 更新时间 */}
            <div className="text-center text-xs text-gray-400 pt-2">
              更新时间: {new Date(data.fetchedAt).toLocaleString("zh-CN")}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
