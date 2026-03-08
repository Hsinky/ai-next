'use client';

import type { Section as SectionType } from '@/data/curriculum';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function NoteSection({ section, index }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-cyan-900">{section.content}</p>
        </div>
      </div>
    </div>
  );
}
