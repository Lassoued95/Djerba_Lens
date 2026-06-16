import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp, enableIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcauuA4jFLkGB_CoUiaZOS69wsF4UZJqc",
  authDomain: "djerbatns-8375c.firebaseapp.com",
  projectId: "djerbatns-8375c",
  storageBucket: "djerbatns-8375c.appspot.com",
  messagingSenderId: "723402540406",
  appId: "1:723402540406:web:c507371c80ae7789f22657",
  measurementId: "G-EC7S18JKZV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
  } else if (err.code === 'unimplemented') {
    console.warn('The current browser does not support persistence.');
  }
});

export { Timestamp };

export const getUserId = (): string => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('userId', userId);
  }
  return userId;
};