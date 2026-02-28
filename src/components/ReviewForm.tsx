import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, CheckCircle, Upload, X } from 'lucide-react';
import { useReviewContext } from '../contexts/ReviewContext';

interface ReviewFormProps {
  editingReview?: any;
  onCancelEdit?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ editingReview, onCancelEdit }) => {
  const { addReview, updateReview } = useReviewContext();
  const [formData, setFormData] = useState({ name: '', location: '', text: '', rating: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (editingReview) {
      setFormData({
        name: editingReview.name,
        location: editingReview.location || '',
        text: editingReview.text,
        rating: editingReview.rating
      });
      setImagePreview(editingReview.imageUrl || null);
    }
  }, [editingReview]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleStarClick = (rating: number) => {
    setFormData({ ...formData, rating });
    setError(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!formData.text.trim()) {
      setError('Please write a review');
      return;
    }
    if (formData.rating === 0) {
      setError('Please select a rating');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingReview) {
        await updateReview(editingReview.id, formData, imageFile || undefined);
        if (onCancelEdit) onCancelEdit();
      } else {
        await addReview(formData, imageFile || undefined);
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', location: '', text: '', rating: 0 });
          setImageFile(null);
          setImagePreview(null);
        }, 3000);
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError((err as Error).message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12 bg-green-50 dark:bg-green-900/20 rounded-lg">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-300">Your review has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location (Optional)
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Paris, France"
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Rating *
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => handleStarClick(star)}
              className="transition-transform hover:scale-110 focus:outline-none"
            >
              <Star
                className={`h-8 w-8 ${
                  star <= formData.rating
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'fill-none text-gray-300 dark:text-gray-600'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Review *
        </label>
        <textarea
          name="text"
          value={formData.text}
          onChange={handleChange}
          rows={4}
          placeholder="Share your experience..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Add Photo (Optional)
        </label>
        {!imagePreview ? (
          <label className="flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-red-500 dark:hover:border-red-400 transition-colors">
            <div className="text-center">
              <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <span className="text-gray-600 dark:text-gray-300">Click to upload image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </label>
        ) : (
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
            <button
              type="button"
              onClick={clearImage}
              className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin h-5 w-5" />
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            <span>{editingReview ? 'Update Review' : 'Submit Review'}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default ReviewForm;