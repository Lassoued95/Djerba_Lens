import { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Star, Instagram, Globe } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import ContactForm from '../components/contactform';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'review'>('contact');
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Book a Photography Session in Djerba | DjerbaLens';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content',
        'Ready to elevate your restaurant, cafe, or travel memories? Contact DjerbaLens to book a food or tourist photography session in Djerba, Tunisia.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Book a Photography Session in Djerba | DjerbaLens');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content',
      'Ready to elevate your restaurant, cafe, or travel memories? Contact DjerbaLens to book a food or tourist photography session in Djerba, Tunisia.'
    );
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://djerbalens.space/contact');
  }, []);

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

      {/* Header */}
      <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">{t('contact.getInTouch')}</h1>
              <p className="text-xl text-red-100 max-w-2xl mx-auto">{t('contact.description')}</p>
            </div>
          </AnimatedSection>
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
      )}

    </div>  

  );

};


export default Contact; 