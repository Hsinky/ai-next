import Link from "next/link";
import type { Metadata } from "next";
import { getCourseContent, courseConfig, type Level } from "@/data/courseContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string; level: string }>;
}): Promise<Metadata> {
  const { type, level } = await params;
  const config = courseConfig[type as keyof typeof courseConfig];
  const levelNames: Record<string, string> = {
    beginner: "入门",
    developer: "进阶",
    architect: "高级",
  };
  
  if (!config) {
    return { title: "课程不存在 - AI工具市场" };
  }
  
  return {
    title: `${config.name}${levelNames[level] || ""}教程 - AI工具市场`,
    description: `学习 ${config.name} 的${levelNames[level] || ""}知识`,
  };
}

export async function generateStaticParams() {
  const types = Object.keys(courseConfig);
  const levels: Level[] = ["beginner", "developer", "architect"];
  
  return types.flatMap((type) =>
    levels.map((level) => ({
      type,
      level,
    }))
  );
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ type: string; level: string }>;
}) {
  const { type, level } = await params;
  const config = courseConfig[type as keyof typeof courseConfig];
  
  if (!config) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">课程不存在</h1>
          <Link href="/learn" className="text-blue-600 hover:text-blue-700">
            返回学院
          </Link>
        </div>
      </div>
    );
  }

  const content = getCourseContent(type, level as Level);
  const levelNames: Record<string, string> = {
    beginner: "入门路径",
    developer: "开发者路径",
    architect: "架构师路径",
  };
  const levelPathMap: Record<string, string> = {
    beginner: "beginner",
    developer: "developer",
    architect: "architect",
  };

  return (
    <div className="p-8">
      {/* 面包屑导航 */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/learn" className="hover:text-gray-700 transition-colors">学院</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link 
          href={`/learn/path/${levelPathMap[level]}`} 
          className="hover:text-gray-700 transition-colors"
        >
          {levelNames[level]}
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium">{config.name}</span>
      </nav>

      {/* 课程头部 */}
      <div className={`bg-gradient-to-r ${config.color} rounded-2xl p-8 text-white mb-8`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-4xl">{config.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{config.name}</h1>
            <p className="text-white/80">{content.subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>预计 {content.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{levelNames[level]}</span>
          </div>
        </div>
      </div>

      {/* 难度切换 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">难度选择：</span>
          {(["beginner", "developer", "architect"] as Level[]).map((l) => (
            <Link
              key={l}
              href={`/learn/${type}/${l}`}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                l === level
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {levelNames[l]}
            </Link>
          ))}
        </div>
      </div>

      {/* 课程内容 */}
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="prose prose-gray max-w-none">
          {content.sections.map((section, idx) => (
            <div key={idx} className="mb-8 last:mb-0">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-lg ${config.bgColor} flex items-center justify-center text-sm`}>
                  {idx + 1}
                </span>
                {section.title}
              </h2>
              <div className="text-gray-600 leading-relaxed space-y-4">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部导航 */}
      <div className="mt-8 flex items-center justify-between">
        <Link
          href={`/learn/path/${levelPathMap[level]}`}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回{levelNames[level]}
        </Link>
        <Link
          href="/learn"
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
        >
          返回学院
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
