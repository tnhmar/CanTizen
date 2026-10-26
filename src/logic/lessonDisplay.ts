export type LessonDisplay = 'full' | 'summary' | 'both';
export function normalizeLessonDisplay(value: unknown): LessonDisplay {
  return value === 'summary' || value === 'both' ? value : 'full';
}
export function lessonVisibility(lang: string, available: boolean, mode: LessonDisplay) {
  const supported = lang === 'fr' && available;
  return { showSummary: supported && mode !== 'full', showFull: !supported || mode !== 'summary' };
}
