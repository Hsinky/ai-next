'use client';

import type { Section as SectionType } from '@/data/curriculum';
import { CheckCircleIcon } from 'lucide-react';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function ConceptSection({ section, index, keyPoint }: SectionProps & { keyPoint?: string }) {
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
              <CheckCircleIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900 font-medium">{section.keyPoint}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
