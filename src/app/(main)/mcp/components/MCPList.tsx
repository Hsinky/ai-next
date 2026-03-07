"use client";

import { useState } from "react";
import Link from "next/link";

interface MCPServer {
  id: number;
  name: string;
  version: string;
  status: string;
  icon: string;
  category: string;
  uptime: string;
  connections: number;
  lastUpdate: string;
  latency: string;
  tags: string[];
}

const categories = ["全部", "数据库", "文件系统", "网络", "通讯", "搜索", "AI"];

export default function MCPServerList({ initialServers }: { initialServers: MCPServer[] }) {
  const [activeCategory, setActiveCategory] = useState("全部");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServers = initialServers.filter((server) => {
    const matchCategory =
      activeCategory === "全部" || server.category === activeCategory;
    const matchSearch =
      server.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">服务器总数</div>
          <div className="text-3xl font-bold text-gray-900">{initialServers.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">运行中</div>
          <div className="text-3xl font-bold text-green-600">
            {initialServers.filter((s) => s.status === "运行中").length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">活跃连接</div>
          <div className="text-3xl font-bold text-blue-600">
            {initialServers.reduce((sum, s) => sum + s.connections, 0)}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-gray-500 text-sm mb-2">平均延迟</div>
          <div className="text-3xl font-bold text-purple-600">
            {Math.round(
              initialServers
                .filter((s) => s.status === "运行中")
                .reduce((sum, s) => sum + parseInt(s.latency), 0) /
                initialServers.filter((s) => s.status === "运行中").length
            )}
            ms
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
              placeholder="搜索服务器..."
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

      {/* 服务器列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServers.map((server) => (
          <Link
            key={server.id}
            href={`/mcp/${server.id}`}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer group block"
          >
            {/* 卡片头部 */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                {server.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                    {server.name}
                  </h3>
                  {server.tags.map((tag) => (
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
                <p className="text-sm text-gray-500 mt-1">{server.category}</p>
              </div>
            </div>

            {/* 版本和状态 */}
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-gray-500">版本: {server.version}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  server.status === "运行中"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {server.status}
              </span>
            </div>

            {/* 性能指标 */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div className="flex items-center gap-1 text-gray-600">
                <span>⏱️</span>
                <span>延迟: {server.latency}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>📊</span>
                <span>可用性: {server.uptime}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>🔗</span>
                <span>连接: {server.connections}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <span>🕐</span>
                <span>{server.lastUpdate}</span>
              </div>
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
      {filteredServers.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">没有找到相关服务器</p>
          <p className="text-gray-400 text-sm mt-2">尝试其他搜索词或分类</p>
        </div>
      )}
    </>
  );
}
