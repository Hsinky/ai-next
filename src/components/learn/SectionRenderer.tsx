'use client';

import type { Section as SectionType } from '@/data/curriculum';
import { ConceptSection } from './sections/ConceptSection';
import { IntroductionSection } from './sections/IntroductionSection';
import { ExampleSection } from './sections/ExampleSection';
import { CodeSection } from './sections/CodeSection';
import { NoteSection } from './sections/NoteSection';
import { WarningSection } from './sections/WarningSection';
import { SummarySection } from './sections/SummarySection';

interface SectionRendererProps {
  section: SectionType;
  index: number;
}

export function SectionRenderer({ section, index }: SectionRendererProps) {
  switch (section.type) {
    case 'introduction':
      return <IntroductionSection section={section} index={index} />;
    case 'concept':
      return <ConceptSection section={section} index={index} />;
    case 'example':
      return <ExampleSection section={section} index={index} />;
    case 'code':
      return <CodeSection section={section} index={index} />;
    case 'note':
      return <NoteSection section={section} index={index} />;
    case 'warning':
      return <WarningSection section={section} index={index} />;
    case 'summary':
      return <SummarySection section={section} index={index} />;
    default:
      return null;
  }
}
