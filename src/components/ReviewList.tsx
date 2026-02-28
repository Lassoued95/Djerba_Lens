import React from 'react';
import { useReviewContext, Review } from '../contexts/ReviewContext';
import { Star } from 'lucide-react';

const ReviewList: React.FC = () => {
  const { reviews, loading } = useReviewContext();

  if (loading) return <p>Loading reviews...</p>;
  if (reviews.length === 0) return <p>No reviews yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review: Review) => (
        <div key={review.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg">{review.name}</h4>
            <div className="flex space-x-1">
              {[1,2,3,4,5].map(star => (
                <Star key={star} className={star <= review.rating ? 'h-4 w-4 text-yellow-400' : 'h-4 w-4 text-gray-300'} />
              ))}
            </div>
          </div>
          {review.location && <p className="text-gray-500 dark:text-gray-300 mb-2">{review.location}</p>}
          <p className="text-gray-700 dark:text-gray-200">{review.text}</p>
          {review.imageUrl && <img src={review.imageUrl} alt="Review" className="mt-4 w-full h-48 object-cover rounded-lg" />}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;