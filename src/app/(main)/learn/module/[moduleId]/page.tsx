import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getModuleLessons,
  moduleConfig,
  stageConfig,
  difficultyConfig,
} from '@/data/curriculum';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}): Promise<Metadata> {
  const { moduleId } = await params;
  const module = moduleConfig[moduleId];

  if (!module) {
    return { title: '课程模块不存在 - AI学院' };
  }

  return {
    title: `${module.title} - AI学院`,
    description: module.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(moduleConfig).map((moduleId) => ({ moduleId }));
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>;
}) {
  const { moduleId } = await params;
  const module = moduleConfig[moduleId];

  if (!module) {
    notFound();
  }

  const lessons = getModuleLessons(moduleId);
  const difficulty = difficultyConfig[module.difficulty];

  // 查找所属阶段
  let stageId = '';
  let stage = null;
  for (const [id, s] of Object.entries(stageConfig)) {
    if (s.modules.includes(moduleId)) {
      stageId = id;
      stage = s;
      break;
    }
  }

  const totalDuration = lessons.reduce((sum, l) => sum + l.duration, 0);

  return (
    <div className="p-8">
      {/* 面包屑 */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/learn" className="hover:text-gray-700 transition-colors">
          学院
        </Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {stage && (
          <>
            <Link href={`/learn/path/${stageId}`} className="hover:text-gray-700 transition-colors">
              {stage.title}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
        <span className="text-gray-900 font-medium">{module.title}</span>
      </nav>

      {/* 模块头部 */}
      <div className={`bg-gradient-to-r ${module.color} rounded-2xl p-8 text-white mb-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
            {module.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{module.title}</h1>
            <p className="text-white/80">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{totalDuration} 分钟</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{lessons.length} 节课</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>
      </div>

      {/* 课程列表 */}
      {lessons.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {lessons.map((lesson, idx) => (
            <Link
              key={lesson.id}
              href={`/learn/lesson/${lesson.id}`}
              className="group block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                      {lesson.title}
                    </h3>
                    <span className="text-xs text-gray-400 flex-shrink-0">{lesson.duration}分钟</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2 truncate">{lesson.subtitle}</p>
                  <div className="flex flex-wrap gap-1">
                    {lesson.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <p className="text-gray-500">该模块暂无课程内容，敬请期待...</p>
        </div>
      )}

      {/* 底部导航 */}
      <div className="mt-8 flex items-center justify-between">
        {stage && (
          <Link
            href={`/learn/path/${stageId}`}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回{stage.title}
          </Link>
        )}
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
