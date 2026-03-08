import { getMCPServers } from "@/lib/data";
import MCPServerList from "./components/MCPList";
import Link from "next/link";

export default function MCPPage() {
  const mcpServers = getMCPServers();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">🔌 MCP</h1>
            <p className="text-gray-600">外部工具与服务接入</p>
          </div>
          <Link
            href="/mcp/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 添加服务器
          </Link>
        </div>
      </header>

      <MCPServerList initialServers={mcpServers} />
    </div>
  );
}
