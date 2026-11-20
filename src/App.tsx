import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import ChatBot from './components/ChatBot';
import ReviewList from './components/ReviewList';

import { ReviewProvider } from './contexts/ReviewContext';

const Home = lazy(() => import('./pages/Home'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Services = lazy(() => import('./pages/Services'));
const Blog = lazy(() => import('./pages/Blog'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function ReviewsPage() {
  useEffect(() => {
    const title = 'Avis clients à Djerba | DjerbaLens';
    const description = 'Découvrez les avis des clients de DjerbaLens après leurs séances photo à Djerba.';
    document.title = title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', 'https://www.djerbalens.com/reviews');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://www.djerbalens.com/reviews');
  }, []);

  return (
    <main>
      <h1 className="sr-only">Avis des clients de DjerbaLens à Djerba</h1>
      <h2 className="sr-only">Avis des clients</h2>
      <ReviewList />
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ReviewProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Navbar />
            <ScrollToTop />
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/services" element={<Services />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reviews" element={<ReviewsPage />} />
              </Routes>
            </Suspense>
            <ChatBot />
          </div>
        </Router>
      </ReviewProvider>
    </ThemeProvider>
  );
}

export default App;