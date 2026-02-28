import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, query, orderBy, doc, Timestamp } from 'firebase/firestore';
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
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const data = snapshot.docs.map(docSnap => {
        const d = docSnap.data();
        return {
          id: docSnap.id,
          name: d.name ?? 'Anonymous',
          location: d.location ?? '',
          text: d.text ?? '',
          rating: d.rating ?? 5,
          userId: d.userId ?? '',
          imageUrl: d.imageUrl ?? '',
          createdAt: d.createdAt ?? Timestamp.now()
        } as Review;
      });
      setReviews(data);
      setLoading(false);
    }, err => {
      console.error('Failed to fetch reviews:', err);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addReview = async (review: Omit<Review, 'id' | 'createdAt' | 'userId' | 'imageUrl'>, imageFile?: File) => {
    let imageUrl = '';
    if (imageFile) {
      const imageRef = ref(storage, `reviews/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await addDoc(collection(db, 'reviews'), {
      ...review,
      userId: getUserId(),
      imageUrl,
      createdAt: Timestamp.now()
    });
  };

  const updateReview = async (reviewId: string, updates: Partial<Review>, imageFile?: File) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review || review.userId !== getUserId()) throw new Error('Cannot edit this review');

    let imageUrl = review.imageUrl ?? '';
    if (imageFile) {
      const imageRef = ref(storage, `reviews/${Date.now()}_${imageFile.name}`);
      await uploadBytes(imageRef, imageFile);
      imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, 'reviews', reviewId), {
      ...updates,
      imageUrl
    });
  };

  const deleteReview = async (reviewId: string) => {
    const review = reviews.find(r => r.id === reviewId);
    if (!review || review.userId !== getUserId()) throw new Error('Cannot delete this review');

    await deleteDoc(doc(db, 'reviews', reviewId));
  };

  return (
    <ReviewContext.Provider value={{ reviews, addReview, updateReview, deleteReview, loading }}>
      {children}
    </ReviewContext.Provider>
  );
};

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviewContext must be used within ReviewProvider');
  return context;
};