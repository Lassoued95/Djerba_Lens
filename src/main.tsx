import './i18n';
import { ViteReactSSG } from 'vite-react-ssg';
import { routes } from './App';
import './index.css';

export const createRoot = ViteReactSSG(
  { routes },
  ({ isClient }) => {
    if (isClient && typeof window !== 'undefined') {
      document.documentElement.lang = 'fr';
    }
  },
);
