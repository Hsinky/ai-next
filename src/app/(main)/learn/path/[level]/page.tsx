import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { Lesson } from '@/data/curriculum';
import {
  stageConfig,
  getStageLessons,
  moduleConfig,
  getModuleLessons,
  difficultyConfig,
} from '@/data/curriculum';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ level: string }>;
}): Promise<Metadata> {
  const { level } = await params;
  const stage = stageConfig[level];

  if (!stage) {
    return { title: '课程不存在 - AI学院' };
  }

  return {
    title: `${stage.title} - AI学院`,
    description: stage.description,
  };
}

export async function generateStaticParams() {
  return Object.keys(stageConfig).map((level) => ({ level }));
}

export default async function StagePage({
  params,
}: {
  params: Promise<{ level: string }>;
}) {
  const { level } = await params;
  const stage = stageConfig[level];

  if (!stage) {
    notFound();
  }

  const moduleLessons: Array<{ module: typeof moduleConfig[string]; lessons: Lesson[] }> = [];

  for (const moduleId of stage.modules) {
    const module = moduleConfig[moduleId];
    const lessons = getModuleLessons(moduleId);
    moduleLessons.push({ module, lessons });
  }

  const totalDuration = moduleLessons.reduce((sum, { lessons }) => sum + lessons.reduce((s, l) => s + l.duration, 0), 0);
  const totalLessons = moduleLessons.reduce((sum, { lessons }) => sum + lessons.length, 0);

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
        <span className="text-gray-900 font-medium">{stage.title}</span>
      </nav>

      {/* 阶段头部 */}
      <div className={`bg-gradient-to-r ${stage.gradient} rounded-2xl p-8 text-white mb-8`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
            {stage.icon}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-2">{stage.title}</h1>
            <p className="text-white/80">{stage.description}</p>
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
            <span>{totalLessons} 节课</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{stage.target}</span>
          </div>
        </div>
      </div>

      {/* 前置条件 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <h3 className="font-medium text-gray-900 mb-2 text-sm flex items-center gap-2">
          <span>📋</span>
          学习前置条件
        </h3>
        <div className="flex flex-wrap gap-2">
          {stage.prerequisites.map((pre, idx) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
              {pre}
            </span>
          ))}
        </div>
      </div>

      {/* 课程模块 */}
      <div className="space-y-6">
        {moduleLessons.map(({ module, lessons }) => {
          const difficulty = difficultyConfig[module?.difficulty ?? 'beginner'];
          return (
            <div key={module.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className={`bg-gradient-to-r ${module.color} p-4 text-white`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-xl">
                    {module.icon}
                  </div>
                  <div>
                    <h2 className="font-bold">{module.title}</h2>
                    <p className="text-sm text-white/80">{module.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <span>{lessons.length} 节课</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}>
                      {difficulty.label}
                    </span>
                  </div>
                  <Link
                    href={`/learn/module/${module.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    查看全部 →
                  </Link>
                </div>

                <div className="space-y-2">
                  {lessons.slice(0, 3).map((lesson, idx) => (
                    <Link
                      key={lesson.id}
                      href={`/learn/lesson/${lesson.id}`}
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <span className="w-6 h-6 rounded text-xs flex items-center justify-center text-white bg-gradient-to-r from-gray-500 to-gray-600 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 group-hover:text-blue-600 flex-1 truncate">
                        {lesson.title}
                      </span>
                      <span className="text-xs text-gray-400 flex-shrink-0">{lesson.duration}分钟</span>
                    </Link>
                  ))}
                  {lessons.length > 3 && (
                    <Link
                      href={`/learn/module/${module.id}`}
                      className="block text-center text-sm text-gray-500 hover:text-gray-700 py-2"
                    >
                      还有 {lessons.length - 3} 节课...
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
