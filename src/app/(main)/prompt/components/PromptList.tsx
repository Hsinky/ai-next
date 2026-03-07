"use client";

import { useState } from "react";
import Link from "next/link";

interface Prompt {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  uses: number;
  rating: number;
  variables: string[];
  tags: string[];
  author: string;
  updatedAt: string;
}

const categories = ["全部", "开发", "写作", "产品", "数据库", "文档", "HR"];

export default function PromptList({ initialPrompts }: { initialPrompts: Prompt[] }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrompts = initialPrompts.filter((prompt) => {
    const matchCategory =
      activeCategory === "全部" || prompt.category === activeCategory;
    const matchSearch =
      prompt.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">模板总数</div>
          <div className="text-3xl font-bold text-gray-900">{initialPrompts.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">总使用次数</div>
          <div className="text-3xl font-bold text-green-600">
            {(initialPrompts.reduce((sum, p) => sum + p.uses, 0) / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">平均评分</div>
          <div className="text-3xl font-bold text-blue-600">
            {(initialPrompts.reduce((sum, p) => sum + p.rating, 0) / initialPrompts.length).toFixed(1)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">变量数量</div>
          <div className="text-3xl font-bold text-purple-600">
            {initialPrompts.reduce((sum, p) => sum + p.variables.length, 0)}
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
              placeholder="搜索模板..."
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

      {/* 模板列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrompts.map((prompt) => (
          <Link
            key={prompt.id}
            href={`/prompt/${prompt.id}`}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group block"
          >
            {/* 卡片头部 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {prompt.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {prompt.name}
                  </h3>
                  {prompt.tags.map((tag) => (
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
                <p className="text-sm text-gray-500 mt-1">{prompt.category}</p>
              </div>
            </div>

            {/* 描述 */}
            <p className="text-sm text-gray-600 mb-4">{prompt.description}</p>

            {/* 变量标签 */}
            <div className="flex flex-wrap gap-2 mb-4">
              {prompt.variables.map((variable) => (
                <span
                  key={variable}
                  className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded font-mono"
                >
                  {variable}
                </span>
              ))}
            </div>

            {/* 统计 */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <span>📊</span>
                {prompt.uses.toLocaleString()} 次使用
              </span>
              <span className="flex items-center gap-1">
                <span>⭐</span>
                {prompt.rating}
              </span>
            </div>

            {/* 作者和更新时间 */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span>作者: {prompt.author}</span>
              <span>{prompt.updatedAt}</span>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <span className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
                查看详情
              </span>
              <span className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                使用
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 无结果 */}
      {filteredPrompts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">没有找到相关模板</p>
          <p className="text-gray-400 text-sm mt-2">尝试其他搜索词或分类</p>
        </div>
      )}
    </>
  );
}
