"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthContext";

// 全局搜索结果类型
interface SearchResult {
  type: string;
  id: number;
  name: string;
  description: string;
  icon: string;
  path: string;
}

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, logout, isLoading } = useAuth();

  // 全局搜索数据 - 与实际API数据一致
  const allItems: SearchResult[] = [
    // Skills - 来自 /api/skills
    { type: "Skill", id: 1, name: "AI 写作助手", description: "智能写作助手，帮你快速生成文章、文案、邮件等内容", icon: "✍️", path: "/skill/1" },
    { type: "Skill", id: 2, name: "PPT 生成器", description: "一键生成专业PPT，支持多种模板和主题", icon: "📊", path: "/skill/2" },
    { type: "Skill", id: 3, name: "AI 绘画", description: "文字描述生成精美图片，支持多种风格", icon: "🎨", path: "/skill/3" },
    { type: "Skill", id: 4, name: "智能表格", description: "自动处理表格数据，支持公式计算和数据分析", icon: "📈", path: "/skill/4" },
    { type: "Skill", id: 5, name: "视频生成", description: "AI生成短视频，支持多种场景和模板", icon: "🎬", path: "/skill/5" },
    { type: "Skill", id: 6, name: "代码助手", description: "智能代码补全、重构和Bug修复", icon: "💻", path: "/skill/6" },
    
    // MCP - 来自 /api/mcp
    { type: "MCP", id: 1, name: "Database MCP Server", description: "数据库连接服务", icon: "🗄️", path: "/mcp/1" },
    { type: "MCP", id: 2, name: "File System MCP", description: "文件系统操作服务", icon: "📁", path: "/mcp/2" },
    { type: "MCP", id: 3, name: "API Gateway MCP", description: "API网关服务", icon: "🌐", path: "/mcp/3" },
    { type: "MCP", id: 4, name: "Email Service MCP", description: "邮件发送服务", icon: "📧", path: "/mcp/4" },
    { type: "MCP", id: 5, name: "Search Engine MCP", description: "搜索引擎服务", icon: "🔍", path: "/mcp/5" },
    { type: "MCP", id: 6, name: "AI Model MCP", description: "AI模型调用服务", icon: "🤖", path: "/mcp/6" },
    
    // Agents - 来自 /api/agents
    { type: "Agent", id: 1, name: "代码审查助手", description: "自动审查代码质量，提供改进建议和最佳实践", icon: "🤖", path: "/agent/1" },
    { type: "Agent", id: 2, name: "数据分析专家", description: "智能分析数据，生成可视化报表和洞察", icon: "📊", path: "/agent/2" },
    { type: "Agent", id: 3, name: "客服机器人", description: "7x24小时智能客服，自动回答常见问题", icon: "💬", path: "/agent/3" },
    { type: "Agent", id: 4, name: "文档生成器", description: "根据需求自动生成技术文档和API说明", icon: "📄", path: "/agent/4" },
    { type: "Agent", id: 5, name: "测试用例生成", description: "自动生成单元测试和集成测试用例", icon: "🧪", path: "/agent/5" },
    { type: "Agent", id: 6, name: "翻译助手", description: "多语言智能翻译，支持专业领域术语", icon: "🌐", path: "/agent/6" },
    
    // Prompts - 来自 /api/prompts
    { type: "Prompt", id: 1, name: "代码优化提示词", description: "用于优化和重构代码的高质量提示词模板", icon: "📝", path: "/prompt/1" },
    { type: "Prompt", id: 2, name: "文章写作模板", description: "生成高质量文章的提示词模板，支持多种风格", icon: "✍️", path: "/prompt/2" },
    { type: "Prompt", id: 3, name: "需求分析模板", description: "帮助分析和梳理产品需求的提示词模板", icon: "📋", path: "/prompt/3" },
    { type: "Prompt", id: 4, name: "SQL生成器", description: "根据自然语言描述生成SQL查询语句", icon: "🗄️", path: "/prompt/4" },
    { type: "Prompt", id: 5, name: "API文档生成", description: "自动生成API接口文档的提示词模板", icon: "📚", path: "/prompt/5" },
    { type: "Prompt", id: 6, name: "面试问题生成", description: "根据岗位要求生成面试问题和评分标准", icon: "🎯", path: "/prompt/6" },
    
    // Workflows - 来自 /api/workflows
    { type: "Workflow", id: 1, name: "自动化测试流程", description: "代码提交后自动运行测试、生成报告", icon: "🔄", path: "/workflow/1" },
    { type: "Workflow", id: 2, name: "内容发布流程", description: "文章审核、SEO优化、定时发布的自动化流程", icon: "📢", path: "/workflow/2" },
    { type: "Workflow", id: 3, name: "数据同步流程", description: "多数据源自动同步和ETL处理", icon: "🔄", path: "/workflow/3" },
    { type: "Workflow", id: 4, name: "客户服务流程", description: "工单自动分类、分配和跟进流程", icon: "🎫", path: "/workflow/4" },
    { type: "Workflow", id: 5, name: "报告生成流程", description: "定时生成业务报告并发送邮件", icon: "📊", path: "/workflow/5" },
    { type: "Workflow", id: 6, name: "部署发布流程", description: "自动化CI/CD部署流程，支持回滚", icon: "🚀", path: "/workflow/6" },
  ];

  // 搜索功能
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = allItems.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query)
      );
      setSearchResults(results.slice(0, 10));
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  // 点击外部关闭搜索结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleResultClick = (path: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">⚡</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI 工具市场
            </span>
          </div>
        </Link>

        {/* 导航链接 - 已移除学习中心文字链接 */}

        {/* 右侧操作区 */}
        <div className="flex items-center gap-4">
          {/* 搜索框 */}
          <div className="relative w-72" ref={searchRef}>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="全局搜索..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* 搜索结果下拉 */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto">
                {searchResults.length > 0 ? (
                  <div className="py-2">
                    {searchResults.map((result) => (
                      <button
                        key={`${result.type}-${result.id}`}
                        onClick={() => handleResultClick(result.path)}
                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                      >
                        <span className="text-xl">{result.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{result.name}</span>
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                              {result.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 truncate">{result.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <p>未找到相关结果</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 学院图标 */}
          <Link
            href="/learn"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-100 flex items-center justify-center text-lg transition-colors group"
            title="学院"
          >
            <span className="group-hover:scale-110 transition-transform">🎓</span>
          </Link>

          {/* 博客链接 */}
          <a
            href="http://hsinky.cn"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-purple-100 flex items-center justify-center text-lg transition-colors group"
            title="个人博客"
          >
            <span className="group-hover:scale-110 transition-transform">📰</span>
          </a>

          {/* 用户区域 - 加载中不显示，避免闪烁 */}
          {!isLoading && (
            user ? (
              <div className="relative group">
                <button className="flex items-center gap-2 px-2 py-1 rounded-lg transition-all cursor-pointer group/btn">
                  <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user.username?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover/btn:text-gray-900 transition-colors">{user.username}</span>
                  <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {/* 下拉菜单 */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <div className="py-2">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      个人中心
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      设置
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={() => logout()}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      退出登录
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  注册
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}
