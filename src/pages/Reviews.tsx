import ReviewList from '../components/ReviewList';
import Seo from '../components/Seo';
import { ReviewProvider } from '../contexts/ReviewContext';

const Reviews = () => (
  <ReviewProvider>
    <main className="min-h-screen pt-16">
      <Seo
        title="Avis clients à Djerba | DjerbaLens"
        description="Découvrez les avis des clients de DjerbaLens après leurs séances photo à Djerba."
        path="/reviews"
      />
      <h1 className="sr-only">Avis des clients de DjerbaLens à Djerba</h1>
      <h2 className="sr-only">Avis des clients</h2>
      <ReviewList />
    </main>
  </ReviewProvider>
);

export default Reviews;
