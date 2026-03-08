import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/api-url";
import { Agent } from "@/types";
import DetailPageLayout, { CodeBlock, InfoCard } from "@/components/detail/DetailPageLayout";

async function getAgent(id: string): Promise<Agent | null> {
  try {
    const res = await fetch(`${await getApiUrl()}/api/agents/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.agent;
  } catch {
    return null;
  }
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await getAgent(id);

  if (!agent) {
    notFound();
  }

  const stats = [
    { label: '执行任务数', value: agent.tasks.toLocaleString() },
    { label: '成功率', value: agent.successRate },
    { label: '平均响应', value: agent.avgTime },
    { label: '分类', value: agent.category },
  ];

  const links = [];
  if (agent.homepage) {
    links.push({ label: '主页', description: '项目主页', href: agent.homepage, icon: 'home' as const });
  }
  if (agent.documentation) {
    links.push({ label: '文档', description: '官方文档', href: agent.documentation, icon: 'doc' as const });
  }
  if (agent.repository) {
    links.push({ label: '仓库', description: '源代码', href: agent.repository, icon: 'github' as const });
  }

  const tabs = [
    {
      key: 'capabilities',
      label: '核心能力',
      content: agent.capabilities && (
        <InfoCard title="核心能力">
          <ul className="space-y-4">
            {agent.capabilities.map((capability, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span className="text-gray-700 pt-2">{capability}</span>
              </li>
            ))}
          </ul>
        </InfoCard>
      ),
    },
    {
      key: 'config',
      label: '配置与使用',
      content: (
        <InfoCard title="配置与使用">
          {agent.configExample && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">配置文件</h3>
              <CodeBlock title="agent.config.json" code={agent.configExample} language="json" />
            </div>
          )}
          {agent.usageExample && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">代码示例</h3>
              <CodeBlock title="example.ts" code={agent.usageExample} language="typescript" />
            </div>
          )}
        </InfoCard>
      ),
    },
  ];

  const metaItems = (
    <>
      <span className="px-3 py-1 bg-white/20 rounded-lg">{agent.model}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>成功率 {agent.successRate}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>平均响应 {agent.avgTime}</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
        启动 Agent
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="agent"
      backHref="/agent"
      backLabel="返回 Agent 列表"
      icon={agent.icon}
      name={agent.name}
      description={agent.description}
      status={agent.status}
      tags={agent.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="capabilities"
      actions={actions}
    />
  );
}
