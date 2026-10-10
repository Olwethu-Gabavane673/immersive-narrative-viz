import { describe, expect, it } from 'vitest';
import { experience, profile, results, standards } from '@/lib/portfolio';
describe('CV factual records', () => {
  it('retains the supplied contact information', () => {
    expect(profile.email).toBe('olwethungalo@bardalesec.org.za');
    expect(profile.phone).toBe('075-021-1548');
  });
  it('retains the supplied internship timelines', () => {
    expect(experience.map(job => job.date)).toEqual(['Jun 2026 — Sep 2026', 'Oct 2025 — May 2026']);
  });
  it('preserves the 31 achieved credits and each standard allocation', () => {
    expect(standards.map(s => [s.code, s.credits])).toEqual([['115392', 12], ['115367', 8], ['115362', 5], ['115373', 6]]);
    expect(standards.reduce((sum, s) => sum + s.credits, 0)).toBe(31);
  });
  it('preserves the university final results', () => {
    expect(results.map(r => [r.code, r.final])).toEqual([['ITS1011', 59], ['WIH1011', 50], ['TSS1012', 53], ['USS1012', 54]]);
  });
});