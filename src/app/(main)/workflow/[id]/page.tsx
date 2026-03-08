import { notFound } from "next/navigation";
import { getWorkflow } from "@/lib/data";
import DetailPageLayout, { CodeBlock, InfoCard } from "@/components/detail/DetailPageLayout";

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workflow = getWorkflow(parseInt(id));

  if (!workflow) {
    notFound();
  }

  const stats = [
    { label: '执行次数', value: workflow.runs.toLocaleString() },
    { label: '成功率', value: workflow.successRate },
    { label: '平均耗时', value: workflow.avgDuration },
    { label: '分类', value: workflow.category },
  ];

  const links = [];
  if (workflow.homepage) {
    links.push({ label: '主页', description: '项目主页', href: workflow.homepage, icon: 'home' as const });
  }
  if (workflow.documentation) {
    links.push({ label: '文档', description: '官方文档', href: workflow.documentation, icon: 'doc' as const });
  }
  if (workflow.repository) {
    links.push({ label: '仓库', description: '源代码', href: workflow.repository, icon: 'github' as const });
  }

  const tabs = [
    {
      key: 'steps',
      label: '流程步骤',
      content: workflow.stepDetails && (
        <InfoCard title="流程步骤">
          <div className="relative">
            {workflow.stepDetails.map((step, index) => (
              <div key={step.id} className="flex items-start mb-8 last:mb-0">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-blue-500 text-white flex items-center justify-center font-bold flex-shrink-0 z-10 shadow-lg">
                  {index + 1}
                </div>
                <div className="ml-4 flex-1 bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{step.name}</h3>
                    <span className="px-3 py-1 bg-cyan-100 text-cyan-700 rounded-lg text-xs font-medium">
                      {step.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'triggers',
      label: '触发方式',
      content: workflow.triggers && (
        <InfoCard title="触发方式">
          <div className="flex flex-wrap gap-4">
            {workflow.triggers.map((trigger, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-cyan-50 text-cyan-700 rounded-xl font-medium flex items-center gap-3 border border-cyan-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {trigger}
              </div>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'config',
      label: '配置示例',
      content: workflow.configExample && (
        <InfoCard title="配置示例">
          <CodeBlock title="workflow.config.json" code={workflow.configExample} language="json" />
        </InfoCard>
      ),
    },
  ];

  const metaItems = (
    <>
      <span>{workflow.steps} 个步骤</span>
      <span className="w-px h-4 bg-white/30" />
      <span>成功率 {workflow.successRate}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>平均耗时 {workflow.avgDuration}</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors">
        运行工作流
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="workflow"
      backHref="/workflow"
      backLabel="返回 Workflow 列表"
      icon={workflow.icon}
      name={workflow.name}
      description={workflow.description}
      status={workflow.status}
      tags={workflow.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="steps"
      actions={actions}
    />
  );
}
