import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';
import { Outlet } from 'react-router-dom';
import type { RouteRecord } from 'vite-react-ssg';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

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

const lazyPage = (load: () => Promise<{ default: ComponentType }>) => async () => {
  const page = await load();
  return { Component: page.default };
};

const lazyService = (
  load: () => Promise<{ [key: string]: ComponentType }>,
  exportName: string,
) => async () => {
  const page = await load();
  return { Component: page[exportName] };
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, lazy: lazyPage(() => import('./pages/Home')) },
      {
        path: 'photographe-couple-djerba',
        lazy: lazyService(() => import('./pages/ServiceLandingPage'), 'CoupleServicePage'),
      },
      {
        path: 'photographe-famille-djerba',
        lazy: lazyService(() => import('./pages/ServiceLandingPage'), 'FamilyServicePage'),
      },
      {
        path: 'photographe-hotel-villa-djerba',
        lazy: lazyService(() => import('./pages/ServiceLandingPage'), 'HotelVillaServicePage'),
      },
      {
        path: 'contenu-photo-video-djerba',
        lazy: lazyService(() => import('./pages/ServiceLandingPage'), 'PhotoVideoServicePage'),
      },
      { path: 'portfolio', lazy: lazyPage(() => import('./pages/Portfolio')) },
      { path: 'contact', lazy: lazyPage(() => import('./pages/Contact')) },
      { path: 'services', lazy: lazyPage(() => import('./pages/Services')) },
      { path: 'blog', lazy: lazyPage(() => import('./pages/Blog')) },
      { path: 'about', lazy: lazyPage(() => import('./pages/About')) },
      { path: 'reviews', lazy: lazyPage(() => import('./pages/Reviews')) },
    ],
  },
];
