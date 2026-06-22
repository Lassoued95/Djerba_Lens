import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, Star } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import JsonLd from '../components/JsonLd';
import ReviewList from '../components/ReviewList';
import { useTranslation } from 'react-i18next';

// Each "layer" is one of your real photos, given a depth (z) and a scroll range
// in which it's the active/visible layer. Higher depth = feels farther away,
// moves slower and stays smaller longer (parallax).
const flythroughLayers = [
  {
    image: '/assets/images/bg/bg5.jpeg',
    depth: 1,
    label: 'Djerba Coastline',
  },
  {
    image: '/assets/images/bg/bg1.jpg',
    depth: 2,
    label: 'Houmt Souk',
  },
  {
    image: '/assets/images/bg/bg3.jpg',
    depth: 3,
    label: 'Golden Dunes',
  },
  {
    image: '/assets/images/bg/bg4.jpeg',
    depth: 4,
    label: 'Sunset Rides',
  },
];

const HERO_SCREENS = 2.5; // total scroll-height of the cinematic hero, in viewport units

const CinematicHero = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Smooth out the raw scroll progress so the flythrough feels like inertia,
  // not a 1:1 scrollbar drag.
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });

  // Overlay text fades + lifts out as the user scrolls through the flythrough.
  const textOpacity = useTransform(smoothProgress, [0, 0.15, 0.78, 1], [1, 1, 1, 0]);
  const textY = useTransform(smoothProgress, [0, 1], [0, -60]);

  // Vignette darkens slightly at the very start/end for a cinematic letterbox feel.
  const vignetteOpacity = useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0.55, 0.3, 0.3, 0.6]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${HERO_SCREENS * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {flythroughLayers.map((layer, index) => {
          const segment = 1 / flythroughLayers.length;
          const start = index * segment;
          const end = start + segment;
          // small overlap so layers cross-dissolve rather than hard-cut
          const overlap = segment * 0.35;

          const fadeIn = Math.max(start - overlap, 0);
          const fadeOutStart = Math.min(end - overlap, 1);
          const fadeOutEnd = Math.min(end + overlap, 1);

          return <FlythroughLayer
            key={layer.image}
            layer={layer}
            progress={smoothProgress}
            fadeIn={fadeIn}
            activeStart={start}
            activeEnd={end}
            fadeOutStart={fadeOutStart}
            fadeOutEnd={fadeOutEnd}
          />;
        })}

        {/* Cinematic vignette */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: vignetteOpacity,
            background:
              'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.9) 100%)',
          }}
        />

        {/* Foreground gradient for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

        {/* Overlay content */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="absolute inset-0 z-20 flex items-center justify-center px-4"
        >
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-6">
              <MapPin className="h-6 w-6 text-orange-400 mr-2" />
              <span className="text-orange-400 font-medium">{t('hero.location')}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              {t('hero.title1')}
              <span className="text-orange-400 block">{t('hero.title2')}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 leading-relaxed">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('hero.viewWork')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm transition-all duration-300 border border-white/20 hover:border-white/30"
              >
                {t('hero.bookSession')}
                <Camera className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: useTransform(smoothProgress, [0, 0.08], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-white/70"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-5 h-8 rounded-full border border-white/50 flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 rounded-full bg-white/80" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface FlythroughLayerProps {
  layer: { image: string; depth: number; label: string };
  progress: ReturnType<typeof useSpring>;
  fadeIn: number;
  activeStart: number;
  activeEnd: number;
  fadeOutStart: number;
  fadeOutEnd: number;
}

const FlythroughLayer: React.FC<FlythroughLayerProps> = ({
  layer,
  progress,
  fadeIn,
  activeStart,
  activeEnd,
  fadeOutStart,
  fadeOutEnd,
}) => {
  // Opacity: cross-dissolve in, hold, cross-dissolve out
  const opacity = useTransform(
    progress,
    [fadeIn, activeStart, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );

  // Scale: each layer slowly zooms in (simulates flying *toward* it) across its active window,
  // continuing slightly into the overlap so the transition feels continuous.
  const scale = useTransform(
    progress,
    [fadeIn, fadeOutEnd],
    [1.05, 1.35 + layer.depth * 0.03]
  );

  // Slight vertical drift adds to the "flying past" sensation.
  const y = useTransform(progress, [fadeIn, fadeOutEnd], [0, -40 - layer.depth * 6]);

  return (
    <motion.div
      className="absolute inset-0 will-change-transform"
      style={{ opacity }}
    >
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${layer.image}')`,
          scale,
          y,
        }}
      />
    </motion.div>
  );
};

const Home = () => {
  const { t } = useTranslation();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DjerbaLens',
    image: 'https://djerbalens.space/og-image.jpg',
    url: 'https://djerbalens.space',
    '@id': 'https://djerbalens.space',
    description:
      'Professional photographer in Djerba, Tunisia specializing in food photography for restaurants and cafes, tourist photography, landscapes and digital content creation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Djerba',
      addressRegion: 'Médenine',
      addressCountry: 'TN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8076,
      longitude: 10.8451,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Photography Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Food Photography',
            description: 'Professional food photography for restaurants and cafes in Djerba and Tunisia.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tourist Photography',
            description: 'Memorable tourist photography sessions in Djerba, Tunisia.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landscape Photography',
            description: 'Stunning landscape and nature photography in Djerba.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Content Creation',
            description: 'Social media content creation for restaurants, cafes and tourism businesses in Tunisia.',
          },
        },
      ],
    },
    sameAs: ['https://www.instagram.com/djerbalens', 'https://www.facebook.com/djerbalens'],
    priceRange: '$$',
    openingHours: 'Mo-Su 08:00-20:00',
  };

  useEffect(() => {
    document.title = 'DjerbaLens – Professional Photographer in Djerba, Tunisia';
    document.documentElement.lang = 'en';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Freelance photographer in Djerba, Tunisia. Specializing in tourist photography, food photography for restaurants & cafes, landscapes and digital content creation. Book a session today.'
      );
    }
    const robots = document.querySelector('meta[name="robots"]');
    if (robots) robots.setAttribute('content', 'index, follow');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://djerbalens.space');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'DjerbaLens – Professional Photographer in Djerba, Tunisia');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Freelance photographer in Djerba, Tunisia. Specializing in tourist photography, food photography for restaurants & cafes, landscapes and digital content creation. Book a session today.'
      );
    }
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://djerbalens.space');
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <JsonLd data={localBusinessSchema} />

      {/* Cinematic scroll-driven flythrough hero */}
      <CinematicHero />

      {/* Featured Work Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('featured.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('featured.description')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Tourist Photography',
                image: '/assets/images/tourists/1.jpg',
                delay: 0,
              },
              {
                title: 'Horse & Camel Riding',
                image: '/assets/images/bg/bg4.jpeg',
                delay: 200,
              },
              {
                title: 'Luxury Villas',
                image: '/assets/images/villas/5.JPG',
                delay: 400,
              },
              {
                title: 'Nature',
                image: '/assets/images/bg/bg3.jpg',
                delay: 600,
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={item.delay}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-w-4 aspect-h-3 h-64">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={800}>
            <div className="text-center mt-12">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('portfolio.viewFull')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {t('services.description')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Tourist Photo Shoots',
                description: 'Capture your vacation memories with professional photography sessions',
                delay: 0,
              },
              {
                title: 'Promotional Videos',
                description: 'High-quality video content for hotels, restaurants, and travel agencies',
                delay: 200,
              },
              {
                title: 'Social Media Content',
                description: 'Engaging visual content for your social media platforms',
                delay: 400,
              },
            ].map((service, index) => (
              <AnimatedSection key={index} delay={service.delay}>
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('services.viewAll')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Dynamic Reviews */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('reviews.title')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">{t('reviews.description')}</p>
            </div>
          </AnimatedSection>

          <ReviewList />

          <AnimatedSection delay={600}>
            <div className="text-center mt-12">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {t('reviews.leaveReview')}
                <Star className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;