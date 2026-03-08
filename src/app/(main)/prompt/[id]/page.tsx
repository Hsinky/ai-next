import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/api-url";
import { Prompt } from "@/types";
import DetailPageLayout, { CodeBlock, InfoCard } from "@/components/detail/DetailPageLayout";

async function getPrompt(id: string): Promise<Prompt | null> {
  try {
    const res = await fetch(`${await getApiUrl()}/api/prompts/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.prompt;
  } catch {
    return null;
  }
}

export default async function PromptDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const prompt = await getPrompt(id);

  if (!prompt) {
    notFound();
  }

  const stats = [
    { label: '使用次数', value: prompt.uses.toLocaleString() },
    { label: '评分', value: prompt.rating, icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg> },
    { label: '变量数', value: prompt.variables.length },
    { label: '分类', value: prompt.category },
  ];

  const links = [];
  if (prompt.documentation) {
    links.push({ label: '文档', description: '详细使用说明', href: prompt.documentation, icon: 'doc' as const });
  }

  const tabs = [
    {
      key: 'template',
      label: '模板内容',
      content: prompt.template && (
        <InfoCard title="模板内容">
          <CodeBlock title="prompt.txt" code={prompt.template} />
        </InfoCard>
      ),
    },
    {
      key: 'variables',
      label: '模板变量',
      content: (
        <InfoCard title="模板变量">
          <div className="grid grid-cols-3 gap-4">
            {prompt.variables.map((variable, index) => (
              <div
                key={index}
                className="p-4 bg-emerald-50 rounded-xl border border-emerald-100"
              >
                <code className="text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg text-sm font-mono">
                  {`{{${variable}}}`}
                </code>
                <p className="text-sm text-gray-600 mt-3">
                  {variable === 'language' && '编程语言类型'}
                  {variable === 'code' && '需要分析的代码'}
                  {variable === 'goal' && '优化目标描述'}
                  {variable === 'topic' && '文章主题'}
                  {variable === 'style' && '写作风格'}
                  {variable === 'length' && '目标字数'}
                  {variable === 'context' && '项目背景'}
                  {variable === 'stakeholders' && '相关利益方'}
                  {variable === 'constraints' && '约束条件'}
                  {!['language', 'code', 'goal', 'topic', 'style', 'length', 'context', 'stakeholders', 'constraints'].includes(variable) && '自定义变量'}
                </p>
              </div>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'examples',
      label: '使用示例',
      content: (prompt.exampleInput || prompt.exampleOutput) && (
        <div className="space-y-6">
          {prompt.exampleInput && (
            <InfoCard title="输入示例">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {JSON.stringify(prompt.exampleInput, null, 2)}
                </pre>
              </div>
            </InfoCard>
          )}
          {prompt.exampleOutput && (
            <InfoCard title="输出示例">
              <CodeBlock title="output.txt" code={prompt.exampleOutput} />
            </InfoCard>
          )}
        </div>
      ),
    },
    {
      key: 'practices',
      label: '最佳实践',
      content: prompt.bestPractices && (
        <InfoCard title="最佳实践">
          <ul className="space-y-4">
            {prompt.bestPractices.map((practice, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-gray-700 pt-2">{practice}</span>
              </li>
            ))}
          </ul>
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
        {prompt.rating}
      </span>
      <span className="w-px h-4 bg-white/30" />
      <span>{prompt.uses.toLocaleString()} 次使用</span>
      <span className="w-px h-4 bg-white/30" />
      <span>作者: {prompt.author}</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        复制模板
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="prompt"
      backHref="/prompt"
      backLabel="返回 Prompt 列表"
      icon={prompt.icon}
      name={prompt.name}
      description={prompt.description}
      tags={prompt.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="template"
      actions={actions}
    />
  );
}
