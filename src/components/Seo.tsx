import { Head } from 'vite-react-ssg';
import { useLocation } from 'react-router-dom';
import {
  getLanguageFromPath,
  getRouteForPath,
  getRoutePath,
} from '../routeConfig';

type SeoProps = {
  title: string;
  description: string;
  path: string;
  image?: string;
  preloadImage?: string;
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

const SITE_URL = 'https://www.djerbalens.com';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const Seo = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  preloadImage,
  structuredData,
}: SeoProps) => {
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);
  const route = getRouteForPath(path);
  const localizedPath = route ? getRoutePath(route.key, language) : path;
  const canonical = `${SITE_URL}${localizedPath}`;
  const metadata = route?.seo[language];
  const localizedTitle = metadata?.title ?? title;
  const localizedDescription = metadata?.description ?? description;
  const absoluteImage = new URL(image, SITE_URL).toString();
  const alternateLocale = language === 'en' ? 'fr_FR' : 'en_US';
  const englishPath = route ? getRoutePath(route.key, 'en') : path;
  const frenchPath = route ? getRoutePath(route.key, 'fr') : `/fr${path}`;
  const localizedStructuredData =
    route?.key === 'home' && structuredData
      ? Array.isArray(structuredData)
        ? structuredData.map((item) => ({ ...item, inLanguage: language }))
        : { ...structuredData, inLanguage: language }
      : structuredData;
  const imageAlt =
    language === 'fr'
      ? 'Photographie de Djerba par DjerbaLens'
      : 'Photography in Djerba by DjerbaLens';

  return (
    <>
      <Head>
        <html lang={language} />
        <title>{localizedTitle}</title>
        <meta name="description" content={localizedDescription} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}${englishPath}`} />
        <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${frenchPath}`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${englishPath}`} />
        {preloadImage && <link rel="preload" as="image" href={preloadImage} />}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={language === 'en' ? 'en_US' : 'fr_FR'} />
        <meta property="og:locale:alternate" content={alternateLocale} />
        <meta property="og:site_name" content="DjerbaLens" />
        <meta property="og:title" content={localizedTitle} />
        <meta property="og:description" content={localizedDescription} />
        <meta property="og:image" content={absoluteImage} />
        <meta property="og:image:alt" content={imageAlt} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={localizedTitle} />
        <meta name="twitter:description" content={localizedDescription} />
        <meta name="twitter:image" content={absoluteImage} />
        <meta name="twitter:image:alt" content={imageAlt} />
      </Head>
      {localizedStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localizedStructuredData) }}
        />
      )}
    </>
  );
};

export default Seo;
