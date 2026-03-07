// API 数据类型
interface Agent {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  model: string;
  status: string;
  tasks: number;
  successRate: string;
  avgTime: string;
  tags: string[];
  lastRun: string;
}

// 从 API 获取数据
async function getAgents() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/agents`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch agents');
  const data = await res.json();
  return data.agents as Agent[];
}

import AgentList from "./components/AgentList";
import Link from "next/link";

export default async function AgentPage() {
  const agents = await getAgents();

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
