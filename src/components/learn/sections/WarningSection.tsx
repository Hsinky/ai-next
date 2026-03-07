'use client';

import type { Section as SectionType } from '@/data/curriculum';
import { AlertTriangleIcon } from 'lucide-react';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function WarningSection({ section, index }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-6 border border-red-200">
        <div className="flex items-start gap-3">
          <AlertTriangleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-semibold text-red-900 mb-2">重要提醒</h3>
            <p className="text-sm text-red-800">{section.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
