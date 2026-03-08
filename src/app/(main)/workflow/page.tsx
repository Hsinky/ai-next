import { getApiUrl } from "@/lib/api-url";

// API 数据类型
interface Workflow {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  steps: number;
  status: string;
  runs: number;
  successRate: string;
  avgDuration: string;
  tags: string[];
  lastRun: string;
}

// 从 API 获取数据
async function getWorkflows() {
  const res = await fetch(`${await getApiUrl()}/api/workflows`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch workflows');
  const data = await res.json();
  return data.workflows as Workflow[];
}

import WorkflowList from "./components/WorkflowList";
import Link from "next/link";

export default async function WorkflowPage() {
  const workflows = await getWorkflows();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔄 Workflow</h1>
            <p className="text-gray-600">多步骤任务自动化编排</p>
          </div>
          <Link
            href="/workflow/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 创建工作流
          </Link>
        </div>
      </header>

      <WorkflowList initialWorkflows={workflows} />
    </div>
  );
}
