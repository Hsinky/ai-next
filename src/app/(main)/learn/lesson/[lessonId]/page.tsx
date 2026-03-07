import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Lesson } from '@/data/curriculum';
import {
  getLessonById,
  getModuleLessons,
  stageConfig,
  moduleConfig,
  difficultyConfig,
} from '@/data/curriculum';

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    return { title: '课程不存在 - AI学院' };
  }

  return {
    title: `${lesson.title} - AI学院`,
    description: lesson.subtitle,
  };
}

export async function generateStaticParams() {
  // 返回所有课程ID用于静态生成
  const moduleIds = Object.keys(moduleConfig);
  const params: { lessonId: string }[] = [];

  for (const moduleId of moduleIds) {
    const lessons = getModuleLessons(moduleId);
    for (const lesson of lessons) {
      params.push({ lessonId: lesson.id });
    }
  }

  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ lessonId: string }>;
}) {
  const { lessonId } = await params;
  const lesson = getLessonById(lessonId);

  if (!lesson) {
    notFound();
  }

  // 查找所属模块
  let moduleId = '';
  for (const id of Object.keys(moduleConfig)) {
    if (lessonId.startsWith(id)) {
      moduleId = id;
      break;
    }
  }

  const module = moduleConfig[moduleId];
  const difficulty = difficultyConfig[lesson.difficulty];
  const relatedLessons = moduleId ? getModuleLessons(moduleId).filter((l) => l.id !== lessonId).slice(0, 2) : [];

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
        {module && (
          <>
            <Link href={`/learn/module/${moduleId}`} className="hover:text-gray-700 transition-colors">
              {module.title}
            </Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
        <span className="text-gray-900 font-medium">{lesson.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 主内容区 */}
        <div className="lg:col-span-2">
          {/* 课程头部 */}
          <div className={`bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 text-white mb-6`}>
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
              <p className="text-white/80">{lesson.subtitle}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{lesson.duration}分钟</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}>
                {difficulty.label}
              </span>
              {lesson.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-white/20 rounded text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 学习目标 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                🎯
              </span>
              学习目标
            </h2>
            <ul className="space-y-2">
              {lesson.objectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-gray-600">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 课程内容 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="prose prose-gray max-w-none">
              {lesson.sections.map((section, idx) => (
                <div key={idx} className="mb-8 last:mb-0">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                      {idx + 1}
                    </div>
                    {section.title && <h3 className="text-lg font-bold text-gray-900">{section.title}</h3>}
                  </div>
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    {section.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="whitespace-pre-line">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.code && (
                    <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                        <span className="text-sm text-gray-400 font-mono">
                          {section.language || 'text'}
                        </span>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className="text-sm text-gray-100 font-mono whitespace-pre">
                          {section.code}
                        </code>
                      </pre>
                    </div>
                  )}
                  {section.keyPoint && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-900 font-medium">
                        💡 {section.keyPoint}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 课后小结 */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-200 p-6 mt-6">
            <h2 className="text-lg font-bold text-purple-900 mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-sm">
                📝
              </span>
              课后小结
            </h2>
            <p className="text-purple-800 mb-4">{lesson.summary}</p>
            <div className="space-y-2">
              {lesson.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm text-purple-900">
                  <span className="w-5 h-5 rounded bg-purple-200 text-purple-700 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 练习题 */}
          {lesson.exercises.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-green-100 text-green-600 flex items-center justify-center text-sm">
                  ✓
                </span>
                课后练习
              </h2>
              <div className="space-y-6">
                {lesson.exercises.map((exercise, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-gray-900 font-medium">{exercise.question}</p>
                    </div>
                    {exercise.options && (
                      <div className="space-y-2 ml-9">
                        {exercise.options.map((option, optIdx) => (
                          <div key={optIdx} className="text-gray-700">
                            {String.fromCharCode(65 + optIdx)}. {option}
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-3 ml-9 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-900 font-medium mb-1">
                        答案：{exercise.answer}
                      </p>
                      <p className="text-sm text-green-800">{exercise.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 参考资料 */}
          {lesson.references && lesson.references.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 mt-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-sm">
                  📚
                </span>
                参考资料
              </h2>
              <div className="space-y-3">
                {lesson.references.map((ref, idx) => (
                  <a
                    key={idx}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <span className="w-8 h-8 rounded bg-gray-100 text-gray-600 flex items-center justify-center text-xs">
                      {ref.type === 'paper' ? '📄' : ref.type === 'article' ? '📖' : '🔗'}
                    </span>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                        {ref.title}
                      </p>
                      {ref.note && <p className="text-sm text-gray-500">{ref.note}</p>}
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 侧边栏 */}
        <aside className="space-y-4">
          {/* 课程信息 */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3">课程信息</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">时长</span>
                <span className="text-gray-900 font-medium">{lesson.duration}分钟</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">难度</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}>
                  {difficulty.label}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">章节</span>
                <span className="text-gray-900 font-medium">{lesson.sections.length}节</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">练习题</span>
                <span className="text-gray-900 font-medium">{lesson.exercises.length}题</span>
              </div>
            </div>
          </div>

          {/* 相关课程 */}
          {relatedLessons.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-3">相关课程</h3>
              <div className="space-y-3">
                {relatedLessons.map((l) => (
                  <Link
                    key={l.id}
                    href={`/learn/lesson/${l.id}`}
                    className="block p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-gray-900 font-medium text-sm">{l.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{l.duration}分钟</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 返回按钮 */}
          <Link
            href="/learn"
            className="block text-center py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 transition-colors"
          >
            返回学院
          </Link>
        </aside>
      </div>
    </div>
  );
}
