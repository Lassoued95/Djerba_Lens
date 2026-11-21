import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, Star } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import ReviewList from '../components/ReviewList';
import { ReviewProvider } from '../contexts/ReviewContext';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';

const cameraImage = '/assets/images/bg/camera_bg.png';
const heroPhotos = [
  { image: '/assets/images/bg/bg5.jpeg', alt: 'Littoral de Djerba', x: -30, y: -12, start: 0.17, end: 0.7, rotate: -10, scale: 0.9 },
  { image: '/assets/images/tourists/1.jpg', alt: 'Séance photo à Djerba', x: 27, y: -15, start: 0.25, end: 0.77, rotate: 8, scale: 0.82 },
  { image: '/assets/images/bg/bg3.jpg', alt: 'Paysage de Djerba', x: -27, y: 14, start: 0.33, end: 0.84, rotate: 7, scale: 0.94 },
  { image: '/assets/images/tourists/2.jpg', alt: 'Portrait de voyage à Djerba', x: 30, y: 14, start: 0.41, end: 0.9, rotate: -8, scale: 0.86 },
  { image: '/assets/images/bg/bg4.jpeg', alt: 'Balade au coucher du soleil', x: 2, y: -26, start: 0.49, end: 0.95, rotate: 3, scale: 0.76 },
  { image: '/assets/images/bg/bg2.jpg', alt: 'Un instant sur l’île de Djerba', x: -6, y: 27, start: 0.56, end: 1, rotate: -4, scale: 0.82 },
];

const CinematicHero = () => {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (prefersReducedMotion) return <StaticCinematicHero />;
  return mounted ? <AnimatedCinematicHero /> : <StaticCinematicHero />;
};

const HeroContent = () => {
  const { t } = useTranslation();
  return (
    <div className="cinematic-copy-inner">
      <div className="cinematic-eyebrow">
        <MapPin aria-hidden="true" />
        <span>{t('hero.location')}</span>
      </div>
      <h1 className="cinematic-title">
        {t('hero.title1')}
        <span>{t('hero.title2')}</span>
      </h1>
      <p className="cinematic-description">
        {t('hero.description')}
      </p>
      <div className="cinematic-actions">
        <Link
          to="/portfolio"
          className="cinematic-button cinematic-button--primary"
        >
          {t('hero.viewWork')}
          <ArrowRight aria-hidden="true" />
        </Link>
        <Link
          to="/contact"
          className="cinematic-button cinematic-button--secondary"
        >
          {t('hero.bookSession')}
          <Camera aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
};

const StaticCinematicHero = () => (
  <section className="cinematic-hero" aria-label="DjerbaLens">
    <div className="cinematic-scene">
      <div className="cinematic-camera-stage" aria-hidden="true">
        <div className="cinematic-camera-artwork">
          <img src={cameraImage} alt="" width="1672" height="1106" />
        </div>
      </div>
      <div className="cinematic-shade" aria-hidden="true" />
      <div className="cinematic-copy cinematic-copy--intro">
        <HeroContent />
      </div>
    </div>
  </section>
);

const AnimatedCinematicHero = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const cameraScale = useTransform(smoothProgress, [0, 0.18, 0.58, 0.88, 1], [1, 1.04, 1.34, 1.7, 1.78]);
  const cameraOpacity = useTransform(smoothProgress, [0, 0.65, 0.82, 0.94], [1, 1, 0.25, 0]);
  const cameraY = useTransform(smoothProgress, [0, 0.62, 1], ['0vh', '-1vh', '-3vh']);
  const cameraTilt = useTransform(smoothProgress, [0, 0.65, 1], [0, -1.2, 1.5]);
  const lensOpacity = useTransform(smoothProgress, [0.08, 0.17, 0.28, 0.4, 0.5], [0, 0.92, 0.78, 0.3, 0]);
  const lensScale = useTransform(smoothProgress, [0.08, 0.2, 0.45], [0.75, 1, 1.16]);
  const introOpacity = useTransform(smoothProgress, [0, 0.08, 0.19, 0.28], [1, 1, 0.6, 0]);
  const introY = useTransform(smoothProgress, [0, 0.28], ['0vh', '-3vh']);
  const finaleOpacity = useTransform(smoothProgress, [0.67, 0.82, 1], [0, 1, 1]);
  const finaleY = useTransform(smoothProgress, [0.67, 0.9], ['3vh', '0vh']);
  const scrollProgressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="cinematic-hero"
    >
      <div className="cinematic-scene">
        <div className="cinematic-camera-stage" aria-hidden="true">
          <motion.div
            className="cinematic-camera-artwork"
            style={{
              scale: cameraScale,
              opacity: cameraOpacity,
              y: cameraY,
              rotateZ: cameraTilt,
            }}
          >
            <img src={cameraImage} alt="" width="1672" height="1106" />
            <div className="cinematic-lens-anchor">
              <motion.div
                className="cinematic-lens-feed"
                style={{ opacity: lensOpacity, scale: lensScale }}
              >
                <img src="/assets/images/bg/bg5.jpeg" alt="" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="cinematic-photo-world" aria-label="Photographies de Djerba">
          {heroPhotos.map((photo) => (
            <PhotoRelease key={photo.image} photo={photo} progress={smoothProgress} />
          ))}
        </div>

        <div className="cinematic-shade" aria-hidden="true" />
        <motion.div
          className="cinematic-copy cinematic-copy--intro"
          style={{ opacity: introOpacity, y: introY }}
        >
          <HeroContent />
        </motion.div>

        <motion.div
          className="cinematic-finale"
          style={{ opacity: finaleOpacity, y: finaleY }}
        >
          <p className="cinematic-eyebrow">{t('hero.location')}</p>
          <h2>{t('featured.title')}</h2>
          <Link to="/portfolio" className="cinematic-finale-link">
            {t('hero.viewWork')} <ArrowRight aria-hidden="true" />
          </Link>
        </motion.div>

        <motion.div
          className="cinematic-scroll"
          style={{ opacity: useTransform(smoothProgress, [0, 0.08, 0.15], [1, 0.7, 0]) }}
          aria-hidden="true"
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="cinematic-scroll-track">
            <motion.span style={{ scaleX: scrollProgressScale }} />
          </span>
        </motion.div>
      </div>
    </div>
  );
};

type HeroPhoto = (typeof heroPhotos)[number];

interface PhotoReleaseProps {
  photo: HeroPhoto;
  progress: ReturnType<typeof useSpring>;
}

const PhotoRelease = ({
  photo,
  progress,
}: PhotoReleaseProps) => {
  const travelRange = [photo.start, photo.end];
  const x = useTransform(progress, travelRange, ['2.5vw', `${photo.x}vw`]);
  const y = useTransform(progress, travelRange, ['-1.8vh', `${photo.y}vh`]);
  const scale = useTransform(progress, [photo.start, photo.start + 0.1, photo.end], [0.08, 0.3, photo.scale]);
  const opacity = useTransform(progress, [photo.start - 0.025, photo.start + 0.06, photo.end], [0, 1, 1]);
  const z = useTransform(progress, [photo.start, photo.start + 0.12, photo.end], [-480, -150, 0]);
  const rotate = useTransform(progress, travelRange, [photo.rotate * -1, photo.rotate]);
  const rotateX = useTransform(progress, travelRange, [18, 0]);
  const rotateY = useTransform(progress, travelRange, [-14, 0]);
  const filter = useTransform(
    progress,
    [photo.start, photo.start + 0.1, photo.end],
    ['blur(10px)', 'blur(3px)', 'blur(0px)'],
  );

  return (
    <motion.div
      className="cinematic-photo-card"
      style={{ x, y, z, scale, opacity, rotate, rotateX, rotateY, filter }}
    >
      <img src={photo.image} alt={photo.alt} loading="lazy" />
      <span>{photo.alt}</span>
    </motion.div>
  );
};

const Home = () => {
  const { t } = useTranslation();
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.djerbalens.com/#business',
    name: 'DjerbaLens',
    url: 'https://www.djerbalens.com/',
    logo: 'https://www.djerbalens.com/assets/images/bg/logo.png',
    image: 'https://www.djerbalens.com/og-image.jpg',
    description: 'Photographe professionnel à Djerba, en Tunisie.',
    telephone: '+216 25 740 872',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Djerba',
      addressRegion: 'Médenine',
      addressCountry: 'TN',
    },
    areaServed: { '@type': 'Place', name: 'Djerba, Tunisie' },
    sameAs: ['https://www.instagram.com/djerbalens'],
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Seo
        title="Photographe à Djerba | DjerbaLens"
        description="Photographe à Djerba : séances photo pour couples et familles, hôtels, villas et contenus photo/vidéo."
        path="/"
        preloadImage={cameraImage}
        structuredData={localBusinessSchema}
      />
      {/* Cinematic scroll-driven flythrough hero */}
      <CinematicHero />

      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl space-y-6 px-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Votre photographe à Djerba, pour les moments et les lieux qui comptent
          </h2>
          <p>
            DjerbaLens vous accompagne pour créer des images sincères et soignées sur l’île de Djerba.
            Une séance photo peut raconter un séjour à deux, réunir plusieurs générations ou présenter
            l’atmosphère d’un hébergement. Pour les professionnels, la photographie et la vidéo
            permettent de montrer un lieu, un produit ou un savoir-faire avec des visuels préparés
            pour vos supports. Chaque projet commence par un échange afin de comprendre vos envies,
            votre calendrier et la manière dont vous souhaitez utiliser les images.
          </p>
          <p>
            Pour les couples, la séance laisse de la place aux gestes naturels, aux conversations et
            aux petits moments partagés. Vous n’avez pas besoin de savoir poser : des indications
            simples vous aident à vous sentir à l’aise devant l’objectif. Pour les familles, le rythme
            s’adapte aux personnes présentes, avec des portraits de groupe et des instants spontanés.
            Le lieu se choisit ensemble selon l’ambiance recherchée et les conditions du jour, afin que
            les photos ressemblent à votre expérience plutôt qu’à une mise en scène imposée.
          </p>
          <p>
            Les hôtels et villas peuvent demander des images de leurs espaces intérieurs, extérieurs
            et détails, préparées selon les usages prévus. Les restaurants et activités locales peuvent
            également présenter leurs produits et leur accueil par la photographie ou la vidéo.
            Avant la prise de vue, nous définissons les éléments à montrer, l’accès aux lieux et les
            formats souhaités. Les tarifs et le périmètre exact sont confirmés dans un devis :
            TODO — compléter les prix et les options avant publication.
          </p>
          <p>
            La durée d’une séance, le nombre de livrables et le calendrier de livraison dépendent du
            projet. Ces informations sont précisées avant toute réservation — TODO : confirmer les
            durées et délais habituels par type de prestation. Après la prise de vue, les images
            convenues sont sélectionnées et travaillées avec soin, puis livrées en format numérique.
            Pour découvrir le fonctionnement d’une séance, consultez les pages dédiées aux
            <Link className="text-red-700 underline dark:text-red-300" to="/photographe-couple-djerba"> couples</Link>,
            <Link className="text-red-700 underline dark:text-red-300" to="/photographe-famille-djerba"> familles</Link>,
            <Link className="text-red-700 underline dark:text-red-300" to="/photographe-hotel-villa-djerba"> hôtels et villas</Link>
            {' '}et à la <Link className="text-red-700 underline dark:text-red-300" to="/contenu-photo-video-djerba">création photo/vidéo</Link>.
            Contactez-moi pour discuter de votre idée et préparer une proposition adaptée.
          </p>
        </div>
      </section>

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
                alt: 'Séance photo touristique à Djerba',
                width: 1280,
                height: 918,
                delay: 0,
              },
              {
                title: 'Horse & Camel Riding',
                image: '/assets/images/bg/bg4.jpeg',
                alt: 'Balade à cheval et à dos de chameau à Djerba',
                width: 1280,
                height: 853,
                delay: 200,
              },
              {
                title: 'Luxury Villas',
                image: '/assets/images/villas/5.JPG',
                alt: 'Villa photographiée à Djerba',
                width: 4000,
                height: 6000,
                delay: 400,
              },
              {
                title: 'Nature',
                image: '/assets/images/bg/bg3.jpg',
                alt: 'Paysage naturel de Djerba',
                width: 1280,
                height: 853,
                delay: 600,
              },
            ].map((item, index) => (
              <AnimatedSection key={index} delay={item.delay}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="aspect-w-4 aspect-h-3 h-64">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
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

          <ReviewProvider>
            <ReviewList />
          </ReviewProvider>

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