// API 数据类型
interface KnowledgeBase {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  documents: number;
  chunks: number;
  queries: number;
  accuracy: string;
  tags: string[];
  updatedAt: string;
}

// 从 API 获取数据
async function getKnowledgeBases() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/knowledge`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch knowledge bases');
  const data = await res.json();
  return data.knowledgeBases as KnowledgeBase[];
}

import KnowledgeList from "./components/KnowledgeList";
import Link from "next/link";

export default async function KnowledgePage() {
  const knowledgeBases = await getKnowledgeBases();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 Knowledge</h1>
            <p className="text-gray-600">企业知识智能检索</p>
          </div>
          <Link
            href="/knowledge/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 创建知识库
          </Link>
        </div>
      </header>

      <KnowledgeList initialKnowledgeBases={knowledgeBases} />
    </div>
  );
}
