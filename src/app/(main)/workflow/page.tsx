import { getWorkflows } from "@/lib/data";
import WorkflowList from "./components/WorkflowList";
import Link from "next/link";

export default function WorkflowPage() {
  const workflows = getWorkflows();

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
