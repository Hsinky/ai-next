"use client";

import Link from "next/link";
import { useState } from "react";
import {
  stageConfig,
  moduleConfig,
  getModuleLessons,
  difficultyConfig,
} from "@/data/curriculum";
import { LearningStats, LearningRoadmap } from "./ProgressTracker";

// 导出章节组件供其他组件使用
export { IntroductionSection } from "./sections/IntroductionSection";
export { ConceptSection } from "./sections/ConceptSection";
export { ExampleSection } from "./sections/ExampleSection";
export { CodeSection } from "./sections/CodeSection";
export { NoteSection } from "./sections/NoteSection";
export { WarningSection } from "./sections/WarningSection";
export { SummarySection } from "./sections/SummarySection";

// 学习阶段
const stages = Object.values(stageConfig);

// 难度标签映射（保留供未来使用）
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _levelLabels: Record<string, string> = {
  beginner: "入门",
  developer: "进阶",
  architect: "高级",
};

export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<"stages" | "modules" | "progress">(
    "stages",
  );

  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
          <span className="mr-2">📚</span>
          AI博士学院
        </h1>
        <p className="text-gray-600">
          系统学习 AI 能力平台，从入门到精通的完整学习路径
        </p>
      </div>

      {/* 标签页切换 */}
      <div className="flex gap-2 mb-8">
        {[
          { key: "stages", label: "学习阶段" },
          { key: "modules", label: "课程模块" },
          { key: "progress", label: "学习进度" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 学习阶段视图 */}
      {activeTab === "stages" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {stages.map((stage) => (
            <Link
              key={stage.id}
              href={`/learn/path/${stage.id}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
            >
              {/* 头部 */}
              <div
                className={`bg-linear-to-r ${stage.gradient} p-4 text-white`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                    {stage.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{stage.title}</h3>
                    <p className="text-sm text-white/80">{stage.subtitle}</p>
                  </div>
                </div>
              </div>

              {/* 描述 */}
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-600">{stage.description}</p>
              </div>

              {/* 模块列表 */}
              <div className="p-4">
                <div className="space-y-2">
                  {stage.modules.map((moduleId) => {
                    const moduleData = moduleConfig[moduleId];
                    return (
                      <div
                        key={moduleId}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="w-5 h-5 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center">
                          {moduleData?.icon ?? "📚"}
                        </span>
                        <span className="text-gray-700">
                          {moduleData?.title ?? moduleId}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 课程模块视图 */}
      {activeTab === "modules" && (
        <div className="space-y-8">
          {stages.map((stage) => (
            <div key={stage.id}>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className={`w-8 h-8 rounded-lg bg-linear-to-r ${stage.gradient} flex items-center justify-center text-white`}
                >
                  {stage.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {stage.title}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stage.modules.map((moduleId) => {
                  const moduleData = moduleConfig[moduleId];
                  const lessons = getModuleLessons(moduleId);
                  const difficulty =
                    difficultyConfig[moduleData?.difficulty ?? "beginner"];

                  return (
                    <div
                      key={moduleId}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                    >
                      <div
                        className={`bg-linear-to-r ${moduleData?.color ?? "from-gray-500 to-gray-600"} p-4 text-white`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                            {moduleData?.icon ?? "📚"}
                          </div>
                          <div>
                            <h3 className="font-bold">
                              {moduleData?.title ?? moduleId}
                            </h3>
                            <p className="text-xs text-white/80">
                              {lessons.length}节课
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <p className="text-sm text-gray-600 mb-3">
                          {moduleData?.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className={`px-2 py-0.5 rounded text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}
                          >
                            {difficulty.label}
                          </span>
                          <Link
                            href={`/learn/module/${moduleId}`}
                            className="text-sm text-blue-600 hover:text-blue-700"
                          >
                            查看课程 →
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 学习进度视图 */}
      {activeTab === "progress" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LearningStats />
            <LearningRoadmap />
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">学习建议</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">🎯 新手入门</h4>
                <p className="text-sm text-blue-800">
                  建议从「AI本质与原理」开始，建立正确的AI认知，理解AI的真实工作方式。
                </p>
                <Link
                  href="/learn/lesson/ai-what-is"
                  className="mt-3 inline-block text-sm text-blue-600 hover:text-blue-700"
                >
                  开始学习 →
                </Link>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">📚 系统学习</h4>
                <p className="text-sm text-green-800">
                  按照阶段顺序学习：基础认知 → Prompt工程 → Agent开发 →
                  RAG知识库 → 生产实践
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h4 className="font-medium text-purple-900 mb-2">
                  💡 学习技巧
                </h4>
                <p className="text-sm text-purple-800">
                  每节课都配有代码示例和练习题，动手实践是掌握知识的关键。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 快速入口 */}
      <div className="mt-12 bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">开始你的AI学习之旅</h2>
            <p className="text-white/80">
              从基础认知开始，逐步掌握AI应用开发的核心技能
            </p>
          </div>
          <Link
            href="/learn/lesson/ai-what-is"
            className="px-6 py-3 bg-white text-blue-600 rounded-xl font-medium hover:bg-blue-50 transition-colors"
          >
            开始学习
          </Link>
        </div>
      </div>
    </div>
  );
}
