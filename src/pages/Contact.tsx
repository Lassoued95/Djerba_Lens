import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Star, Instagram, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import ContactForm from '../components/contactform';
import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { ReviewProvider } from '../contexts/ReviewContext';

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'review'>('contact');
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: t('contact.email'),
      value: 'djerbatnsphoto@gmail.com',
      link: 'mailto:djerbatnsphoto@gmail.com'
    },
    {
      icon: Phone,
      title: t('contact.phoneWhatsapp'),
      value: '+216 25 740 872',
      link: 'tel:+21625740872'
    },
    {
      icon: Instagram,
      title: 'Instagram',
      value: '@djerbalens',
      link: 'https://www.instagram.com/djerbalens'
    },
    {
      icon: Globe,
      title: 'TikTok',
      value: 'DjerbaLens (@djerbalens)',
      link: 'https://www.tiktok.com/@djerbalens'
    },
    {
      icon: Globe,
      title: 'Facebook',
      value: 'DjerbaLens',
      link: 'https://www.facebook.com/profile.php?id=61591247780029'
    },
    {
      icon: MapPin,
      title: t('contact.location'),
      value: t('contact.locationValue'),
      link: null
    },
    {
      icon: Clock,
      title: t('contact.responseTime'),
      value: t('contact.responseTimeValue'),
      link: null
    }
  ];

  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <Seo
        title="Contacter votre photographe à Djerba | DjerbaLens"
        description="Contactez DjerbaLens pour réserver une séance photo à Djerba, pour vos souvenirs, votre hôtel, villa ou restaurant."
        path="/contact"
      />

      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">{t('contact.getInTouch')}</h1>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">{t('contact.description')}</p>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('contact')}
                className={`py-4 px-6 font-medium transition-all duration-200 border-b-2 ${
                  activeTab === 'contact'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {t('contact.contactMe')}
              </button>
              <button
                onClick={() => setActiveTab('review')}
                className={`py-4 px-6 font-medium transition-all duration-200 border-b-2 flex items-center ${
                  activeTab === 'review'
                    ? 'border-red-600 text-red-600 dark:text-red-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Star className="h-4 w-4 mr-2" />
                {t('contact.reviews')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      {activeTab === 'contact' && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <AnimatedSection>
                <ContactForm />
              </AnimatedSection>
              <AnimatedSection delay={200}>
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      {t('contact.contactInformation')}
                    </h2>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <info.icon className="h-6 w-6 text-red-600 dark:text-red-400" />
                          </div>
                          <div>
                            <div className="text-lg font-semibold text-gray-900 dark:text-white">
                              {info.title}
                            </div>
                            {info.link ? (
                              <a
                                href={info.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-red-600 dark:text-red-400 hover:underline break-all"
                              >
                                {info.value}
                              </a>
                            ) : (
                              <span className="text-gray-700 dark:text-gray-300 break-all">
                                {info.value}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Booking */}
                  <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border border-red-100 dark:border-red-800 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {t('contact.quickBooking')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {t('contact.quickBookingDesc')}
                    </p>
                    <a
                      href="https://wa.me/21625740872"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      <MessageSquare className="mr-2 h-5 w-5" />
                      {t('contact.whatsappMe')}
                    </a>
                  </div>

                  {/* FAQ */}
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 transition-colors duration-300">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      {t('contact.faqTitle')}
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <strong className="text-gray-900 dark:text-white">{t('contact.faq.q1')}</strong>
                        <p className="text-gray-600 dark:text-gray-300">{t('contact.faq.a1')}</p>
                      </div>
                      <div>
                        <strong className="text-gray-900 dark:text-white">{t('contact.faq.q2')}</strong>
                        <p className="text-gray-600 dark:text-gray-300">{t('contact.faq.a2')}</p>
                      </div>
                      <div>
                        <strong className="text-gray-900 dark:text-white">{t('contact.faq.q3')}</strong>
                        <p className="text-gray-600 dark:text-gray-300">{t('contact.faq.a3')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}

      {/* Review Section */}
      {activeTab === 'review' && (
        <ReviewProvider>
          <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <AnimatedSection>
                  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 transition-colors duration-300">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      {t('contact.shareExperience')}
                    </h2>
                    <ReviewForm />
                  </div>
                </AnimatedSection>
                <AnimatedSection delay={200}>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                      {t('contact.clientReviews')}
                    </h2>
                    <ReviewList />
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        </ReviewProvider>
      )}

      <section className="bg-white py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-5xl space-y-6 px-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Préparons votre séance photo à Djerba
          </h2>
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
            message WhatsApp. Vous pouvez aussi consulter les pages consacrées aux
            <a className="text-red-700 underline dark:text-red-300" href="/photographe-couple-djerba"> séances couple</a>,
            <a className="text-red-700 underline dark:text-red-300" href="/photographe-famille-djerba"> séances famille</a>,
            <a className="text-red-700 underline dark:text-red-300" href="/photographe-hotel-villa-djerba"> hôtels et villas</a>
            {' '}et à la <a className="text-red-700 underline dark:text-red-300" href="/contenu-photo-video-djerba">création de contenu photo/vidéo</a>.
            Je répondrai avec les informations disponibles et les prochaines étapes pour avancer.
          </p>
        </div>
      </section>

    </div>  

  );

};


export default Contact; 