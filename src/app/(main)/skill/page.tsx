import { getApiUrl } from "@/lib/api-url";

// API 数据类型
interface Skill {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  version: string;
  status: string;
  users: string;
  rating: number;
  tags: string[];
  lastUsed: string;
  apiCalls: number;
}

// 从 API 获取数据
async function getSkills() {
  const res = await fetch(`${await getApiUrl()}/api/skills`, {
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Failed to fetch skills');
  const data = await res.json();
  return data.skills as Skill[];
}

import SkillList from "./components/SkillList";
import Link from "next/link";

export default async function SkillPage() {
  const skills = await getSkills();

  return (
    <div className="p-8">
      {/* 头部 */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">✨ Skill</h1>
            <p className="text-gray-600">可复用的 AI 能力模块</p>
          </div>
          <Link
            href="/skill/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + 添加技能
          </Link>
        </div>
      </header>

      <SkillList initialSkills={skills} />
    </div>
  );
}
