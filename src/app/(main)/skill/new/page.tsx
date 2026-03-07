"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewSkillPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "写作",
    version: "1.0.0",
    icon: "✨",
  });

  const categories = ["写作", "办公", "创意", "开发", "视觉", "音频"];
  const icons = [
    "✍️",
    "📊",
    "🎨",
    "📈",
    "🎬",
    "💻",
    "👁️",
    "🎤",
    "🤖",
    "🔮",
    "⚡",
    "🌟",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("新增技能:", formData);
    // TODO: 调用 API 保存数据
    router.push("/skill");
  };

  return (
    <div className="p-8">
      {/* 面包屑导航 */}
      <nav className="mb-8">
        <Link
          href="/skill"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回 Skill 列表
        </Link>
      </nav>

      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">✨</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              新增 SKILL
            </h1>
            <p className="text-lg text-gray-600">
              创建新的 AI SKILL，丰富您的工具库
            </p>
          </div>
        </div>
      </header>

      {/* 主内容区 - 左右分栏 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 左侧表单 */}
        <div className="xl:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-gray-200 shadow-lg p-8"
          >
            <div className="space-y-8">
              {/* 基本信息 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  基本信息
                </h3>
                <div className="space-y-6">
                  {/* 技能名称 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      技能名称 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="输入技能名称，例如：AI 写作助手"
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
                        onChange={(e) =>
                          setFormData({ ...formData, category: e.target.value })
                        }
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
                        onChange={(e) =>
                          setFormData({ ...formData, version: e.target.value })
                        }
                        placeholder="例如：1.0.0"
                        className="w-full px-5 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 详细描述 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  详细描述
                </h3>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    技能描述 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="详细描述技能的功能和用途..."
                    className="w-full px-5 py-4 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              {/* 图标选择 */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                  选择图标 <span className="text-red-500">*</span>
                </h3>
                <div className="grid grid-cols-6 gap-4">
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
                href="/skill"
                className="px-8 py-4 text-base font-medium text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                取消
              </Link>
              <button
                type="submit"
                className="px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
              >
                创建技能
              </button>
            </div>
          </form>
        </div>

        {/* 右侧预览卡片 */}
        <div className="xl:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* 预览卡片 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                👁️ 实时预览
              </h3>
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-md">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
                    {formData.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {formData.name || "技能名称"}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {formData.category}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {formData.description || "技能描述将显示在这里..."}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    版本: {formData.version}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    新创建
                  </span>
                </div>
              </div>
            </div>

            {/* 提示卡片 */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                💡 创建提示
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>选择合适的分类可以帮助用户更快找到您的技能</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>描述应该清晰说明技能的功能和使用场景</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>版本号遵循语义化版本规范 (如：1.0.0)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>选择直观的图标可以提升识别度</span>
                </li>
              </ul>
            </div>

            {/* 快速统计 */}
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">📊 平台统计</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-90">总技能数</span>
                  <span className="font-bold text-xl">128</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">活跃用户</span>
                  <span className="font-bold text-xl">2.5万</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-90">API 调用</span>
                  <span className="font-bold text-xl">1.2M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
