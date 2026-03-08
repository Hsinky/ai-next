'use client';

import { useState } from 'react';
import type { Section as SectionType } from '@/data/curriculum';

interface SectionProps {
  section: SectionType;
  index: number;
}

export function CodeSection({ section, index }: SectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (section.code) {
      await navigator.clipboard.writeText(section.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
          {index + 1}
        </div>
        <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
      </div>
      <div className="bg-gray-900 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <span className="text-sm text-gray-400 font-mono">
            {section.language || 'text'}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1 text-sm text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded transition-colors"
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                已复制
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                复制代码
              </>
            )}
          </button>
        </div>
        <pre className="p-4 overflow-x-auto">
          <code className="text-sm text-gray-100 font-mono whitespace-pre">
            {section.code}
          </code>
        </pre>
      </div>
      {section.content && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">{section.content}</p>
        </div>
      )}
    </div>
  );
}
