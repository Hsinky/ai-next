'use client';

import type { Section as SectionType } from '@/data/curriculum';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function ConceptSection({ section, index }: SectionProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="prose prose-gray max-w-none">
          {section.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-4 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
        {section.keyPoint && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-blue-900 font-medium">{section.keyPoint}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
