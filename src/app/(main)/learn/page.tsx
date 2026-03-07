import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学院 - AI工具市场",
  description: "系统学习 AI 能力平台，从入门到专家的完整学习路径",
};

// 三大学习阶段
const learningStages = [
  {
    id: "beginner",
    title: "基础阶段",
    description: "建立认知基础，掌握工具使用",
    icon: "🌱",
    gradient: "from-emerald-500 to-teal-600",
    courses: [
      { name: "AI 基础认知", duration: "45分钟", type: "overview", level: "beginner" },
      { name: "提示词工程入门", duration: "40分钟", type: "prompt", level: "beginner" },
      { name: "Skill 使用指南", duration: "35分钟", type: "skill", level: "beginner" },
      { name: "MCP 快速上手", duration: "30分钟", type: "mcp", level: "beginner" },
      { name: "Workflow 入门", duration: "30分钟", type: "workflow", level: "beginner" },
    ],
  },
  {
    id: "developer",
    title: "开发阶段",
    description: "深入学习技术实现，构建智能应用",
    icon: "💻",
    gradient: "from-blue-500 to-indigo-600",
    courses: [
      { name: "提示词高级技巧", duration: "50分钟", type: "prompt", level: "developer" },
      { name: "Skill 开发实战", duration: "45分钟", type: "skill", level: "developer" },
      { name: "MCP Server 开发", duration: "50分钟", type: "mcp", level: "developer" },
      { name: "Workflow 设计模式", duration: "45分钟", type: "workflow", level: "developer" },
      { name: "Agent 核心原理", duration: "50分钟", type: "agent", level: "developer" },
    ],
  },
  {
    id: "architect",
    title: "架构阶段",
    description: "设计企业级方案，构建可扩展系统",
    icon: "🏛️",
    gradient: "from-purple-500 to-violet-600",
    courses: [
      { name: "Knowledge 系统架构", duration: "55分钟", type: "knowledge", level: "architect" },
      { name: "多 Agent 协作设计", duration: "60分钟", type: "agent", level: "architect" },
      { name: "企业级 Workflow", duration: "55分钟", type: "workflow", level: "architect" },
      { name: "安全与合规体系", duration: "50分钟", type: "mcp", level: "architect" },
      { name: "系统架构设计", duration: "60分钟", type: "knowledge", level: "architect" },
    ],
  },
];

// 六大核心能力 - 每个能力对应3个阶段的课程
const abilities = [
  {
    name: "Skill",
    icon: "✨",
    description: "可复用的能力模块",
    color: "from-blue-500 to-cyan-500",
    courses: [
      { level: "beginner", title: "Skill 使用指南", duration: "35分钟" },
      { level: "developer", title: "Skill 开发实战", duration: "45分钟" },
      { level: "architect", title: "企业级 Skill 设计", duration: "50分钟" },
    ],
  },
  {
    name: "Prompt",
    icon: "📝",
    description: "高效沟通的模板",
    color: "from-orange-500 to-yellow-500",
    courses: [
      { level: "beginner", title: "提示词工程入门", duration: "40分钟" },
      { level: "developer", title: "提示词高级技巧", duration: "50分钟" },
      { level: "architect", title: "企业级提示词体系", duration: "45分钟" },
    ],
  },
  {
    name: "MCP",
    icon: "🔌",
    description: "外部服务接入",
    color: "from-purple-500 to-pink-500",
    courses: [
      { level: "beginner", title: "MCP 快速上手", duration: "30分钟" },
      { level: "developer", title: "MCP Server 开发", duration: "50分钟" },
      { level: "architect", title: "MCP 安全与扩展", duration: "45分钟" },
    ],
  },
  {
    name: "Workflow",
    icon: "🔄",
    description: "多步骤任务编排",
    color: "from-indigo-500 to-violet-500",
    courses: [
      { level: "beginner", title: "Workflow 入门", duration: "30分钟" },
      { level: "developer", title: "Workflow 设计模式", duration: "45分钟" },
      { level: "architect", title: "企业级 Workflow", duration: "55分钟" },
    ],
  },
  {
    name: "Agent",
    icon: "🤖",
    description: "自主决策的 AI 助手",
    color: "from-green-500 to-emerald-500",
    courses: [
      { level: "beginner", title: "Agent 基础概念", duration: "35分钟" },
      { level: "developer", title: "Agent 核心原理", duration: "50分钟" },
      { level: "architect", title: "多 Agent 协作设计", duration: "60分钟" },
    ],
  },
  {
    name: "Knowledge",
    icon: "📚",
    description: "企业知识智能检索",
    color: "from-rose-500 to-red-500",
    courses: [
      { level: "beginner", title: "Knowledge 基础", duration: "30分钟" },
      { level: "developer", title: "Knowledge 开发", duration: "45分钟" },
      { level: "architect", title: "Knowledge 系统架构", duration: "55分钟" },
    ],
  },
];

const levelLabels: Record<string, string> = {
  beginner: "基础",
  developer: "进阶",
  architect: "高级",
};

export default function LearnPage() {
  return (
    <div className="p-8">
      {/* 页面标题 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 学院</h1>
        <p className="text-gray-600">系统学习 AI 能力平台，从入门到专家的完整学习路径</p>
      </div>

      {/* 三大学习阶段 */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-gray-900 mb-4">学习路径</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {learningStages.map((stage) => (
            <Link
              key={stage.id}
              href={`/learn/path/${stage.id}`}
              className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
            >
              {/* 头部 */}
              <div className={`bg-gradient-to-r ${stage.gradient} p-4 text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                    {stage.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{stage.title}</h3>
                    <p className="text-sm text-white/80">{stage.courses.length} 门课程</p>
                  </div>
                </div>
              </div>
              
              {/* 描述 */}
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-600">{stage.description}</p>
              </div>

              {/* 课程列表 */}
              <div className="p-4">
                <div className="space-y-2">
                  {stage.courses.map((course, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded bg-gray-100 text-gray-500 text-xs flex items-center justify-center">
                        {idx + 1}
                      </span>
                      <span className="text-gray-700 flex-1">{course.name}</span>
                      <span className="text-gray-400 text-xs">{course.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 能力课程 - 每个能力对应3个阶段 */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">能力课程</h2>
        <p className="text-sm text-gray-500 mb-4">每个核心能力都包含基础、进阶、高级三个阶段的课程</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {abilities.map((ability) => (
            <div
              key={ability.name}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden"
            >
              {/* 能力头部 */}
              <div className={`bg-gradient-to-r ${ability.color} p-4 text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                    {ability.icon}
                  </div>
                  <div>
                    <h3 className="font-bold">{ability.name}</h3>
                    <p className="text-sm text-white/80">{ability.description}</p>
                  </div>
                </div>
              </div>

              {/* 三个阶段的课程 */}
              <div className="p-4 space-y-2">
                {ability.courses.map((course, idx) => (
                  <Link
                    key={course.level}
                    href={`/learn/${ability.name.toLowerCase()}/${course.level}`}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="w-6 h-6 rounded text-xs flex items-center justify-center text-white bg-gradient-to-r from-gray-500 to-gray-600">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gray-700 group-hover:text-blue-600 flex-1">
                      {course.title}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {levelLabels[course.level]}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
