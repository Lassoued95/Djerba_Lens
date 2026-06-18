import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import JsonLd from '../components/JsonLd';
import ReviewList from '../components/ReviewList';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'DjerbaLens',
    image: 'https://djerbalens.space/og-image.jpg',
    url: 'https://djerbalens.space',
    '@id': 'https://djerbalens.space',
    description: 'Professional photographer in Djerba, Tunisia specializing in food photography for restaurants and cafes, tourist photography, landscapes and digital content creation.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Djerba',
      addressRegion: 'Médenine',
      addressCountry: 'TN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 33.8076,
      longitude: 10.8451
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
            description: 'Professional food photography for restaurants and cafes in Djerba and Tunisia.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Tourist Photography',
            description: 'Memorable tourist photography sessions in Djerba, Tunisia.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Landscape Photography',
            description: 'Stunning landscape and nature photography in Djerba.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Digital Content Creation',
            description: 'Social media content creation for restaurants, cafes and tourism businesses in Tunisia.'
          }
        }
      ]
    },
    sameAs: [
      'https://www.instagram.com/djerbalens',
      'https://www.facebook.com/djerbalens'
    ],
    priceRange: '$$',
    openingHours: 'Mo-Su 08:00-20:00'
  };

  const heroImages = [
    'assets/images/bg/bg5.jpeg',
    'assets/images/bg/bg1.jpg',
    'assets/images/bg/bg3.jpg',
    'assets/images/bg/bg4.jpeg'
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === heroImages.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? heroImages.length - 1 : currentImageIndex - 1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <JsonLd data={localBusinessSchema} />
      {/* Hero Section with Slideshow */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url('${image}')` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentImageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <AnimatedSection>
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
          </AnimatedSection>
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
            {[{
              title: "Tourist Photography",
              image: "/assets/images/tourists/1.jpg",
              delay: 0
            }, {
              title: "Horse & Camel Riding",
              image: "/assets/images/bg/bg4.jpeg",
              delay: 200
            }, {
              title: "Luxury Villas",
              image: "/assets/images/villas/5.JPG",
              delay: 400
            }, {
              title: "Nature",
              image: "/assets/images/bg/bg3.jpg",
              delay: 600
            }].map((item, index) => (
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
                      <h3 className="text-white font-semibold text-lg">
                        {item.title}
                      </h3>
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
            {[{
              title: "Tourist Photo Shoots",
              description: "Capture your vacation memories with professional photography sessions",
              delay: 0
            }, {
              title: "Promotional Videos",
              description: "High-quality video content for hotels, restaurants, and travel agencies",
              delay: 200
            }, {
              title: "Social Media Content",
              description: "Engaging visual content for your social media platforms",
              delay: 400
            }].map((service, index) => (
              <AnimatedSection key={index} delay={service.delay}>
                <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
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
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t('reviews.description')}
              </p>
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