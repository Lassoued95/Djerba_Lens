import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera, Video, Edit, MapPin, Clock, Star, ArrowRight, Check
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: Camera,
      title: t('services.touristShoot.title'),
      description: t('services.touristShoot.description'),
      duration: t('services.touristShoot.duration'),
      features: t('services.touristShoot.features', { returnObjects: true }),
    },
    {
      icon: Video,
      title: t('services.promoVideo.title'),
      description: t('services.promoVideo.description'),
      duration: t('services.promoVideo.duration'),
      features: t('services.promoVideo.features', { returnObjects: true }),
    },
    {
      icon: Edit,
      title: t('services.photoEditing.title'),
      description: t('services.photoEditing.description'),
      duration: t('services.photoEditing.duration'),
      features: t('services.photoEditing.features', { returnObjects: true }),
    },
  ];

  const packages = [
    {
      name: t('services.packages.touristEssential.name'),
      description: t('services.packages.touristEssential.description'),
      features: t('services.packages.touristEssential.features', { returnObjects: true }),
    },
    {
      name: t('services.packages.foodShooting.name'),
      description: t('services.packages.foodShooting.description'),
      features: t('services.packages.foodShooting.features', { returnObjects: true }),
    },
    {
      name: t('services.packages.villaShooting.name'),
      description: t('services.packages.villaShooting.description'),
      features: t('services.packages.villaShooting.features', { returnObjects: true }),
    },
  ];

  useEffect(() => {
    document.title = 'Photography Services in Djerba – Food, Tourist & Content Creation | DjerbaLens';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content',
        'Professional photography services in Djerba, Tunisia. Food photography for restaurants & cafes, tourist sessions, landscapes, portraits and digital content creation.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Photography Services in Djerba – Food, Tourist & Content Creation | DjerbaLens');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content',
      'Professional photography services in Djerba, Tunisia. Food photography for restaurants & cafes, tourist sessions, landscapes, portraits and digital content creation.'
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://djerbalens.space/services');
  }, []);

  return (
    <div className="min-h-screen pt-16">

      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">{t('services.title')}</h1>
              <p className="text-xl text-red-100 max-w-3xl mx-auto">{t('services.description')}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 mb-4">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                      <ul className="space-y-2">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-center space-x-2">
                            <Check className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {t('services.packagesTitle')}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                {t('services.packagesDescription')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <div className={`bg-white dark:bg-gray-900 rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  index === 1 ? 'transform scale-105 border-2 border-red-600' : ''
                }`}>
                  {index === 1 && (
                    <div className="text-center mb-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t('services.packages.mostPopular')}
                      </span>
                    </div>
                  )}
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pkg.name}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{pkg.description}</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-red-600" />
                        <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="w-full bg-gradient-to-r from-red-600 to-red-800 text-white font-semibold py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    {t('services.packages.bookNow')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  {t('services.location.title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  {t('services.location.description')}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-teal-600" />
                    <span className="text-gray-700 dark:text-gray-300">{t('services.location.place')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-teal-600" />
                    <span className="text-gray-700 dark:text-gray-300">{t('services.location.specialized')}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-teal-600" />
                    <span className="text-gray-700 dark:text-gray-300">{t('services.location.response')}</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Djerba Photography"
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-lg"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-red-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">{t('services.cta.title')}</h2>
            <p className="text-xl text-red-100 mb-8">{t('services.cta.description')}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {t('services.cta.getInTouch')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/21612345678"
                className="inline-flex items-center px-8 py-4 bg-red-700 text-white font-semibold rounded-lg hover:bg-red-800 transition-colors duration-300"
              >
                {t('services.cta.whatsapp')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
};

export default Services;