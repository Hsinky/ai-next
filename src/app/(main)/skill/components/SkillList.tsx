"use client";

import { useState } from "react";
import Link from "next/link";

interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  version: string;
  status: string;
  users: string;
  rating: number;
  tags: string[];
  lastUsed: string;
  apiCalls: number;
}

const categories = ["全部", "写作", "办公", "创意", "开发"];

export default function SkillList({ initialSkills }: { initialSkills: Skill[] }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSkills = initialSkills.filter((skill) => {
    const matchCategory =
      activeCategory === "全部" || skill.category === activeCategory;
    const matchSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">总技能数</div>
          <div className="text-3xl font-bold text-gray-900">{initialSkills.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">已启用</div>
          <div className="text-3xl font-bold text-green-600">
            {initialSkills.filter((s) => s.status === "已启用").length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">API 调用</div>
          <div className="text-3xl font-bold text-blue-600">
            {(initialSkills.reduce((sum, s) => sum + s.apiCalls, 0) / 1000).toFixed(1)}k
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">活跃技能</div>
          <div className="text-3xl font-bold text-purple-600">
            {initialSkills.filter((s) => s.status === "已启用").length}
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
              placeholder="搜索技能..."
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

      {/* 技能列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSkills.map((skill) => (
          <Link
            key={skill.id}
            href={`/skill/${skill.id}`}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group block"
          >
            {/* 卡片头部 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {skill.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {skill.name}
                  </h3>
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        tag === "热门"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">{skill.category}</p>
              </div>
            </div>

            {/* 版本和状态 */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-500">版本: {skill.version}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  skill.status === "已启用"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {skill.status}
              </span>
            </div>

            {/* 使用统计 */}
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1">
                <span>⏱️</span>
                {skill.lastUsed}
              </span>
              <span className="flex items-center gap-1">
                <span>📊</span>
                {skill.apiCalls.toLocaleString()} 次调用
              </span>
            </div>

            {/* 操作按钮 */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
              <span className="flex-1 px-3 py-2 text-sm text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 text-center">
                查看详情
              </span>
              <span className="flex-1 px-3 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 text-center">
                配置
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* 无结果 */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">没有找到相关技能</p>
          <p className="text-gray-400 text-sm mt-2">尝试其他搜索词或分类</p>
        </div>
      )}
    </>
  );
}
