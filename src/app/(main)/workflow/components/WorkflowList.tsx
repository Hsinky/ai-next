"use client";

import { useState } from "react";
import Link from "next/link";

interface Workflow {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  steps: number;
  status: string;
  runs: number;
  successRate: string;
  avgDuration: string;
  tags: string[];
  lastRun: string;
}

const categories = ["全部", "DevOps", "内容", "数据", "客服", "报表"];

export default function WorkflowList({ initialWorkflows }: { initialWorkflows: Workflow[] }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredWorkflows = initialWorkflows.filter((workflow) => {
    const matchCategory =
      activeCategory === "全部" || workflow.category === activeCategory;
    const matchSearch =
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">工作流总数</div>
          <div className="text-3xl font-bold text-gray-900">{initialWorkflows.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">运行中</div>
          <div className="text-3xl font-bold text-green-600">
            {initialWorkflows.filter((w) => w.status === "运行中").length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">总执行次数</div>
          <div className="text-3xl font-bold text-blue-600">
            {(initialWorkflows.reduce((sum, w) => sum + w.runs, 0) / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">总步骤数</div>
          <div className="text-3xl font-bold text-purple-600">
            {initialWorkflows.reduce((sum, w) => sum + w.steps, 0)}
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  activeCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="搜索工作流..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
        </div>
      </div>

      {/* 工作流列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Link
            key={workflow.id}
            href={`/workflow/${workflow.id}`}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group block"
          >
            {/* 卡片头部 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {workflow.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {workflow.name}
                  </h3>
                  {workflow.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tag === "热门"
                          ? "bg-red-100 text-red-600"
                          : tag === "推荐"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">{workflow.category} · {workflow.steps} 步骤</p>
              </div>
            </div>

            {/* 描述 */}
            <p className="text-sm text-gray-600 mb-4">{workflow.description}</p>

            {/* 状态 */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-500">步骤数: {workflow.steps}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  workflow.status === "运行中"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {workflow.status}
              </span>
            </div>

            {/* 性能指标 */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <span>📊</span>
                <span>执行: {workflow.runs.toLocaleString()}次</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>✅</span>
                <span>成功: {workflow.successRate}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>⏱️</span>
                <span>平均: {workflow.avgDuration}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>🕐</span>
                <span>{workflow.lastRun}</span>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <span className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
                查看详情
              </span>
              <span className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                编辑
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 无结果 */}
      {filteredWorkflows.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">没有找到相关工作流</p>
          <p className="text-gray-400 text-sm mt-2">尝试其他搜索词或分类</p>
        </div>
      )}
    </>
  );
}
