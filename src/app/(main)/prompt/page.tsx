import { getApiUrl } from "@/lib/api-url";

// API 数据类型
interface Prompt {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  uses: number;
  rating: number;
  variables: string[];
  tags: string[];
  author: string;
  updatedAt: string;
}

// 从 API 获取数据
async function getPrompts() {
  const res = await fetch(`${await getApiUrl()}/api/prompts`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch prompts');
  const data = await res.json();
  return data.prompts as Prompt[];
}

import PromptList from "./components/PromptList";
import Link from "next/link";

export default async function PromptPage() {
  const prompts = await getPrompts();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">📝 Prompt</h1>
            <p className="text-gray-600">高效沟通的提示词模板</p>
          </div>
          <Link
            href="/prompt/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 创建模板
          </Link>
        </div>
      </header>

      <PromptList initialPrompts={prompts} />
    </div>
  );
}
