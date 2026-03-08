'use client';

import type { Section as SectionType } from '@/data/curriculum';

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
          <svg className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <div className="flex-1">
            <p className="text-purple-900 font-medium mb-4">{section.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
