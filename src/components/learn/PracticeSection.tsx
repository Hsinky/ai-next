'use client';

import { useState } from 'react';
import type { Exercise } from '@/data/curriculum';

interface PracticeSectionProps {
  exercises: Exercise[];
}

export function PracticeSection({ exercises }: PracticeSectionProps) {
  const [revealed, setRevealed] = useState<number | null>(null);

  const toggleReveal = (index: number) => {
    setRevealed(revealed === index ? null : index);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
          <span>✓</span>
        </div>
        <h2 className="text-xl font-bold text-gray-900">课后练习</h2>
      </div>
      <div className="space-y-4">
        {exercises.map((exercise, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="p-5">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium mb-3">{exercise.question}</p>

                  {exercise.type === 'choice' && exercise.options && (
                    <div className="space-y-2 mb-3">
                      {exercise.options.map((option, optIdx) => {
                        const isCorrect = option === exercise.answer;
                        const isRevealed = revealed === idx;
                        return (
                          <div
                            key={optIdx}
                            className={`p-3 rounded-lg border transition-colors ${
                              isRevealed && isCorrect
                                ? 'bg-green-50 border-green-300'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">
                                {String.fromCharCode(65 + optIdx)}.
                              </span>
                              <span className="text-gray-700">{option}</span>
                              {isRevealed && isCorrect && (
                                <svg className="w-5 h-5 text-green-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  <button
                    onClick={() => toggleReveal(idx)}
                    className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {revealed === idx ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                        收起解析
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        查看答案与解析
                      </>
                    )}
                  </button>
                </div>
              </div>

              {revealed === idx && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-semibold text-green-900">
                        正确答案：{exercise.answer}
                      </span>
                    </div>
                    <p className="text-sm text-green-800">{exercise.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
