import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { languages, routeConfig, routePaths } from './src/routeConfig';

const canonicalDomain = 'https://www.djerbalens.com';

const createSitemap = (lastmod: string) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${routeConfig
  .flatMap((route) =>
    languages.map(
      (language) => `  <url>
${languages
      .map(
        (language) => `    <xhtml:link rel="alternate" hreflang="${language}" href="${canonicalDomain}${route.paths[language]}" />`,
      )
      .join('\n')}
    <xhtml:link rel="alternate" hreflang="x-default" href="${canonicalDomain}${route.paths.en}" />
    <loc>${canonicalDomain}${route.paths[language]}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`,
    ),
  )
  .join('\n')}
</urlset>
`;

export default defineConfig({
  plugins: [react()],
  ssgOptions: {
    entry: 'src/main.tsx',
    dirStyle: 'nested',
    includedRoutes: () => [...routePaths],
    onFinished: async (outDir: string) => {
      const lastmod = new Date().toISOString().slice(0, 10);
      await writeFile(resolve(outDir, 'sitemap.xml'), createSitemap(lastmod), 'utf8');
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
