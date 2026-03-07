'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { LearningProgress, UserLearningData } from '@/data/curriculum';
import { stageConfig, moduleConfig, getLessonById } from '@/data/curriculum';

interface ProgressTrackerProps {
  lessonId: string;
  totalSections: number;
}

const STORAGE_KEY = 'ai_academy_learning_progress';

export function useLearningProgress() {
  const [data, setData] = useState<UserLearningData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        // 忽略解析错误
      }
    }
  }, []);

  const updateProgress = (lessonId: string, progress: Partial<LearningProgress>) => {
    setData((prev) => {
      const newData: UserLearningData = {
        userId: prev?.userId || 'anonymous',
        progress: {
          ...prev?.progress,
          [lessonId]: {
            lessonId,
            completed: progress.completed ?? prev?.progress[lessonId]?.completed ?? false,
            completedAt: progress.completed ? new Date().toISOString() : undefined,
            lastPosition: progress.lastPosition ?? prev?.progress[lessonId]?.lastPosition,
            notes: progress.notes ?? prev?.progress[lessonId]?.notes,
            bookmarks: progress.bookmarks ?? prev?.progress[lessonId]?.bookmarks,
          },
        },
        totalTime: prev?.totalTime ?? 0,
        streak: prev?.streak ?? 0,
        lastStudyDate: new Date().toISOString().split('T')[0],
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
      return newData;
    });
  };

  const getProgress = (lessonId: string): LearningProgress | undefined => {
    return data?.progress[lessonId];
  };

  const getCompletedCount = (): number => {
    return Object.values(data?.progress || {}).filter((p) => p.completed).length;
  };

  return { data, updateProgress, getProgress, getCompletedCount };
}

export function ProgressBar({ lessonId, totalSections }: ProgressTrackerProps) {
  const { getProgress } = useLearningProgress();
  const progress = getProgress(lessonId);

  const position = progress?.lastPosition ?? 0;
  const completed = progress?.completed ?? false;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">学习进度</span>
        <span className="text-sm font-medium text-gray-900">
          {completed ? '已完成' : `${position}/${totalSections} 节`}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${completed ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-300`}
          style={{ width: `${completed ? 100 : (position / totalSections) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function LearningStats() {
  const { data, getCompletedCount } = useLearningProgress();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">学习统计</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{getCompletedCount()}</p>
          <p className="text-sm text-blue-700">已完成课程</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">{data?.streak ?? 0}</p>
          <p className="text-sm text-purple-700">连续学习天数</p>
        </div>
        <div className="p-4 bg-emerald-50 rounded-lg">
          <p className="text-2xl font-bold text-emerald-600">{Math.floor((data?.totalTime ?? 0) / 60)}</p>
          <p className="text-sm text-emerald-700">学习小时数</p>
        </div>
        <div className="p-4 bg-orange-50 rounded-lg">
          <p className="text-2xl font-bold text-orange-600">{Object.keys(data?.progress ?? {}).length}</p>
          <p className="text-sm text-orange-700">学习课程数</p>
        </div>
      </div>
    </div>
  );
}

export function LearningRoadmap() {
  const stages = Object.values(stageConfig);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-900 mb-4">学习路线图</h3>
      <div className="space-y-4">
        {stages.map((stage, idx) => (
          <div key={stage.id} className="relative">
            {/* 连接线 */}
            {idx < stages.length - 1 && (
              <div className="absolute left-5 top-12 w-0.5 h-8 bg-gray-200" />
            )}

            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${stage.gradient} flex items-center justify-center text-white font-bold flex-shrink-0`}>
                {stage.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{stage.title}</h4>
                <p className="text-sm text-gray-500 mb-2">{stage.description}</p>
                <div className="flex flex-wrap gap-2">
                  {stage.modules.map((moduleId) => {
                    const module = moduleConfig[moduleId];
                    return (
                      <Link
                        key={moduleId}
                        href={`/learn/module/${moduleId}`}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded transition-colors"
                      >
                        {module?.title ?? moduleId}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
