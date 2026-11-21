export const languages = ['en', 'fr'] as const;

export type Language = (typeof languages)[number];

export const routeConfig = [
  {
    key: 'home',
    paths: { en: '/', fr: '/fr/' },
    seo: {
      en: {
        title: 'Photographer in Djerba | DjerbaLens',
        description:
          'A photographer in Djerba for couples, families, hotels, villas, and photo and video content.',
      },
      fr: {
        title: 'Photographe à Djerba | DjerbaLens',
        description:
          'Photographe à Djerba : séances photo pour couples et familles, hôtels, villas et contenus photo/vidéo.',
      },
    },
  },
  {
    key: 'portfolio',
    paths: { en: '/portfolio', fr: '/fr/portfolio' },
    seo: {
      en: {
        title: 'Photography Portfolio in Djerba | DjerbaLens',
        description:
          'Explore DjerbaLens photographs of couples, villas, landscapes, and local food in Djerba.',
      },
      fr: {
        title: 'Portfolio photo à Djerba | DjerbaLens',
        description:
          'Découvrez les photos de couples, villas, paysages et spécialités culinaires réalisées à Djerba par DjerbaLens.',
      },
    },
  },
  {
    key: 'services',
    paths: { en: '/services', fr: '/fr/services' },
    seo: {
      en: {
        title: 'Photography and Video Services in Djerba | DjerbaLens',
        description:
          'Discover DjerbaLens photography and video services for visitors, families, and businesses in Djerba.',
      },
      fr: {
        title: 'Services photo et vidéo à Djerba | DjerbaLens',
        description:
          'Découvrez les services photo et vidéo de DjerbaLens pour les visiteurs, familles et professionnels à Djerba.',
      },
    },
  },
  {
    key: 'about',
    paths: { en: '/about', fr: '/fr/about' },
    seo: {
      en: {
        title: 'About DjerbaLens | Photographer in Djerba',
        description:
          'Meet the photographer behind DjerbaLens, specializing in photo sessions, landscapes, and visual content in Djerba.',
      },
      fr: {
        title: 'À propos de DjerbaLens | Photographe à Djerba',
        description:
          'Découvrez le photographe derrière DjerbaLens, spécialiste des séances photo, paysages et contenus visuels à Djerba.',
      },
    },
  },
  {
    key: 'contact',
    paths: { en: '/contact', fr: '/fr/contact' },
    seo: {
      en: {
        title: 'Contact Your Photographer in Djerba | DjerbaLens',
        description:
          'Contact DjerbaLens to book a photography session in Djerba for your trip, hotel, villa, or restaurant.',
      },
      fr: {
        title: 'Contacter votre photographe à Djerba | DjerbaLens',
        description:
          'Contactez DjerbaLens pour réserver une séance photo à Djerba, pour vos souvenirs, votre hôtel, villa ou restaurant.',
      },
    },
  },
  {
    key: 'couple',
    paths: {
      en: '/photographe-couple-djerba',
      fr: '/fr/photographe-couple-djerba',
    },
    seo: {
      en: {
        title: 'Couple Photographer in Djerba | DjerbaLens',
        description:
          'Enjoy a couple photo session in Djerba with natural moments and locations chosen together.',
      },
      fr: {
        title: 'Photographe couple à Djerba | DjerbaLens',
        description:
          'Offrez-vous une séance photo de couple à Djerba : une expérience naturelle, des lieux choisis ensemble et des souvenirs qui vous ressemblent.',
      },
    },
  },
  {
    key: 'family',
    paths: {
      en: '/photographe-famille-djerba',
      fr: '/fr/photographe-famille-djerba',
    },
    seo: {
      en: {
        title: 'Family Photographer in Djerba | DjerbaLens',
        description:
          'Bring your family together for a relaxed photo session and lasting memories in Djerba.',
      },
      fr: {
        title: 'Photographe famille à Djerba | DjerbaLens',
        description:
          'Réunissez votre famille pour une séance photo à Djerba : des images naturelles, un rythme adapté et des souvenirs partagés.',
      },
    },
  },
  {
    key: 'hotelVilla',
    paths: {
      en: '/photographe-hotel-villa-djerba',
      fr: '/fr/photographe-hotel-villa-djerba',
    },
    seo: {
      en: {
        title: 'Hotel and Villa Photographer in Djerba | DjerbaLens',
        description:
          'Professional photography for hotels and villas in Djerba, showcasing spaces, details, and atmosphere.',
      },
      fr: {
        title: 'Photographe hôtel et villa à Djerba | DjerbaLens',
        description:
          'Des photos professionnelles pour hôtels et villas à Djerba : espaces, détails et ambiance présentés avec cohérence.',
      },
    },
  },
  {
    key: 'photoVideo',
    paths: {
      en: '/contenu-photo-video-djerba',
      fr: '/fr/contenu-photo-video-djerba',
    },
    seo: {
      en: {
        title: 'Photo and Video Content in Djerba | DjerbaLens',
        description:
          'Create photo and video content in Djerba for your business, with clear preparation and delivery tailored to your needs.',
      },
      fr: {
        title: 'Contenu photo et vidéo à Djerba | DjerbaLens',
        description:
          'Créez des contenus photo et vidéo à Djerba pour votre activité : images cohérentes, préparation claire et livraison adaptée.',
      },
    },
  },
  {
    key: 'blog',
    paths: { en: '/blog', fr: '/fr/blog' },
    seo: {
      en: {
        title: 'Photography and Travel Tips in Djerba | DjerbaLens',
        description:
          'Photography tips, travel ideas, and places to discover in Djerba through the DjerbaLens lens.',
      },
      fr: {
        title: 'Conseils photo et voyage à Djerba | DjerbaLens',
        description:
          'Conseils de photographie, idées de voyage et lieux à découvrir à Djerba à travers l’objectif de DjerbaLens.',
      },
    },
  },
  {
    key: 'reviews',
    paths: { en: '/reviews', fr: '/fr/reviews' },
    seo: {
      en: {
        title: 'Client Reviews in Djerba | DjerbaLens',
        description:
          'Read DjerbaLens client reviews after their photography sessions in Djerba.',
      },
      fr: {
        title: 'Avis clients à Djerba | DjerbaLens',
        description:
          'Découvrez les avis des clients de DjerbaLens après leurs séances photo à Djerba.',
      },
    },
  },
] as const;

export type RouteKey = (typeof routeConfig)[number]['key'];

const normalizePath = (path: string) => {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/';
  if (withoutQuery === '/') return '/';
  return withoutQuery.replace(/\/+$/, '');
};

export const getLanguageFromPath = (path: string): Language =>
  normalizePath(path) === '/fr' || normalizePath(path).startsWith('/fr/')
    ? 'fr'
    : 'en';

export const getRoutePath = (key: RouteKey, language: Language) => {
  const route = routeConfig.find((item) => item.key === key);
  if (!route) throw new Error(`Unknown route key: ${key}`);
  return route.paths[language];
};

export const getRouteForPath = (path: string) => {
  const normalizedPath = normalizePath(path);
  return routeConfig.find((route) =>
    languages.some((language) => normalizePath(route.paths[language]) === normalizedPath),
  );
};

export const getLocalizedPath = (path: string, language: Language) => {
  const route = getRouteForPath(path);
  if (route) return route.paths[language];

  const normalizedPath = normalizePath(path);
  if (language === 'fr') {
    return normalizedPath === '/' ? '/fr/' : `/fr${normalizedPath}`;
  }
  if (normalizedPath === '/fr') return '/';
  return normalizedPath.startsWith('/fr/') ? normalizedPath.slice(3) : normalizedPath;
};

export const routePaths = routeConfig.flatMap((route) =>
  languages.map((language) => route.paths[language]),
);
