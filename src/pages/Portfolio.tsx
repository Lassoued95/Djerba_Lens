import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import JsonLd from '../components/JsonLd';
import { useTranslation } from 'react-i18next';

type PortfolioItem = {
  id: number;
  category: string;
  image: string; // Cloudinary public_id, e.g. "tourists/1"
  title: string;
  type: 'image' | 'video';
  videoSrc?: string; // Cloudinary public_id for video, e.g. "tourists/djerba"
};

// ---- Cloudinary config ----
const CLOUD_NAME = 'difrcodnc';
const CLOUD_BASE = `https://res.cloudinary.com/${CLOUD_NAME}`;

// Small thumbnail used in the grid (cropped to fill the 64-tall card)
// publicId should include its extension, e.g. "tourists/1.jpg"
// NOTE: parameter order matters on this account — crop/size params must come
// BEFORE f_auto/q_auto, or certain images (confirmed: tourists/1) 404. g_auto
// is also required for c_fill to resolve reliably here.
const getThumbUrl = (publicId: string) =>
  `${CLOUD_BASE}/image/upload/w_500,h_400,c_fill,g_auto,f_auto,q_auto/${publicId}`;

// Larger version used in the lightbox preview
const getFullUrl = (publicId: string) =>
  `${CLOUD_BASE}/image/upload/w_1600,f_auto,q_auto/${publicId}`;

// Optimized video delivery (auto format/quality, capped resolution)
// publicId should include its extension, e.g. "tourists/djerba.mp4"
const getVideoUrl = (publicId: string) =>
  `${CLOUD_BASE}/video/upload/w_1080,f_auto,q_auto/${publicId}`;

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{ type: 'image' | 'video'; src: string } | null>(null);
  const { t } = useTranslation();

  const photographerSchema = {
    '@context': 'https://schema.org',
    '@type': 'Photographer',
    name: 'DjerbaLens',
    url: 'https://www.djerbalens.space/portfolio',
    description: 'Food photographer for restaurants and cafes, tourist and landscape photographer based in Djerba, Tunisia.'
  };

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'tourists', name: 'Tourists' },
    { id: 'villas', name: 'Luxury Villas' },
    { id: 'local-life', name: 'Local Life' },
    { id: 'horse', name: 'Horse & Camel Rides' },
    { id: 'food', name: 'Food Photography' },
  ];

  // IMPORTANT: Cloudinary needs the extension included in the public_id for these
  // assets (f_auto alone did not resolve without it). Extensions below match the
  // original local filenames. If you re-check any asset's real public ID in the
  // Cloudinary Media Library and it differs, update the matching line below.
  const portfolioItems: PortfolioItem[] = [
    { id: 1, category: 'tourists', image: 'tourists/1', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 2, category: 'horse', image: 'horse/5', title: 'Camel & Horse Riding in Djerba', type: 'image' },
    { id: 3, category: 'tourists', image: 'tourists/3', title: '', type: 'image' },
    { id: 4, category: 'tourists', image: 'tourists/4', title: '', type: 'image' },
    { id: 5, category: 'tourists', image: 'tourists/5', title: '', type: 'image' },
    { id: 6, category: 'tourists', image: 'tourists/6', title: '', type: 'image' },
    { id: 7, category: 'horse', image: 'horse/1', title: 'Traditional Tunisian Market', type: 'image' },
    { id: 8, category: 'villas', image: 'villas/1', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 9, category: 'horse', image: 'horse/3', title: 'Artisan at Work', type: 'image' },
    { id: 10, category: 'villas', image: 'villas/2', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 11, category: 'tourists', image: 'tourists/1', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 13, category: 'villas', image: 'villas/5', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 14, category: 'horse', image: 'horse/4', title: 'Horseback Riding in Djerba', type: 'image' },
    { id: 15, category: 'villas', image: 'villas/6', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 16, category: 'villas', image: 'villas/7', title: 'Luxury Villas in Djerba', type: 'image' },

    // Vertical video for tourists
    {
      id: 17,
      category: 'tourists',
      image: 'tourists/2',
      title: 'Explore Djerba - Vertical Video',
      type: 'video',
      videoSrc: 'tourists/djerba'
    },

    // Food photography images
    { id: 18, category: 'food', image: 'food/1', title: 'Food Photography', type: 'image' },
    { id: 19, category: 'food', image: 'food/2', title: 'Food Photography', type: 'image' },
    { id: 20, category: 'food', image: 'food/3', title: 'Food Photography', type: 'image' },
    { id: 21, category: 'food', image: 'food/4', title: 'Food Photography', type: 'image' },
    { id: 22, category: 'food', image: 'food/5', title: 'Food Photography', type: 'image' },
    { id: 23, category: 'food', image: 'food/6', title: 'Food Photography', type: 'image' },
    { id: 24, category: 'food', image: 'food/7', title: 'Food Photography', type: 'image' },
    { id: 25, category: 'food', image: 'food/8', title: 'Food Photography', type: 'image' },
    { id: 26, category: 'food', image: 'food/9', title: 'Food Photography', type: 'image' },
    { id: 27, category: 'food', image: 'food/10', title: 'Food Photography', type: 'image' },
  ];

  const videoShowcase = {
    src: 'villas/vd',
    title: 'Djerba Villa Video Tour',
    description: 'Take a cinematic walkthrough of one of Djerba\u2019s most luxurious villas.',
    poster: 'villas/1',
  };

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    document.title = 'Photography Portfolio – Food, Landscape & Tourist Photos | DjerbaLens';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Explore DjerbaLens portfolio: food photography for restaurants and cafes, tourist photography, and landscape shots captured in Djerba, Tunisia.'
      );
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', 'Photography Portfolio – Food, Landscape & Tourist Photos | DjerbaLens');
    }
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute(
        'content',
        'Explore DjerbaLens portfolio: food photography for restaurants and cafes, tourist photography, and landscape shots captured in Djerba, Tunisia.'
      );
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.djerbalens.space/portfolio');
  }, []);

  return (
    <div className="min-h-screen pt-16">
      <JsonLd data={photographerSchema} />
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-bold mb-4">{t('portfolio.title')}</h1>
            <p className="text-xl max-w-2xl mx-auto text-orange-100">{t('portfolio.description')}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-10 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-medium transition ${
                    selectedCategory === cat.id
                      ? 'bg-orange-600 text-white shadow'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-600'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-14 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <AnimatedSection key={item.id} delay={idx * 100}>
              <div
                className="group relative overflow-hidden rounded-xl shadow hover:shadow-lg cursor-pointer"
                onClick={() => {
                  if (item.type === 'image') setSelectedItem({ type: 'image', src: item.image });
                  else if (item.type === 'video') setSelectedItem({ type: 'video', src: item.videoSrc ?? '' });
                }}
              >
                {item.type === 'image' ? (
                  <img
                    src={getThumbUrl(item.image)}
                    alt={item.title || 'DjerbaLens photography'}
                    loading="lazy"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-64 relative overflow-hidden rounded-xl bg-black">
                    {/* Static poster image instead of autoplaying every grid video — much lighter */}
                    <img
                      src={getThumbUrl(item.image)}
                      alt={item.title || 'Video preview'}
                      loading="lazy"
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[14px] border-l-orange-600 ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                  <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Video Showcase */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold mb-4">{videoShowcase.title}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
              {videoShowcase.description}
            </p>
            <div className="rounded-xl overflow-hidden shadow-lg max-w-4xl mx-auto">
              <video
                src={getVideoUrl(videoShowcase.src)}
                controls
                preload="none"
                className="w-full h-auto"
                poster={getThumbUrl(videoShowcase.poster)}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-md w-full max-h-[90vh]">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {selectedItem.type === 'image' ? (
              <img
                src={getFullUrl(selectedItem.src)}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <video
                src={getVideoUrl(selectedItem.src)}
                controls
                className="w-full h-full object-cover rounded-lg"
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;