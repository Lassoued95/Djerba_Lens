import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { getLanguageFromPath, getRoutePath } from '../routeConfig';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const { t } = useTranslation();
  const language = getLanguageFromPath(location.pathname);
  const isHeroAtTop =
    (location.pathname === getRoutePath('home', language) ||
      location.pathname === getRoutePath('portfolio', language)) &&
    !isScrolled &&
    !isOpen;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'nav.home', route: 'home' },
    { name: 'nav.portfolio', route: 'portfolio' },
    { name: 'nav.services', route: 'services' },
    { name: 'nav.about', route: 'about' },
    { name: 'nav.contact', route: 'contact' },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || isOpen
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={getRoutePath('home', language)} className="flex items-center space-x-3 group">
            <div className="bg-orange-100 dark:bg-orange-700 p-2 rounded-full shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-110 hover:rotate-3">
              <img
                src="/assets/images/bg/logo.png"
                alt="Logo DjerbaLens, photographe à Djerba"
                width={1024}
                height={1024}
                className="h-10 w-10 object-contain rounded-full"
              />
            </div>
            <span className={`text-xl font-bold tracking-wide px-3 py-1 rounded-full backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 dark:group-hover:bg-gray-800/50 ${
              isHeroAtTop
                ? 'text-white bg-white/10'
                : 'text-gray-900 dark:text-white bg-white/20 dark:bg-gray-800/30'
            }`}>
              {t('site.title')}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={getRoutePath(item.route, language)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  location.pathname === getRoutePath(item.route, language)
                    ? 'text-orange-600 dark:text-orange-400'
                    : isHeroAtTop
                    ? 'text-white/80 hover:text-orange-300'
                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                {t(item.name)}
              </Link>
            ))}

            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isHeroAtTop
                  ? 'bg-white/10 hover:bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-600" />
              ) : (
                <Moon className={`h-5 w-5 ${isHeroAtTop ? 'text-white' : 'text-gray-600'}`} />
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isHeroAtTop
                  ? 'bg-white/10 hover:bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-600" />
              ) : (
                <Moon className={`h-5 w-5 ${isHeroAtTop ? 'text-white' : 'text-gray-600'}`} />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              ) : (
                <Menu className={`h-6 w-6 ${isHeroAtTop ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={getRoutePath(item.route, language)}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 text-base font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === getRoutePath(item.route, language)
                      ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {t(item.name)}
                </Link>
              ))}

              <div className="pt-2 px-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;