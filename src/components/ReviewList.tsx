import React from 'react';
import { useReviewContext, Review } from '../contexts/ReviewContext';
import { Star, MapPin, Loader2, AlertCircle } from 'lucide-react';

const ReviewList: React.FC = () => {
  const { reviews, loading, error } = useReviewContext();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="h-12 w-12 text-red-600 animate-spin mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 bg-red-50 dark:bg-red-900/20 rounded-lg">
        <AlertCircle className="h-12 w-12 text-red-600 mb-4" />
        <p className="text-red-600 dark:text-red-400 text-center">
          Failed to load reviews. Please try again later.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{error}</p>
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
        <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No reviews yet
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {reviews.map((review: Review) => (
        <div
          key={review.id}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-1">
                {review.name}
              </h4>
              {review.location && (
                <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>{review.location}</span>
                </div>
              )}
            </div>
            <div className="flex space-x-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= review.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'fill-none text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-gray-700 dark:text-gray-200 mb-4 leading-relaxed">
            {review.text}
          </p>

          {review.imageUrl && (
            <div className="mt-4 overflow-hidden rounded-lg">
              <img
                src={review.imageUrl}
                alt="Review"
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}

          {review.createdAt && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(review.createdAt.toDate()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;