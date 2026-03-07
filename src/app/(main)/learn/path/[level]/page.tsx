import Link from "next/link";
import type { Metadata } from "next";

interface Course {
  name: string;
  duration: string;
  type: string;
  level: string;
  topics: string[];
  description: string;
}

interface StageData {
  title: string;
  description: string;
  icon: string;
  gradient: string;
  target: string;
  prerequisites: string[];
  courses: Course[];
}

const stageData: Record<string, StageData> = {
  beginner: {
    title: "基础阶段",
    description: "建立 AI 认知基础，掌握核心工具使用，适合初学者入门",
    icon: "🌱",
    gradient: "from-emerald-500 to-teal-600",
    target: "产品经理、运营、初次接触 AI 的学习者",
    prerequisites: ["无需编程基础", "对 AI 有基本好奇心"],
    courses: [
      {
        name: "AI 基础认知",
        duration: "45分钟",
        type: "overview",
        level: "beginner",
        topics: ["AI发展历程", "核心概念", "能力边界", "应用场景"],
        description: "全面了解人工智能的发展脉络、核心概念和实际应用边界",
      },
      {
        name: "提示词工程入门",
        duration: "40分钟",
        type: "prompt",
        level: "beginner",
        topics: ["提示词结构", "基本原则", "常见技巧", "实战练习"],
        description: "掌握与 AI 有效沟通的基础方法，学会编写高质量提示词",
      },
      {
        name: "Skill 使用指南",
        duration: "35分钟",
        type: "skill",
        level: "beginner",
        topics: ["Skill概念", "调用方法", "参数配置", "最佳实践"],
        description: "理解 Skill 的概念，学会使用各类 Skill 完成任务",
      },
      {
        name: "MCP 快速上手",
        duration: "30分钟",
        type: "mcp",
        level: "beginner",
        topics: ["MCP原理", "安装配置", "常用工具", "安全须知"],
        description: "了解 MCP 协议，学会安装配置和基本使用方法",
      },
      {
        name: "Workflow 入门",
        duration: "30分钟",
        type: "workflow",
        level: "beginner",
        topics: ["工作流概念", "基本组成", "简单编排", "实践案例"],
        description: "理解工作流的基本概念，学会创建简单的自动化流程",
      },
    ],
  },
  developer: {
    title: "开发阶段",
    description: "深入学习技术实现，构建智能应用，适合开发者进阶",
    icon: "💻",
    gradient: "from-blue-500 to-indigo-600",
    target: "前端/后端开发者、技术实施人员",
    prerequisites: ["掌握基础知识", "具备编程能力", "了解 API 开发"],
    courses: [
      {
        name: "提示词高级技巧",
        duration: "50分钟",
        type: "prompt",
        level: "developer",
        topics: ["思维链技术", "Few-Shot学习", "结构化输出", "调优方法"],
        description: "深入掌握 Chain-of-Thought、Few-Shot 等高级提示词技术",
      },
      {
        name: "Skill 开发实战",
        duration: "45分钟",
        type: "skill",
        level: "developer",
        topics: ["开发规范", "参数设计", "错误处理", "性能优化"],
        description: "学习 Skill 开发规范，掌握从设计到实现的完整流程",
      },
      {
        name: "MCP Server 开发",
        duration: "50分钟",
        type: "mcp",
        level: "developer",
        topics: ["协议详解", "服务开发", "工具注册", "调试技巧"],
        description: "深入 MCP 协议细节，开发自定义 MCP Server",
      },
      {
        name: "Workflow 设计模式",
        duration: "45分钟",
        type: "workflow",
        level: "developer",
        topics: ["设计原则", "分支处理", "异常机制", "监控日志"],
        description: "掌握工作流设计原则，构建可靠的自动化流程",
      },
      {
        name: "Agent 核心原理",
        duration: "50分钟",
        type: "agent",
        level: "developer",
        topics: ["架构解析", "决策机制", "工具调用", "执行优化"],
        description: "深入理解 Agent 架构，掌握智能决策和工具调用机制",
      },
    ],
  },
  architect: {
    title: "架构阶段",
    description: "设计企业级解决方案，构建可扩展系统，适合架构师深造",
    icon: "🏛️",
    gradient: "from-purple-500 to-violet-600",
    target: "技术负责人、企业架构师、解决方案架构师",
    prerequisites: ["掌握开发知识", "具备架构思维", "了解企业级系统"],
    courses: [
      {
        name: "Knowledge 系统架构",
        duration: "55分钟",
        type: "knowledge",
        level: "architect",
        topics: ["RAG架构", "向量化方案", "检索优化", "知识更新"],
        description: "设计企业级知识库系统，掌握 RAG 架构和检索优化技术",
      },
      {
        name: "多 Agent 协作设计",
        duration: "60分钟",
        type: "agent",
        level: "architect",
        topics: ["协作模式", "通信机制", "任务分发", "冲突处理"],
        description: "设计多 Agent 协作系统，解决复杂业务场景",
      },
      {
        name: "企业级 Workflow",
        duration: "55分钟",
        type: "workflow",
        level: "architect",
        topics: ["高可用设计", "性能调优", "容灾方案", "监控告警"],
        description: "构建高可用、高性能的企业级工作流系统",
      },
      {
        name: "安全与合规体系",
        duration: "50分钟",
        type: "mcp",
        level: "architect",
        topics: ["数据安全", "权限模型", "审计日志", "合规要求"],
        description: "建立完善的安全合规体系，满足企业级要求",
      },
      {
        name: "系统架构设计",
        duration: "60分钟",
        type: "knowledge",
        level: "architect",
        topics: ["整体架构", "扩展设计", "成本优化", "演进路线"],
        description: "设计可扩展、可演进的 AI 平台整体架构",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const data = stageData[level];
  
  if (!data) {
    return { title: "课程不存在 - AI工具市场" };
  }
  
  return {
    title: `${data.title} - AI学院`,
    description: data.description,
  };
}

export default async function PathPage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const data = stageData[level];

  if (!data) {
    return (
      <div className="p-8 text-center py-20">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">课程不存在</h1>
        <Link href="/learn" className="text-blue-600 hover:text-blue-700">返回学院</Link>
      </div>
    );
  }

  const totalDuration = data.courses.reduce((sum, c) => sum + parseInt(c.duration), 0);

  return (
    <div className="p-8">
      {/* 面包屑 */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/learn" className="hover:text-gray-700 transition-colors">学院</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{data.title}</span>
      </nav>

      {/* 阶段头部 */}
      <div className={`bg-gradient-to-r ${data.gradient} rounded-xl p-6 text-white mb-6`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
            {data.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{data.title}</h1>
            <p className="text-white/80 text-sm">{data.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/80">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {totalDuration}分钟
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {data.courses.length}门课程
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.target}
          </span>
        </div>
      </div>

      {/* 前置条件 */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-2 text-sm">📋 学习前置条件</h3>
        <div className="flex flex-wrap gap-2">
          {data.prerequisites.map((pre, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
              {pre}
            </span>
          ))}
        </div>
      </div>

      {/* 课程列表 */}
      <div className="space-y-3">
        {data.courses.map((course, index) => (
          <Link
            key={course.name}
            href={`/learn/${course.type}/${course.level}`}
            className="group block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md hover:border-gray-300 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${data.gradient} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                {index + 1}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {course.name}
                  </h3>
                  <span className="text-xs text-gray-400">{course.duration}</span>
                </div>
                <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                <div className="flex flex-wrap gap-1">
                  {course.topics.map((topic, idx) => (
                    <span key={idx} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 self-center">
                <svg className="w-5 h-5 text-gray-300 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
