import { Head } from 'vite-react-ssg';

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
  const canonical = `${SITE_URL}${path === '/' ? '/' : path}`;

  return (
    <>
      <Head>
        <html lang="fr" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <link rel="alternate" hrefLang="fr" href={canonical} />
        {preloadImage && <link rel="preload" as="image" href={preloadImage} />}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="DjerbaLens" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:image:alt" content="Photographie de Djerba par DjerbaLens" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:image:alt" content="Photographie de Djerba par DjerbaLens" />
      </Head>
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </>
  );
};

export default Seo;
