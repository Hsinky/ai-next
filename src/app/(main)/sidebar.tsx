"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuItem } from "@/types";

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "首页",
    nameEn: "Home",
    path: "/",
    icon: "🏠",
    description: "概览与推荐",
  },  
  {
    id: 3,
    name: "Skill",
    nameEn: "Skill",
    path: "/skill",
    icon: "✨",
    description: "可复用的能力模块",
  },
  {
    id: 4,
    name: "MCP",
    nameEn: "MCP",
    path: "/mcp",
    icon: "🔌",
    description: "外部工具与服务接入",
  },
  {
    id: 5,
    name: "Agent",
    nameEn: "Agent",
    path: "/agent",
    icon: "🤖",
    description: "自主决策的AI助手",
  },
  {
    id: 6,
    name: "Prompt",
    nameEn: "Prompt",
    path: "/prompt",
    icon: "📝",
    description: "高效沟通的模板",
  },
  {
    id: 7,
    name: "Workflow",
    nameEn: "Workflow",
    path: "/workflow",
    icon: "🔄",
    description: "多步骤任务编排",
  },
  {
    id: 8,
    name: "Knowledge",
    nameEn: "Knowledge",
    path: "/knowledge",
    icon: "🗃️",
    description: "企业知识智能检索",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col fixed left-0 top-14 h-[calc(100vh-56px)]">
      {/* 导航菜单 - 可滚动区域 */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === "/"
                : pathname.startsWith(item.path);
            return (
              <Link
                key={item.id}
                href={item.path}
                className={`group flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-medium ${isActive ? "text-blue-600" : "text-gray-700 group-hover:text-gray-900"}`}
                  >
                    {item.name}
                  </div>
                  <div className="text-sm text-gray-400 truncate mt-0.5">
                    {item.description}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* 底部信息 - 固定在底部 */}
      <div className="shrink-0 p-4 border-t border-gray-100 bg-white">
        <div className="text-sm text-gray-400">
          <div>版本 v1.0.0</div>
          <div className="mt-1">© 2026 AI Tools Center</div>
        </div>
      </div>
    </aside>
  );
}
