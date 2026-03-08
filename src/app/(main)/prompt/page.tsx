import { getPrompts } from "@/lib/data";
import PromptList from "./components/PromptList";
import Link from "next/link";

export default function PromptPage() {
  const prompts = getPrompts();

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
