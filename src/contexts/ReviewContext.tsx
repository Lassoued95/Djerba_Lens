import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db, storage, getUserId } from '../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export interface Review {
  id?: string;
  name: string;
  location?: string;
  text: string;
  rating: number;
  userId?: string;
  createdAt?: Timestamp;
  imageUrl?: string;
}

interface ReviewContextType {
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'userId' | 'imageUrl'>, imageFile?: File) => Promise<void>;
  updateReview: (reviewId: string, updates: Partial<Review>, imageFile?: File) => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe: (() => void) | null = null;

    const setupReviewsListener = async () => {
      try {
        setLoading(true);
        setError(null);

        const reviewsCollection = collection(db, 'reviews');
        const q = query(reviewsCollection, orderBy('createdAt', 'desc'));

        unsubscribe = onSnapshot(
          q,
          (snapshot) => {
            if (!isMounted) return;

            const data: Review[] = snapshot.docs.map(docSnap => {
              const d = docSnap.data();
              return {
                id: docSnap.id,
                name: d.name || 'Anonymous',
                location: d.location || '',
                text: d.text || '',
                rating: d.rating || 5,
                userId: d.userId || '',
                imageUrl: d.imageUrl || '',
                createdAt: d.createdAt || Timestamp.now()
              };
            });

            setReviews(data);
            setLoading(false);
          },
          (err) => {
            console.error('Firestore listener error:', err);
            if (!isMounted) return;

            setError(err.message);
            setLoading(false);
          }
        );
      } catch (err) {
        console.error('Error setting up Firestore listener:', err);
        if (isMounted) {
          setError((err as Error).message);
          setLoading(false);
        }
      }
    };

    setupReviewsListener();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'userId' | 'imageUrl'>, imageFile?: File) => {
    try {
      let imageUrl = '';

      if (imageFile) {
        const timestamp = Date.now();
        const imageRef = ref(storage, `reviews/${timestamp}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, 'reviews'), {
        name: review.name,
        location: review.location || '',
        text: review.text,
        rating: review.rating,
        userId: getUserId(),
        imageUrl,
        createdAt: Timestamp.now()
      });
    } catch (err) {
      console.error('Error adding review:', err);
      throw new Error('Failed to add review. Please try again.');
    }
  };

  const updateReview = async (reviewId: string, updates: Partial<Review>, imageFile?: File) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review || review.userId !== getUserId()) {
        throw new Error('Cannot edit this review');
      }

      let imageUrl = review.imageUrl || '';

      if (imageFile) {
        const timestamp = Date.now();
        const imageRef = ref(storage, `reviews/${timestamp}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const updateData: any = { ...updates };
      if (imageUrl) {
        updateData.imageUrl = imageUrl;
      }

      await updateDoc(doc(db, 'reviews', reviewId), updateData);
    } catch (err) {
      console.error('Error updating review:', err);
      throw new Error('Failed to update review. Please try again.');
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const review = reviews.find(r => r.id === reviewId);
      if (!review || review.userId !== getUserId()) {
        throw new Error('Cannot delete this review');
      }

      await deleteDoc(doc(db, 'reviews', reviewId));
    } catch (err) {
      console.error('Error deleting review:', err);
      throw new Error('Failed to delete review. Please try again.');
    }
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview, deleteReview, loading, error }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviewContext must be used within ReviewProvider');
  }
  return context;
};