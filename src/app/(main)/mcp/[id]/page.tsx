import { notFound } from "next/navigation";
import { MCPServer } from "@/types";
import DetailPageLayout, { CodeBlock, InfoCard } from "@/components/detail/DetailPageLayout";

async function getMCPServer(id: string): Promise<MCPServer | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/mcp/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.mcpServer;
  } catch {
    return null;
  }
}

export default async function MCPDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const mcp = await getMCPServer(id);

  if (!mcp) {
    notFound();
  }

  const stats = [
    { label: '活跃连接', value: mcp.connections },
    { label: '正常运行时间', value: mcp.uptime },
    { label: '响应延迟', value: mcp.latency },
    { label: '分类', value: mcp.category },
  ];

  const links = [];
  if (mcp.homepage) {
    links.push({ label: '主页', description: '项目主页', href: mcp.homepage, icon: 'home' as const });
  }
  if (mcp.documentation) {
    links.push({ label: '文档', description: '官方文档', href: mcp.documentation, icon: 'doc' as const });
  }
  if (mcp.repository) {
    links.push({ label: '仓库', description: '源代码', href: mcp.repository, icon: 'github' as const });
  }

  const tabs = [
    {
      key: 'tools',
      label: '可用工具',
      content: mcp.tools && (
        <InfoCard title="可用工具">
          <div className="grid grid-cols-2 gap-4">
            {mcp.tools.map((tool, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100"
              >
                <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-gray-900">{tool}</span>
              </div>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'resources',
      label: '提供资源',
      content: mcp.resources && (
        <InfoCard title="提供资源">
          <div className="flex flex-wrap gap-3">
            {mcp.resources.map((resource, index) => (
              <span
                key={index}
                className="px-5 py-2.5 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium"
              >
                {resource}
              </span>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'install',
      label: '安装配置',
      content: (
        <div className="space-y-6">
          <div className="bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">什么是 MCP?</h3>
            <p className="text-purple-700">
              MCP (Model Context Protocol) 是一种开放协议，允许 AI 助手安全地连接到外部数据源和工具。
              通过 MCP，AI 可以访问数据库、文件系统、API 等资源，同时保持安全性和隐私保护。
            </p>
          </div>
          <InfoCard title="安装与配置">
            {mcp.installCommand && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">安装配置</h3>
                <CodeBlock title="Terminal" code={mcp.installCommand} />
              </div>
            )}
            {mcp.configExample && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">环境变量配置</h3>
                <CodeBlock title=".env" code={mcp.configExample} />
              </div>
            )}
          </InfoCard>
        </div>
      ),
    },
  ];

  const metaItems = (
    <>
      <span>v{mcp.version}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>延迟 {mcp.latency}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>正常运行时间 {mcp.uptime}</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
        连接服务器
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="mcp"
      backHref="/mcp"
      backLabel="返回 MCP 列表"
      icon={mcp.icon}
      name={mcp.name}
      description={mcp.description || ''}
      status={mcp.status}
      tags={mcp.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="tools"
      actions={actions}
    />
  );
}
