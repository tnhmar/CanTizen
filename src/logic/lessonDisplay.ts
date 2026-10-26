export type LessonDisplay = 'full' | 'summary' | 'both';
export function normalizeLessonDisplay(value: unknown): LessonDisplay {
  return value === 'summary' || value === 'both' ? value : 'full';
}
export function lessonVisibility(lang: string, available: boolean, mode: LessonDisplay) {
  const showSummary = lang === 'fr' && available && mode !== 'full';
  return { showSummary, showFull: mode !== 'summary' || !showSummary };
}
