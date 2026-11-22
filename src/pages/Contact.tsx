import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Star,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import ContactForm from '../components/contactform';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { ReviewProvider } from '../contexts/ReviewContext';
import { getLanguageFromPath, getRoutePath } from '../routeConfig';

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'review'>('contact');
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'djerbatnsphoto@gmail.com',
      link: 'mailto:djerbatnsphoto@gmail.com',
    },
    {
      icon: Phone,
      title: t('contact.phoneWhatsapp'),
      value: '+216 25 740 872',
      link: 'tel:+21625740872',
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@djerbalens',
      link: 'https://www.instagram.com/djerbalens',
    },
    {
      icon: Globe,
      title: 'TikTok',
      value: 'DjerbaLens (@djerbalens)',
      link: 'https://www.tiktok.com/@djerbalens',
    },
    {
      icon: Facebook,
      title: 'Facebook',
      value: 'DjerbaLens',
      link: 'https://www.facebook.com/profile.php?id=61591247780029',
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: t('contact.locationValue'),
      link: null,
    },
    {
      icon: Clock,
      title: t('contact.responseTime'),
      value: t('contact.responseTimeValue'),
      link: null,
    },
  ];

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-16 text-[#0b1b2e]">
      <Seo
        title="Contacter votre photographe à Djerba | DjerbaLens"
        description="Contactez DjerbaLens pour réserver une séance photo à Djerba, pour vos souvenirs, votre hôtel, villa ou restaurant."
        path="/contact"
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
        <div className="mx-auto grid min-h-[30rem] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <AnimatedSection>
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#e5b07a]">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {t('hero.location')}
              </p>
              <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.98] tracking-[-0.05em] text-[#f7f5f0] sm:text-6xl lg:text-7xl">
                {t('contact.getInTouch')}
              </h1>
              <div className="my-6 h-px w-16 bg-[#b77a3f]" />
              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                {t('contact.description')}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#contact-panel"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#b77a3f] bg-[#b77a3f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#f28c28] hover:bg-[#f28c28]"
                >
                  {t('contact.contactMe')}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </a>
                <a
                  href="https://wa.me/21625740872"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/25 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-white/55 hover:bg-white/[0.12]"
                >
                  <MessageSquare aria-hidden="true" className="h-4 w-4" />
                  {t('contact.whatsappMe')}
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative mx-auto w-full max-w-[32rem]">
              <img
                src="/assets/images/bg/bg4.jpeg"
                alt=""
                width={1280}
                height={853}
                loading="eager"
                className="aspect-[4/3] w-full object-cover shadow-[0_2rem_5rem_rgba(0,0,0,0.35)]"
              />
              <div className="absolute inset-3 border border-white/35" aria-hidden="true" />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 bg-[#10263d] px-5 py-4 text-white shadow-xl sm:left-8">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#b77a3f]">
                  <MapPin aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-serif text-lg">{t('contact.locationValue')}</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </header>

      <section id="contact-panel" className="bg-[#f0eee8] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex justify-center">
            <div className="inline-flex flex-wrap justify-center gap-2 border border-[#0b1b2e]/10 bg-white p-2 shadow-sm">
              <button
                type="button"
                aria-pressed={activeTab === 'contact'}
                onClick={() => setActiveTab('contact')}
                className={`min-h-11 px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'contact'
                    ? 'bg-[#10263d] text-white'
                    : 'text-[#59636d] hover:bg-[#f0eee8] hover:text-[#0b1b2e]'
                }`}
              >
                {t('contact.contactMe')}
              </button>
              <button
                type="button"
                aria-pressed={activeTab === 'review'}
                onClick={() => setActiveTab('review')}
                className={`inline-flex min-h-11 items-center gap-2 px-5 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'review'
                    ? 'bg-[#10263d] text-white'
                    : 'text-[#59636d] hover:bg-[#f0eee8] hover:text-[#0b1b2e]'
                }`}
              >
                <Star aria-hidden="true" className="h-4 w-4" />
                {t('contact.reviews')}
              </button>
            </div>
          </div>

          {activeTab === 'contact' && (
            <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
              <AnimatedSection>
                <ContactForm />
              </AnimatedSection>

              <AnimatedSection delay={150}>
                <div className="space-y-6">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                      DjerbaLens
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-4xl">
                      {t('contact.contactInformation')}
                    </h2>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {contactInfo.map((info) => (
                      <article
                        key={info.title}
                        className="flex min-h-24 items-start gap-3 border border-[#0b1b2e]/10 bg-white p-4 shadow-[0_0.75rem_2rem_rgba(11,27,46,0.04)]"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center bg-[#f0eee8] text-[#a56d39]">
                          <info.icon aria-hidden="true" className="h-4 w-4" />
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-xs font-bold uppercase tracking-[0.12em] text-[#59636d]">
                            {info.title}
                          </h3>
                          {info.link ? (
                            <a
                              href={info.link}
                              target={info.link.startsWith('http') ? '_blank' : undefined}
                              rel={info.link.startsWith('http') ? 'noreferrer' : undefined}
                              className="mt-1 block break-words text-sm font-medium text-[#0b1b2e] transition-colors hover:text-[#a56d39]"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="mt-1 text-sm font-medium leading-5 text-[#0b1b2e]">
                              {info.value}
                            </p>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>

                  <div className="border border-white/10 bg-[#0b1b2e] p-6 text-[#f7f5f0]">
                    <h3 className="font-serif text-2xl">{t('contact.quickBooking')}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {t('contact.quickBookingDesc')}
                    </p>
                    <a
                      href="https://wa.me/21625740872"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex min-h-11 items-center gap-2 bg-[#b77a3f] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#f28c28]"
                    >
                      <MessageSquare aria-hidden="true" className="h-4 w-4" />
                      {t('contact.whatsappMe')}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="border border-[#0b1b2e]/10 bg-white p-6">
                    <h3 className="font-serif text-2xl text-[#0b1b2e]">
                      {t('contact.faqTitle')}
                    </h3>
                    <div className="mt-5 space-y-4">
                      {(['q1', 'q2', 'q3'] as const).map((question) => (
                        <div key={question} className="border-t border-[#0b1b2e]/10 pt-4">
                          <h4 className="text-sm font-semibold text-[#0b1b2e]">
                            {t(`contact.faq.${question}`)}
                          </h4>
                          <p className="mt-1 text-sm leading-6 text-[#59636d]">
                            {t(`contact.faq.a${question.slice(1)}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          )}

          {activeTab === 'review' && (
            <ReviewProvider>
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
                <AnimatedSection>
                  <div className="h-full border border-[#0b1b2e]/10 bg-white p-6 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.06)] sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                      DjerbaLens
                    </p>
                    <h2 className="mb-8 mt-3 font-serif text-3xl font-normal text-[#0b1b2e]">
                      {t('contact.shareExperience')}
                    </h2>
                    <ReviewForm />
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <div className="border border-[#0b1b2e]/10 bg-white p-6 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.06)] sm:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                      DjerbaLens
                    </p>
                    <h2 className="mb-8 mt-3 font-serif text-3xl font-normal text-[#0b1b2e]">
                      {t('contact.clientReviews')}
                    </h2>
                    <ReviewList />
                  </div>
                </AnimatedSection>
              </div>
            </ReviewProvider>
          )}
        </div>
      </section>

      <section className="bg-[#faf9f6] py-20 sm:py-24">
        <article className="mx-auto max-w-5xl border border-[#0b1b2e]/10 bg-white px-6 py-10 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.05)] sm:px-10 sm:py-12">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
              DjerbaLens
            </p>
            <h2 className="mt-3 font-serif text-3xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-4xl">
              Préparons votre séance photo à Djerba
            </h2>
            <div className="my-6 h-px w-16 bg-[#b77a3f]" />
            <div className="space-y-5 text-base leading-7 text-[#59636d]">
              <p>
                Vous pouvez me contacter pour une séance photo de couple ou de famille, pour présenter
                une villa ou un hôtel, ou pour créer des images et vidéos liées à votre activité. Le
                formulaire permet de décrire votre idée et vos disponibilités ; WhatsApp est pratique
                pour un premier échange rapide. Plus vous partagez de détails utiles, plus il est facile
                de préparer une proposition adaptée à votre besoin, sans vous engager avant d’avoir
                clarifié le contenu, le calendrier et les conditions.
              </p>
              <p>
                Pour une séance personnelle, indiquez la date envisagée, le nombre de participants,
                l’ambiance souhaitée et les lieux qui vous attirent. Si vous avez des contraintes de
                mobilité, des enfants en bas âge ou une préférence concernant la lumière, mentionnez-les
                aussi. Nous choisirons ensemble un endroit à Djerba qui correspond à votre projet et
                aux conditions du jour. Il n’est pas nécessaire d’avoir une expérience de pose : je vous
                accompagne avec des indications simples et un rythme confortable.
              </p>
              <p>
                Pour un hébergement ou une entreprise, décrivez votre activité, les espaces ou produits
                à photographier et les supports où vous comptez utiliser les images. Précisez également
                les horaires d’accès, les disponibilités de votre équipe et les éventuelles règles du
                lieu. Nous pouvons alors convenir d’une liste de vues réaliste et d’un devis qui explique
                les livrables et les usages prévus. Les prix et la durée de chaque prestation sont
                communiqués avant confirmation — TODO : publier les tarifs et durées réellement
                proposés.
              </p>
              <p>
                Une fois la réservation confirmée, les détails pratiques sont récapitulés : date, lieu,
                contenu de la séance et modalités de livraison. Le délai dépend de la prestation et du
                volume à traiter — TODO : confirmer les délais de livraison par service. Si la météo ou
                une contrainte locale demande un ajustement, nous en discutons ensemble avant de
                modifier le programme. Mon objectif est de rendre l’échange clair et la séance agréable,
                que vous soyez en vacances ou que vous prépariez les images de votre activité.
              </p>
              <p>
                Pour toute demande, écrivez à l’adresse indiquée sur cette page, appelez ou envoyez un
                message WhatsApp. Vous pouvez aussi consulter les pages consacrées aux{' '}
                <Link className="text-[#a56d39] underline" to={getRoutePath('couple', language)}>
                  séances couple
                </Link>
                ,{' '}
                <Link className="text-[#a56d39] underline" to={getRoutePath('family', language)}>
                  séances famille
                </Link>
                ,{' '}
                <Link className="text-[#a56d39] underline" to={getRoutePath('hotelVilla', language)}>
                  hôtels et villas
                </Link>{' '}
                et à la{' '}
                <Link className="text-[#a56d39] underline" to={getRoutePath('photoVideo', language)}>
                  création de contenu photo/vidéo
                </Link>
                . Je répondrai avec les informations disponibles et les prochaines étapes pour avancer.
              </p>
            </div>
          </AnimatedSection>
        </article>
      </section>
    </main>
  );
};

export default Contact;
