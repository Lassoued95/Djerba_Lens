import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, MapPin, Camera } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'Top 5 Photo Spots in Djerba',
      excerpt: 'Discover the most Instagram-worthy locations on the island of Djerba, from pristine beaches to traditional architecture.',
      image: 'https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Photography Tips',
      date: '2024-01-15',
      readTime: '5 min read',
      featured: true
    },
    {
      id: 2,
      title: 'Best Time for Photography in Tunisia',
      excerpt: 'Learn about the golden hours, seasonal considerations, and weather patterns that make for perfect photography conditions.',
      image: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Travel Tips',
      date: '2024-01-10',
      readTime: '4 min read',
      featured: false
    },
    {
      id: 3,
      title: 'Capturing Authentic Moments: Street Photography in Tunis',
      excerpt: 'A guide to respectful street photography in Tunisia, including cultural considerations and technical tips.',
      image: 'https://images.pexels.com/photos/1320714/pexels-photo-1320714.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Photography Tips',
      date: '2024-01-05',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 4,
      title: 'Desert Photography: Sahara Shooting Guide',
      excerpt: 'Essential tips for photographing in the Sahara desert, from equipment protection to composition techniques.',
      image: 'https://images.pexels.com/photos/1320686/pexels-photo-1320686.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Photography Tips',
      date: '2023-12-28',
      readTime: '7 min read',
      featured: false
    },
    {
      id: 5,
      title: 'Planning Your Tunisia Photography Tour',
      excerpt: 'A comprehensive guide to planning a photography-focused trip to Tunisia, including must-visit locations and logistics.',
      image: 'https://images.pexels.com/photos/1320688/pexels-photo-1320688.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Travel Tips',
      date: '2023-12-20',
      readTime: '8 min read',
      featured: false
    },
    {
      id: 6,
      title: 'Working with Natural Light in Mediterranean Climate',
      excerpt: 'How to make the most of the beautiful Mediterranean light for portrait and landscape photography.',
      image: 'https://images.pexels.com/photos/1320689/pexels-photo-1320689.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop',
      category: 'Photography Tips',
      date: '2023-12-15',
      readTime: '5 min read',
      featured: false
    }
  ];

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const { t } = useTranslation();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">{t('blog.title')}</h1>
              <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
                {t('blog.description')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Featured Article
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(featuredPost.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{featuredPost.readTime}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300">
                    Read More
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Regular Posts Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Latest Articles
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover photography techniques, travel tips, and stories from Tunisia
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.id} delay={index * 100}>
                <article className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400 text-sm">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <Camera className="h-16 w-16 text-indigo-200 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-indigo-100 mb-8">
              Get the latest photography tips, travel guides, and behind-the-scenes stories delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              />
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Capture Your Tunisia Experience?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Let me help you create stunning photographs that capture the essence of your Tunisian adventure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors duration-300"
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-600 hover:text-white font-semibold rounded-lg transition-colors duration-300"
              >
                Book a Session
                <Camera className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Blog;