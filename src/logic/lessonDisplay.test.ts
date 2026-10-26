import { lessonVisibility, normalizeLessonDisplay } from './lessonDisplay';

describe('normalizeLessonDisplay', () => {
  it.each(['full', 'summary', 'both'] as const)('preserves the saved %s preference', (mode) => {
    expect(normalizeLessonDisplay(mode)).toBe(mode);
  });

  it.each([undefined, null, '', 'invalid', 0, false, {}, []])('falls back to full text for %p', (value) => {
    expect(normalizeLessonDisplay(value)).toBe('full');
  });
});

describe('lessonVisibility', () => {
  it.each([
    ['full', false, true],
    ['summary', true, false],
    ['both', true, true],
  ] as const)('renders the expected content for French %s mode', (mode, showSummary, showFull) => {
    expect(lessonVisibility('fr', true, mode)).toEqual({ showSummary, showFull });
  });

  it.each(['full', 'summary', 'both'] as const)('keeps full text available for unsupported or missing summaries in %s mode', (mode) => {
    const fallback = { showSummary: false, showFull: true };
    expect(lessonVisibility('en', true, mode)).toEqual(fallback);
    expect(lessonVisibility('fr', false, mode)).toEqual(fallback);
    expect(lessonVisibility('en', false, mode)).toEqual(fallback);
  });
});
