import React, { useState, useEffect } from 'react';
import { Star, Send, Loader2, CheckCircle } from 'lucide-react';
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

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleStarClick = (rating: number) => setFormData({ ...formData, rating });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.text.trim() || formData.rating === 0) {
      setError('Please fill all required fields.');
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
      setError((err as Error).message || 'Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) return (
    <div className="text-center py-12">
      <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Thank You!</h3>
      <p className="text-gray-600 dark:text-gray-300">Your review has been submitted successfully.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="p-3 border rounded-lg" />
        <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-3 border rounded-lg" />
      </div>
      <div className="flex space-x-1">
        {[1,2,3,4,5].map(star => (
          <button key={star} type="button" onClick={() => handleStarClick(star)}>
            <Star className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'} />
          </button>
        ))}
      </div>
      <textarea name="text" value={formData.text} onChange={handleChange} rows={4} placeholder="Your Review" className="w-full p-3 border rounded-lg" />
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-48 h-48 object-cover rounded-lg" />}
      {error && <p className="text-red-600">{error}</p>}
      <button type="submit" disabled={isSubmitting} className="bg-red-600 text-white py-3 rounded-lg w-full flex justify-center items-center gap-2">
        {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
        {editingReview ? 'Update Review' : 'Submit Review'}
      </button>
    </form>
  );
};

export default ReviewForm;