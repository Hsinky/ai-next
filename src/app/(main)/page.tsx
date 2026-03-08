import Link from "next/link";
import {
  getSkills,
  getMCPServers,
  getAgents,
  getPrompts,
  getWorkflows,
  type Skill,
  type MCPServer,
  type Agent,
  type Prompt,
  type Workflow,
} from "@/lib/data";

// 难度配置
const difficultyLabels = {
  beginner: { label: '入门', color: 'bg-green-100 text-green-700' },
  intermediate: { label: '进阶', color: 'bg-yellow-100 text-yellow-700' },
  advanced: { label: '专业', color: 'bg-red-100 text-red-700' },
};

// 能力说明配置
const abilityInfo = [
  {
    name: "Skill",
    icon: "✨",
    path: "/skill",
    description: "可复用的能力模块",
    detail: "Skill 是封装好的 AI 能力单元，可直接调用完成特定任务，如文本处理、数据分析、代码生成等。"
  },
  {
    name: "MCP",
    icon: "🔌",
    path: "/mcp",
    description: "外部服务快速接入",
    detail: "MCP (Model Context Protocol) 让 AI 能够连接外部工具和服务，如数据库、API、文件系统等。"
  },
  {
    name: "Agent",
    icon: "🤖",
    path: "/agent",
    description: "自主决策的 AI 助手",
    detail: "Agent 具有自主决策能力，能理解目标并规划执行步骤，自动完成复杂任务链。"
  },
  {
    name: "Prompt",
    icon: "📝",
    path: "/prompt",
    description: "高效沟通的模板",
    detail: "Prompt 是经过优化的提示词模板，帮助用户更准确地与 AI 沟通，获得高质量输出。"
  },
  {
    name: "Workflow",
    icon: "🔄",
    path: "/workflow",
    description: "多步骤任务编排",
    detail: "Workflow 支持将多个能力串联成工作流，自动化执行复杂的多步骤任务。"
  },
  {
    name: "Knowledge",
    icon: "📚",
    path: "/knowledge",
    description: "企业知识智能检索",
    detail: "Knowledge 构建企业专属知识库，让 AI 基于私有数据进行智能问答和内容生成。"
  },
];

export default function Home() {
  // 直接从共享数据层获取数据，无需 HTTP 调用
  const skills = getSkills();
  const mcpServers = getMCPServers();
  const agents = getAgents();
  const prompts = getPrompts();
  const workflows = getWorkflows();

  return (
    <div className="p-8">
      {/* 头部欢迎区 */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          探索智能工具，提升工作效率
        </h1>
        <p className="text-gray-500">发现并使用优质的 AI 能力资源</p>
      </header>

      {/* 能力概览 - 展示所有6种能力 */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">🎯 能力概览</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {abilityInfo.map((ability) => (
            <Link
              key={ability.name}
              href={ability.path}
              className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{ability.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{ability.name}</h3>
                    <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{ability.description}</p>
                  <p className="text-xs text-gray-400 mt-2 line-clamp-2">{ability.detail}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">Skill 总数</span>
            <span className="text-xl">✨</span>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {skills.filter((s) => s.status === "已启用").length}
          </div>
          <div className="text-xs text-gray-400 mt-1">可直接使用</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">累计调用</span>
            <span className="text-xl">📊</span>
          </div>
          <div className="text-3xl font-bold text-green-600">
            {(skills.reduce((sum, s) => sum + s.apiCalls, 0) / 1000).toFixed(1)}
            k
          </div>
          <div className="text-xs text-gray-400 mt-1">稳定运行中</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">MCP 服务</span>
            <span className="text-xl">🔌</span>
          </div>
          <div className="text-3xl font-bold text-purple-600">
            {mcpServers.filter((s) => s.status === "运行中").length}
          </div>
          <div className="text-xs text-gray-400 mt-1">正常运行</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500 text-sm">活跃连接</span>
            <span className="text-xl">🔗</span>
          </div>
          <div className="text-3xl font-bold text-orange-600">
            {mcpServers.reduce((sum, s) => sum + s.connections, 0)}
          </div>
          <div className="text-xs text-gray-400 mt-1">实时在线</div>
        </div>
      </div>

      {/* Skill 热门推荐 */}
      {skills.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">✨ Skill 热门</h2>
              <p className="text-sm text-gray-500 mt-1">高使用量的能力模块</p>
            </div>
            <Link href="/skill" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.slice(0, 3).map((skill) => (
              <Link
                key={skill.id}
                href={`/skill/${skill.id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group block hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {skill.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                        {skill.name}
                      </h3>
                      {skill.difficulty && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyLabels[skill.difficulty].color}`}>
                          {difficultyLabels[skill.difficulty].label}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{skill.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{skill.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><span>👥</span>{skill.users}</span>
                    <span className="flex items-center gap-1"><span>⭐</span>{skill.rating}</span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* MCP 服务接入 */}
      {mcpServers.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">🔌 MCP 服务</h2>
              <p className="text-sm text-gray-500 mt-1">外部工具与服务接入</p>
            </div>
            <Link href="/mcp" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mcpServers.slice(0, 3).map((server) => (
              <Link
                key={server.id}
                href={`/mcp/${server.id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group block hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {server.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{server.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{server.category}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>⚡</span>
                    <span>响应: {server.latency}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📈</span>
                    <span>稳定性: {server.uptime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${server.status === "运行中" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"}`}>
                    {server.status}
                  </span>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Agent 智能助手 */}
      {agents.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">🤖 Agent 智能助手</h2>
              <p className="text-sm text-gray-500 mt-1">自主决策的 AI 助手</p>
            </div>
            <Link href="/agent" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.slice(0, 3).map((agent) => (
              <Link
                key={agent.id}
                href={`/agent/${agent.id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group block hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {agent.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{agent.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{agent.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{agent.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>任务: {agent.tasks}</span>
                    <span>成功率: {agent.successRate}</span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Prompt 模板库 */}
      {prompts.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">📝 Prompt 模板库</h2>
              <p className="text-sm text-gray-500 mt-1">高效沟通的提示词模板</p>
            </div>
            <Link href="/prompt" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {prompts.slice(0, 3).map((prompt) => (
              <Link
                key={prompt.id}
                href={`/prompt/${prompt.id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group block hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {prompt.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{prompt.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{prompt.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{prompt.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {prompt.variables.slice(0, 3).map((variable) => (
                    <span key={variable} className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded font-mono">
                      {variable}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>使用: {prompt.uses}</span>
                    <span>⭐ {prompt.rating}</span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Workflow 自动化 */}
      {workflows.length > 0 && (
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">🔄 Workflow 自动化</h2>
              <p className="text-sm text-gray-500 mt-1">多步骤任务编排</p>
            </div>
            <Link href="/workflow" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              查看全部 →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.slice(0, 3).map((workflow) => (
              <Link
                key={workflow.id}
                href={`/workflow/${workflow.id}`}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group block hover:border-blue-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {workflow.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{workflow.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{workflow.category}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{workflow.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>步骤: {workflow.steps}</span>
                    <span>运行: {workflow.runs}</span>
                  </div>
                  <span className="text-blue-600 text-sm font-medium group-hover:text-blue-700">了解详情 →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
