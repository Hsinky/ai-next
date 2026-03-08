import { getAgents } from "@/lib/data";
import AgentList from "./components/AgentList";
import Link from "next/link";

export default function AgentPage() {
  const agents = getAgents();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🤖 Agent</h1>
            <p className="text-gray-600">自主决策的 AI 助手</p>
          </div>
          <Link
            href="/agent/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 创建智能体
          </Link>
        </div>
      </header>

      <AgentList initialAgents={agents} />
    </div>
  );
}
