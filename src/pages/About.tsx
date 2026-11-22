import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Camera,
  Heart,
  MapPin,
  Users,
  Video,
} from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import Seo from '../components/Seo';
import { getLanguageFromPath, getRoutePath } from '../routeConfig';

const skills = [
  { name: 'Photography', icon: Camera },
  { name: 'Video Production', icon: Video },
  { name: 'Photo Editing', icon: Heart },
  { name: 'Content Creation', icon: Users },
];

const achievements = [
  { icon: Users, number: '20+', text: 'Happy Clients' },
  { icon: Camera, number: '20+', text: 'Photo Sessions' },
  { icon: Award, number: '3', text: 'Years Experience' },
];

const About = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const language = getLanguageFromPath(pathname);

  return (
    <main className="min-h-screen bg-[#faf9f6] pt-16 text-[#0b1b2e]">
      <Seo
        title="À propos de DjerbaLens | Photographe à Djerba"
        description="Découvrez le photographe derrière DjerbaLens, spécialiste des séances photo, paysages et contenus visuels à Djerba."
        path="/about"
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
                {t('hero.location')}
              </p>
              <h1 className="mt-6 font-serif text-5xl font-normal leading-[0.98] tracking-[-0.05em] text-[#f7f5f0] sm:text-6xl lg:text-7xl">
                {t('about.hiIm', { name: 'Mohamed' })}
              </h1>
              <div className="my-6 h-px w-16 bg-[#b77a3f]" />
              <p className="max-w-xl text-base leading-7 text-white/75 sm:text-lg">
                {t('about.description1')}
              </p>
              <Link
                to={getRoutePath('contact', language)}
                className="mt-8 inline-flex min-h-12 items-center gap-3 rounded-sm border border-[#b77a3f] bg-[#b77a3f] px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-[#f28c28] hover:bg-[#f28c28]"
              >
                {t('about.letsWork')}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="relative mx-auto w-full max-w-[32rem]">
              <img
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Portrait du photographe de Djerba"
                width={600}
                height={800}
                loading="eager"
                className="aspect-[4/5] w-full object-cover shadow-[0_2rem_5rem_rgba(0,0,0,0.35)]"
              />
              <div className="absolute inset-3 border border-white/35" aria-hidden="true" />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 bg-[#10263d] px-5 py-4 text-white shadow-xl sm:left-8">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[#b77a3f]">
                  <Camera aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="font-serif text-lg">DjerbaLens</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </header>

      <section className="bg-[#faf9f6] py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
          <AnimatedSection>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                DjerbaLens
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-5xl">
                {t('about.myStoryTitle')}
              </h2>
              <div className="mt-6 h-px w-16 bg-[#b77a3f]" />
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="space-y-6 border-l border-[#b77a3f]/40 pl-6 text-base leading-7 text-[#59636d] sm:pl-8 sm:text-lg">
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
                session at sunset, a family portrait on the beach, or promotional content for
                local businesses, I approach each project with the same passion and attention
                to detail.
              </p>
              <p>
                Beyond photography, I'm also a web developer, helping small businesses in the
                tourism industry establish their online presence and reach more customers. This
                combination of creative and technical skills allows me to offer comprehensive
                digital solutions to my clients.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="border-y border-[#0b1b2e]/[0.06] bg-[#f0eee8] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12 max-w-2xl sm:mb-14">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#a56d39]">
                DjerbaLens
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal tracking-[-0.04em] text-[#0b1b2e] sm:text-5xl">
                Skills &amp; Expertise
              </h2>
            </div>
          </AnimatedSection>

          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <AnimatedSection key={skill.name} delay={index * 100}>
                  <article className="flex h-full items-center gap-4 border border-[#0b1b2e]/10 bg-white p-5 shadow-[0_1rem_2.5rem_rgba(11,27,46,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_1.5rem_3rem_rgba(11,27,46,0.12)]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#b77a3f] text-white">
                      <skill.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-lg text-[#0b1b2e]">{skill.name}</span>
                  </article>
                </AnimatedSection>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {achievements.map((achievement, index) => (
                <AnimatedSection key={achievement.text} delay={index * 100}>
                  <article className="flex items-center gap-4 border border-[#0b1b2e]/10 bg-white p-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center border border-[#b77a3f]/40 text-[#a56d39]">
                      <achievement.icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-serif text-3xl text-[#0b1b2e]">
                      {achievement.number}
                    </span>
                    <span className="text-sm leading-5 text-[#59636d]">
                      {achievement.text}
                    </span>
                  </article>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0b1b2e] py-20 text-[#f7f5f0] sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16 lg:px-8">
          <AnimatedSection>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
                DjerbaLens
              </p>
              <h2 className="mt-3 font-serif text-4xl font-normal tracking-[-0.04em] sm:text-5xl">
                My Philosophy
              </h2>
              <div className="mt-6 h-px w-16 bg-[#b77a3f]" />
            </div>
          </AnimatedSection>
          <AnimatedSection delay={100}>
            <div className="space-y-6 border-l border-[#b77a3f]/50 pl-6 text-base leading-7 text-white/70 sm:pl-8 sm:text-lg">
              <p>
                I believe that every photograph should tell a story. Whether it's the joy in a
                couple's eyes as they explore a new place together, the wonder of a child seeing
                the desert for the first time, or the pride of a local artisan showcasing their
                craft, I strive to capture these authentic moments.
              </p>
              <p>
                My approach is relaxed and natural. I want my clients to feel comfortable and be
                themselves, because that's when the magic happens. The best photos aren't posed
                – they're the genuine moments of connection, laughter, and discovery.
              </p>
              <p>
                Living in Tunisia has taught me to appreciate the beauty in everyday moments and
                to see the extraordinary in the ordinary. This perspective is what I bring to
                every session, every project, and every collaboration.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-[#10263d] py-20 text-center text-[#f7f5f0] sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#e5b07a]">
              DjerbaLens
            </p>
            <h2 className="mb-6 mt-3 font-serif text-4xl font-normal tracking-[-0.04em] sm:text-5xl">
              Let's Create Something Beautiful Together
            </h2>
            <p className="mx-auto mb-8 max-w-2xl leading-7 text-white/70">
              Whether you're visiting Tunisia for the first time or you're a local business
              looking to showcase your services, I'd love to help tell your story through
              photography.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to={getRoutePath('portfolio', language)}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-[#b77a3f] bg-[#b77a3f] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-[#f28c28] hover:bg-[#f28c28]"
              >
                View My Work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
              <Link
                to={getRoutePath('contact', language)}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-white/20 bg-white/[0.06] px-6 py-3 font-semibold text-white transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.12]"
              >
                Get in Touch
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
};

export default About;
