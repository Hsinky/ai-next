import { getKnowledgeBases } from "@/lib/data";
import KnowledgeList from "./components/KnowledgeList";
import Link from "next/link";

export default function KnowledgePage() {
  const knowledgeBases = getKnowledgeBases();

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
