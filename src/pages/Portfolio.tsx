import { useEffect, useState, useCallback, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import JsonLd from '../components/JsonLd';
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

// Header background slideshow (cinematic banner) — cycles through a few
// representative shots automatically, cross-dissolving between them.
const HEADER_IMAGES = ['villas/1', 'tourists/1', 'food/2', 'horse/1'];
const HEADER_SLIDE_INTERVAL = 4000; // ms

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [headerSlide, setHeaderSlide] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setHeaderSlide((prev) => (prev + 1) % HEADER_IMAGES.length);
    }, HEADER_SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const headerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: headerRef,
    offset: ['start start', 'end start'],
  });
  const headerImageY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const headerImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const headerTextOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const headerTextY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const photographerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Photographer',
    name: 'DjerbaLens',
    url: 'https://www.djerbalens.space/portfolio',
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

  // Reset lightbox if the filtered set changes (e.g. category switch) and index is now out of range
  useEffect(() => {
    if (lightboxIndex !== null && lightboxIndex >= filteredItems.length) {
      setLightboxIndex(null);
    }
  }, [filteredItems.length, lightboxIndex]);

  useEffect(() => {
    document.title = 'Photography Portfolio – Food, Landscape & Tourist Photos | DjerbaLens';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore DjerbaLens portfolio: food photography for restaurants and cafes, tourist photography, and landscape shots captured in Djerba, Tunisia.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Photography Portfolio – Food, Landscape & Tourist Photos | DjerbaLens');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Explore DjerbaLens portfolio: food photography for restaurants and cafes, tourist photography, and landscape shots captured in Djerba, Tunisia.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.djerbalens.space/portfolio');
  }, []);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <JsonLd data={photographerSchema} />

      {/* Cinematic Header */}
      <div ref={headerRef} className="relative h-[70vh] min-h-[420px] overflow-hidden bg-black">
        <motion.div
          className="absolute inset-0"
          style={{ y: headerImageY, scale: headerImageScale }}
        >
          {HEADER_IMAGES.map((publicId, idx) => (
            <motion.img
              key={publicId}
              src={getMasonryThumbUrl(publicId)}
              alt="DjerbaLens photography"
              className="absolute inset-0 w-full h-full object-cover"
              initial={false}
              animate={{ opacity: idx === headerSlide ? 1 : 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        <motion.div
          style={{ opacity: headerTextOpacity, y: headerTextY }}
          className="relative z-10 h-full flex items-center justify-center px-4"
        >
          <div className="text-center text-white max-w-3xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-5 w-5 text-orange-400 mr-2" />
              <span className="text-orange-400 font-medium uppercase tracking-widest text-sm">
                Djerba, Tunisia
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
              {t('portfolio.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              {t('portfolio.description')}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Filter Buttons */}
      <section className="py-8 bg-white dark:bg-gray-900 sticky top-0 z-30 border-b border-gray-100 dark:border-gray-800 backdrop-blur-md bg-white/90 dark:bg-gray-900/90">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30 scale-105'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:scale-105'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            key={selectedCategory}
            className="[column-fill:_balance] sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
          >
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.6), ease: 'easeOut' }}
                className="break-inside-avoid mb-4"
              >
                <div
                  className="group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-500 cursor-pointer bg-gray-100 dark:bg-gray-800"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <img
                    src={getMasonryThumbUrl(item.image)}
                    alt={item.title || 'DjerbaLens photography'}
                    loading="lazy"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {item.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors duration-300">
                      <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <div className="w-0 h-0 border-y-[10px] border-y-transparent border-l-[16px] border-l-orange-600 ml-1" />
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    {item.title && (
                      <h3 className="text-white font-semibold text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
              aria-label="Close"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Prev arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Next arrow */}
            {filteredItems.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-sm"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative max-w-5xl w-full max-h-[85vh] mx-4 flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                {activeItem.type === 'image' ? (
                  <img
                    src={getFullUrl(activeItem.image)}
                    alt={activeItem.title || 'Preview'}
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                ) : (
                  <video
                    src={getVideoUrl(activeItem.videoSrc ?? '')}
                    controls
                    autoPlay
                    className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
                  />
                )}
                {activeItem.title && (
                  <p className="mt-4 text-white/80 text-sm tracking-wide">{activeItem.title}</p>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Portfolio;