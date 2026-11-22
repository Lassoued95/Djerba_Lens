import { Facebook, Instagram, MapPin } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFromPath, getRoutePath } from '../routeConfig';

const Footer = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);
  const links = [
    { key: 'home', label: t('nav.home') },
    { key: 'portfolio', label: t('nav.portfolio') },
    { key: 'services', label: t('nav.services') },
    { key: 'about', label: t('nav.about') },
    { key: 'contact', label: t('nav.contact') },
  ] as const;

  return (
    <footer className="border-t border-white/10 bg-[#081729] text-[#f7f5f0]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr] lg:px-8 lg:py-16">
        <div>
          <Link
            to={getRoutePath('home', language)}
            className="inline-flex items-center gap-3"
          >
            <img
              src="/assets/images/bg/logo.png"
              alt=""
              width={1024}
              height={1024}
              loading="lazy"
              className="h-11 w-11 rounded-full bg-white/10 object-contain p-1"
            />
            <span className="font-serif text-2xl">{t('site.title')}</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/65">
            {t('footer.tagline')}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.instagram.com/djerbalens"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white/75 transition-colors hover:border-[#b77a3f] hover:text-[#e5b07a]"
            >
              <Instagram aria-hidden="true" className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61591247780029"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center border border-white/15 text-white/75 transition-colors hover:border-[#b77a3f] hover:text-[#e5b07a]"
            >
              <Facebook aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <nav aria-label={t('footer.explore')}>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
            {t('footer.explore')}
          </h2>
          <ul className="mt-5 space-y-3">
            {links.map((link) => (
              <li key={link.key}>
                <Link
                  to={getRoutePath(link.key, language)}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
            {t('contact.contactInformation')}
          </h2>
          <p className="mt-5 flex items-center gap-2 text-sm text-white/70">
            <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-[#e5b07a]" />
            {t('hero.location')}
          </p>
          <a
            href="mailto:djerbatnsphoto@gmail.com"
            className="mt-3 inline-block text-sm text-white/70 transition-colors hover:text-white"
          >
            djerbatnsphoto@gmail.com
          </a>
          <Link
            to={getRoutePath('contact', language)}
            className="mt-5 block text-sm font-semibold text-[#e5b07a] transition-colors hover:text-white"
          >
            {t('contact.getInTouch')} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <span>© DjerbaLens · {t('footer.copyright')}</span>
          <span>
            {t('footer.developedBy')}{' '}
            <a
              href="https://www.instagram.com/lassoued_95/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition-colors hover:text-[#e5b07a]"
            >
              Mohamed Lassoued
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
