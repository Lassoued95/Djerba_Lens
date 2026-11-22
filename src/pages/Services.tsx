import { Link } from 'react-router-dom';
import {
  Camera, Video, Edit, MapPin, Clock, Star, ArrowRight, Check
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();
  const isStringList = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((feature): feature is string => typeof feature === 'string');

  const getFeatures = (key: string): string[] => {
    const features: unknown = t(key, { returnObjects: true });
    if (isStringList(features)) {
      return features;
    }

    console.warn(`Invalid translated feature list for "${key}"; falling back to English.`);
    const englishFeatures: unknown = t(key, { lng: 'en', returnObjects: true });
    if (isStringList(englishFeatures)) {
      return englishFeatures;
    }

    console.error(`Invalid English feature list for "${key}".`);
    return [];
  };

  const services = [
    {
      icon: Camera,
      image: '/assets/images/tourists/1.jpg',
      title: t('services.touristShoot.title'),
      description: t('services.touristShoot.description'),
      duration: t('services.touristShoot.duration'),
      features: getFeatures('services.touristShoot.features'),
    },
    {
      icon: Video,
      image: '/assets/images/villas/1.JPG',
      title: t('services.promoVideo.title'),
      description: t('services.promoVideo.description'),
      duration: t('services.promoVideo.duration'),
      features: getFeatures('services.promoVideo.features'),
    },
    {
      icon: Edit,
      image: '/assets/images/bg/bg3.jpg',
      title: t('services.photoEditing.title'),
      description: t('services.photoEditing.description'),
      duration: t('services.photoEditing.duration'),
      features: getFeatures('services.photoEditing.features'),
    },
  ];

  const packages = [
    {
      name: t('services.packages.touristEssential.name'),
      description: t('services.packages.touristEssential.description'),
      features: getFeatures('services.packages.touristEssential.features'),
    },
    {
      name: t('services.packages.foodShooting.name'),
      description: t('services.packages.foodShooting.description'),
      features: getFeatures('services.packages.foodShooting.features'),
    },
    {
      name: t('services.packages.villaShooting.name'),
      description: t('services.packages.villaShooting.description'),
      features: getFeatures('services.packages.villaShooting.features'),
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-16 text-[#0b1b2e]">
      <Seo
        title="Services photo et vidéo à Djerba | DjerbaLens"
        description="Découvrez les services photo et vidéo de DjerbaLens pour les visiteurs, familles et professionnels à Djerba."
        path="/services"
      />

      <header className="relative isolate overflow-hidden bg-[#0b1b2e] text-[#f7f5f0]">
        <img
          src="/assets/images/bg/bg5.jpeg"
          alt=""
          width={1280}
          height={853}
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0b1b2e] via-[#0b1b2e]/90 to-[#0b1b2e]/55" />
        <div className="mx-auto grid min-h-[34rem] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <AnimatedSection>
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e5b07a]">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {t('services.location.place')}
              </p>
              <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.98] tracking-[-0.05em] text-[#f7f5f0] sm:text-6xl lg:text-7xl">
                {t('services.title')}
              </h1>
              <div className="my-6 h-px w-16 bg-[#b77a3f]" />
              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                {t('services.description')}
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm border border-[#b77a3f] bg-[#b77a3f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#f28c28] hover:bg-[#f28c28]"
              >
                {t('services.packages.bookNow')}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="relative mx-auto w-full max-w-[32rem]">
              <img
                src="/assets/images/tourists/2.jpg"
                alt={t('services.touristShoot.title')}
                width={1080}
                height={1080}
                loading="eager"
                className="aspect-[4/3] w-full object-cover shadow-[0_2rem_5rem_rgba(0,0,0,0.35)]"
              />
              <div className="absolute inset-3 border border-white/35" aria-hidden="true" />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 bg-[#10263d] px-5 py-4 text-white shadow-xl sm:left-8">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#b77a3f]">
                  <Camera aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-serif text-lg">{t('services.touristShoot.title')}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </header>

      {/* Services Grid */}
      <section className="bg-[#faf9f6] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 max-w-2xl sm:mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                DjerbaLens
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-5xl">
                {t('services.title')}
              </h2>
              <p className="mt-4 leading-7 text-[#59636d]">
                {t('services.description')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <article className="group h-full overflow-hidden border border-[#0b1b2e]/10 bg-white shadow-[0_1rem_2.5rem_rgba(11,27,46,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_rgba(11,27,46,0.13)]">
                  <div className="relative overflow-hidden">
                    <img
                      src={service.image}
                      alt=""
                      width={1280}
                      height={853}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/60 via-transparent to-transparent" />
                    <span className="absolute bottom-4 left-5 font-serif text-4xl text-white/75">
                      0{index + 1}
                    </span>
                    <span className="absolute -bottom-5 right-5 grid h-14 w-14 place-items-center rounded-full border-4 border-white bg-[#b77a3f] text-white shadow-lg">
                      <service.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="p-6 pt-7 sm:p-7">
                    <h3 className="font-serif text-2xl font-normal leading-tight text-[#0b1b2e]">
                      {service.title}
                    </h3>
                    <p className="mt-3 min-h-14 leading-6 text-[#59636d]">
                      {service.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 border-y border-[#0b1b2e]/10 py-2 text-sm text-[#59636d]">
                      <Clock aria-hidden="true" className="h-4 w-4 text-[#a56d39]" />
                      {service.duration}
                    </div>
                    <ul className="mt-5 space-y-3">
                        {service.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm leading-5 text-[#3f4a55]">
                            <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b77a3f]" />
                            <span>{feature}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="border-y border-[#0b1b2e]/[0.06] bg-[#f0eee8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 text-center sm:mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                DjerbaLens
              </p>
              <h2 className="mb-4 mt-3 font-serif text-4xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-5xl">
                {t('services.packagesTitle')}
              </h2>
              <p className="mx-auto max-w-2xl leading-7 text-[#59636d]">
                {t('services.packagesDescription')}
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {packages.map((pkg, index) => (
              <AnimatedSection key={index} delay={index * 200}>
                <article className={`relative flex h-full flex-col bg-white p-7 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.07)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_rgba(11,27,46,0.13)] sm:p-8 ${
                  index === 1 ? 'border border-[#b77a3f] md:-translate-y-3' : 'border border-[#0b1b2e]/[0.08]'
                }`}>
                  {index === 1 && (
                    <div className="mb-5 text-center">
                      <span className="inline-flex bg-[#b77a3f] px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white">
                        {t('services.packages.mostPopular')}
                      </span>
                    </div>
                  )}
                  <div className="mb-6 text-center">
                    <h3 className="font-serif text-2xl font-normal text-[#0b1b2e]">{pkg.name}</h3>
                    <p className="mt-3 leading-6 text-[#59636d]">{pkg.description}</p>
                  </div>
                  <ul className="mb-8 flex-1 space-y-3 border-t border-[#0b1b2e]/10 pt-5">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm leading-5 text-[#3f4a55]">
                        <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#b77a3f]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className="flex min-h-12 w-full items-center justify-center gap-2 bg-[#10263d] px-5 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#b77a3f]"
                  >
                    {t('services.packages.bookNow')}
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="bg-[#0b1b2e] py-20 text-[#f7f5f0] sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
                DjerbaLens
              </p>
              <h2 className="mb-6 mt-3 font-serif text-4xl font-normal leading-tight tracking-[-0.04em] sm:text-5xl">
                {t('services.location.title')}
              </h2>
              <p className="mb-8 max-w-xl leading-7 text-white/70">
                {t('services.location.description')}
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 border border-white/10 bg-white/[0.04] p-4">
                  <MapPin aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#e5b07a]" />
                  <span className="text-sm leading-5 text-white/80">{t('services.location.place')}</span>
                </div>
                <div className="flex items-start gap-3 border border-white/10 bg-white/[0.04] p-4">
                  <Star aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#e5b07a]" />
                  <span className="text-sm leading-5 text-white/80">{t('services.location.specialized')}</span>
                </div>
                <div className="flex items-start gap-3 border border-white/10 bg-white/[0.04] p-4 sm:col-span-2">
                  <Clock aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-[#e5b07a]" />
                  <span className="text-sm leading-5 text-white/80">{t('services.location.response')}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <div className="relative">
              <img
                src="/assets/images/bg/bg3.jpg"
                alt={t('services.location.title')}
                width={1280}
                height={853}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1b2e]/65 via-transparent to-transparent" />
              <div className="absolute inset-3 border border-white/35" aria-hidden="true" />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10263d] py-20 text-center text-[#f7f5f0] sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
              DjerbaLens
            </p>
            <h2 className="mb-6 mt-3 font-serif text-4xl font-normal tracking-[-0.04em] sm:text-5xl">
              {t('services.cta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-7 text-white/70">
              {t('services.cta.description')}
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#b77a3f] bg-[#b77a3f] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-[#f28c28] hover:bg-[#f28c28]"
              >
                {t('services.cta.getInTouch')}
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </Link>
              <a
                href="https://wa.me/21612345678"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.06] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.12]"
              >
                {t('services.cta.whatsapp')}
                <ArrowRight aria-hidden="true" className="h-5 w-5" />
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </main>
  );
};

export default Services;