'use client';

import type { Section as SectionType } from '@/data/curriculum';
import { BookOpenCheckIcon } from 'lucide-react';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function SummarySection({ section, index }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
        <div className="flex items-start gap-3">
          <BookOpenCheckIcon className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <p className="text-purple-900 font-medium mb-4">{section.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
