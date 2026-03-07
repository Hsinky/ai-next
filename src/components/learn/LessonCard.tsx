'use client';

import Link from 'next/link';
import type { Lesson } from '@/data/curriculum';
import { difficultyConfig } from '@/data/curriculum';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';

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
          <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-white transition-colors flex-shrink-0" />
        </div>
      </div>

      {/* 内容 */}
      <div className="p-4">
        {/* 学习目标 */}
        <div className="mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <BookOpen className="w-4 h-4" />
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
              <Clock className="w-4 h-4" />
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
