import { readFileSync } from 'node:fs';

const servicesSource = readFileSync(new URL('../src/pages/Services.tsx', import.meta.url), 'utf8');
const featureKeys = [
  ...servicesSource.matchAll(/getFeatures\(\s*['"]([^'"]+)['"]\s*\)/g),
].map((match) => match[1]);

if (featureKeys.length === 0) {
  throw new Error('No translated feature lists were found in src/pages/Services.tsx.');
}

for (const language of ['en', 'fr']) {
  const translations = JSON.parse(
    readFileSync(new URL(`../src/locales/${language}.json`, import.meta.url), 'utf8'),
  );

  for (const key of featureKeys) {
    const value = key.split('.').reduce((current, segment) => current?.[segment], translations);
    if (!Array.isArray(value) || !value.every((feature) => typeof feature === 'string')) {
      throw new Error(
        `Expected ${language} translation "${key}" to be an array of strings.`,
      );
    }
  }
}

console.log(`Validated ${featureKeys.length} service feature lists in en and fr.`);
