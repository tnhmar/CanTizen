import first from './summaries/lessons.fr.1.json';
import secondA from './summaries/lessons.fr.2a.json';
import secondB from './summaries/lessons.fr.2b.json';
import thirdA from './summaries/lessons.fr.3a.json';
import thirdB from './summaries/lessons.fr.3b.json';
export interface SummarySection { type: string; items: string[]; }
const french: Record<string, SummarySection[]> = { ...first, ...secondA, ...secondB, ...thirdA, ...thirdB };
export function lessonSummary(lang: string, id: number): SummarySection[] | null {
  return lang === 'fr' ? french[String(id)] ?? null : null;
}
