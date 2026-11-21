import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLanguageFromPath, getLocalizedPath, languages } from '../routeConfig';

const languageLabels = {
  en: { label: 'EN', flag: '🇬🇧' },
  fr: { label: 'FR', flag: '🇫🇷' },
} as const;

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const currentLanguage = getLanguageFromPath(pathname);
  const current = languageLabels[currentLanguage];

  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 text-sm"
      >
        <span>{current.flag}</span>
        <span>{current.label}</span>
        <span className="ml-1 text-xs">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 rounded-lg shadow-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
          {languages.map((language) => {
            const option = languageLabels[language];
            return (
              <a
                key={language}
                href={getLocalizedPath(pathname, language)}
                aria-current={language === currentLanguage ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
                  ${language === currentLanguage ? 'font-bold text-orange-500' : ''}`}
              >
                <span>{option.flag}</span>
                <span>{option.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
