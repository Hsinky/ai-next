import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "认证 - AI工具市场",
  description: "登录或注册您的账号",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex">
      {/* 左侧品牌区域 - 简约精致风格 */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f8f9fb] p-12 flex-col justify-between relative overflow-hidden">
        {/* 装饰性元素 */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-blue-100/50 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-56 h-56 bg-gradient-to-tr from-purple-100/40 to-transparent rounded-full blur-3xl" />
        
        {/* 几何装饰 */}
        <div className="absolute top-32 right-24 w-20 h-20 border border-gray-200/60 rounded-2xl rotate-12" />
        <div className="absolute bottom-44 left-16 w-12 h-12 border border-gray-200/60 rounded-full" />

        {/* 顶部 Logo */}
        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div>
              <span className="text-lg font-semibold text-gray-900">AI 工具市场</span>
              <p className="text-[10px] text-gray-400 tracking-[0.15em]">AI TOOLS CENTER</p>
            </div>
          </div>
        </div>

        {/* 中间内容区 */}
        <div className="relative space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-gray-900 leading-tight">
              让 AI 成为你的<br />
              <span className="text-gray-500">超级助手</span>
            </h2>
            <div className="space-y-2 max-w-sm">
              <p className="text-base text-gray-900 font-medium">
                一站式 AI 能力平台
              </p>
              <p className="text-sm text-gray-500 leading-relaxed">
                让智能触手可及，连接无限可能
              </p>
            </div>
          </div>

          {/* 功能亮点 */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "✨", title: "Skill", desc: "能力模块", path: "/learn/skill" },
              { icon: "🤖", title: "Agent", desc: "智能助手", path: "/learn/agent" },
              { icon: "🔌", title: "MCP", desc: "服务接入", path: "/learn/mcp" },
              { icon: "📝", title: "Prompt", desc: "提示模板", path: "/learn/prompt" },
              { icon: "🔄", title: "Workflow", desc: "任务编排", path: "/learn/workflow" },
              { icon: "📚", title: "Knowledge", desc: "知识检索", path: "/learn/knowledge" },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="group p-3.5 bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200"
              >
                <span className="text-xl mb-1.5 block group-hover:scale-105 transition-transform duration-200">{item.icon}</span>
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* 底部信息 */}
        <div className="relative flex items-center justify-between">
          <p className="text-gray-400 text-sm">© 2026 AI Tools Center</p>
          <div className="flex items-center gap-5">
            <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer transition-colors">服务条款</span>
            <span className="text-gray-400 text-xs hover:text-gray-600 cursor-pointer transition-colors">隐私政策</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
              <span className="text-xs text-gray-400">正常运行</span>
            </div>
          </div>
        </div>
      </div>

      {/* 右侧表单区域 */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white relative">
        <div className="w-full max-w-md relative">
          {children}
        </div>
      </div>
    </div>
  );
}
