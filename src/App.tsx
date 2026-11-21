import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { Outlet } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import i18n from './i18n';
import { routeConfig, type Language, type RouteKey } from './routeConfig';

const ChatBot = lazy(() => import('./components/ChatBot'));

function ChatBotMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <ChatBot />
    </Suspense>
  );
}

function AppLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white transition-colors duration-300 dark:bg-gray-900">
        <Navbar />
        <ScrollToTop />
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <ChatBotMount />
      </div>
    </ThemeProvider>
  );
}

const lazyPage = (
  load: () => Promise<{ default: ComponentType }>,
  language: Language,
) => async () => {
  await i18n.changeLanguage(language);
  const page = await load();
  return { Component: page.default };
};

const lazyService = (exportName: string, language: Language) => async () => {
  await i18n.changeLanguage(language);
  const page = await import('./pages/ServiceLandingPage');
  const Component = page[exportName as keyof typeof page];
  if (typeof Component !== 'function') {
    throw new Error(`Unknown service page export: ${exportName}`);
  }
  return { Component };
};

const lazyRouteForLanguage: Record<
  RouteKey,
  (language: Language) => () => Promise<{ Component: ComponentType }>
> = {
  home: (language) => lazyPage(() => import('./pages/Home'), language),
  portfolio: (language) => lazyPage(() => import('./pages/Portfolio'), language),
  services: (language) => lazyPage(() => import('./pages/Services'), language),
  about: (language) => lazyPage(() => import('./pages/About'), language),
  contact: (language) => lazyPage(() => import('./pages/Contact'), language),
  couple: (language) => lazyService('CoupleServicePage', language),
  family: (language) => lazyService('FamilyServicePage', language),
  hotelVilla: (language) => lazyService('HotelVillaServicePage', language),
  photoVideo: (language) => lazyService('PhotoVideoServicePage', language),
  blog: (language) => lazyPage(() => import('./pages/Blog'), language),
  reviews: (language) => lazyPage(() => import('./pages/Reviews'), language),
};

const languageRoute = (language: Language): RouteRecord => {
  const prefix = language === 'fr' ? '/fr' : '';
  const homePath = language === 'fr' ? '/fr/' : '/';

  return {
    path: language === 'fr' ? '/fr' : '/',
    Component: AppLayout,
    children: routeConfig.map((route) => {
      const path = route.paths[language];
      const lazy = lazyRouteForLanguage[route.key](language);

      return path === homePath
        ? { index: true, lazy }
        : { path: path.slice(prefix.length + 1), lazy };
    }),
  };
};

export const routes: RouteRecord[] = [
  languageRoute('en'),
  languageRoute('fr'),
];
