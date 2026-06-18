import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Camera, MapPin, Heart, Award, Users, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const About = () => {
 const skills = [
  { name: 'Photography', icon: Camera },
  { name: 'Video Production', icon: Camera },
  { name: 'Photo Editing', icon: Heart },
  { name: 'Content Creation', icon: Users },
];


  const achievements = [
    {
      icon: Users,
      number: '20+',
      text: 'Happy Clients'
    },
    {
      icon: Camera,
      number: '50+',
      text: 'Photo Sessions'
    },
    {
      icon: Award,
      number: '3',
      text: 'Years Experience'
    },
   
  ];

  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'About DjerbaLens – Freelance Photographer in Djerba, Tunisia';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Meet the photographer behind DjerbaLens — capturing Tunisia\'s beauty through food photography, tourism, and landscape photography in Djerba.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'About DjerbaLens – Freelance Photographer in Djerba, Tunisia');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Meet the photographer behind DjerbaLens — capturing Tunisia\'s beauty through food photography, tourism, and landscape photography in Djerba.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://djerbalens.space/about');
  }, []);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection>
              <div>
                <div className="flex items-center mb-6">
                  <MapPin className="h-6 w-6 text-purple-200 mr-2" />
                  <span className="text-purple-200">{t('hero.location')}</span>
                </div>
                <h1 className="text-5xl font-bold mb-6">
                  {t('about.hiIm', { name: 'Mohamed' })}
                </h1>
                <p className="text-xl text-purple-100 mb-8 leading-relaxed">
                  {t('about.description1')}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
                >
                  {t('about.letsWork')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                  alt="Ahmed - Photographer"
                  className="rounded-lg shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                My Story
              </h2>
              <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6 text-left">
                <p>
                  My journey into photography began five years ago when I first picked up a camera 
                  to document the stunning landscapes of my homeland, Tunisia. What started as a 
                  personal passion quickly evolved into a professional calling when I realized 
                  how much joy I could bring to others by capturing their special moments.
                </p>
                <p>
                  As a self-taught photographer, I've spent countless hours perfecting my craft, 
                  studying the unique light and colors of the Mediterranean, and learning how to 
                  showcase the authentic beauty of Tunisia through my lens. From the golden dunes 
                  of the Sahara to the turquoise waters of Djerba's coast, I've explored every 
                  corner of this beautiful country.
                </p>
                <p>
                  Being fluent in Arabic, French, and English has allowed me to connect with 
                  visitors from around the world, understanding their vision and helping them 
                  create memories that will last a lifetime. Whether it's a romantic couple's 
                  session at sunset, a family portrait on the beach, or promotional content 
                  for local businesses, I approach each project with the same passion and 
                  attention to detail.
                </p>
                <p>
                  Beyond photography, I'm also a web developer, helping small businesses in 
                  the tourism industry establish their online presence and reach more customers. 
                  This combination of creative and technical skills allows me to offer 
                  comprehensive digital solutions to my clients.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           <AnimatedSection>
  <div>
    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
      Skills & Expertise
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <div
          key={index}
          className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
        >
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <skill.icon className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-medium text-gray-800 dark:text-gray-100">
            {skill.name}
          </span>
        </div>
      ))}
    </div>
  </div>
</AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid grid-cols-2 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-300">
                      {achievement.text}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              My Philosophy
            </h2>
            <div className="text-lg text-gray-600 dark:text-gray-300 space-y-6">
              <p>
                I believe that every photograph should tell a story. Whether it's the joy 
                in a couple's eyes as they explore a new place together, the wonder of a 
                child seeing the desert for the first time, or the pride of a local 
                artisan showcasing their craft, I strive to capture these authentic moments.
              </p>
              <p>
                My approach is relaxed and natural. I want my clients to feel comfortable 
                and be themselves, because that's when the magic happens. The best photos 
                aren't posed – they're the genuine moments of connection, laughter, and discovery.
              </p>
              <p>
                Living in Tunisia has taught me to appreciate the beauty in everyday moments 
                and to see the extraordinary in the ordinary. This perspective is what I 
                bring to every session, every project, and every collaboration.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-6">
              Let's Create Something Beautiful Together
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Whether you're visiting Tunisia for the first time or you're a local business 
              looking to showcase your services, I'd love to help tell your story through photography.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-300"
              >
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;