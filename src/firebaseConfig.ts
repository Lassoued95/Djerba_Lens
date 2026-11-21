import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  enableIndexedDbPersistence,
  getFirestore,
  Timestamp,
  type Firestore,
} from 'firebase/firestore';
import { getUserId } from './utils/userUtils';

export { getUserId };

const firebaseConfig = {
  apiKey: "AIzaSyAcauuA4jFLkGB_CoUiaZOS69wsF4UZJqc",
  authDomain: "djerbatns-8375c.firebaseapp.com",
  projectId: "djerbatns-8375c",
  storageBucket: "djerbatns-8375c.appspot.com",
  messagingSenderId: "723402540406",
  appId: "1:723402540406:web:c507371c80ae7789f22657",
  measurementId: "G-EC7S18JKZV"
};

let firestore: Firestore | undefined;

export const getFirebaseDb = (): Firestore => {
  if (typeof window === 'undefined') {
    throw new Error('Firebase Firestore is only available in the browser.');
  }

  if (!firestore) {
    const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    firestore = getFirestore(app);
    enableIndexedDbPersistence(firestore).catch((err: { code?: string }) => {
      if (err.code === 'failed-precondition') {
        console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
      } else if (err.code === 'unimplemented') {
        console.warn('The current browser does not support persistence.');
      } else {
        console.error('Failed to enable Firestore offline persistence:', err);
      }
    });
  }

  return firestore;
};

export { Timestamp };
