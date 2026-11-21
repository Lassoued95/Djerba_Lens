import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import { servicePages, type ServicePageContent } from '../data/servicePages';

const localBusinessId = 'https://www.djerbalens.com/#business';
const whatsappUrl = 'https://wa.me/21625740872';

function createStructuredData(page: ServicePageContent) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.title,
      description: page.description,
      url: `https://www.djerbalens.com${page.path}`,
      areaServed: { '@type': 'Place', name: 'Djerba, Tunisie' },
      provider: { '@id': localBusinessId },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: page.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];
}

function ServiceLandingPage({ page }: { page: ServicePageContent }) {
  return (
    <>
      <Seo
        title={page.pageTitle}
        description={page.description}
        path={page.path}
        structuredData={createStructuredData(page)}
      />
      <main className="min-h-screen bg-white pt-16 text-gray-900 dark:bg-gray-900 dark:text-white">
        <section className="bg-gradient-to-r from-red-600 to-red-800 py-16 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-100">
                Djerba, Tunisie
              </p>
              <h1 className="mb-5 text-4xl font-bold md:text-5xl">{page.title}</h1>
              <p className="max-w-3xl text-xl text-red-100">{page.intro}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-white px-6 py-3 font-semibold text-red-700 transition-colors hover:bg-red-50"
                >
                  Réserver ma séance sur WhatsApp
                </a>
                <Link
                  to="/contact"
                  className="rounded-lg border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Réserver par le formulaire
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:px-6 lg:px-8">
          <section className="grid items-start gap-10 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {page.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <img
              src={page.image}
              alt={page.imageAlt}
              width={page.imageWidth}
              height={page.imageHeight}
              loading="lazy"
              className="h-auto w-full rounded-xl object-cover shadow-xl"
            />
          </section>

          <section className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
              <h2 className="mb-5 text-2xl font-bold">Ce qui est inclus</h2>
              <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
                {page.included.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                Tarif : TODO — ajouter les prix et les options confirmés avant publication.
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-8 dark:bg-gray-800">
              <h2 className="mb-5 text-2xl font-bold">Comment se déroule la séance</h2>
              <ol className="list-inside list-decimal space-y-3 text-gray-700 dark:text-gray-300">
                {page.process.map((step) => <li key={step}>{step}</li>)}
              </ol>
              <p className="mt-5 text-sm text-gray-600 dark:text-gray-400">
                Lieu : choisi ensemble à Djerba selon votre projet et les conditions du jour.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-7 text-3xl font-bold">Questions fréquentes</h2>
            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
                >
                  <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                  <p className="mt-3 leading-relaxed text-gray-700 dark:text-gray-300">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <nav aria-label="Autres séances photo" className="border-t border-gray-200 pt-8 dark:border-gray-700">
            <h2 className="mb-5 text-2xl font-bold">Découvrir les autres services</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {Object.values(servicePages).map((other) => {
                if (other.path === page.path) return null;
                return (
                  <li key={other.path}>
                    <Link className="text-red-700 underline dark:text-red-300" to={other.path}>
                      {other.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex flex-wrap gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-red-700 px-6 py-3 font-semibold text-white hover:bg-red-800"
            >
              Réserver ma séance sur WhatsApp
            </a>
            <Link
              to="/contact"
              className="rounded-lg border border-red-700 px-6 py-3 font-semibold text-red-700 hover:bg-red-50 dark:border-red-300 dark:text-red-300 dark:hover:bg-gray-800"
            >
              Réserver via le formulaire
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

export const CoupleServicePage = () => <ServiceLandingPage page={servicePages.couple} />;
export const FamilyServicePage = () => <ServiceLandingPage page={servicePages.family} />;
export const HotelVillaServicePage = () => <ServiceLandingPage page={servicePages.hotelVilla} />;
export const PhotoVideoServicePage = () => <ServiceLandingPage page={servicePages.photoVideo} />;
