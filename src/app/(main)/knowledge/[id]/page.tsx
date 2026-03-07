import { notFound } from "next/navigation";
import { KnowledgeBase } from "@/types";
import DetailPageLayout, { CodeBlock, InfoCard } from "@/components/detail/DetailPageLayout";

async function getKnowledgeBase(id: string): Promise<KnowledgeBase | null> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/knowledge/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.knowledgeBase;
  } catch {
    return null;
  }
}

export default async function KnowledgeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const knowledge = await getKnowledgeBase(id);

  if (!knowledge) {
    notFound();
  }

  const stats = [
    { label: '文档数量', value: knowledge.documents },
    { label: '文本块数', value: knowledge.chunks.toLocaleString() },
    { label: '查询次数', value: knowledge.queries.toLocaleString() },
    { label: '准确率', value: knowledge.accuracy },
  ];

  const links = [];
  if (knowledge.documentation) {
    links.push({ label: '文档', description: '详细使用说明', href: knowledge.documentation, icon: 'doc' as const });
  }

  const tabs = [
    {
      key: 'config',
      label: '技术配置',
      content: (
        <InfoCard title="技术配置">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">嵌入模型</h3>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <code className="text-sm text-rose-700">{knowledge.embeddingModel || 'text-embedding-3-small'}</code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                用于将文本转换为向量表示，支持语义搜索
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">分块大小</h3>
              <div className="p-3 bg-rose-50 rounded-lg border border-rose-100">
                <code className="text-sm text-rose-700">{knowledge.chunkSize || 500} tokens</code>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                文档分块的token数量，影响检索精度
              </p>
            </div>
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'sources',
      label: '数据来源',
      content: knowledge.sources && (
        <InfoCard title="数据来源">
          <div className="flex flex-wrap gap-3">
            {knowledge.sources.map((source, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm flex items-center gap-2 border border-rose-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {source}
              </span>
            ))}
          </div>
        </InfoCard>
      ),
    },
    {
      key: 'usage',
      label: '使用说明',
      content: (
        <div className="space-y-6">
          <InfoCard title="API 调用示例">
            <CodeBlock title="bash" code={`# 查询知识库
curl -X POST "https://api.example.com/knowledge/${knowledge.id}/query" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "如何重置密码？",
    "top_k": 5,
    "threshold": 0.7
  }'

# 响应示例
{
  "results": [
    {
      "content": "用户可以通过点击登录页面的"忘记密码"链接...",
      "score": 0.92,
      "source": "FAQ.md"
    }
  ]
}`} />
          </InfoCard>
          <InfoCard title="SDK 使用示例">
            <CodeBlock title="typescript" code={`import { KnowledgeBase } from '@ai/knowledge-sdk';

const kb = new KnowledgeBase({
  id: '${knowledge.id}',
  apiKey: process.env.KB_API_KEY
});

// 语义搜索
const results = await kb.search('如何重置密码', {
  topK: 5,
  threshold: 0.7
});

// 添加文档
await kb.addDocument({
  content: '这是一篇新文档...',
  metadata: { source: 'manual', category: 'guide' }
});

// 批量导入
await kb.import([
  { content: '文档1内容...', metadata: { source: 'doc1.md' } },
  { content: '文档2内容...', metadata: { source: 'doc2.md' } },
]);`} />
          </InfoCard>
        </div>
      ),
    },
    {
      key: 'access',
      label: '访问权限',
      content: (
        <InfoCard title="访问权限">
          <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl border border-rose-100">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              knowledge.accessControl === '公开'
                ? 'bg-green-100 text-green-600'
                : knowledge.accessControl === '团队内部'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-orange-100 text-orange-600'
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {knowledge.accessControl === '公开' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                )}
              </svg>
            </div>
            <div>
              <div className="font-medium text-gray-900">{knowledge.accessControl}</div>
              <div className="text-sm text-gray-600">
                {knowledge.accessControl === '公开' && '所有人都可以访问此知识库'}
                {knowledge.accessControl === '团队内部' && '仅团队成员可以访问此知识库'}
                {knowledge.accessControl === '客服团队' && '仅客服团队成员可以访问'}
                {knowledge.accessControl === '高管+法务' && '仅高管和法务团队成员可以访问'}
              </div>
            </div>
          </div>
        </InfoCard>
      ),
    },
  ];

  const metaItems = (
    <>
      <span>{knowledge.documents} 份文档</span>
      <span className="w-px h-4 bg-gray-200" />
      <span>准确率 {knowledge.accuracy}</span>
      <span className="w-px h-4 bg-gray-200" />
      <span>{knowledge.queries.toLocaleString()} 次查询</span>
    </>
  );

  const actions = (
    <>
      <button className="px-4 py-2 bg-rose-600 text-white rounded-lg text-sm font-medium hover:bg-rose-700 transition-colors">
        查询知识库
      </button>
      <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
        查看文档
      </button>
    </>
  );

  return (
    <DetailPageLayout
      resourceType="knowledge"
      backHref="/knowledge"
      backLabel="返回 Knowledge 列表"
      icon={knowledge.icon}
      name={knowledge.name}
      description={knowledge.description}
      status={knowledge.accessControl}
      tags={knowledge.tags}
      metaItems={metaItems}
      stats={stats}
      links={links}
      tabs={tabs}
      defaultTab="config"
      actions={actions}
    />
  );
}
