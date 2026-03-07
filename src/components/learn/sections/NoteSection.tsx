'use client';

import type { Section as SectionType } from '@/data/curriculum';
import { InfoIcon } from 'lucide-react';

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
          <InfoIcon className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
          <p className="text-sm text-cyan-900">{section.content}</p>
        </div>
      </div>
    </div>
  );
}
