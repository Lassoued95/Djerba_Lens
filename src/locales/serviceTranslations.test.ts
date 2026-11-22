import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import en from './en.json';
import fr from './fr.json';

const serviceSource = readFileSync(new URL('../pages/Services.tsx', import.meta.url), 'utf8');
const featureKeys = [
  ...serviceSource.matchAll(/getFeatures\(\s*['"]([^'"]+)['"]\s*\)/g),
].map((match) => match[1]);

const readPath = (value: unknown, path: string): unknown =>
  path.split('.').reduce<unknown>((current, segment) => {
    if (!current || typeof current !== 'object' || Array.isArray(current)) {
      return undefined;
    }
    return (current as Record<string, unknown>)[segment];
  }, value);

describe('Services feature translations', () => {
  it.each([
    { language: 'en', translations: en },
    { language: 'fr', translations: fr },
  ])('provides string arrays for every Services list in $language', ({ language, translations }) => {
    expect(featureKeys.length).toBeGreaterThan(0);

    for (const key of featureKeys) {
      const features = readPath(translations, key);
      expect(Array.isArray(features), `${language} "${key}" should be an array`).toBe(true);
      expect(
        (features as unknown[]).every((feature) => typeof feature === 'string'),
        `${language} "${key}" should contain only strings`,
      ).toBe(true);
    }
  });
});
