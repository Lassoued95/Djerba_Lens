import React, { useState } from 'react';
import { X } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState<{ type: 'image' | 'video'; src: string } | null>(null);

  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'tourists', name: 'Tourists' },
    { id: 'villas', name: 'Luxury Villas' },
    { id: 'local-life', name: 'Local Life' },
    { id: 'horse', name: 'Horse & Camel Rides' },
  ];

  const portfolioItems = [
    { id: 1, category: 'tourists', image: '/assets/images/tourists/1.jpg', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 2, category: 'horse', image: '/assets/images/horse/5.jpg', title: 'Camel & Horse Riding in Djerba', type: 'image' },
    { id: 3, category: 'tourists', image: '/assets/images/tourists/3.jpeg', title: '', type: 'image' },
    { id: 4, category: 'tourists', image: '/assets/images/tourists/4.jpeg', title: '', type: 'image' },
    { id: 5, category: 'tourists', image: '/assets/images/tourists/5.jpeg', title: '', type: 'image' },
    { id: 6, category: 'tourists', image: '/assets/images/tourists/6.jpeg', title: '', type: 'image' },
    { id: 7, category: 'horse', image: '/assets/images/horse/1.jpg', title: 'Traditional Tunisian Market', type: 'image' },
    { id: 8, category: 'villas', image: '/assets/images/villas/1.JPG', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 9, category: 'horse', image: '/assets/images/horse/3.jpg', title: 'Artisan at Work', type: 'image' },
    { id: 10, category: 'villas', image: '/assets/images/villas/2.JPG', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 11, category: 'tourists', image: '/assets/images/tourists/1.jpg', title: 'Couple Photography in Djerba', type: 'image' },
    { id: 12, category: 'horse', image: '/assets/images/horse/2.jpg', title: 'Horseback Riding in Djerba', type: 'image' },
    { id: 13, category: 'villas', image: '/assets/images/villas/5.JPG', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 14, category: 'horse', image: '/assets/images/horse/4.jpeg', title: 'Horseback Riding in Djerba', type: 'image' },
    { id: 15, category: 'villas', image: '/assets/images/villas/6.JPG', title: 'Luxury Villas in Djerba', type: 'image' },
    { id: 16, category: 'villas', image: '/assets/images/villas/7.JPG', title: 'Luxury Villas in Djerba', type: 'image' },

    // Vertical video for tourists
    { 
      id: 17, 
      category: 'tourists', 
      image: '/assets/images/tourists/cover-djerba.jpg', // cover image thumbnail
      title: 'Explore Djerba - Vertical Video', 
      type: 'video', 
      videoSrc: '/assets/images/tourists/djerba.mp4'
    },
  ];

  const videoShowcase = {
    src: '/assets/images/villas/vd.mp4',
    title: 'Djerba Villa Video Tour',
    description: 'Take a cinematic walkthrough of one of Djerba’s most luxurious villas.',
  };

  const filteredItems = selectedCategory === 'all'
    ? portfolioItems
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-orange-600 to-orange-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-5xl font-bold mb-4">Portfolio</h1>
            <p className="text-xl max-w-2xl mx-auto text-orange-100">
              Explore my photography capturing the essence of Djerba and unforgettable moments.
            </p>
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
                  else if (item.type === 'video') setSelectedItem({ type: 'video', src: item.videoSrc });
                }}
              >
                {item.type === 'image' ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-64 flex items-center justify-center bg-black rounded-xl overflow-hidden">
                    <video
                      src={item.videoSrc}
                      className="h-full object-cover"
                      muted
                      autoPlay
                      loop
                    />
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
                src={videoShowcase.src}
                controls
                className="w-full h-auto"
                poster="/assets/images/villas/1.jpg"
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
                src={selectedItem.src}
                alt="Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            ) : (
              <video
                src={selectedItem.src}
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