export type LessonDisplay = 'full' | 'summary';
export function normalizeLessonDisplay(value: unknown): LessonDisplay {
  return value === 'summary' ? 'summary' : 'full';
}
export function lessonVisibility(lang: string, available: boolean, mode: LessonDisplay) {
  const showSummary = lang === 'fr' && available && mode === 'summary';
  return { showSummary, showFull: !showSummary };
}
