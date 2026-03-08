import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/api-url";
import { Skill } from "@/types";
import DetailPageLayout, { CodeBlock, InfoCard, FeatureList, resourceThemes } from "@/components/detail/DetailPageLayout";

// 获取技能详情
async function getSkill(id: string): Promise<Skill | null> {
  try {
    const res = await fetch(`${await getApiUrl()}/api/skills/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.skill;
  } catch {
    return null;
  }
}

export default async function SkillDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const skill = await getSkill(id);

  if (!skill) {
    notFound();
  }

  const stats = [
    { label: 'API 调用', value: skill.apiCalls.toLocaleString() },
    { label: '活跃用户', value: skill.users },
    { label: '评分', value: skill.rating, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> },
    { label: '最近使用', value: skill.lastUsed },
  ];

  const links = [];
  if (skill.homepage) {
    links.push({ label: '主页', description: '项目主页', href: skill.homepage, icon: 'home' as const });
  }
  if (skill.documentation) {
    links.push({ label: '文档', description: '官方文档', href: skill.documentation, icon: 'doc' as const });
  }
  if (skill.repository) {
    links.push({ label: '仓库', description: '源代码', href: skill.repository, icon: 'github' as const });
  }

  const tabs = [
    {
      key: 'features',
      label: '功能特性',
      content: skill.features && (
        <InfoCard title="功能特性">
          <FeatureList features={skill.features} theme="skill" />
        </InfoCard>
      ),
    },
    {
      key: 'install',
      label: '安装配置',
      content: (
        <InfoCard title="安装与配置">
          {skill.requirements && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">系统要求</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {skill.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
          {skill.installCommand && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">安装命令</h3>
              <CodeBlock title="Terminal" code={skill.installCommand} />
            </div>
          )}
          {skill.configExample && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">配置示例</h3>
              <CodeBlock title="config.json" code={skill.configExample} language="json" />
            </div>
          )}
          {skill.usageExample && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">使用示例</h3>
              <CodeBlock title="example.js" code={skill.usageExample} language="javascript" />
            </div>
          )}
        </InfoCard>
      ),
    },
  ];

  const metaItems = (
    <>
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        {skill.rating}
      </span>
      <span className="w-px h-4 bg-white/30" />
      <span>v{skill.version}</span>
      <span className="w-px h-4 bg-white/30" />
      <span>{skill.users} 用户</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
        立即使用
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="skill"
      backHref="/skill"
      backLabel="返回技能列表"
      icon={skill.icon}
      name={skill.name}
      description={skill.description}
      status={skill.status}
      tags={skill.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="features"
      actions={actions}
    />
  );
}
