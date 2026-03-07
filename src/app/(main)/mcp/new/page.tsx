"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewMCPPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    category: "数据库",
    version: "1.0.0",
    icon: "🗄️",
    endpoint: "",
    port: "",
  });

  const categories = ["数据库", "文件系统", "网络", "通讯", "搜索", "AI", "其他"];
  const icons = ["🗄️", "📁", "🌐", "📧", "🔍", "🤖", "🔌", "⚡", "🌟", "🔮"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("新增MCP服务器:", formData);
    // TODO: 调用 API 保存数据
    router.push("/mcp");
  };

  return (
    <div className="p-8">
      {/* 面包屑导航 */}
      <nav className="mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-700">
          首页
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <Link href="/mcp" className="text-gray-500 hover:text-gray-700">
          MCP 管理
        </Link>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-900 font-medium">新增 MCP 服务器</span>
      </nav>

      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🔌</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">新增 MCP 服务器</h1>
            <p className="text-lg text-gray-600">配置新的 MCP 服务器，扩展系统能力</p>
          </div>
        </div>
      </header>

      {/* 主内容区 - 左右分栏 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 左侧表单 */}
        <div className="xl:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8">
            <div className="space-y-8">
              {/* 服务器信息 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  服务器信息
                </h3>
                <div className="space-y-6">
                  {/* 服务器名称 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      服务器名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="输入服务器名称，例如：Database MCP Server"
                      className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* 分类和版本 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        分类 <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        版本 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.version}
                        onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                        placeholder="例如：1.0.0"
                        className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 连接配置 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  连接配置
                </h3>
                <div className="space-y-6">
                  {/* 端点 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      服务端点 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.endpoint}
                      onChange={(e) => setFormData({ ...formData, endpoint: e.target.value })}
                      placeholder="https://example.com"
                      className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      MCP 服务器的 URL 地址，必须以 http:// 或 https:// 开头
                    </p>
                  </div>

                  {/* 端口 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      端口
                    </label>
                    <input
                      type="number"
                      value={formData.port}
                      onChange={(e) => setFormData({ ...formData, port: e.target.value })}
                      placeholder="例如：3000"
                      className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      可选，如果使用标准端口可留空
                    </p>
                  </div>
                </div>
              </div>

              {/* 图标选择 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  选择图标 <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-5 gap-4">
                  {icons.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`aspect-square rounded-2xl border-2 transition-all flex items-center justify-center ${
                        formData.icon === icon
                          ? "border-blue-500 bg-blue-50 shadow-md transform scale-105"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-3xl">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 操作按钮 */}
            <div className="flex gap-4 mt-10 pt-8 border-t border-gray-200">
              <Link
                href="/mcp"
                className="px-8 py-4 text-base font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                取消
              </Link>
              <button
                type="submit"
                className="px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all"
              >
                添加服务器
              </button>
            </div>
          </form>
        </div>

        {/* 右侧预览卡片 */}
        <div className="xl:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* 预览卡片 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">👁️ 实时预览</h3>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                    {formData.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {formData.name || "服务器名称"}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">{formData.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-gray-500">版本: {formData.version}</span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                    已连接
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span>⏱️</span>
                    <span>12ms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🔗</span>
                    <span>24 连接</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 连接状态 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 连接状态</h3>
              {formData.endpoint ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">端点</span>
                    <span className="text-gray-900 font-medium">{formData.endpoint}</span>
                  </div>
                  {formData.port && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">端口</span>
                      <span className="text-gray-900 font-medium">{formData.port}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-4">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm text-green-600">连接就绪</span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span className="text-sm text-gray-500">等待配置...</span>
                </div>
              )}
            </div>

            {/* 提示卡片 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 配置提示</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>确保服务器端点可从网络访问</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>建议使用 HTTPS 保证连接安全</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>端口需已在防火墙中开放</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 mt-1">•</span>
                  <span>服务器应支持标准的 MCP 协议</span>
                </li>
              </ul>
            </div>

            {/* 快速统计 */}
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">📊 平台统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">服务器数</span>
                  <span className="font-bold text-xl">6</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">总连接</span>
                  <span className="font-bold text-xl">138</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">平均延迟</span>
                  <span className="font-bold text-xl">15ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
