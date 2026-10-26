import { findSummaryPassage, guidedSummary, guidedSummaryIds } from './guidedSummaries';

describe('guided summaries', () => {
  it('declares fifty-two lessons across six batches', () => {
    expect([...guidedSummaryIds].sort((a, b) => a - b)).toEqual([18, 19, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 75, 76, 77, 105]);
    expect(guidedSummary('en', 48)).toBeNull();
    expect(guidedSummary('fr', -1)).toBeNull();
  });
  it.each([18, 19, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 34, 35, 36, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 49, 51, 52, 53, 54, 55, 56, 57, 58, 60, 61, 62, 63, 64, 65, 66, 68, 69, 70, 71, 72, 73, 75, 76, 77, 105])('has complete content and unique block/item ids for lesson %i', (id) => {
    const summary = guidedSummary('fr', id)!;
    expect(summary.intro.length).toBeGreaterThan(0);
    expect(summary.blocks.length).toBeGreaterThan(0);
    expect(new Set(summary.blocks.map((block) => block.id)).size).toBe(summary.blocks.length);
    for (const block of summary.blocks) {
      expect(block.items.length).toBeGreaterThan(0);
      expect(new Set(block.items.map((item) => item.id)).size).toBe(block.items.length);
      for (const item of block.items) {
        expect(item.label.trim()).not.toBe('');
        expect(item.detail.trim()).not.toBe('');
        expect(item.source.trim()).not.toBe('');
      }
    }
  });
  it('keeps all thirteen province/territory capitals', () => {
    const places = guidedSummary('fr', 105)!.blocks.flatMap((block) => block.items);
    expect(places).toHaveLength(13);
    expect(places.find((item) => item.label === 'Ontario')?.detail).toBe('Toronto');
    expect(places.find((item) => item.label === 'Nunavut')?.detail).toBe('Iqaluit');
  });
  it('makes the London correction visible and traceable', () => {
    const summary = guidedSummary('fr', 48)!;
    expect(summary.blocks[0].items.find((item) => item.id === 'london')?.detail).toContain('Angleterre');
    expect(summary.notes[0].detail).toContain('audio');
    expect(summary.notes[0].url).toMatch(/^https:\/\/www\.canada\.ca\//);
  });
});

describe('findSummaryPassage', () => {
  it('matches accents, inline markup and punctuation without changing the lesson', () => {
    const blocks = [{ t: 'Autre passage' }, { t: 'La **résidence permanente** : une condition.' }];
    expect(findSummaryPassage(blocks, 'residence permanente')).toBe(1);
  });
  it('refuses empty, missing and ambiguous anchors', () => {
    expect(findSummaryPassage([{ t: 'Texte' }], '')).toBeNull();
    expect(findSummaryPassage([{ t: 'Texte' }], 'absent')).toBeNull();
    expect(findSummaryPassage([{ t: 'La Charte' }, { t: 'La Charte encore' }], 'Charte')).toBeNull();
  });
});
