'use client';

import Link from 'next/link';
import type { Lesson } from '@/data/curriculum';
import { difficultyConfig } from '@/data/curriculum';
// Inline SVG icons (replacing lucide-react)
function ClockIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m-9 4a9 9 0 11 18 0 9 9 0 01-18 0z" />
    </svg>
  );
}

function ArrowRightIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

function BookOpenIcon(props: { className?: string }) {
  return (
    <svg className={props.className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}


interface LessonCardProps {
  lesson: Lesson;
  moduleId?: string;
}

export function LessonCard({ lesson, moduleId }: LessonCardProps) {
  const difficulty = difficultyConfig[lesson.difficulty];

  return (
    <Link
      href={`/learn/lesson/${lesson.id}`}
      className="group block bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all"
    >
      {/* 头部 */}
      <div className={`bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg mb-1">{lesson.title}</h3>
            <p className="text-white/80 text-sm">{lesson.subtitle}</p>
          </div>
          <ArrowRightIcon className="w-5 h-5 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4">
        {/* 学习目标 */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <BookOpenIcon className="w-4 h-4" />
            <span>学习目标</span>
          </div>
          <ul className="space-y-1">
            {lesson.objectives.slice(0, 3).map((obj, idx) => (
              <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
            {lesson.objectives.length > 3 && (
              <li className="text-sm text-gray-500 pl-3.5">
                +{lesson.objectives.length - 3} 个更多目标
              </li>
            )}
          </ul>
        </div>

        {/* 底部信息 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ClockIcon className="w-4 h-4" />
              <span>{lesson.duration}分钟</span>
            </div>
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${difficulty.bgColor} ${difficulty.color}`}>
              {difficulty.label}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
