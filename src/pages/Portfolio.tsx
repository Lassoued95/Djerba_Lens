import { useEffect, useState, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';

type PortfolioItem = {
  id: number;
  category: string;
  image: string; // Cloudinary public_id, e.g. "tourists/1"
  title: string;
  type: 'image' | 'video';
  videoSrc?: string; // Cloudinary public_id for video, e.g. "tourists/djerba"
};

// ---- Cloudinary config ----
const CLOUD_NAME = 'difrcodnc';
const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

// Masonry thumbnail: no fixed crop height — natural aspect ratio, just capped width.
// NOTE: parameter order matters on this account — size params must come BEFORE
// f_auto/q_auto, or certain images (confirmed: tourists/1) 404.
const getMasonryThumbUrl = (publicId: string) =>
  `${CLOUD_BASE}/image/upload/w_600,f_auto,q_auto/${publicId}`;

// Larger version used in the lightbox preview
const getFullUrl = (publicId: string) =>
  `${CLOUD_BASE}/image/upload/w_1600,f_auto,q_auto/${publicId}`;

// Optimized video delivery (auto format/quality, capped resolution)
const getVideoUrl = (publicId: string) =>
  `${CLOUD_BASE}/video/upload/w_1080,f_auto,q_auto/${publicId}`;

const portfolioImageDimensions: Record<string, { width: number; height: number }> = {
  'tourists/1': { width: 1280, height: 918 },
  'tourists/2': { width: 1080, height: 1080 },
  'tourists/3': { width: 1066, height: 1600 },
  'tourists/4': { width: 1066, height: 1600 },
  'tourists/5': { width: 1066, height: 1600 },
  'tourists/6': { width: 1080, height: 1080 },
  'horse/1': { width: 4284, height: 5712 },
  'horse/3': { width: 1080, height: 1080 },
  'horse/4': { width: 1280, height: 853 },
  'horse/5': { width: 1111, height: 742 },
  'villas/1': { width: 4000, height: 6000 },
  'villas/2': { width: 5619, height: 4000 },
  'villas/5': { width: 4000, height: 6000 },
  'villas/6': { width: 6000, height: 4000 },
  'villas/7': { width: 6000, height: 4000 },
  'food/1': { width: 1402, height: 1122 },
  'food/2': { width: 1537, height: 1023 },
  'food/3': { width: 1537, height: 1023 },
  'food/4': { width: 1537, height: 1023 },
  'food/5': { width: 1537, height: 1023 },
  'food/6': { width: 1187, height: 790 },
  'food/7': { width: 1537, height: 1023 },
  'food/8': { width: 1537, height: 1023 },
  'food/9': { width: 1537, height: 1023 },
  'food/10': { width: 1023, height: 1537 },
};

const getImageDimensions = (publicId: string) =>
  portfolioImageDimensions[publicId] ?? { width: 600, height: 400 };

const getPortfolioAlt = (title: string, category: string) => {
  if (title.includes('Couple')) return 'Séance photo de couple à Djerba';
  if (title.includes('Camel')) return 'Balade à cheval et à dos de chameau à Djerba';
  if (title.includes('Luxury Villas')) return 'Villa photographiée à Djerba';
  if (title.includes('Horseback')) return 'Séance photo à cheval à Djerba';
  if (title.includes('Traditional Tunisian Market')) return 'Marché traditionnel de Djerba';
  if (title.includes('Artisan at Work')) return 'Artisanat local photographié à Djerba';
  if (title.includes('Food Photography')) return 'Photographie culinaire à Djerba';
  if (title.includes('Explore Djerba')) return 'Vidéo de voyage à Djerba';
  if (category === 'tourists') return 'Séance photo touristique à Djerba';
  if (category === 'villas') return 'Villa photographiée à Djerba';
  if (category === 'horse') return 'Balade équestre à Djerba';
  return 'Photographie de produits à Djerba';
};

const PortfolioHero = () => {
  const headerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.35 });
  const cameraScale = useTransform(progress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 1.1]);
  const cameraY = useTransform(progress, [0, 1], prefersReducedMotion ? ['0vh', '0vh'] : ['0vh', '-3vh']);
  const copyOpacity = useTransform(progress, [0, 0.72, 1], prefersReducedMotion ? [1, 1, 1] : [1, 1, 0.25]);
  const copyY = useTransform(progress, [0, 1], prefersReducedMotion ? ['0vh', '0vh'] : ['0vh', '-2vh']);
  const scrollLineScale = useTransform(progress, [0, 1], [0.2, 1]);

  return (
    <header ref={headerRef} className="portfolio-hero">
      <motion.div
        className="portfolio-hero-camera"
        style={{ x: '-50%', y: cameraY, scale: cameraScale }}
      >
        <img
          src="/assets/images/bg/camera_bg.png"
          alt=""
          width="1672"
          height="1106"
          loading="eager"
        />
      </motion.div>
      <motion.div
        className="portfolio-hero-copy"
        style={{ opacity: copyOpacity, y: copyY }}
      >
        <p className="portfolio-location">
          <MapPin aria-hidden="true" />
          <span>Djerba, Tunisie</span>
        </p>
        <h1>{t('portfolio.title')}</h1>
        <p className="portfolio-hero-description">{t('portfolio.description')}</p>
      </motion.div>
      <div className="portfolio-hero-index" aria-hidden="true">
        <span>DJERBALENS</span>
        <span>PORTFOLIO — 01</span>
      </div>
      {!prefersReducedMotion && (
        <motion.span
          className="portfolio-scroll-line"
          style={{ scaleY: scrollLineScale }}
          aria-hidden="true"
        />
      )}
    </header>
  );
};

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const photographerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Photographer',
    name: 'DjerbaLens',
    url: 'https://www.djerbalens.com/portfolio',
    description: 'Food photographer for restaurants and cafes, tourist and landscape photographer based in Djerba, Tunisia.'
  };

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'tourists', name: 'Tourists' },
    { id: 'villas', name: 'Luxury Villas' },
    { id: 'local-life', name: 'Local Life' },
    { id: 'horse', name: 'Horse & Camel Rides' },
    { id: 'food', name: 'Food Photography' },
  ];

  // IMPORTANT: Cloudinary needs the extension included in the public_id for these
  // assets (f_auto alone did not resolve without it). Extensions below match the
  // original local filenames. If you re-check any asset's real public ID in the
  // Cloudinary Media Library and it differs, update the matching line below.
  const portfolioItems: PortfolioItem[] = [
    { id: 1, category: 'tourists', image: 'tourists/1', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 2, category: 'horse', image: 'horse/5', title: 'Camel & Horse Riding in Djerba', type: 'image' },
    { id: 3, category: 'tourists', image: 'tourists/3', title: '', type: 'image' },
    { id: 4, category: 'tourists', image: 'tourists/4', title: '', type: 'image' },
    { id: 5, category: 'tourists', image: 'tourists/5', title: '', type: 'image' },
    { id: 6, category: 'tourists', image: 'tourists/6', title: '', type: 'image' },
    { id: 7, category: 'horse', image: 'horse/1', title: 'Traditional Tunisian Market', type: 'image' },
    { id: 8, category: 'villas', image: 'villas/1', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 9, category: 'horse', image: 'horse/3', title: 'Artisan at Work', type: 'image' },

    { id: 10, category: 'villas', image: 'villas/2', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 11, category: 'tourists', image: 'tourists/1', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 13, category: 'villas', image: 'villas/5', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 14, category: 'horse', image: 'horse/4', title: 'Horseback Riding in Djerba', type: 'image' },
    { id: 15, category: 'villas', image: 'villas/6', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 16, category: 'villas', image: 'villas/7', title: 'Luxury Villas in Djerba', type: 'image' },


    // Vertical video for tourists
    {
      id: 17,
      category: 'tourists',
      image: 'tourists/2',
      title: 'Explore Djerba - Vertical Video',
      type: 'video',
      videoSrc: 'tourists/djerba'
    },

    // Food photography images
    { id: 18, category: 'food', image: 'food/1', title: 'Food Photography', type: 'image' },
    { id: 19, category: 'food', image: 'food/2', title: 'Food Photography', type: 'image' },
    { id: 20, category: 'food', image: 'food/3', title: 'Food Photography', type: 'image' },
    { id: 21, category: 'food', image: 'food/4', title: 'Food Photography', type: 'image' },
    { id: 22, category: 'food', image: 'food/5', title: 'Food Photography', type: 'image' },
    { id: 23, category: 'food', image: 'food/6', title: 'Food Photography', type: 'image' },
    { id: 24, category: 'food', image: 'food/7', title: 'Food Photography', type: 'image' },
    { id: 25, category: 'food', image: 'food/8', title: 'Food Photography', type: 'image' },
    { id: 26, category: 'food', image: 'food/9', title: 'Food Photography', type: 'image' },
    { id: 27, category: 'food', image: 'food/10', title: 'Food Photography', type: 'image' },


    { id: 28, category: 'tourists', image: 'tourists/7', title: '', type: 'image' },
    { id: 29, category: 'tourists', image: 'tourists/8', title: '', type: 'image' },
    { id: 30, category: 'tourists', image: 'tourists/9', title: '', type: 'image' },
    { id: 31, category: 'tourists', image: 'tourists/10', title: '', type: 'image' },
    { id: 32, category: 'tourists', image: 'tourists/11', title: '', type: 'image' },
    { id: 33, category: 'tourists', image: 'tourists/12', title: '', type: 'image' },
  ];

  const videoShowcase = {
    src: 'villas/vd',
    title: 'Djerba Villa Video Tour',
    description: 'Take a cinematic walkthrough of one of Djerba\u2019s most luxurious villas.',
    poster: 'villas/1',
  };

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  // ---- Lightbox navigation ----
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return prev;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxIndex]);

  // Reset lightbox if the filtered set changes (e.g. category switch) and index is now out of range
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filteredItems.length) {
      setLightboxIndex(null);
    }
  }, [filteredItems.length, lightboxIndex]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Seo
        title="Portfolio photo à Djerba | DjerbaLens"
        description="Découvrez les photos de couples, villas, paysages et spécialités culinaires réalisées à Djerba par DjerbaLens."
        path="/portfolio"
        preloadImage="/assets/images/bg/camera_bg.png"
        structuredData={photographerSchema}
      />

      <PortfolioHero />

      <section className="portfolio-filters" aria-label="Filtres du portfolio">
        <div className="portfolio-filter-list" role="group" aria-label="Catégories de photos">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              aria-pressed={selectedCategory === cat.id}
              className={`portfolio-filter${selectedCategory === cat.id ? ' is-active' : ''}`}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
            >
              {selectedCategory === cat.id && !prefersReducedMotion && (
                <motion.span
                  layoutId="portfolio-filter-active"
                  className="portfolio-filter-active"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <span className="portfolio-filter-label">{cat.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="portfolio-gallery">
        <div className="portfolio-gallery-inner">
          <div className="portfolio-gallery-heading">
            <div>
              <span className="portfolio-section-kicker">DJERBALENS — COLLECTION</span>
              <h2>{categories.find((category) => category.id === selectedCategory)?.name}</h2>
            </div>
            <p>{filteredItems.length.toString().padStart(2, '0')} <span>IMAGES</span></p>
          </div>
          <motion.div
            key={selectedCategory}
            className="portfolio-masonry"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.42, delay: Math.min(idx * 0.025, 0.22), ease: 'easeOut' }}
                className="portfolio-masonry-item"
              >
                <button
                  type="button"
                  aria-label={`${item.type === 'video' ? 'Lire' : 'Voir'} : ${getPortfolioAlt(item.title, item.category)}`}
                  onClick={() => setLightboxIndex(idx)}
                  className="portfolio-card"
                >
                  <img
                    src={getMasonryThumbUrl(item.image)}
                    alt={getPortfolioAlt(item.title, item.category)}
                    width={getImageDimensions(item.image).width}
                    height={getImageDimensions(item.image).height}
                    loading="lazy"
                    decoding="async"
                  />

                  {item.type === 'video' && (
                    <span className="portfolio-video-mark" aria-hidden="true">
                      <span />
                    </span>
                  )}
                  {item.title && (
                    <span className="portfolio-card-caption">
                      {item.title}
                      <span aria-hidden="true">↗</span>
                    </span>
                  )}
                  {item.type === 'video' && (
                    <span className="portfolio-video-label" aria-hidden="true">FILM</span>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl space-y-6 px-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Des images de Djerba, de ses habitants et de ses lieux
          </h2>
          <p>
            Ce portfolio rassemble différentes facettes du travail photographique réalisé à Djerba :
            des séances pour les visiteurs, des portraits de couple, des images de villas et des
            photographies culinaires. Chaque série part d’un contexte précis. Une séance de voyage
            raconte des instants partagés et une découverte de l’île ; une série immobilière présente
            des espaces et leurs détails ; une image culinaire met en lumière la présentation d’un
            plat ou d’un produit. Le fil conducteur reste une attention portée à la lumière, au cadre
            et à l’atmosphère du sujet.
          </p>
          <p>
            Les filtres vous permettent de parcourir les catégories disponibles, puis d’ouvrir une
            image pour la regarder en grand. Les photos de personnes sont pensées autour de moments
            naturels et d’une présence à l’aise devant l’objectif. Pour les hébergements, l’objectif
            est de montrer les volumes et les éléments qui aident à comprendre le lieu, sans
            transformer la réalité. Les images culinaires et de produits sont réalisées avec soin
            pour conserver des textures et des couleurs fidèles.
          </p>
          <p>
            Vous cherchez une séance qui ne figure pas exactement dans ces exemples ? Le portfolio
            sert de point de départ pour échanger sur votre projet, pas de catalogue de formules
            identiques. Nous pouvons discuter du lieu, de l’ambiance, du nombre de personnes ou
            d’espaces à photographier et des supports pour lesquels vous utiliserez les images.
            Les disponibilités, les tarifs, le nombre de livrables et le délai de livraison sont
            confirmés avant la réservation — TODO : compléter les prix et délais réels.
          </p>
          <p>
            Les photos et vidéos présentées ne remplacent pas une préparation adaptée à chaque
            projet. Pour une séance couple ou famille, nous choisissons ensemble un endroit et un
            rythme confortables. Pour un hôtel, une villa ou une activité, nous définissons en amont
            les espaces ou éléments à montrer et les conditions d’accès. Découvrez les pages de
            <Link to="/photographe-couple-djerba" className="text-red-700 underline dark:text-red-300"> séance couple</Link>,
            <Link to="/photographe-famille-djerba" className="text-red-700 underline dark:text-red-300"> séance famille</Link>,
            <Link to="/photographe-hotel-villa-djerba" className="text-red-700 underline dark:text-red-300"> photographie d’hébergement</Link>
            {' '}et <Link to="/contenu-photo-video-djerba" className="text-red-700 underline dark:text-red-300">contenu photo/vidéo</Link>,
            ou contactez-moi pour parler de vos besoins.
          </p>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{videoShowcase.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              {videoShowcase.description}
            </p>
            <div className="rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
              <video
                src={getVideoUrl(videoShowcase.src)}
                controls
                preload="none"
                className="w-full h-auto"
                poster={getMasonryThumbUrl(videoShowcase.poster)}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Immersive Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.24 }}
            className="portfolio-lightbox"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Visionneuse du portfolio"
          >
            <button
              onClick={closeLightbox}
              className="portfolio-lightbox-close"
              aria-label="Fermer la visionneuse"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="portfolio-lightbox-nav portfolio-lightbox-nav--previous"
                aria-label="Image précédente"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="portfolio-lightbox-nav portfolio-lightbox-nav--next"
                aria-label="Image suivante"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.99 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: 'easeOut' }}
                className="portfolio-lightbox-content"
                onClick={(e) => e.stopPropagation()}
              >
                {activeItem.type === 'image' ? (
                  <img
                    src={getFullUrl(activeItem.image)}
                    alt={getPortfolioAlt(activeItem.title, activeItem.category)}
                    width={getImageDimensions(activeItem.image).width}
                    height={getImageDimensions(activeItem.image).height}
                    loading="lazy"
                    decoding="async"
                    className="portfolio-lightbox-image"
                  />
                ) : (
                  <video
                    src={getVideoUrl(activeItem.videoSrc ?? '')}
                    controls
                    autoPlay
                    className="portfolio-lightbox-image"
                  />
                )}
                <p className="portfolio-lightbox-caption">
                  <span>{activeItem.title || getPortfolioAlt(activeItem.title, activeItem.category)}</span>
                  <span>{String((lightboxIndex ?? 0) + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}</span>
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;